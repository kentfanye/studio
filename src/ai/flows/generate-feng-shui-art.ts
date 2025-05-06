'use server';
/**
 * @fileOverview This file defines a Genkit flow to generate Feng Shui art options based on a user's Ba Zi.
 *
 * - generateFengShuiArt - A function that takes a Ba Zi chart as input and returns three Feng Shui painting options.
 * - GenerateFengShuiArtInput - The input type for the generateFengShuiArt function, based on the BaZi type.
 * - GenerateFengShuiArtOutput - The output type for the generateFengShuiArt function, which is an array of three painting options with descriptions.
 */

import {ai} from '@/ai/genkit';
import {BaZi} from '@/services/ba-zi-converter';
import {z} from 'genkit';

const GenerateFengShuiArtInputSchema = z.object({
  year: z.string().describe('The year pillar of the Ba Zi chart.'),
  month: z.string().describe('The month pillar of the Ba Zi chart.'),
  day: z.string().describe('The day pillar of the Ba Zi chart.'),
  hour: z.string().describe('The hour pillar of the Ba Zi chart.'),
});
export type GenerateFengShuiArtInput = z.infer<typeof GenerateFengShuiArtInputSchema>;

const FengShuiArtOptionSchema = z.object({
  description: z.string().describe('The description of the Feng Shui art and its benefits.'),
  image: z.string().describe('Generated image of the Feng Shui art. Data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
});

const GenerateFengShuiArtOutputSchema = z.array(FengShuiArtOptionSchema).length(3).describe('Three Feng Shui painting options.');

export type GenerateFengShuiArtOutput = z.infer<typeof GenerateFengShuiArtOutputSchema>;

export async function generateFengShuiArt(input: GenerateFengShuiArtInput): Promise<GenerateFengShuiArtOutput> {
  return generateFengShuiArtFlow(input);
}

const generateFengShuiArtPrompt = ai.definePrompt({
  name: 'generateFengShuiArtPrompt',
  input: {schema: GenerateFengShuiArtInputSchema},
  output: {schema: GenerateFengShuiArtOutputSchema},
  prompt: `Based on the following Ba Zi chart, generate three different Feng Shui painting options that would improve the user's luck. Provide a description of each painting and why it is beneficial, and generate an image of each.

Ba Zi Chart:
Year: {{{year}}}
Month: {{{month}}}
Day: {{{day}}}
Hour: {{{hour}}}

Ensure that the image data URIs are valid and properly formatted. Each painting should represent different approach to improving luck.

Output in JSON format:
{{$jsonOutput}}`,
});

const generateFengShuiArtFlow = ai.defineFlow(
  {
    name: 'generateFengShuiArtFlow',
    inputSchema: GenerateFengShuiArtInputSchema,
    outputSchema: GenerateFengShuiArtOutputSchema,
  },
  async input => {
    const {output} = await generateFengShuiArtPrompt(input);
    return output!;
  }
);

