/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Users,
  Shield,
  Heart,
  Palette,
  BarChart3,
  Target,
  Sparkles,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import heroImage from "@/assets/hero-ai-advocacy.jpg";
import disabilityImage from "@/assets/disability-tech-inclusion.jpg";
import womenImage from "@/assets/women-empowerment.jpg";
import mentalHealthImage from "@/assets/mental-health-support.jpg";
import lgbtqImage from "@/assets/lgbtq-community.jpg";
import flyer1 from "@/assets/flyer_1.jpeg";
import flyer2 from "@/assets/flyer_2.jpeg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  fetchFocusAreas as fetchFocusAreasFromApi,
  fetchHeroContent,
  fetchEvents,
  sendContactMessage,
} from "@/lib/api-client";
import type { FocusArea, HeroContent, Event } from "@/lib/types";
import { logo } from "@/images/images";
import { SiteFooter } from "@/components/SiteFooter";

const DEFAULT_HERO: HeroContent = {
  title: "Amplifying Voices for an Inclusive Ghana",
  subTitle:
    "Using AI and social media analytics to track advocacy trends and drive policy change for marginalized communities.",
  primaryButtonText: "Explore Analytics",
  secondaryButtonText: "Join Conversation",
};

const PLATFORM_FEATURES = [
  {
    title: "AI-Powered Analytics",
    description:
      "Real-time sentiment analysis and trend detection across social media platforms.",
    icon: BarChart3,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Campaigns",
    description:
      "Join data-driven advocacy campaigns making real impact across Ghana.",
    icon: Target,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    title: "Community Network",
    description:
      "Connect with 12,500+ advocates and organizations working for change.",
    icon: Users,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-500",
  },
];

const DEFAULT_FOCUS_AREAS = [
  {
    label: "Persons with Disabilities",
    hashtag: "#InclusionMatters",
    hashtagColor: "text-blue-500",
    bgColor: "bg-blue-50",
    icon: Users,
    href: "/themes/disabilities",
    image: disabilityImage,
  },
  {
    label: "Violence Against Women",
    hashtag: "#EndVAW",
    hashtagColor: "text-red-500",
    bgColor: "bg-red-50",
    icon: Shield,
    href: "/themes/vaw",
    image: womenImage,
  },
  {
    label: "Mental Health",
    hashtag: "#BreakTheStigma",
    hashtagColor: "text-teal-500",
    bgColor: "bg-teal-50",
    icon: Heart,
    href: "/themes/mental-health",
    image: mentalHealthImage,
  },
  {
    label: "Sexual and Gender Minority Community",
    hashtag: "#SGMCRights",
    hashtagColor: "text-orange-500",
    bgColor: "bg-orange-50",
    icon: Palette,
    href: "/themes/lgbtq",
    image: lgbtqImage,
  },
];

const FOOTER_LINKS = [
  { name: "About Us", href: "/about" },
  { name: "Themes", href: "/themes" },
  { name: "Analytics", href: "/analytics" },
  { name: "Campaigns", href: "/get-involved" },
  { name: "Events", href: "/events" },
  { name: "Community", href: "/community" },
];

