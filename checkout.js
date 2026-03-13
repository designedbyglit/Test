const stripe = Stripe("TA_CLE_STRIPE");

async function checkout(){

const response = await fetch("/create-checkout-session", {
method: "POST"
})

const session = await response.json()

stripe.redirectToCheckout({ sessionId: session.id })

}
