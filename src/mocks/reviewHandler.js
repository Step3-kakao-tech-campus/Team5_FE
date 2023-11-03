import { rest } from "msw";
import { success } from "./commonData";
import { matchReviewsData } from "./reviewData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const reviewHandlers = [
  rest.post("/reviews", async (req, res, ctx) => {
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

  rest.get("/match/reviews", async (req, res, ctx) => {
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
    return res(ctx.status(200), ctx.json(matchReviewsData));
  }),
];
