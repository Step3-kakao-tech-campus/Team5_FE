import { setupWorker } from "msw";
import { chatHandlers } from "./chatHandler";
import { paymentHandlers } from "./paymentHandler";
import { portfolioHandlers } from "./portfolioHandler";
import { quotationHandlers } from "./quotationHandler";
import { userHandlers } from "./userHandler";
import { reviewHandlers } from "./reviewHandler";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  ...userHandlers,
  ...portfolioHandlers,
  ...quotationHandlers,
  ...paymentHandlers,
  ...chatHandlers,
  ...reviewHandlers,
);
