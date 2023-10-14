import { rest } from "msw";
import { sucess } from "./commonData";
import { infoResponse, signupResponse } from "./userData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const userHandlers = [
  // /user/signup
  rest.post("/user/signup", async (req, res, ctx) => {
    await sleep(500);
    return res(ctx.status(200), ctx.json(signupResponse));
  }),

  // /user/login
  rest.post("/user/login", async (req, res, ctx) => {
    const fakeToken = "SunsuWeddingToken";
    console.log(req.body);

    await sleep(500);
    return res(
      ctx.status(200),
      ctx.json(sucess),
      ctx.set("Authorization", `Bearer ${fakeToken}`),
    );
  }),

  // /user
  rest.delete("/user", async (req, res, ctx) => {
    await sleep(500);
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        }),
      );
    }
    return res(ctx.status(200), ctx.json(sucess));
  }),

  // /user/info
  rest.get("/user/info", async (req, res, ctx) => {
    await sleep(500);
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        }),
      );
    }
    return res(ctx.status(200), ctx.json(infoResponse));
  }),

  // /user/upgrade
  rest.post("/user/upgrade", async (req, res, ctx) => {
    await sleep(500);
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        }),
      );
    }
    return res(ctx.status(200), ctx.json(sucess));
  }),
];
