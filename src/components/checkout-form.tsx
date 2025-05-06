'use client';

import type { GenerateFengShuiArtOutput } from '@/ai/flows/generate-feng-shui-art';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ShoppingCart, CreditCard, Home } from 'lucide-react';

const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  postalCode: z.string().min(4, { message: 'Please enter a valid postal code.' }),
  country: z.string().min(2, { message: 'Please enter a valid country.' }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'Invalid card number (must be 16 digits).' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Invalid expiry date (MM/YY).' }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: 'Invalid CVV (3 or 4 digits).' }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isLoading: boolean;
  selectedArtwork: GenerateFengShuiArtOutput[0];
}

export function CheckoutForm({ onSubmit, isLoading, selectedArtwork }: CheckoutFormProps) {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Selected Artwork Summary */}
       <Card className="shadow-md">
           <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-primary"/> Order Summary</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
               <div className="aspect-video relative w-full rounded-md overflow-hidden">
                    <Image
                      src={selectedArtwork.image}
                      alt="Selected Feng Shui Artwork"
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint="feng shui painting"
                    />
                </div>
               <p className="text-sm text-muted-foreground">{selectedArtwork.description}</p>
               {/* Placeholder for price */}
               <p className="text-lg font-semibold text-right">Price: $299.00 USD</p>
               <p className="text-xs text-muted-foreground text-right">Includes custom painting & free shipping</p>
           </CardContent>
       </Card>

       {/* Checkout Form */}
       <Card className="shadow-md">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Home className="w-5 h-5 text-primary"/> Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="123 Harmony Lane" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Prosperity City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="United States" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
              </CardContent>

              <CardHeader className="pt-4">
                <CardTitle className="text-lg flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary"/> Payment Details</CardTitle>
                 <CardDescription>Your payment information is securely processed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="•••• •••• •••• ••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 <div className="grid grid-cols-2 gap-4">
                     <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry (MM/YY)</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
                  Place Order & Pay
                </Button>
              </CardFooter>
            </form>
        </Form>
       </Card>
    </div>
  );
}
