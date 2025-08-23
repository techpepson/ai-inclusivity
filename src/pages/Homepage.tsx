import { Link } from "react-router-dom";
import { ArrowRight, Users, Shield, Heart, Palette, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfessionalStats } from "@/components/ProfessionalStats";
import { TestimonialSection } from "@/components/TestimonialSection";
import heroImage from "@/assets/hero-ai-advocacy.jpg";
import disabilityImage from "@/assets/disability-tech-inclusion.jpg";
import womenImage from "@/assets/women-empowerment.jpg";
import mentalHealthImage from "@/assets/mental-health-support.jpg";
import lgbtqImage from "@/assets/lgbtq-community.jpg";

export default function Homepage() {
  const themes = [
    {
      title: "Persons with Disabilities",
      description: "Advocating for accessibility and inclusion of PwDs in Ghana",
      icon: Users,
      color: "bg-theme-disability",
      href: "/themes/disabilities",
      hashtags: ["#InclusionMatters", "#DisabilityRightsGH"],
      image: disabilityImage,
    },
    {
      title: "Violence Against Women",
      description: "Fighting gender-based violence through awareness and support",
      icon: Shield,
      color: "bg-theme-vaw",
      href: "/themes/vaw",
      hashtags: ["#EndVAW", "#StandWithWomen"],
      image: womenImage,
    },
    {
      title: "Mental Health & Wellness",
      description: "Breaking stigma and promoting mental wellness for all",
      icon: Heart,
      color: "bg-theme-mental",
      href: "/themes/mental-health",
      hashtags: ["#BreakTheStigma", "#MentalHealthAwareness"],
      image: mentalHealthImage,
    },
    {
      title: "LGBTQ+ Communities",
      description: "Supporting inclusion and rights for LGBTQ+ individuals",
      icon: Palette,
      color: "bg-theme-lgbtq",
      href: "/themes/lgbtq",
      hashtags: ["#LGBTQRights", "#LoveIsLove"],
      image: lgbtqImage,
    },
  ];

  const stats = [
    { label: "Active Campaigns", value: "24", icon: TrendingUp },
    { label: "Community Members", value: "15.2k", icon: Users },
    { label: "Tweets Analyzed", value: "450k", icon: BarChart3 },
    { label: "Organizations", value: "89", icon: Shield },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 lg:py-32 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI-powered advocacy for inclusive Ghana" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              AI-Powered Advocacy for
              <span className="block text-primary-glow">Inclusive Ghana</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Leveraging social media analytics to drive awareness and action for persons with disabilities, 
              VAW prevention, mental health, and LGBTQ+ rights in Ghana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Explore Analytics
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Stats */}
      <ProfessionalStats />

      {/* Themes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Four Focus Areas</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We monitor, analyze, and amplify conversations around these critical social issues in Ghana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {themes.map((theme, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={theme.image} 
                    alt={theme.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={`absolute top-4 left-4 p-3 rounded-lg ${theme.color}`}>
                    <theme.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{theme.title}</CardTitle>
                  <CardDescription>{theme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {theme.hashtags.map((hashtag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                    <Link to={theme.href}>
                      <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join our community of advocates, researchers, and changemakers working toward a more inclusive Ghana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Involved
              </Button>
            </Link>
            <Link to="/analytics">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}