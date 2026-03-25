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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  fetchFocusAreas as fetchFocusAreasFromApi,
  sendContactMessage,
} from "@/lib/api-client";
import type { FocusArea } from "@/lib/types";
import disabilityImage from "@/assets/disability-tech-inclusion.jpg";
import womenImage from "@/assets/women-empowerment.jpg";
import mentalHealthImage from "@/assets/mental-health-support.jpg";
import lgbtqImage from "@/assets/lgbtq-community.jpg";
import heroImage from "@/assets/hero-ai-advocacy.jpg";
import { logo } from "@/images/images";
import { SiteFooter } from "@/components/SiteFooter";

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
      "Fighting gender-based violence through education, awareness, and inclusion for stronger protective legislation. Our AI monitors reports, support resources, and policy discussions to drive meaningful change.",
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
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});

  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinFormData, setJoinFormData] = useState({
    name: "",
    alias: "",
    email: "",
    phone: "",
    complement: "",
    themeId: "",
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
        message: `Theme: ${themes.find((theme) => theme.id === joinFormData.themeId)?.label || "Not provided"}\nAlias: ${joinFormData.alias || "Not provided"}\nComplement: ${joinFormData.complement || "Not provided"}\nDisplay user name: ${joinFormData.displayUserName ? "Yes" : "No"}`,
      });
      setJoinFormSuccess(true);
      setJoinFormData({
        name: "",
        alias: "",
        email: "",
        phone: "",
        complement: "",
        themeId: "",
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
    let mounted = true;

    async function fetchThemes() {
      const rows: FocusArea[] = await fetchFocusAreasFromApi();
      if (!Array.isArray(rows) || rows.length === 0) return;

      // Map API data to theme format
      const mapped = rows.map((row, index) => {
        const label = typeof row.title === "string" ? row.title.trim() : "";
        const lLower = label.toLowerCase();

        // Find matching default theme for styling
        const match = DEFAULT_THEMES.find((t) => {
          if (lLower.includes("disabil")) return t.id === "disabilities";
          if (
            lLower.includes("violence") ||
            lLower.includes("women") ||
            lLower.includes("vaw")
          )
            return t.id === "vaw";
          if (lLower.includes("mental")) return t.id === "mental-health";
          if (
            lLower.includes("lgbt") ||
            lLower.includes("sgmc") ||
            lLower.includes("gender minority")
          )
            return t.id === "lgbtq";
          return false;
        });

        // Get image from API or use default
        const imageRaw =
          Array.isArray(row.images) && typeof row.images[0] === "string"
            ? row.images[0].trim()
            : "";
        const defaultImage =
          match?.image || DEFAULT_THEMES[index % DEFAULT_THEMES.length].image;
        const image = imageRaw || defaultImage;

        // Use match defaults or fallback to first default theme's styling
        const fallback = DEFAULT_THEMES[index % DEFAULT_THEMES.length];

        return {
          id: row.id || match?.id || `theme-${index}`,
          label: label || match?.label || fallback.label,
          hashtag: row.hashTag || match?.hashtag || fallback.hashtag,
          hashtagColor: match?.hashtagColor || fallback.hashtagColor,
          bgColor: match?.bgColor || fallback.bgColor,
          iconBg: match?.iconBg || fallback.iconBg,
          iconColor: match?.iconColor || fallback.iconColor,
          icon: match?.icon || fallback.icon,
          href: row.id
            ? `/focus/${encodeURIComponent(row.id)}`
            : match?.href || fallback.href,
          image,
          description:
            row.description || match?.description || fallback.description,
        };
      });

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
            Inclusion <span className="text-yellow-400">Themes</span>
          </h1>

          {/* Description */}
          <p
            className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            We focus on {themes.length} critical areas of social inclusion in
            Ghana, using AI-powered analytics to amplify voices and drive
            meaningful change.
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
                  <div className="relative h-64 md:h-80 overflow-hidden">
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
                  <CardContent className="p-6 md:pt-0 flex h-full flex-col justify-between">
                    <div>
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 ${theme.iconBg} rounded-xl mb-4`}
                      >
                        <theme.icon className={`h-6 w-6 ${theme.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{theme.label}</h3>
                      {(() => {
                        const isExpanded = !!expandedDescriptions[theme.id];
                        return (
                          <>
                            <p
                              className={`text-muted-foreground text-sm mb-2 leading-relaxed overflow-hidden ${
                                isExpanded ? "hidden" : ""
                              }`}
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {theme.description}
                            </p>
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedDescriptions((prev) => ({
                                  ...prev,
                                  [theme.id]: !prev[theme.id],
                                }))
                              }
                              className="text-sm font-medium text-primary hover:text-primary/80"
                            >
                              {isExpanded ? "Show less" : "Read more"}
                            </button>
                          </>
                        );
                      })()}
                    </div>

                    {/* Stats */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm"></div>

                      <Link to={theme.href}>
                        <Button className="w-full bg-primary hover:bg-primary/90 group">
                          Explore Theme
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>

                {!!expandedDescriptions[theme.id] && (
                  <div className="px-6 pb-6 pt-2 border-t border-border/50">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                )}
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
            <Link to="/analytics">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white bg-white/10 hover:bg-white/20 text-lg px-8 hover:scale-105 transition-transform duration-300"
              >
                Explore Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />

      {/* Join Conversation Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Testimony</DialogTitle>
            <DialogDescription>
              Share your testimony to support inclusive inclusion in Ghana.
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
                <label className="text-sm font-medium">Theme *</label>
                <select
                  required
                  value={joinFormData.themeId}
                  onChange={(e) =>
                    setJoinFormData({
                      ...joinFormData,
                      themeId: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="">Select a theme</option>
                  {themes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.label}
                    </option>
                  ))}
                </select>
              </div>
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
                <label className="text-sm font-medium">Alias (Optional)</label>
                <Input
                  value={joinFormData.alias}
                  onChange={(e) =>
                    setJoinFormData({ ...joinFormData, alias: e.target.value })
                  }
                  placeholder="How you want to be identified"
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
                  htmlFor="themes-display-user-name"
                >
                  Option to display user name
                </label>
                <input
                  id="themes-display-user-name"
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
