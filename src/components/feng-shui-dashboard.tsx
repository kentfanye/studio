'use client'

import type { BaZi } from '@/services/ba-zi-converter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion'; // Import motion for animations
import { useEffect, useState } from 'react';
import { Leaf, Flame, Mountain, Gem, Waves } from 'lucide-react'; // Use appropriate icons
import { cn } from '@/lib/utils';

interface FengShuiDashboardProps {
  baZi: BaZi;
}

// Placeholder: In a real app, derive element strengths from BaZi
const getElementStrengths = (baZi: BaZi) => {
  // Simulate element strengths based on BaZi characters (replace with actual logic)
  // This is highly simplified for demonstration
  const elements = {
    Wood: Math.random() * 100,
    Fire: Math.random() * 100,
    Earth: Math.random() * 100,
    Metal: Math.random() * 100,
    Water: Math.random() * 100,
  };
  // Normalize values to sum to 100 (roughly) for progress bar display
  const total = Object.values(elements).reduce((sum, val) => sum + val, 0);
  const normalized = Object.fromEntries(
    Object.entries(elements).map(([key, val]) => [key, (val / total) * 100])
  );
  return normalized;
};

const elementIcons = {
  Wood: Leaf,
  Fire: Flame,
  Earth: Mountain,
  Metal: Gem,
  Water: Waves,
};

const elementColors = {
  Wood: 'bg-green-500',
  Fire: 'bg-red-500',
  Earth: 'bg-yellow-600',
  Metal: 'bg-gray-400',
  Water: 'bg-blue-500',
}


export function FengShuiDashboard({ baZi }: FengShuiDashboardProps) {
   const [elementData, setElementData] = useState<Record<string, number> | null>(null);

    // Use useEffect to avoid hydration errors with random data generation
    useEffect(() => {
        setElementData(getElementStrengths(baZi));
    }, [baZi]);


  if (!elementData) {
     return <div className="text-center p-8">Calculating your element balance...</div>;
  }

  const elements = Object.entries(elementData) as [keyof typeof elementIcons, number][];


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg overflow-hidden">
      <CardHeader className="items-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}>
         {/* Replace with a suitable dashboard icon if available */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0118.657 17.657 7.95 7.95 0 0117 19c-1 0-2-.5-3-1.5a8.14 8.14 0 01-2.657-2.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 14.121A3 3 0 1014.12 9.88" />
          </svg>
        </motion.div>
        <CardTitle>Your Elemental Balance</CardTitle>
        <CardDescription>Based on your Ba Zi, here's a representation of your five elements.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
         {elements.map(([name, strength], index) => {
           const IconComponent = elementIcons[name];
           return (
             <motion.div
                key={name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <IconComponent className={`h-6 w-6 text-${elementColors[name].split('-')[1]}-500 flex-shrink-0`} />
                <span className="w-16 font-medium capitalize flex-shrink-0">{name}</span>
                <div className="flex-grow bg-muted rounded-full h-3 overflow-hidden">
                    <motion.div
                        className={cn("h-full rounded-full", elementColors[name])}
                        initial={{ width: 0 }}
                        animate={{ width: `${strength}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    />
                 </div>
                 <span className="text-sm font-mono w-10 text-right">{strength.toFixed(0)}%</span>
             </motion.div>
           );
         })}
          <p className="text-center text-sm text-muted-foreground mt-6 pt-4 border-t">
            Understanding your elemental balance helps in selecting Feng Shui art that harmonizes your energy and boosts luck.
          </p>
      </CardContent>
    </Card>
  );
}
