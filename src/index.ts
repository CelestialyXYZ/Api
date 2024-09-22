import { Hono } from "hono";
import { requestId } from "hono/request-id";
import { cors } from "hono/cors";

import V1 from "./routes/v1";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use("*", requestId());
app.use(
  "*",
  cors({
    origin: [
      "https://celestialy.xyz",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
  })
);

app.get("/", (c: any) => {
  return c.text(
    `Celestialy Api\nhttps://github.com/CelestialyXYZ/Api\nCopyright: Celestialy © 2023-${new Date().getFullYear()}`
  );
});

app.notFound((c) => {
  return c.json(
    {
      request_id: c.get("requestId"),
      status: 404,
      message: "Not found",
    },
    404
  );
});

new V1(app);

export default app;
