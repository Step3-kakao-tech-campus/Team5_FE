import { rest } from "msw";
import { favoriteList0, favoriteList1, favoriteList2 } from "./favoriteData";
import { success } from "./commonData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const favoriteHandlers = [
  rest.get("/api/favorite", async (req, res, ctx) => {
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
      return res(ctx.status(200), ctx.json(favoriteList0));
    }
    if (page === "1") {
      return res(ctx.status(200), ctx.json(favoriteList1));
    }
    if (page === "2") {
      return res(ctx.status(200), ctx.json(favoriteList2));
    }
    return res(
      ctx.status(200),
      ctx.json({ success: true, response: [], error: null }),
    );
  }),
  rest.post("/api/favorite/:portfolioId", async (req, res, ctx) => {
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

  rest.delete("/api/favorite/:portfolioId", async (req, res, ctx) => {
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
];
