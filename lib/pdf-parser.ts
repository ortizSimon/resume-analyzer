import pdfParse from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);

  if (!data.text || data.text.trim().length < 50) {
    throw new Error(
      "Could not extract meaningful text from the PDF. The file may be image-based or corrupted. Please try a text-based PDF."
    );
  }

  return data.text.slice(0, 15000).trim();
}
