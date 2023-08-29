import Koa from "koa";
import { koaBody } from "koa-body";
import router from "./routes/routes.js";
import render from "koa-ejs";
import path from "path";
// import router from "./routes/view.js";

const app = new Koa();
render(app, {
  root: path.join("./src", "views"),
  layout: "/layout/template",
  viewExt: "html",
  cache: false,
  debug: false,
});

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3030, async (req, res) => {
  console.log("Server running on http://localhost:3030");
});
