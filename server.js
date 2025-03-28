// This is your test secret API key.
const stripe = require('stripe')('sk_test_51PjPbZLsME8qSugwpKhZP2BgYcjUpksqjTUQntIjaO1CXAcwpGAqBTKygXh6d5ZWlJCQV3O2u0Znld6ixTFWS4sI004x955S6X');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.get('/', async (req, res) => {
  res.redirect(303, `${YOUR_DOMAIN}/checkout.html`);
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    automatic_tax: {enabled: true},
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));