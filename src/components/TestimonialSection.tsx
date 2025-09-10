import { Quote, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "AI4InclusiveGh has revolutionized how we track and measure advocacy impact. Their analytics help us reach the right audiences with the right message.",
    author: "Johnson Acquah",
    role: "Director, Ghana Disability Rights Coalition",
    organization: "Policy Advocacy",
  },
  {
    quote:
      "The social media insights provided by this platform have been invaluable in shaping our mental health awareness campaigns across Ghana.",
    author: "Kwame Adu",
    role: "Program Manager",
    organization: "Mental Health Ghana",
  },
  {
    quote:
      "Working with AI4InclusiveGh has amplified our voice in fighting gender-based violence. Their data helps us understand and address the real issues.",
    author: "Emmanuel Arthur",
    role: "Executive Director",
    organization: "Women's Rights Coalition",
  },
];

export function TestimonialSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how advocacy organizations across Ghana are using our platform
            to drive meaningful change.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 bg-white shadow-professional hover:shadow-elegant transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-1">
                    <Quote className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground italic leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 pt-4 border-t">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {testimonial.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-primary">
                        {testimonial.organization}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
