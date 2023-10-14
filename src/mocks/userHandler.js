import { rest } from "msw";
import { sucess } from "./commonData";
import {
  infoResponseAR,
  infoResponseDH,
  infoResponseHJ,
  infoResponseHN,
  signupResponse,
} from "./userData";

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
    await sleep(500);
    const hjToken = "1";
    const arToken = "2";
    const hnToken = "1001";
    const dhToken = "1002";
    if (req.body.email === "hj1@naver.com") {
      return res(
        ctx.status(200),
        ctx.json(sucess),
        ctx.set("Authorization", hjToken),
      );
    }
    if (req.body.email === "ar2@naver.com") {
      return res(
        ctx.status(200),
        ctx.json(sucess),
        ctx.set("Authorization", arToken),
      );
    }
    if (req.body.email === "hn1001@naver.com") {
      return res(
        ctx.status(200),
        ctx.json(sucess),
        ctx.set("Authorization", hnToken),
      );
    }

    return res(
      ctx.status(200),
      ctx.json(sucess),
      ctx.set("Authorization", dhToken),
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
    if (isAuthenticated === "1") {
      return res(ctx.status(200), ctx.json(infoResponseHJ));
    }
    if (isAuthenticated === "2") {
      return res(ctx.status(200), ctx.json(infoResponseAR));
    }
    if (isAuthenticated === "1001") {
      return res(ctx.status(200), ctx.json(infoResponseHN));
    }
    return res(ctx.status(200), ctx.json(infoResponseDH));
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
