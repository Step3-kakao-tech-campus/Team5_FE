import { rest } from "msw";
import { success } from "./commonData";
import {
  portfolioDetail1,
  portfolioDetail2,
  portfolioList1,
  portfolioList2,
  portfolioList3,
  portfolioSelfData,
} from "./portfolioData";

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const portfolioHandlers = [
  // /portfolios?cursor={nextCursor}
  rest.get("/portfolios", async (req, res, ctx) => {
    await sleep(500);
    const nextCursor = req.url.searchParams.get("cursor");
    if (nextCursor === "-1") {
      return res(ctx.status(200), ctx.json(portfolioList1));
    }
    if (nextCursor === "10") {
      return res(ctx.status(200), ctx.json(portfolioList2));
    }
    return res(ctx.status(200), ctx.json(portfolioList3));
  }),

  // portfolios/self
  rest.get("/portfolios/self", async (req, res, ctx) => {
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
    // return res(
    //   ctx.status(200),
    //   ctx.json({
    //     success: true,
    //     response: {
    //       plannerName: null,
    //       images: null,
    //       items: null,
    //       title: null,
    //       description: null,
    //       location: null,
    //       career: null,
    //       partnerCompany: null,
    //     },
    //     error: null,
    //   }),
    // );
    return res(ctx.status(200), ctx.json(portfolioSelfData));
  }),

  // /portfolios/{portfolioId}
  rest.get("/portfolios/:portfolioId", async (req, res, ctx) => {
    await sleep(500);
    if (req.params.portfolioId === "1") {
      return res(ctx.status(200), ctx.json(portfolioDetail1));
    }

    return res(ctx.status(200), ctx.json(portfolioDetail2));
  }),

  // /portfolios
  rest.post("/portfolios", async (req, res, ctx) => {
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

  // /portfolios
  rest.put("/portfolios", async (req, res, ctx) => {
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

  // /portfolios
  rest.delete("/portfolios", async (req, res, ctx) => {
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
