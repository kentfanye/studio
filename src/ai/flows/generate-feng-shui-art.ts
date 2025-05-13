
'use server';
/**
 * @fileOverview This file defines a Genkit flow to generate Feng Shui art options based on a user's Ba Zi.
 * It first generates textual descriptions and image prompts, then uses these prompts to generate images.
 *
 * - generateFengShuiArt - A function that takes a Ba Zi chart as input and returns three Feng Shui painting options with images.
 * - GenerateFengShuiArtInput - The input type for the generateFengShuiArt function, based on the BaZi type.
 * - GenerateFengShuiArtOutput - The output type for the generateFengShuiArt function, which is an array of three painting options with descriptions and image data URIs.
 */

import {ai} from '@/ai/genkit';
import type { BaZi } from '@/services/ba-zi-converter'; // Ensure BaZi type is imported if it's used directly; here it's part of GenerateFengShuiArtInput
import {z} from 'genkit';

// Input schema for the Ba Zi chart
const GenerateFengShuiArtInputSchema = z.object({
  year: z.string().describe('The year pillar of the Ba Zi chart.'),
  month: z.string().describe('The month pillar of the Ba Zi chart.'),
  day: z.string().describe('The day pillar of the Ba Zi chart.'),
  hour: z.string().describe('The hour pillar of the Ba Zi chart.'),
});
export type GenerateFengShuiArtInput = z.infer<typeof GenerateFengShuiArtInputSchema>;

// Intermediate schema for the output of the text generation prompt
const FengShuiArtOptionWithImagePromptSchema = z.object({
  description: z.string().describe('The detailed description of the Feng Shui art and its specific benefits related to the Ba Zi chart.'),
  imagePrompt: z.string().describe('A rich, descriptive textual prompt suitable for an image generation AI to create the Feng Shui art. This prompt should focus on visual elements, artistic style (e.g., oil painting, watercolor, abstract), colors, composition, mood, and any symbolic elements relevant to Feng Shui. For example: "A vibrant oil painting of a serene mountain landscape at dawn, with flowing water in the foreground symbolizing wealth, and a rising sun representing new beginnings. The color palette should be warm, featuring oranges, yellows, and soft greens. Include elements of auspicious birds like cranes."'),
});

const GenerateFengShuiArtTextualOutputSchema = z.array(FengShuiArtOptionWithImagePromptSchema).length(3).describe('Three Feng Shui painting options, each with a description and a detailed image generation prompt.');

// Final output schema for the flow, including the generated image data URI
const FengShuiArtOptionSchema = z.object({
  description: z.string().describe('The description of the Feng Shui art and its benefits.'),
  image: z.string().describe('Generated image of the Feng Shui art. Data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
});

const GenerateFengShuiArtOutputSchema = z.array(FengShuiArtOptionSchema).length(3).describe('Three Feng Shui painting options with descriptions and generated images.');
export type GenerateFengShuiArtOutput = z.infer<typeof GenerateFengShuiArtOutputSchema>;


// Prompt to generate art ideas (descriptions and image prompts)
const generateArtIdeasPrompt = ai.definePrompt({
  name: 'generateFengShuiArtIdeasPrompt',
  input: {schema: GenerateFengShuiArtInputSchema},
  output: {schema: GenerateFengShuiArtTextualOutputSchema},
  prompt: `You are an AI Feng Shui Master. Based on the following Ba Zi (Four Pillars of Destiny) chart, generate three distinct Feng Shui painting options designed to improve the user's luck and harmonize their energy.

Ba Zi Chart:
Year: {{{year}}}
Month: {{{month}}}
Day: {{{day}}}
Hour: {{{hour}}}

For each of the three painting options, provide:
1.  A 'description': A detailed explanation of the painting's symbolism, how its elements (colors, subjects, composition) relate to Feng Shui principles, and how it specifically benefits the user based on their Ba Zi chart.
2.  An 'imagePrompt': A rich, highly descriptive textual prompt suitable for an advanced AI image generation model (like DALL-E or Midjourney). This prompt should be detailed enough to create a visually compelling and accurate representation of the described Feng Shui art. Include specifics about artistic style (e.g., "impressionistic oil painting," "traditional Chinese ink wash," "modern abstract"), dominant colors, key subjects (e.g., "majestic mountains," "tranquil waterfall," "phoenix rising"), mood (e.g., "serene and calming," "vibrant and energetic"), and composition.

Ensure each painting option offers a unique Feng Shui approach and visual style.

Output in JSON format:
{{$jsonOutput}}`,
  config: { // Default model (gemini-2.0-flash) is fine for text generation
    safetySettings: [ // Basic safety for text prompts
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
    ]
  }
});

// Main flow definition
const generateFengShuiArtFlow = ai.defineFlow(
  {
    name: 'generateFengShuiArtFlow',
    inputSchema: GenerateFengShuiArtInputSchema,
    outputSchema: GenerateFengShuiArtOutputSchema,
  },
  async (baziInput) => {
    // Step 1: Generate textual descriptions and image prompts
    const { output: textualIdeas } = await generateArtIdeasPrompt(baziInput);

    if (!textualIdeas || textualIdeas.length !== 3) {
      console.error('Failed to generate the required number of art ideas. Received:', textualIdeas);
      throw new Error('Failed to generate the required number of art ideas. The AI did not return three options.');
    }

    // Step 2: Generate images for each idea in parallel
    const artWithOptions: GenerateFengShuiArtOutput = await Promise.all(
      textualIdeas.map(async (idea, index) => {
        try {
          const { media } = await ai.generate({
            model: 'googleai/gemini-2.0-flash-exp', // Specific model for image generation
            prompt: idea.imagePrompt,
            config: {
              responseModalities: ['TEXT', 'IMAGE'], // Must provide both for image generation
              safetySettings: [ // Stricter safety for image generation
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE'},
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
              ],
              // You might need to experiment with other parameters like numOutput (if supported and needed)
            },
          });

          if (!media || !media.url) {
            console.warn(`Image generation failed for prompt: "${idea.imagePrompt}". Using placeholder.`);
            return {
              description: idea.description,
              // Using a placeholder from picsum.photos
              image: `https://picsum.photos/seed/${encodeURIComponent(idea.imagePrompt.substring(0, 15)) + index}/400/300`,
            };
          }

          return {
            description: idea.description,
            image: media.url, // This will be the data URI, e.g., "data:image/png;base64,..."
          };
        } catch (error) {
          console.error(`Error generating image for prompt "${idea.imagePrompt}":`, error);
          // Fallback to a placeholder image in case of an error
          return {
            description: idea.description,
            image: `https://picsum.photos/seed/error${index}${Math.random()}/400/300`,
          };
        }
      })
    );

    return artWithOptions;
  }
);

// Exported wrapper function to call the flow
export async function generateFengShuiArt(input: GenerateFengShuiArtInput): Promise<GenerateFengShuiArtOutput> {
  return generateFengShuiArtFlow(input);
}
