import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Palette,
  TrendingUp,
  Heart,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Users,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { fetchFocusAreaById, fetchFocusAreas } from "@/lib/api-client";
import type { FocusArea } from "@/lib/types";
import lgbtqImage from "@/assets/lgbtq-community.jpg";
import { logo } from "@/images/images";

const FOOTER_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Themes", href: "/themes" },
  { name: "Analytics", href: "/analytics" },
  { name: "Campaigns", href: "/get-involved" },
  { name: "Events", href: "/events" },
  { name: "Community", href: "/community" },
];

export default function LGBTQ() {
  const [focusArea, setFocusArea] = useState<FocusArea | null>(null);
  const [searchParams] = useSearchParams();
  const focusAreaId = searchParams.get("id");

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        if (focusAreaId) {
          const exact = await fetchFocusAreaById(focusAreaId);
          if (active && exact) {
            setFocusArea(exact);
            return;
          }
        }

        const all = await fetchFocusAreas();
        if (!active) return;

        const normalize = (value: string) => value.trim().toLowerCase();
        const expectedTags = [
          "#prideghana",
          "#inclusionforall",
          "#loveislove",
          "#lgbtrights",
          "#lgbqrights",
          "#lgbtqrights",
        ];

        const matched =
          all.find((fa) => expectedTags.includes(normalize(fa.hashTag))) ??
          all.find((fa) => normalize(fa.title).includes("lgbt")) ??
          all.find((fa) => normalize(fa.title).includes("queer")) ??
          null;

        setFocusArea(matched);
      } catch (_) {
        // Keep placeholders on error.
      }
    })();

    return () => {
      active = false;
    };
  }, [focusAreaId]);

  const formatFollowers = (value?: number | null) => {
    if (typeof value !== "number" || !Number.isFinite(value)) return "";
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
    return String(value);
  };

  const stories = [
    {
      name: "Ama Boateng",
      story:
        "Created community-led safe spaces in Accra that welcome Sexual and Gender minority community youth and allies to learn and organize.",
      impact: "10+ safe spaces opened",
      hashtag: "#PrideGhana",
    },
    {
      name: "Kojo Mensah",
      story:
        "Advocates for inclusive workplaces and helped draft non-discrimination policies for tech startups.",
      impact: "15 companies adopted policies",
      hashtag: "#InclusionForAll",
    },
  ];

  const keyInfluencers = [
    { name: "@SGMCGhana", followers: "76k", focus: "Rights Advocacy" },
    { name: "@PrideAdvocateGH", followers: "58k", focus: "Community Building" },
    {
      name: "@InclusionMattersGH",
      followers: "52k",
      focus: "Education & Awareness",
    },
    { name: "@AllyNetworkGH", followers: "44k", focus: "Ally Support" },
  ];

  const trendingHashtags = [
    { tag: "#SGMCRights", tweets: "25.4k", sentiment: "87%" },
    { tag: "#LoveIsLove", tweets: "19.8k", sentiment: "91%" },
    { tag: "#PrideGhana", tweets: "16.2k", sentiment: "89%" },
    { tag: "#InclusionForAll", tweets: "12.7k", sentiment: "93%" },
  ];

  const resources = [
    {
      title: "SGMC Rights Ghana",
      description:
        "Advocacy organization fighting for Sexual and Gender minority community rights and equality",
      contact: "support@sgmcrights.gh",
      services: ["Legal Support", "Advocacy", "Community Building"],
    },
    {
      title: "Safe Spaces Network",
      description:
        "Creating safe, welcoming spaces for Sexual and Gender minority community individuals across Ghana",
      contact: "info@safespaces.gh",
      services: ["Safe Spaces", "Support Groups", "Counseling"],
    },
    {
      title: "Pride Counseling Services",
      description: "SGMC-affirming mental health and counseling services",
      contact: "counseling@pride.gh",
      services: ["Counseling", "Therapy", "Crisis Support"],
    },
  ];

  const heroTitle =
    typeof focusArea?.title === "string" && focusArea.title.trim()
      ? focusArea.title.trim()
      : "Sexual and Gender Minority Community";
  const heroDescription =
    typeof focusArea?.description === "string" && focusArea.description.trim()
      ? focusArea.description.trim()
      : "Advocating for equality, dignity, and rights for Sexual and Gender minority community individuals in Ghana. Together, we're building a more accepting and inclusive society for all.";
  const heroImageSrc =
    typeof focusArea?.images?.[0] === "string" && focusArea.images[0].trim()
      ? focusArea.images[0]
      : lgbtqImage;

  const primaryStatValue =
    typeof focusArea?.statsValue === "string" && focusArea.statsValue.trim()
      ? focusArea.statsValue.trim()
      : "500K+";
  const primaryStatLabel =
    typeof focusArea?.statsLabel === "string" && focusArea.statsLabel.trim()
      ? focusArea.statsLabel.trim()
      : "Community Members";

  const inspiringStories =
    Array.isArray(focusArea?.inspiringStories) &&
    focusArea!.inspiringStories!.length > 0
      ? focusArea!.inspiringStories!.map((s) => ({
          name: s.speaker,
          story: s.story,
          impact: "",
          hashtag:
            typeof focusArea?.hashTag === "string" && focusArea.hashTag.trim()
              ? focusArea.hashTag.trim()
              : "",
        }))
      : stories;

  const keyVoices =
    Array.isArray(focusArea?.keyVoices) && focusArea!.keyVoices!.length > 0
      ? focusArea!.keyVoices!.map((kv) => ({
          name: kv.name,
          followers: formatFollowers(kv.followers),
          focus: kv.description,
        }))
      : keyInfluencers;

  const supportingOrgs =
    Array.isArray(focusArea?.supportingOrganizations) &&
    focusArea!.supportingOrganizations!.length > 0
      ? focusArea!.supportingOrganizations!.map((org) => ({
          title: org.name,
          description: org.description,
          contact: org.email || org.website || "",
          services: [] as string[],
        }))
      : resources;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImageSrc}
            alt="Sexual and Gender Minority Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20 text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-8 animate-fade-in-down">
            <Palette className="h-4 w-4" />
            <span className="text-sm font-medium">Focus Area</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight max-w-3xl animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            {heroTitle}
          </h1>

          {/* Description */}
          <p
            className="text-lg lg:text-xl opacity-90 mb-10 max-w-2xl animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            {heroDescription}
          </p>

          {/* Hero Stats */}
          <div
            className="flex flex-wrap gap-6 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-bold">{primaryStatValue}</span>
              <span className="opacity-80 text-sm">{primaryStatLabel}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-bold">73.8k</span>
              <span className="opacity-80 text-sm">Social Mentions</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-bold">87%</span>
              <span className="opacity-80 text-sm">Positive Sentiment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Hashtags */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trending <span className="text-primary">Conversations</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The most active hashtags driving Sexual and Gender minority
              community rights discussions in Ghana
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingHashtags.map((hashtag, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="text-lg font-mono text-primary mb-2 group-hover:scale-105 transition-transform">
                    {hashtag.tag}
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {hashtag.tweets}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    tweets
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {hashtag.sentiment} positive
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiring Stories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Inspiring <span className="text-primary">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from Sexual and Gender minority community advocates
              making a difference in Ghana
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {inspiringStories.map((story, index) => (
              <Card
                key={index}
                className="border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {story.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{story.name}</h3>
                        {story.hashtag && (
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                            {story.hashtag}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {story.story}
                      </p>
                      {story.impact && (
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-600">
                            {story.impact}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Voices */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Key <span className="text-primary">Voices</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Influential advocates and organizations leading the Sexual and
              Gender minority community rights movement
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyVoices.map((influencer, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <div className="font-bold text-primary mb-1">
                    {influencer.name}
                  </div>
                  {influencer.followers && (
                    <div className="text-sm text-muted-foreground mb-1">
                      {influencer.followers} followers
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {influencer.focus}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting Organizations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Supporting <span className="text-primary">Organizations</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with organizations providing support for Sexual and Gender
              minority community individuals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportingOrgs.map((resource, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {resource.description}
                  </p>

                  {resource.contact && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{resource.contact}</span>
                    </div>
                  )}

                  {resource.services.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {resource.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Button variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Join the Movement for Sexual and Gender Minority Community Rights
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Your voice matters in creating an inclusive and accepting Ghana.
            Join thousands of advocates making a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/get-involved">
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              View Analytics
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
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

            <div>
              <h3 className="font-bold text-lg mb-6">Platform</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-300 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Get Involved</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/community"
                    className="text-slate-300 hover:text-primary transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Stay Updated</h3>
              <p className="text-slate-300 mb-4 text-sm">
                Subscribe to receive monthly reports on advocacy trends and
                campaign results.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 text-sm"
                />
                <button className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">
                © 2026 AI4InclusiveGh. All rights reserved.
              </p>
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
      </footer>
    </div>
  );
}
