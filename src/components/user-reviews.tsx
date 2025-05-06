import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, StarHalf } from 'lucide-react'; // Using stars for rating display

const reviews = [
  {
    name: 'Sarah K.',
    avatar: 'https://picsum.photos/id/237/40/40',
    rating: 5,
    review: "I was skeptical, but after hanging my custom Feng Shui painting, things really started looking up! My career took off, and I feel so much more positive energy in my home.",
    hint: "woman portrait"
  },
  {
    name: 'Michael P.',
    avatar: 'https://picsum.photos/id/238/40/40',
    rating: 4.5,
    review: "The whole process was fascinating, from getting my Ba Zi chart to seeing the artwork recommendations. The painting looks beautiful in my office, and I've definitely noticed a shift in luck.",
    hint: "man portrait"
  },
  {
    name: 'Emily T.',
    avatar: 'https://picsum.photos/id/239/40/40',
    rating: 5,
    review: "Amazing! The AI-generated art options were spot on for what I needed according to my elements. My chosen painting arrived quickly and is absolutely stunning. Highly recommend!",
    hint: "woman smiling"
  },
];

const Rating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-primary">
      {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 fill-current" />)}
      {halfStar && <StarHalf key="half" className="w-4 h-4 fill-current" />}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/50" />)}
    </div>
  );
};


export function UserReviews() {
  return (
    <section className="w-full py-12 bg-secondary/40 rounded-lg">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 md:mb-12">
          Hear From Our Happy Clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <Avatar>
                  <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.hint} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                   <CardTitle className="text-base font-semibold">{review.name}</CardTitle>
                   <Rating rating={review.rating} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">"{review.review}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
