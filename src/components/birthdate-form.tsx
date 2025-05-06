'use client';

import type { Birthdate } from '@/services/ba-zi-converter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Calendar } from 'lucide-react';

const currentYear = new Date().getFullYear();

const birthdateSchema = z.object({
  year: z.coerce.number().int().min(1900, "Year must be 1900 or later.").max(currentYear, `Year cannot be in the future.`),
  month: z.coerce.number().int().min(1).max(12),
  day: z.coerce.number().int().min(1).max(31),
  hour: z.coerce.number().int().min(0).max(23), // 24-hour format
});

interface BirthdateFormProps {
  onSubmit: (data: Birthdate) => void;
  isLoading: boolean;
}

export function BirthdateForm({ onSubmit, isLoading }: BirthdateFormProps) {
  const form = useForm<Birthdate>({
    resolver: zodResolver(birthdateSchema),
    defaultValues: {
      year: undefined,
      month: undefined,
      day: undefined,
      hour: undefined,
    },
  });

  const daysInMonth = (year: number | undefined, month: number | undefined) => {
    if (year === undefined || month === undefined) return 31;
    return new Date(year, month, 0).getDate();
  };

  const watchedYear = form.watch('year');
  const watchedMonth = form.watch('month');
  const maxDays = daysInMonth(watchedYear, watchedMonth);

  // Update day validation dynamically
  const dynamicBirthdateSchema = birthdateSchema.refine(
    (data) => data.day <= daysInMonth(data.year, data.month),
    {
      message: 'Invalid day for the selected month and year.',
      path: ['day'],
    }
  );

  form.register('day', { max: maxDays }); // Re-register with updated max constraint


  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
       <CardHeader>
        <CardTitle className="flex items-center justify-center text-xl">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
           Enter Your Birth Details
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
         <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="YYYY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                     <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()} disabled={!watchedMonth || !watchedYear}>
                       <FormControl>
                         <SelectTrigger>
                           <SelectValue placeholder="Select Day" />
                         </SelectTrigger>
                       </FormControl>
                       <SelectContent>
                         {Array.from({ length: maxDays }, (_, i) => (
                           <SelectItem key={i + 1} value={(i + 1).toString()}>
                             {(i + 1).toString()}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="hour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hour (24-hour format)</FormLabel>
                   <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Hour" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i.toString().padStart(2, '0')}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate Ba Zi'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
