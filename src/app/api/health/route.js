export async function GET() {
  return Response.json(
    {
      status: "ok",
      service: "Node.js API",
      code: 200,
      message: "All Systems Operational",
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    },
  );
}