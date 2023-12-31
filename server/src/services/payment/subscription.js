import logger from "~/utils/logger";
import APIError from "~/utils/APIError";
import moment from "moment-timezone";
import paymentProvider from "../../config/paymentProvider";
import stripe from "stripe";

const stripe = stripe(paymentProvider.stripe.secretKey);

export async function createNewSubscription(
  token,
  email,
  name,
  priceId,
  isTrial = false
) {
  if (!token) {
    throw new APIError("Invalid token");
  }

  try {
    const customer = await stripe.customers.create({
      email,
      name,
      source: token
    });

    const dataSubscription = {
      customer: customer.id,
      items: [{ price: priceId }]
    };
    if (isTrial) {
      dataSubscription.trial_end = moment().add(14, "d").unix();
    }

    const result = await stripe.subscriptions.create(dataSubscription);

    return {
      customer_id: customer.id,
      subscription_id: result.id
    };
  } catch (error) {
    logger.error(error);
    throw new APIError("Payment failed! Please check your card.");
  }
}

export async function updateSubscription(subId, priceId) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subId);

    await stripe.subscriptions.update(subId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId
        }
      ]
    });

    return true;
  } catch (error) {
    logger.error(error);
    throw new APIError("Payment failed! Please check your card.");
  }
}

export async function cancelSubscription(customerId) {
  try {
    await stripe.customers.del(customerId);
    return true;
  } catch (error) {
    logger.error(error);
    throw new APIError("Something went wrong!");
  }
}
