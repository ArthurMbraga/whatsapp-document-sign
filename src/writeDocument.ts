import fs from "fs";
import PDFDocument from "pdfkit";

const { PATH_TO_PDF_FILE } = process.env;

export function writeDocument(content: string) {
  return new Promise<void>((resolve) => {
    const doc = new PDFDocument({
      size: "A4",
      layout: "portrait",
    });

    fs.mkdirSync("./out", { recursive: true }); // Create the directory if it doesn't exist

    const writeStream = fs.createWriteStream(PATH_TO_PDF_FILE);

    doc.pipe(writeStream);

    doc.image("./images/bg.jpg", 0, 0, {
      width: doc.page.width,
      height: doc.page.height,
    });

    doc.fillColor("#565656").fontSize(10).text(content, 60, 130).save();

    doc.on("end", () => {
      resolve();
    });

    doc.end();
  });
}
