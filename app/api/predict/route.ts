// app/api/predict/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Forward the request to the external API
    const response = await fetch(
      "https://dental-3d-service-309924279406.asia-east2.run.app/predict",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`External API error: ${response.statusText}`);
    }

    // Stream the upstream response directly to the client to avoid buffering large files in memory
    const headers = new Headers(response.headers);
    // Ensure sensible defaults if upstream doesn't set them
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/octet-stream");
    }
    if (!headers.has("Content-Disposition")) {
      headers.set(
        "Content-Disposition",
        'attachment; filename="dental_output.stl"'
      );
    }
    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
