/**
 * Portfolio inquiries: log to this Google Sheet, notify Mansi, auto-reply to the sender.
 *
 * Deployed as a Google Apps Script web app bound to the "Portfolio inquiries" Sheet.
 * The website's inquiry form POSTs JSON here (see src/components/InquiryForm.tsx).
 * Setup steps: docs/analytics-and-inquiries.md
 */

const CONFIG = {
  // Replies to visitors come from the Google account that deploys this script.
  OWNER_NAME: 'Mansi Modi',
  OWNER_EMAIL: 'mansimodi90@gmail.com',
  // Where new-inquiry alerts go. The "+portfolio" part lets a Gmail filter label them.
  NOTIFY_EMAIL: 'mansimodi90+portfolio@gmail.com',
  SITE_URL: 'https://mansi-modi.vercel.app',
  LINKEDIN_URL: 'https://linkedin.com/in/mansimodi',
  SHEET_NAME: 'Inquiries',
  // One submission per email address per window, to stop accidental double-sends and spam bursts.
  COOLDOWN_SECONDS: 60,
  // Real people take a few seconds to fill in the form; instant submissions are bots.
  MIN_FILL_MS: 3000,
  // Gmail allows a personal account about 100 recipients a day. Past this many inquiries in a
  // day, keep logging them but stop sending email, so the form can't be used to spam strangers.
  DAILY_EMAIL_CAP: 20,
};

const HEADERS = ['Received', 'Name', 'Email', 'Reason', 'Phone', 'Message', 'Page', 'Status', 'Notes'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REASONS = ['A product role', 'A speaking invite', 'A project or collaboration', 'Something else'];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Bots: the honeypot is filled, or the form was submitted impossibly fast. Pretend it worked.
    if (data.website || Number(data.elapsedMs) < CONFIG.MIN_FILL_MS) return json({ ok: true });

    const inquiry = {
      name: clean(data.name, 100),
      email: clean(data.email, 200).toLowerCase(),
      reason: REASONS.indexOf(data.reason) >= 0 ? data.reason : 'Something else',
      phone: clean(data.phone, 40),
      message: clean(data.message, 3000),
      page: clean(data.page, 200),
    };
    if (!inquiry.name || !EMAIL_PATTERN.test(inquiry.email) || !inquiry.message) {
      return json({ ok: false, error: 'invalid' });
    }

    const cache = CacheService.getScriptCache();
    const cooldownKey = 'cooldown:' + inquiry.email;
    if (cache.get(cooldownKey)) return json({ ok: false, error: 'rate_limited' });
    cache.put(cooldownKey, '1', CONFIG.COOLDOWN_SECONDS);

    logInquiry(inquiry);
    if (withinDailyCap()) {
      notifyOwner(inquiry);
      autoReply(inquiry);
    }
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'server' });
  }
}

/** Health check: open the web app URL in a browser and you should see {"ok":true}. */
function doGet() {
  return json({ ok: true, service: 'portfolio-inquiries' });
}

function logInquiry(inquiry) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet().appendRow([
      new Date(),
      safeCell(inquiry.name),
      safeCell(inquiry.email),
      inquiry.reason,
      safeCell(inquiry.phone),
      safeCell(inquiry.message),
      safeCell(inquiry.page),
      'New',
      '',
    ]);
  } finally {
    lock.releaseLock();
  }
}

function notifyOwner(inquiry) {
  const lines = [
    'New inquiry from your portfolio.',
    '',
    'Name: ' + inquiry.name,
    'Email: ' + inquiry.email,
    'Reason: ' + inquiry.reason,
    'Phone: ' + (inquiry.phone || '(not given)'),
    'Page: ' + inquiry.page,
    '',
    inquiry.message,
    '',
    'Reply to this email to answer them directly. Track follow-ups in the Sheet:',
    SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ];
  MailApp.sendEmail({
    to: CONFIG.NOTIFY_EMAIL,
    replyTo: inquiry.email,
    name: 'Portfolio inquiries',
    subject: '[Portfolio] ' + inquiry.reason + ': ' + inquiry.name,
    body: lines.join('\n'),
  });
}

/**
 * The auto-reply goes to whatever address was typed into the form, so it must not carry
 * anything the sender wrote: otherwise a stranger could use this script to send their own
 * text (a scam link, say) from your Gmail to anyone. Fixed wording only; the greeting uses
 * the first name only when it looks like a real name.
 */
function autoReply(inquiry) {
  const greetingName = safeFirstName(inquiry.name);
  const text = [
    'Hi ' + greetingName + ',',
    '',
    "Thanks for reaching out through my website. I've received your inquiry and will get back to you within the next 24–48 hours.",
    '',
    'Best,',
    CONFIG.OWNER_NAME,
    'Data scientist turned product manager',
    CONFIG.SITE_URL + ' · ' + CONFIG.LINKEDIN_URL,
  ].join('\n');

  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1d2340;max-width:560px">' +
    '<p>Hi ' + escapeHtml(greetingName) + ',</p>' +
    "<p>Thanks for reaching out through my website. I've received your inquiry and will get back to you within the next <b>24–48 hours</b>.</p>" +
    '<p style="margin-top:24px">Best,<br>' + escapeHtml(CONFIG.OWNER_NAME) + '<br>' +
    '<span style="color:#4f5577">Data scientist turned product manager</span><br>' +
    '<a href="' + CONFIG.SITE_URL + '" style="color:#b4321f">' + CONFIG.SITE_URL.replace('https://', '') + '</a> · ' +
    '<a href="' + CONFIG.LINKEDIN_URL + '" style="color:#b4321f">LinkedIn</a></p>' +
    '</div>';

  MailApp.sendEmail({
    to: inquiry.email,
    replyTo: CONFIG.OWNER_EMAIL,
    name: CONFIG.OWNER_NAME,
    subject: 'Thanks for reaching out',
    body: text,
    htmlBody: html,
  });
}

/** First name if it looks like one (letters, spaces, ' . -; up to 40 characters), else "there". */
function safeFirstName(name) {
  const first = String(name || '').trim().split(/\s+/)[0] || '';
  return /^[\p{L}][\p{L}'.-]{0,39}$/u.test(first) ? first : 'there';
}

function withinDailyCap() {
  const props = PropertiesService.getScriptProperties();
  const key = 'sent:' + Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM-dd');
  const count = Number(props.getProperty(key) || 0);
  if (count >= CONFIG.DAILY_EMAIL_CAP) return false;
  props.setProperty(key, String(count + 1));
  return true;
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.getRange('H2:H')
      .setDataValidation(SpreadsheetApp.newDataValidation()
        .requireValueInList(['New', 'Replied', 'Follow up', 'Closed'], true)
        .build());
  }
  return sheet;
}

/** Run this once from the Apps Script editor: it creates the sheet, asks for permissions,
 * and sends you a test notification and auto-reply. Delete the test row afterwards. */
function setupAndTest() {
  getSheet();
  const test = {
    name: CONFIG.OWNER_NAME + ' (test)',
    email: CONFIG.OWNER_EMAIL,
    reason: 'Something else',
    phone: '',
    message: 'This is a test inquiry from setupAndTest().',
    page: '/contact',
  };
  logInquiry(test);
  notifyOwner(test);
  autoReply(test);
}

function clean(value, maxLength) {
  // Keep line breaks in messages; drop other control characters.
  return String(value || '')
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/** Sheets treats text starting with = + - @ as a formula; prefix it so it stays plain text. */
function safeCell(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
