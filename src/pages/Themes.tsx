import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Shield,
  Heart,
  Palette,
  ArrowRight,
  TrendingUp,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchFocusAreas as fetchFocusAreasFromApi } from "@/lib/api-client";
import type { FocusArea } from "@/lib/types";
import disabilityImage from "@/assets/disability-tech-inclusion.jpg";
import womenImage from "@/assets/women-empowerment.jpg";
import mentalHealthImage from "@/assets/mental-health-support.jpg";
import lgbtqImage from "@/assets/lgbtq-community.jpg";
import heroImage from "@/assets/hero-ai-advocacy.jpg";
import { logo } from "@/images/images";

const DEFAULT_THEMES = [
  {
    id: "vaw",
    label: "Violence Against Women",
    hashtag: "#EndVAW",
    hashtagColor: "text-blue-600",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: Shield,
    href: "/themes/vaw",
    image: womenImage,
    description:
      "Fighting gender-based violence through education, awareness, and advocacy for stronger protective legislation. Our AI monitors reports, support resources, and policy discussions to drive meaningful change.",
    stats: { reach: "2.1M", campaigns: 18, voices: "15.2K" },
  },
  {
    id: "disabilities",
    label: "Persons with Disabilities",
    hashtag: "#InclusionMatters",
    hashtagColor: "text-blue-600",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: Users,
    href: "/themes/disabilities",
    image: disabilityImage,
    description:
      "Advocating for accessibility, equal opportunities, and inclusive policies for persons with disabilities across Ghana. We track conversations around workplace inclusion, accessible infrastructure, and assistive technologies.",
    stats: { reach: "1.2M", campaigns: 12, voices: "8.5K" },
  },
  {
    id: "mental-health",
    label: "Mental Health & Wellness",
    hashtag: "#BreakTheStigma",
    hashtagColor: "text-blue-600",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: Heart,
    href: "/themes/mental-health",
    image: mentalHealthImage,
    description:
      "Breaking stigma and promoting accessible mental healthcare for all Ghanaians. We track wellness conversations, crisis resources, and advocate for better mental health policies and support systems.",
    stats: { reach: "1.8M", campaigns: 15, voices: "12.8K" },
  },
  {
    id: "lgbtq",
    label: "Sexual and Gender Minority Community",
    hashtag: "#SGMCRights",
    hashtagColor: "text-blue-600",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: Palette,
    href: "/themes/lgbtq",
    image: lgbtqImage,
    description:
      "Supporting rights, safety, and dignity for Sexual and Gender minority community individuals in Ghana. We monitor conversations around equality, document challenges, and connect communities with resources and support networks.",
    stats: { reach: "950K", campaigns: 8, voices: "6.2K" },
  },
];

const FOOTER_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Themes", href: "/themes" },
  { name: "Analytics", href: "/analytics" },
  { name: "Campaigns", href: "/get-involved" },
  { name: "Events", href: "/events" },
  { name: "Community", href: "/community" },
];

export default function Themes() {
  const [themes, setThemes] = useState(DEFAULT_THEMES);

  useEffect(() => {
    let mounted = true;

    async function fetchThemes() {
      const rows: FocusArea[] = await fetchFocusAreasFromApi();
      if (!Array.isArray(rows) || rows.length === 0) return;

      // Map API data to theme format if available
      const mapped = rows
        .map((row) => {
          const label = typeof row.title === "string" ? row.title.trim() : "";
          const lLower = label.toLowerCase();

          // Find matching default theme
          const match = DEFAULT_THEMES.find((t) => {
            if (lLower.includes("disabil")) return t.id === "disabilities";
            if (
              lLower.includes("violence") ||
              lLower.includes("women") ||
              lLower.includes("vaw")
            )
              return t.id === "vaw";
            if (lLower.includes("mental")) return t.id === "mental-health";
            if (lLower.includes("lgbt")) return t.id === "lgbtq";
            return false;
          });

          if (match) {
            return {
              ...match,
              label: label || match.label,
              hashtag: row.hashTag || match.hashtag,
              href: row.id
                ? `/focus/${encodeURIComponent(row.id)}`
                : match.href,
            };
          }
          return null;
        })
        .filter(Boolean);

      if (mapped.length > 0 && mounted) {
        setThemes(mapped as typeof DEFAULT_THEMES);
      }
    }

    fetchThemes();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Our Themes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/65"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-5 py-2 mb-8 animate-fade-in-down">
            <span className="text-sm font-medium">Our Focus Areas</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            Advocacy <span className="text-yellow-400">Themes</span>
          </h1>

          {/* Description */}
          <p
            className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            We focus on four critical areas of social advocacy in Ghana, using
            AI-powered analytics to amplify voices and drive meaningful change.
          </p>
        </div>
      </section>

      {/* Themes Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {themes.map((theme, index) => (
              <Card
                key={theme.id}
                className="overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 group animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img
                      src={theme.image}
                      alt={theme.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`inline-block px-3 py-1 ${theme.bgColor} ${theme.hashtagColor} text-sm font-medium rounded-full`}
                      >
                        {theme.hashtag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 flex flex-col justify-between">
                    <div>
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 ${theme.iconBg} rounded-xl mb-4`}
                      >
                        <theme.icon className={`h-6 w-6 ${theme.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{theme.label}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {theme.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {theme.stats.reach}
                          </span>
                          <span className="text-muted-foreground">reach</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {theme.stats.voices}
                          </span>
                          <span className="text-muted-foreground">voices</span>
                        </div>
                      </div>

                      <Link to={theme.href}>
                        <Button className="w-full bg-primary hover:bg-primary/90 group">
                          Explore Theme
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Animated background */}
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
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join our campaigns and help drive meaningful change across these
            critical focus areas in Ghana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 hover:scale-105 transition-transform duration-300"
              >
                Join Campaigns
              </Button>
            </Link>
            <Link to="/community">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white bg-white/10 hover:bg-white/20 text-lg px-8 hover:scale-105 transition-transform duration-300"
              >
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={logo}
                  alt="AI4InclusiveGh logo"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">AI4InclusiveGh</h3>
                </div>
              </div>
              <p className="text-slate-300 mb-6 text-sm">
                Using artificial intelligence and social media analytics to
                amplify voices for marginalized communities in Ghana.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>ai4inclusiveghana@ug.edu.gh</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+233 (0) 50 123 4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
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
                      className="text-slate-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Themes */}
            <div>
              <h3 className="font-bold text-lg mb-6">Our Themes</h3>
              <ul className="space-y-3">
                {themes.map((theme) => (
                  <li key={theme.id}>
                    <Link
                      to={theme.href}
                      className="text-slate-300 hover:text-white transition-colors text-sm"
                    >
                      {theme.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-lg mb-6">Stay Updated</h3>
              <p className="text-slate-300 mb-4 text-sm">
                Subscribe to our newsletter for advocacy updates and impact
                reports.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
              <p>© 2026 AI4InclusiveGh. All rights reserved.</p>
              <div className="flex gap-6">
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
