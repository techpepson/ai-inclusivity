import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Shield, TrendingUp, Phone, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchFocusAreaById, fetchFocusAreas } from "@/lib/api-client";
import type { FocusArea } from "@/lib/types";
import womenImage from "@/assets/women-empowerment.jpg";

export default function VAW() {
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
        const expectedTags = ["#endvaw", "#standwithwomen", "#gbvawareness"];

        const matched =
          all.find((fa) => expectedTags.includes(normalize(fa.hashTag))) ??
          all.find((fa) => normalize(fa.title).includes("violence")) ??
          all.find((fa) => normalize(fa.title).includes("women")) ??
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

  const campaigns = [
    {
      name: "#EndVAW Campaign",
      reach: "2.3M people",
      engagement: "89k interactions",
      description:
        "Month-long awareness campaign highlighting the need to end violence against women in Ghana",
    },
    {
      name: "#StandWithWomen",
      reach: "1.8M people",
      engagement: "67k interactions",
      description:
        "Solidarity campaign supporting survivors and promoting women's safety",
    },
  ];

  const keyInfluencers = [
    { name: "@WomenAdvocateGH", followers: "98k", focus: "Policy Advocacy" },
    { name: "@SafeSpacesGhana", followers: "76k", focus: "Support Services" },
    { name: "@GBVAwareness", followers: "64k", focus: "Education & Awareness" },
    { name: "@WomensRightsGH", followers: "58k", focus: "Legal Rights" },
  ];

  const trendingHashtags = [
    { tag: "#EndVAW", tweets: "32.1k", sentiment: "78%" },
    { tag: "#StandWithWomen", tweets: "28.4k", sentiment: "85%" },
    { tag: "#GBVAwareness", tweets: "19.7k", sentiment: "82%" },
    { tag: "#WomensSafety", tweets: "15.2k", sentiment: "90%" },
  ];

  const supportServices = [
    {
      name: "Domestic Violence & Victim Support Unit (DOVVSU)",
      description:
        "Ghana Police Service specialized unit for domestic violence cases",
      services: [
        "24/7 Hotline",
        "Emergency Response",
        "Investigation",
        "Court Support",
      ],
      hotline: "191 (Toll-free)",
      email: "dovvsu@ghanapolice.gov.gh",
      website: "",
    },
    {
      name: "Women's Rights Coalition Ghana",
      description:
        "Advocacy organization fighting for women's rights and gender equality",
      services: ["Legal Aid", "Counseling", "Advocacy", "Education"],
      hotline: "+233-302-123-456",
      email: "info@wrcghana.org",
      website: "",
    },
    {
      name: "Legal Aid for Women",
      description:
        "Free legal services for women experiencing violence and discrimination",
      services: [
        "Legal Consultation",
        "Court Representation",
        "Documentation",
        "Referrals",
      ],
      hotline: "+233-244-567-890",
      email: "legal@womensaid.gh",
      website: "",
    },
  ];

  const heroTitle =
    typeof focusArea?.title === "string" && focusArea.title.trim()
      ? focusArea.title.trim()
      : "Violence Against Women";
  const heroDescription =
    typeof focusArea?.description === "string" && focusArea.description.trim()
      ? focusArea.description.trim()
      : "Fighting gender-based violence through awareness, advocacy, and\n            support. Together, we're working to create safe spaces and empower\n            women across Ghana.";
  const heroImageSrc =
    typeof focusArea?.images?.[0] === "string" && focusArea.images[0].trim()
      ? focusArea.images[0]
      : womenImage;

  const primaryStatValue =
    typeof focusArea?.statsValue === "string" && focusArea.statsValue.trim()
      ? focusArea.statsValue.trim()
      : "1 in 3";
  const primaryStatLabel =
    typeof focusArea?.statsLabel === "string" && focusArea.statsLabel.trim()
      ? focusArea.statsLabel.trim()
      : "Women experience GBV";

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
          name: org.name,
          description: org.description,
          services: [] as string[],
          hotline: "",
          email: org.email,
          website: org.website ?? "",
        }))
      : supportServices;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Emergency Alert */}

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative h-80 mb-8 rounded-lg overflow-hidden">
            <img
              src={heroImageSrc}
              alt="Violence Against Women prevention in Ghana"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-vaw/90 rounded-lg mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {heroTitle}
              </h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {heroDescription}
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-vaw mb-2">
                {primaryStatValue}
              </div>
              <p className="text-sm text-muted-foreground">
                {primaryStatLabel}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-vaw mb-2">87k</div>
              <p className="text-sm text-muted-foreground">Social Mentions</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-vaw mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Support Available</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-vaw mb-2">78%</div>
              <p className="text-sm text-muted-foreground">
                Positive Sentiment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Trending Stories */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Trending Stories</h2>
            <p className="text-lg text-muted-foreground">
              Join the conversation and help amplify awareness about VAW
              prevention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {trendingHashtags.map((hashtag, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-lg font-mono text-theme-vaw">
                      {hashtag.tag}
                    </div>
                    <div className="text-2xl font-bold">{hashtag.tweets}</div>
                    <div className="text-sm text-muted-foreground">tweets</div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {hashtag.sentiment} positive
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {campaigns.map((campaign, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl">{campaign.name}</CardTitle>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-theme-vaw">
                        {campaign.reach}
                      </div>
                      <div className="text-muted-foreground">Reach</div>
                    </div>
                    <div>
                      <div className="font-semibold text-theme-vaw">
                        {campaign.engagement}
                      </div>
                      <div className="text-muted-foreground">Engagement</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Join Campaign
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Inspiring Stories */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Inspiring Stories</h2>
            <p className="text-lg text-muted-foreground">
              Survivors, advocates, and allies leading change across Ghana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {campaigns.map((campaign, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl">{campaign.name}</CardTitle>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">
                      {campaign.reach}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {campaign.engagement} shared actions so far.
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Voices */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Key Voices</h2>
            <p className="text-lg text-muted-foreground">
              Influential voices driving the fight against gender-based
              violence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyVoices.map((influencer, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-theme-vaw/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-theme-vaw" />
                  </div>
                  <div>
                    <div className="font-semibold text-theme-vaw">
                      {influencer.name}
                    </div>
                    {influencer.followers ? (
                      <div className="text-sm text-muted-foreground">
                        {influencer.followers} followers
                      </div>
                    ) : null}
                    <div className="text-xs text-muted-foreground mt-1">
                      {influencer.focus}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Supporting Organizations */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Supporting Organizations
            </h2>
            <p className="text-lg text-muted-foreground">
              If you need help or know someone who does, these organizations
              provide confidential support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportingOrgs.map((service, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {service.hotline ? (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-theme-vaw" />
                        <span className="font-semibold text-theme-vaw">
                          {service.hotline}
                        </span>
                      </div>
                    ) : null}
                    {service.email ? (
                      <div className="text-sm text-muted-foreground">
                        <strong>Email:</strong> {service.email}
                      </div>
                    ) : null}
                    {service.website ? (
                      <div className="text-sm text-muted-foreground">
                        <strong>Website:</strong> {service.website}
                      </div>
                    ) : null}
                    <div className="flex flex-wrap gap-2">
                      {service.services.map((serviceType, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {serviceType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-theme-vaw hover:bg-theme-vaw/90 text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Get Help Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
