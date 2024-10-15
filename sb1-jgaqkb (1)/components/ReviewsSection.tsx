import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    content: "Working with Russ was an incredible experience. His attention to detail and creative input took our project to the next level.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    content: "Russ has an amazing ear for music. He helped us achieve a sound we didn't even know was possible. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Mike Johnson",
    content: "Professional, punctual, and passionate about his work. Russ delivered beyond our expectations.",
    rating: 5,
  },
];

const ReviewsSection = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-center">What Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-white dark:bg-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-2">{review.content}</p>
              <p className="font-semibold">- {review.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;