export const runtime = "nodejs"; // ensure Node runtime, not Edge

export async function POST(req: Request) {
  try {
    const { default: pdfParse } = await import("pdf-parse"); // dynamic import

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parsed = await pdfParse(buffer);

    return Response.json({ text: parsed.text });
  } catch (error) {
    return Response.json({ error: "Could not read PDF" }, { status: 500 });
  }
}
