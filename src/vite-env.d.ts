/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Apps Script web app that handles inquiry-form submissions. */
  readonly VITE_INQUIRY_ENDPOINT?: string;
  /** Microsoft Clarity project ID. */
  readonly VITE_CLARITY_PROJECT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
