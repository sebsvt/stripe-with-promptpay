from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import stripe

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stripe.api_key = ""


@app.get("/config")
def config():
	return {
		"key": "key"
	}

@app.post('/create-payment-intent')
def secret():
	intent= stripe.PaymentIntent.create(
		amount=1099,
		currency="thb",
		automatic_payment_methods={"enabled": True},
	)
	print(intent)
	return {
		"client_secret": intent.client_secret
	}

