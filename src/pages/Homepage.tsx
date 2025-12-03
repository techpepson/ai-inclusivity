/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Users,
  Shield,
  Heart,
  Palette,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfessionalStats } from "@/components/ProfessionalStats";
import { TestimonialSection } from "@/components/TestimonialSection";
import heroImage from "@/assets/hero-ai-advocacy.jpg";
import disabilityImage from "@/assets/disability-tech-inclusion.jpg";
import womenImage from "@/assets/women-empowerment.jpg";
import mentalHealthImage from "@/assets/mental-health-support.jpg";
import lgbtqImage from "@/assets/lgbtq-community.jpg";

type HeroShape = {
  title: string;
  subTitle: string;
  primaryButtonText?: string | null;
  secondaryButtonText?: string | null;
};

const DEFAULT_HERO: HeroShape = {
  title: "AI-Powered Advocacy for",
  subTitle: "Inclusive Ghana",
  primaryButtonText: "Explore Analytics",
  secondaryButtonText: "Join Community",
};

type StatShape = {
  label: string;
  value: string; // displayed value (formatted)
  icon: React.ComponentType<any>;
};

const DEFAULT_STATS: StatShape[] = [
  { label: "Active Campaigns", value: "24", icon: TrendingUp },
  { label: "Community Members", value: "15.2k", icon: Users },
  { label: "Tweets Analyzed", value: "450k", icon: BarChart3 },
  { label: "Organizations", value: "89", icon: Shield },
];

const DEFAULT_FOCUS_AREAS = [
  {
    label: "Persons with Disabilities",
    description: "Advocating for accessibility and inclusion of PwDs in Ghana",
    icon: Users,
    color: "bg-theme-disability",
    href: "/themes/disabilities",
    hashtags: ["#InclusionMatters", "#DisabilityRightsGH"],
    image: disabilityImage,
  },
  {
    label: "Violence Against Women",
    description: "Fighting gender-based violence through awareness and support",
    icon: Shield,
    color: "bg-theme-vaw",
    href: "/themes/vaw",
    hashtags: ["#EndVAW", "#StandWithWomen"],
    image: womenImage,
  },
  {
    label: "Mental Health & Wellness",
    description: "Breaking stigma and promoting mental wellness for all",
    icon: Heart,
    color: "bg-theme-mental",
    href: "/themes/mental-health",
    hashtags: ["#BreakTheStigma", "#MentalHealthAwareness"],
    image: mentalHealthImage,
  },
  {
    label: "LGBTQ+ Communities",
    description: "Supporting inclusion and rights for LGBTQ+ individuals",
    icon: Palette,
    color: "bg-theme-lgbtq",
    href: "/themes/lgbtq",
    hashTags: ["#LGBTQRights", "#LoveIsLove"],
    image: lgbtqImage,
  },
];

