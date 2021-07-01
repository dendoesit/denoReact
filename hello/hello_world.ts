import { serve } from "https://deno.land/std/http/server.ts";

const PORT = 8080;
const server = serve({ port: PORT });
console.log(`Your server is running on http://localhost:${PORT}/`);

for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}