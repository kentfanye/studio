
'use client';

import type { Birthdate, BaZi } from '@/services/ba-zi-converter';
import type { GenerateFengShuiArtOutput } from '@/ai/flows/generate-feng-shui-art';

import { useState } from 'react';
import { BirthdateForm } from '@/components/birthdate-form';
import { BaZiDisplay } from '@/components/ba-zi-display';
import { FengShuiDashboard } from '@/components/feng-shui-dashboard';
import { ArtworkRecommendations } from '@/components/artwork-recommendations';
import { CheckoutForm } from '@/components/checkout-form';
import { UserReviews } from '@/components/user-reviews';
import { convertBirthdateToBaZi } from '@/services/ba-zi-converter';
import { generateFengShuiArt } from '@/ai/flows/generate-feng-shui-art';
import { Button } from '@/components/ui/button';
import { Loader2, Palette } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

type Step = 'birthdate' | 'bazi' | 'dashboard' | 'recommendations' | 'checkout';

export default function Home() {
  const [birthdate, setBirthdate] = useState<Birthdate | null>(null);
  const [baZi, setBaZi] = useState<BaZi | null>(null);
  const [recommendations, setRecommendations] = useState<GenerateFengShuiArtOutput | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<GenerateFengShuiArtOutput[0] | null>(null);
  const [step, setStep] = useState<Step>('birthdate');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBirthdateSubmit = async (data: Birthdate) => {
    setIsLoading(true);
    setError(null);
    setBirthdate(data);
    try {
      const baZiResult = await convertBirthdateToBaZi(data);
      setBaZi(baZiResult);
      setStep('bazi'); // Move to BaZi display step
    } catch (err) {
      console.error('Error converting birthdate:', err);
      setError('Failed to convert birthdate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowDashboard = () => {
    setStep('dashboard'); // Move to Dashboard display step
  };

  const handleGenerateArt = async () => {
    if (!baZi) return;
    setIsLoading(true);
    setError(null);
    try {
      const artResult = await generateFengShuiArt(baZi);
      setRecommendations(artResult);
      setStep('recommendations'); // Move to Recommendations display step
    } catch (err) {
      // IMPORTANT: Check Vercel function logs for the detailed error message output by console.error below.
      // This will provide more specific information than the generic message shown to the user.
      // Common causes include missing API keys in Vercel environment variables, API quota issues, or model access problems.
      console.error('Error generating Feng Shui art:', err);
      setError('Failed to generate artwork recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectArtwork = (artwork: GenerateFengShuiArtOutput[0]) => {
    setSelectedArtwork(artwork);
    setStep('checkout'); // Move to Checkout step
  };

  const handleCheckoutSubmit = (checkoutData: any) => {
    setIsLoading(true);
    setError(null);
    console.log('Checkout Data:', checkoutData, 'Selected Artwork:', selectedArtwork);
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      alert('Order placed successfully! Your Feng Shui masterpiece is on its way.');
      // Reset state or redirect to a success page
      setStep('birthdate');
      setBirthdate(null);
      setBaZi(null);
      setRecommendations(null);
      setSelectedArtwork(null);
    }, 2000);
  };

  const handleBack = () => {
    setError(null);
    if (step === 'checkout') setStep('recommendations');
    else if (step === 'recommendations') setStep('dashboard');
    else if (step === 'dashboard') setStep('bazi');
    else if (step === 'bazi') setStep('birthdate');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {step === 'birthdate' && (
            <>
              <h1 className="text-3xl font-bold text-center mb-6">Unlock Your Luck with Personalized Feng Shui Art</h1>
              <p className="text-center text-lg mb-8 text-muted-foreground">Enter your birth details to discover the art that aligns with your energy.</p>
              <BirthdateForm onSubmit={handleBirthdateSubmit} isLoading={isLoading} />
            </>
          )}

          {step === 'bazi' && baZi && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-6">Your Ba Zi (Eight Characters)</h2>
              <BaZiDisplay baZi={baZi} />
              <div className="flex justify-center mt-8 space-x-4">
                <Button variant="outline" onClick={handleBack} disabled={isLoading}>Back</Button>
                <Button onClick={handleShowDashboard} disabled={isLoading}>
                  View Your Feng Shui Dashboard
                </Button>
              </div>
            </>
          )}

          {step === 'dashboard' && baZi && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-6">Your Feng Shui Elements Dashboard</h2>
              <FengShuiDashboard baZi={baZi} />
              <div className="flex justify-center mt-8 space-x-4">
                <Button variant="outline" onClick={handleBack} disabled={isLoading}>Back</Button>
                <Button onClick={handleGenerateArt} disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Palette className="mr-2 h-4 w-4" />}
                  Generate Artwork Recommendations
                </Button>
              </div>
            </>
          )}

          {step === 'recommendations' && recommendations && (
            <>
               <h2 className="text-2xl font-semibold text-center mb-6">AI-Powered Feng Shui Art Recommendations</h2>
              <p className="text-center text-muted-foreground mb-8">Our AI Feng Shui Master has generated these options based on your Ba Zi to enhance your luck.</p>
              <ArtworkRecommendations
                recommendations={recommendations}
                onSelectArtwork={handleSelectArtwork}
              />
              <div className="flex justify-center mt-8">
                 <Button variant="outline" onClick={handleBack} disabled={isLoading}>Back</Button>
              </div>
            </>
          )}

          {step === 'checkout' && selectedArtwork && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-6">Complete Your Order</h2>
              <p className="text-center text-muted-foreground mb-8">Enter your shipping details and payment information to receive your custom Feng Shui painting.</p>
              <CheckoutForm onSubmit={handleCheckoutSubmit} isLoading={isLoading} selectedArtwork={selectedArtwork} />
              <div className="flex justify-center mt-8">
                <Button variant="outline" onClick={handleBack} disabled={isLoading}>Back</Button>
              </div>
            </>
          )}

          {error && <p className="text-destructive text-center mt-4">{error}</p>}

           {/* User Reviews Section - Always visible at the bottom on the first step */}
           {step === 'birthdate' && (
            <div className="mt-16">
              <UserReviews />
            </div>
           )}
        </div>
      </main>
     <Footer />
    </div>
  );
}
