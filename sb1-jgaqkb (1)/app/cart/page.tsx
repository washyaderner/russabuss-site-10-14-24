"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

// This would typically come from a state management solution like Redux or Zustand
const initialCartItems = [
  { id: 1, title: "Summer Vibes", bpm: 120, price: 49.99, licenseType: "MP3", name: "Beat 1" },
  { id: 2, title: "Midnight Groove", bpm: 95, price: 79.99, licenseType: "WAV", name: "Beat 2" },
  // Add more items as needed
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-slate-100 dark:bg-slate-800 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Hope you found what you were looking for! Make sure you've got the right license and file type you wanted. If you're looking for something specific, and nothing here quite fits right, let me know what you're going for, and we can pivot to a custom track. See the home page for details.
          </p>
          <p className="mb-4">
            Once you complete your purchase, you'll receive your files via email. For stems and exclusive tracks, I will follow up with you ASAP to help finalize your order and get you everything you need. Once you've recorded your tracks, reach out for mixing and mastering services for the best final result.
          </p>
          <p className="font-bold">
            Thank you for choosing Russ A Buss beats!!
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-100 dark:bg-slate-800">
        <CardContent>
          {cartItems.length === 0 ? (
            <p className="text-center py-4">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.name} | {item.bpm} BPM | {item.licenseType} License
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-4">${item.price.toFixed(2)}</span>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-6">Proceed to Checkout</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}