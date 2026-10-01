// Upload rules shared by the dropzone (client) and /api/cv/parse (server).

export const CV_MAX_BYTES = 5 * 1024 * 1024;

export const CV_MIME_TYPES = ["application/pdf", "image/png", "image/jpeg"] as const;

export const CV_ACCEPT = ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg";

export function validateCvFile(file: { type: string; size: number }): string | null {
  if (!(CV_MIME_TYPES as readonly string[]).includes(file.type)) {
    return "Unsupported file type. Upload a PDF, PNG or JPG.";
  }
  if (file.size > CV_MAX_BYTES) return "This file is larger than 5 MB.";
  if (file.size === 0) return "This file is empty.";
  return null;
}
