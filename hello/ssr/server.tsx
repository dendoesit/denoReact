import { Application, Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";

import React from "https://dev.jspm.io/react@16.13.1";
import ReactDomServer from "https://dev.jspm.io/react-dom@16.13.1/server";
import App from "./app.tsx";

const app = new Application();

const router = new Router();
router.get("/", handlePage);

console.log("server is running on http://localhost:8000/");
await app.listen({ port: 8000 });


let todos: Map<number, any> = new Map();


function handlePage(ctx: any) {
  try {
    const body = ReactDomServer.renderToString(
      <App todos={Array.from(todos.values())} /> // change here to pass todos as props
    );



function init() {
  todos.set(todos.size + 1, { id: Date.now(), task: "build an ssr deno app" });
  todos.set(todos.size + 1, {
    id: Date.now(),
    task: "try on deno ssr",
  });
}
init();
router
  .get("/todos", (context) => {
    context.response.body = Array.from(todos.values());
  })
  .get("/todos/:id", (context) => {
    if (
      context.params &&
      context.params.id &&
      todos.has(Number(context.params.id))
    ) {
      context.response.body = todos.get(Number(context.params.id));
    } else {
      context.response.status = 404;
    }
  })
  .post("/todos", async (context) => {
    const body = context.request.body();
    if (body.type === "json") {
      const todo = await body.value;
      todos.set(Date.now(), todo);
    }
    context.response.body = { status: "OK" };
  });

app.use(router.routes());
app.use(router.allowedMethods());