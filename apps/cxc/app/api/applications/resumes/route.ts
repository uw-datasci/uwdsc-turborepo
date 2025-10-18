import { NextRequest } from "next/server";
import { createAuthService } from "@/lib/services";
import { createSupabaseBrowserClient } from "@uwdsc/server/core/database/client";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword",
]);

function extFromMime(mime: string) {
  if (mime === "application/pdf") return "pdf";
  if (
    mime ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docx";
  if (mime === "application/msword") return "doc"; // optional
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const supabase = createSupabaseBrowserClient();

    if (!file) {
      return Response.json(
        { error: "Missing 'file' upload field" },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_BYTES) {
      return Response.json(
        { error: `File too large. Max ${MAX_BYTES / (1024 * 1024)} MB.` },
        { status: 413 }
      );
    }

    // Validate mime type
    const mime = file.type || "";
    if (!ALLOWED_MIME.has(mime)) {
      return Response.json(
        { error: "Invalid file type. Allowed: PDF or DOCX." },
        { status: 415 }
      );
    }

    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ext = extFromMime(mime);
    if (!ext) {
      return Response.json(
        { error: "Unsupported content type" },
        { status: 415 }
      );
    }
    const objectKey = `${user.id}/${file.name}`;

    const { error: uploadErr } = await supabase.storage
      .from("resumes")
      .upload(objectKey, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: mime,
      });

    if (uploadErr) {
      return Response.json(
        { error: `Upload failed: ${uploadErr.message}` },
        { status: 500 }
      );
    }

    return Response.json({
      message: "Upload successful",
      key: objectKey,
    });
  } catch (err: any) {
    console.error("Resume upload error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
