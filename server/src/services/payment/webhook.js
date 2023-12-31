import { APIError } from "~/utils/APIError";
import logger from "~/utils/logger";
import {
  invoicePaymentFailed,
  invoicePaymentSuccess,
  trialWillEnd
} from "../user/plans-user.service";

export async function webhookStripe(req, res) {
  let event;
  try {
    event = JSON.parse(req.body);
  } catch (err) {
    logger.error(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    throw new APIError("Webhook Error", 400);
  }

  switch (event.type) {
    case "invoice.payment_succeeded":
      invoicePaymentSuccess(event.data.object);
      break;
    case "invoice.payment_failed":
      invoicePaymentFailed(event.data.object);
      break;
    case "customer.subscription.trial_will_end":
      trialWillEnd(event.data.object);
      break;
    default:
      logger.warn(`Unhandled event type ${event.type}`);
      break;
  }

  res.json({ received: true });
}
