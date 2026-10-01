import { NextResponse } from "next/server";
import { CV_MAX_BYTES, validateCvFile } from "@/lib/cv-upload";
import { CvParseError, parseCv } from "@/lib/server/cv-parser";

// PDF extraction can take a while.
export const maxDuration = 60;

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return error("Send the CV as multipart form data.", 400);
  }

  const file = form.get("file");
  if (!(file instanceof File)) return error("No file was uploaded.", 400);

  const invalid = validateCvFile(file);
  if (invalid) return error(invalid, file.size > CV_MAX_BYTES ? 413 : 415);

  try {
    const cv = await parseCv(file, request.signal);
    return NextResponse.json({ cv });
  } catch (err) {
    if (err instanceof CvParseError) return error(err.message, 422);
    if (request.signal.aborted) return error("Request cancelled.", 499);
    // Log the message only — never the request, file, or key.
    console.error("[cv/parse] extraction failed:", err instanceof Error ? err.message : err);
    return error("We couldn't scan your CV right now. Please try again.", 502);
  }
}
