// Define configurations for different payment services

const paymentConfig = {
  // Configuration for Stripe
  stripe: {
    apiKey: "STRIPE_API_KEY",
    secretKey: "STRIPE_SECRET_KEY",
    endpoint: "https://api.stripe.com/v1"
  },

  // Configuration for PayPal
  paypal: {
    clientId: "PAYPAL_CLIENT_ID",
    clientSecret: "PAYPAL_CLIENT_SECRET",
    endpoint: "https://api.sandbox.paypal.com"
  }
};

export default paymentConfig;