function formatNumber(n: number) {
  if (!Number.isFinite(n)) return String(n);
  if (Math.abs(n) >= 1000000) return `${+(n / 1000000).toFixed(1)}M`;
  if (Math.abs(n) >= 1000) return `${+(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function Homepage() {
  const [heroData, setHeroData] = useState<HeroShape>(DEFAULT_HERO);
  const [statsData, setStatsData] = useState<StatShape[]>(DEFAULT_STATS);

  useEffect(() => {
    let mounted = true;

    async function tryFetch(url: string) {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const json = await res.json();
        return json?.hero ?? null;
      } catch (e) {
        return null;
      }
    }

    async function fetchHero() {
      const baseURL = import.meta.env.VITE_BASE_URL || "";
      // try both common endpoints: /api/hero and /get-hero
      const endpoints = [
        `${baseURL}/api/hero`,
        `${baseURL}/get-hero`,
        "/api/hero",
        "/get-hero",
      ];
      let raw: any = null;

      for (const ep of endpoints) {
        raw = await tryFetch(ep);
        if (raw) break;
      }

      if (!raw || typeof raw !== "object") return;

      // Accept several possible field names (mainTitle, title) and handle misspelling
      const titleCandidate =
        typeof raw.mainTitle === "string" && raw.mainTitle.trim()
          ? raw.mainTitle.trim()
          : typeof raw.title === "string" && raw.title.trim()
          ? raw.title.trim()
          : null;

      const subTitleCandidate =
        (typeof raw.subTitle === "string" && raw.subTitle.trim()) ||
        (typeof raw.sub_title === "string" && raw.sub_title.trim()) ||
        null;

      const primaryButtonCandidate =
        typeof raw.primaryButtonText === "string" &&
        raw.primaryButtonText.trim()
          ? raw.primaryButtonText.trim()
          : null;

      // Accept both correct and misspelled secondary field names
      const secondaryButtonCandidate =
        typeof raw.secondaryButtonText === "string" &&
        raw.secondaryButtonText.trim()
          ? raw.secondaryButtonText.trim()
          : typeof raw.secoondaryButtonText === "string" &&
            raw.secoondaryButtonText.trim()
          ? raw.secoondaryButtonText.trim()
          : null;

      if (titleCandidate && subTitleCandidate) {
        const merged: HeroShape = {
          title: titleCandidate,
          subTitle: subTitleCandidate,
          primaryButtonText:
            primaryButtonCandidate ?? DEFAULT_HERO.primaryButtonText,
          secondaryButtonText:
            secondaryButtonCandidate ?? DEFAULT_HERO.secondaryButtonText,
        };

        if (mounted) setHeroData(merged);
      }
    }

    fetchHero();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function tryFetchStats(url: string) {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const json = await res.json();
        return json?.statistics ?? null;
      } catch (e) {
        return null;
      }
    }

    async function fetchStatistics() {
      const baseURL = import.meta.env.VITE_BASE_URL || "";
      const endpoints = [
        `${baseURL}/api/statistics`,
        `${baseURL}/get-statistics`,
        "/api/statistics",
        "/get-statistics",
      ];
      let raw: any = null;

      for (const ep of endpoints) {
        raw = await tryFetchStats(ep);
        if (raw) break;
      }

      if (!Array.isArray(raw)) return; // keep defaults

      // Validate all items; if any malformed -> bail and keep DEFAULT_STATS
      const validated: StatShape[] = [];
      for (const item of raw) {
        if (!item || typeof item !== "object") return;
        const label =
          typeof item.label === "string" && item.label.trim()
            ? item.label.trim()
            : null;
        // value in DB is Int; accept number or numeric string
        const num =
          typeof item.value === "number"
            ? item.value
            : typeof item.value === "string" && item.value.trim()
            ? Number(item.value)
            : NaN;
        if (!label || !Number.isFinite(num)) return; // malformed -> keep defaults

        // pick icon from DEFAULT_STATS by label if available
        const match = DEFAULT_STATS.find(
          (s) => s.label.toLowerCase() === label.toLowerCase()
        );
        const icon = match ? match.icon : TrendingUp;

        validated.push({ label, value: formatNumber(num), icon });
      }

      if (validated.length > 0 && mounted) setStatsData(validated);
    }

    fetchStatistics();

    return () => {
      mounted = false;
    };
  }, []);

  const themes = [
    {
      title: "Persons with Disabilities",
      description:
        "Advocating for accessibility and inclusion of PwDs in Ghana",
      icon: Users,
      color: "bg-theme-disability",
      href: "/themes/disabilities",
      hashtags: ["#InclusionMatters", "#DisabilityRightsGH"],
      image: disabilityImage,
    },
    {
      title: "Violence Against Women",
      description:
        "Fighting gender-based violence through awareness and support",
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

  const [focusAreas, setFocusAreas] = useState(DEFAULT_FOCUS_AREAS);

  useEffect(() => {
    let mounted = true;

    async function tryFetchFocus(url: string) {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const json = await res.json();
        return json?.focusAreas ?? json?.focusAreas ?? null;
      } catch (e) {
        return null;
      }
    }

    async function fetchFocusAreas() {
      const baseURL = import.meta.env.VITE_BASE_URL || "";
      const endpoints = [
        `${baseURL}/api/focus-areas`,
        `${baseURL}/get-focus-areas`,
        "/api/focus-areas",
        "/get-focus-areas",
      ];

      let raw: unknown = null;
      for (const ep of endpoints) {
        raw = await tryFetchFocus(ep);
        if (raw) break;
      }

      if (!Array.isArray(raw)) return; // keep defaults
      const arr = raw as unknown[];
      if (arr.length === 0) return;

      const validated: typeof DEFAULT_FOCUS_AREAS = [];

      for (const item of arr) {
        if (!item || typeof item !== "object") return; // malformed -> keep defaults
        const obj = item as Record<string, unknown>;

        const label =
          typeof obj.label === "string" && obj.label.trim()
            ? obj.label.trim()
            : null;
        const description =
          typeof obj.description === "string" && obj.description.trim()
            ? obj.description.trim()
            : null;
        const tagsRaw = Array.isArray(obj.hashTags)
          ? obj.hashTags
          : Array.isArray(obj.hashtags)
          ? obj.hashtags
          : null;
        const hashtags = Array.isArray(tagsRaw)
          ? (tagsRaw.filter((t) => typeof t === "string") as string[])
          : [];
        const imageRaw =
          typeof obj.image === "string" ? (obj.image as string).trim() : "";

        if (!label || !description) return; // malformed

        // choose a default image if the incoming `image` is empty
        const defaultImage = (() => {
          const l = label.toLowerCase();
          if (l.includes("disabil")) return disabilityImage;
          if (
            l.includes("violence") ||
            l.includes("vaw") ||
            l.includes("women")
          )
            return womenImage;
          if (l.includes("mental")) return mentalHealthImage;
          if (l.includes("lgbt")) return lgbtqImage;
          return heroImage;
        })();

        const image = imageRaw ? imageRaw : defaultImage;

        // derive icon, color, and href from the label (avoid external dependencies)
        const lLower = label.toLowerCase();
        let icon = Users;
        let color = "bg-theme-disability";
        let href = `/themes/${label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;
        if (lLower.includes("disabil")) {
          icon = Users;
          color = "bg-theme-disability";
          href = "/themes/disabilities";
        } else if (
          lLower.includes("violence") ||
          lLower.includes("vaw") ||
          lLower.includes("women")
        ) {
          icon = Shield;
          color = "bg-theme-vaw";
          href = "/themes/vaw";
        } else if (lLower.includes("mental")) {
          icon = Heart;
          color = "bg-theme-mental";
          href = "/themes/mental-health";
        } else if (lLower.includes("lgbt")) {
          icon = Palette;
          color = "bg-theme-lgbtq";
          href = "/themes/lgbtq";
        }

        validated.push({
          label,
          description,
          icon,
          color,
          href,
          hashtags,
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

  // `statsData` is fetched from the server; `DEFAULT_STATS` provides defaults.

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
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-hero/90 pointer-events-none"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {heroData.title}
              <span className="block text-primary-glow">
                {heroData.subTitle}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Leveraging social media analytics to drive awareness and action
              for persons with disabilities, VAW prevention, mental health, and
              LGBTQ+ rights in Ghana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  {heroData.primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/get-involved">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-slate-900 hover:bg-white hover:text-primary"
                >
                  {heroData.secondaryButtonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Four Focus Areas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We monitor, analyze, and amplify conversations around these
              critical social issues in Ghana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {focusAreas.map((theme, index) => (
              <Card
                key={index}
                className="group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card overflow-hidden"
              >
                <div className="relative h-60 md:h-64 lg:h-72 overflow-hidden">
                  <img
                    src={theme.image}
                    alt={theme.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div
                    className={`absolute top-4 left-4 p-3 rounded-lg ${theme.color}`}
                  >
                    <theme.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{theme.label}</CardTitle>
                  <CardDescription>{theme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {(theme.hashtags ?? theme.hashTags ?? []).map(
                        (hashtag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                          >
                            {hashtag}
                          </span>
                        )
                      )}
                    </div>
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
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join our community of advocates, researchers, and changemakers
            working toward a more inclusive Ghana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Involved
              </Button>
            </Link>
            <Link to="/analytics">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-slate-900 hover:bg-white hover:text-primary"
              >
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
