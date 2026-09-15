export async function GET(request: Request) {
  return new Response("OG image generation is disabled in the Vite prototype.", {
    status: 204,
  });
}
