import type { BaZi } from '@/services/ba-zi-converter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';

interface BaZiDisplayProps {
  baZi: BaZi;
}

const PillarCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="text-center bg-secondary/50">
    <CardHeader className="pb-2 pt-4">
      <CardDescription>{title}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-semibold text-primary">{value}</p>
    </CardContent>
  </Card>
);

export function BaZiDisplay({ baZi }: BaZiDisplayProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="items-center">
         <ScrollText className="h-8 w-8 text-primary mb-2"/>
        <CardTitle>Your Ba Zi Pillars</CardTitle>
        <CardDescription>These characters represent the core energies at your time of birth.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PillarCard title="Year Pillar" value={baZi.year} />
        <PillarCard title="Month Pillar" value={baZi.month} />
        <PillarCard title="Day Pillar" value={baZi.day} />
        <PillarCard title="Hour Pillar" value={baZi.hour} />
      </CardContent>
    </Card>
  );
}
