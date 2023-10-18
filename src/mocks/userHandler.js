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

const hjToken = "Bearer 1";
const arToken = "Bearer 2";
const hnToken = "Bearer 1001";
const dhToken = "Bearer 1002";

export const userHandlers = [
  // /user/signup
  rest.post("/user/signup", async (req, res, ctx) => {
    await sleep(500);
    return res(ctx.status(200), ctx.json(signupResponse));
  }),

  // /user/login
  rest.post("/user/login", async (req, res, ctx) => {
    await sleep(500);
    if (req.body.email === "hj1@naver.com") {
      return res(
        ctx.status(200),
        ctx.json(sucess),
        ctx.set("Authorization", hjToken),
        ctx.set("Refresh", hjToken),
      );
    }
    if (req.body.email === "ar2@naver.com") {
      return res(
        ctx.status(200),
        ctx.json(sucess),
        ctx.set("Authorization", arToken),
        ctx.set("Refresh", arToken),
      );
    }
    if (req.body.email === "hn1001@naver.com") {
      return res(
        ctx.status(200),
        ctx.json(sucess),
        ctx.set("Authorization", hnToken),
        ctx.set("Refresh", hnToken),
      );
    }

    return res(
      ctx.status(200),
      ctx.json(sucess),
      ctx.set("Authorization", dhToken),
      ctx.set("Refresh", dhToken),
    );
  }),

  // /user
  rest.delete("/user", async (req, res, ctx) => {
    await sleep(500);
    const accessToken = req.headers.get("Authorization");
    if (!accessToken) {
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
    const accessToken = req.headers.get("Authorization");
    if (!accessToken) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        }),
      );
    }
    if (accessToken === hjToken) {
      return res(ctx.status(200), ctx.json(infoResponseHJ));
    }
    if (accessToken === arToken) {
      return res(ctx.status(200), ctx.json(infoResponseAR));
    }
    if (accessToken === hnToken) {
      return res(ctx.status(200), ctx.json(infoResponseHN));
    }
    return res(ctx.status(200), ctx.json(infoResponseDH));
  }),
];
