# Analytics and the inquiry form: setup

Three one-time setups, all free. Each takes about five minutes. Until they're done, the site still works: the form falls back to opening a pre-filled email, and Clarity simply doesn't load.

---

## 1. Inquiry form → Google Sheet + emails

When someone submits the form, a Google Apps Script attached to a Google Sheet:

- adds a row to the **Inquiries** tab: received time, name, email, reason, phone, message, page, **Status** (New / Replied / Follow up / Closed), and Notes
- emails you at `mansimodi90+portfolio@gmail.com` (lands in your normal inbox; hit Reply to answer them)
- sends them an auto-reply from your Gmail: *"I've received your inquiry and will get back to you within the next 24–48 hours."*

Spam protection is built in: a hidden trap field, a "filled in too fast" check, a one-minute cooldown per email address, and a cap of 40 emails a day (past that, inquiries are still logged but no emails are sent).

**Steps** (do these signed in as **mansimodi90@gmail.com**; auto-replies come from whichever account deploys the script):

1. Create a new Google Sheet named **Portfolio inquiries**.
2. In the Sheet, open **Extensions → Apps Script**. Delete the sample code, paste in everything from `integrations/google-apps-script/inquiries.gs`, and click **Save**.
3. In the toolbar's function menu, choose **setupAndTest**, then click **Run**.
   - Google asks for permission. Choose your account. If you see "Google hasn't verified this app", click **Advanced → Go to (project name)**. It's your own script, so this is expected. Then click **Allow**.
   - Check that an **Inquiries** tab appeared with a test row, and that two test emails arrived (the alert and the auto-reply). Delete the test row.
4. Click **Deploy → New deployment**. Click the gear icon, choose **Web app**, and set:
   - **Execute as:** Me
   - **Who has access:** Anyone
   
   Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
5. Optional but recommended, in Gmail: create a filter for **To: mansimodi90+portfolio@gmail.com** → **Apply the label** "Portfolio inquiries" and **Never send it to Spam**.

If you edit the script later: **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy.** The URL stays the same.

## 2. Vercel Web Analytics (visits, top pages, sources)

1. Go to vercel.com → your **portfolio** project → **Analytics** tab → **Enable**.
2. That's it. The site already includes the tracking component. Data appears after the next deploy and your first visits.

You'll see: visitors and page views over time, top pages, referrers (LinkedIn, Google, direct), countries, devices, and browsers. No cookies.

## 3. Microsoft Clarity (clicks, scroll depth, time on page)

1. Go to **clarity.microsoft.com** and sign in (Microsoft, Google, or Facebook account).
2. Click **New project**: name it "Portfolio", website URL `https://mansi-modi.vercel.app`.
3. Open **Settings → Overview** and copy the **Project ID** (about 10 letters and numbers).

You'll see: click and scroll **heatmaps** for each page, **session recordings** (typed text is masked), time on page, rage clicks, and dead clicks. Data appears within about two hours of the first visits.

## 4. Connect them to the site

Add both values in Vercel: **Project → Settings → Environment Variables**, for the **Production** environment:

| Name | Value |
|---|---|
| `VITE_INQUIRY_ENDPOINT` | the Apps Script web app URL from step 1 |
| `VITE_CLARITY_PROJECT_ID` | the Clarity project ID from step 3 |

Then redeploy: **Deployments → latest → ⋯ → Redeploy**. These values are read when the site is built, so they only take effect after a redeploy.

## Check it works

- Submit the form on the live site with your own second email address. You should get the auto-reply, the alert, and a new row in the Sheet.
- In Vercel Analytics and Clarity, your own visit should show up (Vercel within minutes, Clarity within about two hours).
