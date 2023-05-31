import fs from "fs";
import { DateTime } from "luxon";
import { sign } from "pdf-signer-brazil";

const {
  PATH_TO_PDF_FILE,
  PATH_TO_SIGNED_PDF_FILE,
  PATH_TO_P12_CERTIFICATE,
  P12_PASSWORD,
  SIGNATURE_NAME,
  SIGNATURE_LOCATION,
  SIGNATURE_EMAIL,
} = process.env;

export async function signDocument() {
  const signedPdf = await sign(
    fs.readFileSync(PATH_TO_PDF_FILE),
    fs.readFileSync(PATH_TO_P12_CERTIFICATE),
    P12_PASSWORD,
    {
      reason: SIGNATURE_NAME,
      email: SIGNATURE_EMAIL,
      location: SIGNATURE_LOCATION,
      signerName: SIGNATURE_NAME,
      annotationAppearanceOptions: {
        signatureCoordinates: { left: 60, bottom: 60, right: 200, top: 120 },
        signatureDetails: [
          {
            value: SIGNATURE_NAME,
            fontSize: 5,
            transformOptions: {
              rotate: 0,
              space: 2,
              tilt: 0,
              xPos: 0,
              yPos: 62,
            },
          },
          {
            value: "Este arquivo foi assinado digitalmente",
            fontSize: 5,
            transformOptions: {
              rotate: 0,
              space: 2,
              tilt: 0,
              xPos: 0,
              yPos: 55.4,
            },
          },
          {
            value: "Assinado em " + DateTime.now().toFormat("dd/MM/yyyy"),
            fontSize: 5,
            transformOptions: {
              rotate: 0,
              space: 2,
              tilt: 0,
              xPos: 0,
              yPos: 48,
            },
          },
          {
            value: "Verifique o arquivo em verificador.iti.gov.br",
            fontSize: 5,
            transformOptions: {
              rotate: 0,
              space: 2,
              tilt: 0,
              xPos: 0,
              yPos: 41,
            },
          },
        ],
      },
    }
  );

  return fs.writeFileSync(PATH_TO_SIGNED_PDF_FILE, signedPdf);
}
