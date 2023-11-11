import { rest } from "msw";
import { success } from "./commonData";
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
  rest.post("/api/user/signup", async (req, res, ctx) => {
    await sleep(500);
    return res(ctx.status(200), ctx.json(signupResponse));
  }),

  // /user/login
  rest.post("/api/user/login", async (req, res, ctx) => {
    await sleep(500);
    if (req.body.email === "hj1@naver.com") {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          response: {
            userId: 1,
          },
          error: null,
        }),
        ctx.set("Authorization", hjToken),
        ctx.set("Refresh", hjToken),
      );
    }
    if (req.body.email === "ar2@naver.com") {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          response: {
            userId: 2,
          },
          error: null,
        }),
        ctx.set("Authorization", arToken),
        ctx.set("Refresh", arToken),
      );
    }
    if (req.body.email === "hn1001@naver.com") {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          response: {
            userId: 1001,
          },
          error: null,
        }),
        ctx.set("Authorization", hnToken),
        ctx.set("Refresh", hnToken),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          userId: 1002,
        },
        error: null,
      }),
      ctx.set("Authorization", dhToken),
      ctx.set("Refresh", dhToken),
    );
  }),

  // /user
  rest.delete("/api/user", async (req, res, ctx) => {
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
    return res(ctx.status(200), ctx.json(success));
  }),

  // /user/info
  rest.get("/api/user/info", async (req, res, ctx) => {
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

  // /user/token
  rest.post("/api/user/token", async (req, res, ctx) => {
    await sleep(500);
    const refreshToken = req.headers.get("Refresh");
    return res(
      ctx.status(200),
      ctx.json(success),
      ctx.set("Authorization", `NEW ${refreshToken}`),
      ctx.set("Refresh", refreshToken),
    );
    // 리프레시 토큰 만료 테스트
    // return res(
    //   ctx.status(401),
    //   ctx.json({
    //     success: false,
    //     response: null,
    //     error: {
    //       code: "INVALID_TOKEN",
    //       message: "액세스 토큰이 없습니다. 로그인이 필요합니다.",
    //     },
    //   }),
    // );
  }),

  rest.post("/api/mail", async (req, res, ctx) => {
    await sleep(500);
    return res(ctx.status(200), ctx.json(success));
  }),

  rest.post("/api/mail/verify", async (req, res, ctx) => {
    await sleep(500);
    return res(ctx.status(200), ctx.json(success));
  }),
];
