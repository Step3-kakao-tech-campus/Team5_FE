import { setupWorker } from "msw";
import { userHandlers } from "./userHandler";
import { portfolioHandlers } from "./portfolioHandler";
import { quotationHandlers } from "./quotationHandler";
import { paymentHandlers } from "./paymentHandler";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  ...userHandlers,
  ...portfolioHandlers,
  ...quotationHandlers,
  ...paymentHandlers,
);
