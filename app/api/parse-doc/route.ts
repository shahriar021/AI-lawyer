export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const { extractText } = await import("unpdf");
    const { text } = await extractText(new Uint8Array(arrayBuffer), {
      mergePages: true,
    });

    if (!text || text.trim() === "") {
      return Response.json({ error: "No readable text found in PDF" }, { status: 422 });
    }

    return Response.json({ text });
  } catch (error) {
    console.error("PDF parse error:", error);
    return Response.json({ error: "Could not read PDF" }, { status: 500 });
  }
}
