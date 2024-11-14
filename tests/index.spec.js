import http from "http";
import test from "ava";
import got from "got";
import listen from "test-listen";
import app from "../src/app.js";

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
});

test.after.always((t) => {
  t.context.server.close();
});

test.serial("check /example/help", async (t) => {
  const { response } = await t.throwsAsync(
    got("example/help", {
      prefixUrl: t.context.prefixUrl,
    }).json()
  );

  t.is(response.statusCode, 404);
  t.is(response.body.message, "Route not found");
});

test.serial("check /example/throw-err", async (t) => {
  const { response } = await t.throwsAsync(
    got("example/throw-err", {
      prefixUrl: t.context.prefixUrl,
    }).json()
  );

  t.is(response.statusCode, 400);
  t.is(response.body.message, "Failure is a part of progress");
});

test.serial("check /example/throw-app-err", async (t) => {
  const { response } = await t.throwsAsync(
    got("example/throw-app-err", {
      prefixUrl: t.context.prefixUrl,
    }).json()
  );

  t.is(response.statusCode, 418);
  t.is(
    response.body.message,
    "The server refuses the attempt to brew coffee with a teapot."
  );
});

test.serial("check /example/runtime-err", async (t) => {
  const { response } = await t.throwsAsync(
    got("example/runtime-err", {
      prefixUrl: t.context.prefixUrl,
    }).json()
  );

  t.is(response.statusCode, 500);
  t.is(response.body.message, "Unknown error occurred");
});
