import { Injectable } from '@angular/core';
import { Stripe } from '@stripe/stripe-js';
import {loadStripe} from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeServiceCustomService {

  private stripe: Stripe | null = null;

  constructor() {
    // Load Stripe asynchronously
    this.initializeStripe();
  }

  private async initializeStripe(): Promise<void> {
    const stripe = await loadStripe('pk_test_51O1boKAHfZleTlSefhQnJ1560TcCFfAvM6FcjLWFiLJSp0JTrbU5Te0xoQ7VvjvMV6AJtxsCZaHdYj6rurxK9K0D00TxrE9Az3');
    this.stripe = stripe;
    return Promise.resolve(); // Add this line to return a resolved promise
  }

  // Method to create a Checkout session
  async createCheckoutSession(no_civique: number, rue: String, villeID: number): Promise<string> {
    const response = await fetch('https://localhost:7247/Commandes/CheckoutPanier', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        no_civique,
        rue,
        villeID
      }),
    });

    const session = await response.json();
    return session.id;
  }
  // Method to redirect to Stripe Checkout
  async redirectToCheckout(sessionId: string): Promise<void> {
    if (this.stripe) {
      const result = await this.stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        console.error('Error redirecting to Checkout:', result.error);
      }
    } else {
      console.error('Stripe has not been initialized.');
    }
  }

}
