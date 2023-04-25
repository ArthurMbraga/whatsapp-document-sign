declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      readonly PATH_TO_PDF_FILE: string;
      readonly PATH_TO_SIGNED_PDF_FILE: string;
      readonly PATH_TO_P12_CERTIFICATE: string;
      readonly P12_PASSWORD: string;
      readonly GROUP_ID: string;
      readonly SIGNATURE_NAME: string;
      readonly SIGNATURE_LOCATION: string;
      readonly SIGNATURE_EMAIL: string;
    }
  }
}

export {};
