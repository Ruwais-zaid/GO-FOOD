const express = require('express');
const stripe = require('stripe')('sk_test_51PWC9M2LziqgFmouOQ1MNN2yrXWF1BJkDIyocEQ3WojOCD2anag3fiN4w1e4sSoxO632MY80ixz4HPX5yoyNOSdh00uhLN44ll');

const app = express.Router();
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/create-checkout', async (req, res) => {
    try {
        const  product  = req.body;
        const lineItems = product.products.map((prod)=>({
            price_data: {
                currency: "inr",
                product_data: {
                    name: prod.name,
                },
                unit_amount: prod.price * 100, // Amount should be in the smallest currency unit (e.g., cents for USD)
            },
            quantity: prod.qty ,
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items:lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;
