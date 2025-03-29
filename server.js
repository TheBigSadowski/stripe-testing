const PORT = process.env.PORT || 4242;
const YOUR_DOMAIN = process.env.DOMAIN || `http://localhost:${PORT}`;

const stripeKey = process.env.STRIPE_KEY;
const stripe = require('stripe')(stripeKey);
const express = require('express');
const app = express();

console.log('starting app');

app.use(express.static('public'));

app.get('/', async (req, res) => {
  console.log('redirecting from root');
  res.redirect(303, `${YOUR_DOMAIN}/checkout.html`);
});

app.post('/create-checkout-session', async (req, res) => {
  console.log('creating checkout session');
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1R7mMULsME8qSugw52rCyy58',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    automatic_tax: {enabled: true},
  });

  console.log('redirecting to checkout page');
  res.redirect(303, session.url);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

module.exports = app;
