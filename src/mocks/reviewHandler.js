import { rest } from "msw";
import { success } from "./commonData";
import {
  matchReviewsData,
  portfolioReviewsData1,
  portfolioReviewsData2,
  reviewsCollectData,
  reviewsReviewIdData,
} from "./reviewData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const reviewHandlers = [
  rest.post("/api/review", async (req, res, ctx) => {
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

  rest.get("/api/match/review", async (req, res, ctx) => {
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

  rest.get("/api/review/all", async (req, res, ctx) => {
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
    return res(ctx.status(200), ctx.json(reviewsCollectData));
  }),

  rest.get("/api/review/:reviewId", async (req, res, ctx) => {
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

    return res(ctx.status(200), ctx.json(reviewsReviewIdData));
  }),

  rest.delete("/api/review/:reviewId", async (req, res, ctx) => {
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

  rest.put("/api/review/:reviewId", async (req, res, ctx) => {
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

  rest.get("/api/review", async (req, res, ctx) => {
    await sleep(500);
    const accessToken = req.headers.get("Authorization");
    const page = req.url.searchParams.get("page");
    if (!accessToken) {
      return res(
        ctx.status(403),
        ctx.json({
          code: 403,
          message: "Not authorized",
        }),
      );
    }
    if (page === "0") {
      return res(ctx.status(200), ctx.json(portfolioReviewsData1));
    }
    if (page === "1") {
      return res(ctx.status(200), ctx.json(portfolioReviewsData2));
    }

    return res(
      ctx.status(200),
      ctx.json({ success: true, response: { reviews: [] }, error: null }),
    );
  }),
];