export default function Homepage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: heroContent } = useQuery({
    queryKey: ["hero-content"],
    queryFn: () => fetchHeroContent(DEFAULT_HERO),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Use API data if available, otherwise use defaults
  const hero = heroContent ?? DEFAULT_HERO;

  // Fetch events to get images for the slider
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Get images from the most current event (sorted by date descending)
  const sliderImages = (() => {
    if (!events || events.length === 0) {
      return [flyer1, flyer2]; // fallback to default flyers
    }
    // Sort events by date descending (most recent first)
    const sortedEvents = [...events].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const mostRecentEvent = sortedEvents[0];
    if (mostRecentEvent.images && mostRecentEvent.images.length > 0) {
      return mostRecentEvent.images;
    }
    return [flyer1, flyer2]; // fallback if no images
  })();

  const [focusAreas, setFocusAreas] = useState(DEFAULT_FOCUS_AREAS);

  // Join Community dialog state
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinFormData, setJoinFormData] = useState({
    name: "",
    email: "",
    phone: "",
    complement: "",
    displayUserName: false,
  });
  const [joinFormLoading, setJoinFormLoading] = useState(false);
  const [joinFormSuccess, setJoinFormSuccess] = useState(false);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinFormLoading(true);

    try {
      await sendContactMessage({
        name: joinFormData.name,
        email: joinFormData.email,
        phone: joinFormData.phone || null,
        subject: "Add Testimony Submission",
        message: `Complement: ${joinFormData.complement || "Not provided"}\nDisplay user name: ${joinFormData.displayUserName ? "Yes" : "No"}`,
      });
      setJoinFormSuccess(true);
      setJoinFormData({
        name: "",
        email: "",
        phone: "",
        complement: "",
        displayUserName: false,
      });
      setTimeout(() => {
        setJoinDialogOpen(false);
        setJoinFormSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to submit join request:", error);
    } finally {
      setJoinFormLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("addTestimony") === "true") {
      setJoinDialogOpen(true);
      searchParams.delete("addTestimony");

      navigate(
        {
          pathname: location.pathname,
          search: searchParams.toString() ? `?${searchParams.toString()}` : "",
        },
        { replace: true },
      );
    }
  }, [location.pathname, location.search, navigate]);

  useEffect(() => {
    let mounted = true;

    async function fetchFocusAreas() {
      const rows: FocusArea[] = await fetchFocusAreasFromApi();
      if (!Array.isArray(rows) || rows.length === 0) return;

      const validated: typeof DEFAULT_FOCUS_AREAS = [];

      for (const row of rows) {
        const label = typeof row.title === "string" ? row.title.trim() : "";
        if (!label) continue;

        const hashtag =
          typeof row.hashTag === "string" && row.hashTag.trim()
            ? row.hashTag.trim()
            : "";
        const imageRaw =
          Array.isArray(row.images) && typeof row.images[0] === "string"
            ? row.images[0].trim()
            : "";

        const lLower = label.toLowerCase();
        let icon = Users;
        let bgColor = "bg-blue-50";
        let hashtagColor = "text-blue-500";
        let fallbackHref = "/themes";
        let defaultImage = heroImage;

        if (lLower.includes("disabil")) {
          icon = Users;
          bgColor = "bg-blue-50";
          hashtagColor = "text-blue-500";
          fallbackHref = "/themes/disabilities";
          defaultImage = disabilityImage;
        } else if (
          lLower.includes("violence") ||
          lLower.includes("vaw") ||
          lLower.includes("women")
        ) {
          icon = Shield;
          bgColor = "bg-red-50";
          hashtagColor = "text-red-500";
          fallbackHref = "/themes/vaw";
          defaultImage = womenImage;
        } else if (lLower.includes("mental")) {
          icon = Heart;
          bgColor = "bg-teal-50";
          hashtagColor = "text-teal-500";
          fallbackHref = "/themes/mental-health";
          defaultImage = mentalHealthImage;
        } else if (lLower.includes("lgbt")) {
          icon = Palette;
          bgColor = "bg-orange-50";
          hashtagColor = "text-orange-500";
          fallbackHref = "/themes/lgbtq";
          defaultImage = lgbtqImage;
        }

        const href = row.id
          ? `/focus/${encodeURIComponent(row.id)}`
          : fallbackHref;
        const image = imageRaw || defaultImage;

        validated.push({
          label,
          hashtag,
          hashtagColor,
          bgColor,
          icon,
          href,
          image,
        } as any);
      }

      if (validated.length > 0 && mounted) setFocusAreas(validated);
    }

    fetchFocusAreas();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="AI-powered dashboard for inclusive Ghana"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/65"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in-down">
                <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                <span className="text-sm font-medium">
                  AI-Powered Dashboard for Ghana
                </span>
              </div>

              {/* Main Heading */}
              <h1
                className="text-4xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight animate-slide-in-left"
                style={{ animationDelay: "0.1s" }}
              >
                {hero.title}
              </h1>

              {/* Description */}
              <p
                className="text-lg lg:text-xl text-white/90 mb-8 max-w-xl animate-fade-in-up opacity-0"
                style={{ animationDelay: "0.3s" }}
              >
                {hero.subTitle}
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0"
                style={{ animationDelay: "0.5s" }}
              >
                <Link to="/analytics">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white text-primary hover:bg-white/90 border-white text-lg px-8 hover:scale-105 transition-transform duration-300"
                  >
                    {hero.primaryButtonText}
                  </Button>
                </Link>
                <Button
                  size="lg"
                  onClick={() => setJoinDialogOpen(true)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 text-lg px-8 hover:scale-105 transition-transform duration-300"
                >
                  {hero.secondaryButtonText}
                </Button>
              </div>
            </div>

            {/* Right Side - Flyer Slider */}
            <div
              className="animate-scale-in opacity-0 order-first lg:order-last"
              style={{ animationDelay: "0.3s" }}
            >
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                className="w-full max-w-md mx-auto lg:max-w-none"
              >
                <CarouselContent>
                  {sliderImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <img
                          src={image}
                          alt={`Event image ${index + 1}`}
                          className="w-full h-auto rounded-xl shadow-2xl"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Platform <span className="text-primary">Features</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for data-driven dashboard and social change
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PLATFORM_FEATURES.map((feature, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 text-center group"
              >
                <CardContent className="pt-8 pb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Focus <span className="text-primary">Areas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We focus on four critical social impact areas across Ghana
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area, index) => (
              <Link key={index} to={area.href} className="group">
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent
                    className={`p-5 ${area.bgColor} transition-colors duration-300`}
                  >
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {area.label}
                    </h3>
                    <span
                      className={`text-sm font-medium ${area.hashtagColor}`}
                    >
                      {area.hashtag}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/themes">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 hover:scale-105 transition-transform duration-300 group"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-20 h-20 bg-white rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-10 right-1/3 w-16 h-16 bg-white rounded-full animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join our community of advocates and help shape a more inclusive
            future for Ghana through data-driven dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setJoinDialogOpen(true)}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 hover:scale-105 transition-transform duration-300"
            >
              Join Conversation
            </Button>
            <Link to="/get-involved">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white bg-white/10 hover:bg-white/20 text-lg px-8 hover:scale-105 transition-transform duration-300"
              >
                Explore Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />

      {/* Join Community Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Testimony</DialogTitle>
            <DialogDescription>
              Share your testimony to support inclusive advocacy in Ghana.
            </DialogDescription>
          </DialogHeader>
          {joinFormSuccess ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Request Submitted!</h3>
              <p className="text-muted-foreground">
                Your testimony has been submitted successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name *</label>
                <Input
                  required
                  value={joinFormData.name}
                  onChange={(e) =>
                    setJoinFormData({ ...joinFormData, name: e.target.value })
                  }
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email (Optional)</label>
                <Input
                  type="email"
                  value={joinFormData.email}
                  onChange={(e) =>
                    setJoinFormData({ ...joinFormData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone (Optional)</label>
                <Input
                  value={joinFormData.phone}
                  onChange={(e) =>
                    setJoinFormData({ ...joinFormData, phone: e.target.value })
                  }
                  placeholder="+233 XX XXX XXXX"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Add your complement (Optional)
                </label>
                <Textarea
                  value={joinFormData.complement}
                  onChange={(e) =>
                    setJoinFormData({
                      ...joinFormData,
                      complement: e.target.value,
                    })
                  }
                  placeholder="Write your complement or testimony"
                  rows={4}
                />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border p-3">
                <label
                  className="text-sm font-medium"
                  htmlFor="display-user-name"
                >
                  Option to display user name
                </label>
                <input
                  id="display-user-name"
                  type="checkbox"
                  checked={joinFormData.displayUserName}
                  onChange={(e) =>
                    setJoinFormData({
                      ...joinFormData,
                      displayUserName: e.target.checked,
                    })
                  }
                  className="h-4 w-4"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={joinFormLoading}
              >
                {joinFormLoading ? "Submitting..." : "Submit Testimony"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
