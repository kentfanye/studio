import type { GenerateFengShuiArtOutput } from '@/ai/flows/generate-feng-shui-art';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, CheckCircle } from 'lucide-react';

interface ArtworkRecommendationsProps {
  recommendations: GenerateFengShuiArtOutput;
  onSelectArtwork: (artwork: GenerateFengShuiArtOutput[0]) => void;
}

export function ArtworkRecommendations({ recommendations, onSelectArtwork }: ArtworkRecommendationsProps) {
  return (
    <div className="space-y-8">
       <Card className="bg-secondary/30 border-primary border-dashed">
          <CardHeader>
             <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
               <Palette className="w-5 h-5 text-primary"/> Your Personalized Art Options
             </CardTitle>
          </CardHeader>
       </Card>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {recommendations.map((artwork, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="aspect-video relative w-full">
                    <Image
                      src={artwork.image}
                      alt={`Feng Shui Art Recommendation ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint="feng shui painting" // Add AI hint for potential image replacement
                    />
                  </div>
               </CardHeader>
               <CardContent className="flex-grow p-4">
                   <CardDescription className="text-sm">{artwork.description}</CardDescription>
               </CardContent>
               <CardFooter className="p-4 pt-0">
                   <Button className="w-full" onClick={() => onSelectArtwork(artwork)}>
                      <CheckCircle className="mr-2 h-4 w-4" /> Select This Artwork
                   </Button>
               </CardFooter>
            </Card>
         ))}
       </div>
    </div>
  );
}
