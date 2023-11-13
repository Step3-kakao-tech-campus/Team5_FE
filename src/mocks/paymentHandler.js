import { rest } from "msw";
import { success } from "./commonData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const paymentHandlers = [
  // /payments/save
  rest.post("/api/payment/save", async (req, res, ctx) => {
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

  // /payments/approve
  rest.post("/api/payment/approve", async (req, res, ctx) => {
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
    // 토큰 만료 테스트
    if (accessToken === "Bearer 1002") {
      return res(
        ctx.status(401),
        ctx.json({
          success: false,
          response: null,
          error: {
            code: "EXPIRED_TOKEN",
            message:
              "액세스 토큰이 만료되었습니다. 리프레시 토큰으로 다시 요청해주세요.",
          },
        }),
      );
    }
    return res(ctx.status(200), ctx.json(success));
  }),
];
