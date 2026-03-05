/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
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
  Phone,
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
  sendContactMessage,
} from "@/lib/api-client";
import type { FocusArea, HeroContent } from "@/lib/types";
import { logo } from "@/images/images";

const DEFAULT_HERO: HeroContent = {
  title: "Amplifying Voices for Inclusive Ghana",
  subTitle:
    "AI4InclusiveGh uses artificial intelligence and social media analytics to monitor conversations, track advocacy trends, and drive policy change for marginalized communities in Ghana.",
  primaryButtonText: "Explore Analytics",
  secondaryButtonText: "Join Community",
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
  useQuery({
    queryKey: ["hero-content"],
    queryFn: () => fetchHeroContent(DEFAULT_HERO),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const [focusAreas, setFocusAreas] = useState(DEFAULT_FOCUS_AREAS);

  // Join Community dialog state
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinFormData, setJoinFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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
        subject: "Join Community Request",
        message: joinFormData.message,
      });
      setJoinFormSuccess(true);
      setJoinFormData({ name: "", email: "", phone: "", message: "" });
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
            alt="AI-powered advocacy for inclusive Ghana"
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
                  AI-Powered Advocacy for Ghana
                </span>
              </div>

              {/* Main Heading */}
              <h1
                className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight animate-slide-in-left"
                style={{ animationDelay: "0.1s" }}
              >
                Amplifying <span className="text-yellow-400">Voices</span> for
                Inclusive Ghana
              </h1>

              {/* Description */}
              <p
                className="text-lg lg:text-xl text-white/90 mb-8 max-w-xl animate-fade-in-up opacity-0"
                style={{ animationDelay: "0.3s" }}
              >
                AI4InclusiveGh uses artificial intelligence and social media
                analytics to monitor conversations, track advocacy trends, and
                drive policy change for marginalized communities in Ghana.
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
                    Explore Analytics
                  </Button>
                </Link>
                <Button
                  size="lg"
                  onClick={() => setJoinDialogOpen(true)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 text-lg px-8 hover:scale-105 transition-transform duration-300"
                >
                  Join Community
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
                  <CarouselItem>
                    <div className="p-1">
                      <img
                        src={flyer1}
                        alt="Flyer 1"
                        className="w-full h-auto rounded-xl shadow-2xl"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <img
                        src={flyer2}
                        alt="Flyer 2"
                        className="w-full h-auto rounded-xl shadow-2xl"
                      />
                    </div>
                  </CarouselItem>
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
              Comprehensive tools for data-driven advocacy and social change
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
              We advocate for four critical social impact areas across Ghana
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
            future for Ghana through data-driven advocacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setJoinDialogOpen(true)}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 hover:scale-105 transition-transform duration-300"
            >
              Join Community
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
      <footer className="bg-slate-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={logo}
                  alt="AI4InclusiveGh logo"
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">AI4InclusiveGh</h3>
                </div>
              </div>
              <p className="text-slate-300 mb-6">
                Using artificial intelligence and social media analytics to
                amplify voices for marginalized communities in Ghana.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>ai4inclusiveghana@ug.edu.gh</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+233 (0) 50 123 4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Accra, Ghana</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-300 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-lg mb-6">Stay Updated</h3>
              <p className="text-slate-300 mb-4">
                Subscribe to receive monthly reports on advocacy trends and
                campaign results.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">
                © 2026 AI4InclusiveGh. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
                {/* Legal Links */}
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Use
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    Ethics & AI
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Join Community Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Join Our Community</DialogTitle>
            <DialogDescription>
              Become part of a growing network of advocates driving change in
              Ghana
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
                Welcome to the community! We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <Input
                  required
                  value={joinFormData.name}
                  onChange={(e) =>
                    setJoinFormData({ ...joinFormData, name: e.target.value })
                  }
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  required
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
                  Tell us about yourself *
                </label>
                <Textarea
                  required
                  value={joinFormData.message}
                  onChange={(e) =>
                    setJoinFormData({
                      ...joinFormData,
                      message: e.target.value,
                    })
                  }
                  placeholder="What advocacy areas interest you? How would you like to contribute?"
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={joinFormLoading}
              >
                {joinFormLoading ? "Submitting..." : "Join Community"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
