"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  // Placeholder for cart functionality
  const cartItems: any[] = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start shopping to add items to your cart
          </p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {/* Cart items will be rendered here */}
            </div>
          </div>

          {/* Cart summary */}
          <div>
            <div className="border rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">PKR 0</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-sm text-muted-foreground">
                    Calculated at checkout
                  </span>
                </div>
              </div>
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>PKR 0</span>
                </div>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
