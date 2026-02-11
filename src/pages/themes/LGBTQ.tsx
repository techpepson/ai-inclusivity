import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Palette, TrendingUp, Phone, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchFocusAreaById, fetchFocusAreas } from "@/lib/api-client";
import type { FocusArea } from "@/lib/types";
import lgbtqImage from "@/assets/lgbtq-community.jpg";

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

  const inspiringStories = [
    {
      name: "Ama Boateng",
      story:
        "Created community-led safe spaces in Accra that welcome LGBTQ+ youth and allies to learn and organize.",
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
    {
      name: "Adjoa Owusu",
      story:
        "Runs peer-support circles that connect families with LGBTQ+-affirming counselors across Ghana.",
      impact: "600+ families supported",
      hashtag: "#LoveIsLove",
    },
  ];

  const keyInfluencers = [
    { name: "@LGBTQGhana", followers: "76k", focus: "Rights Advocacy" },
    { name: "@PrideAdvocateGH", followers: "58k", focus: "Community Building" },
    {
      name: "@InclusionMattersGH",
      followers: "52k",
      focus: "Education & Awareness",
    },
    { name: "@AllyNetworkGH", followers: "44k", focus: "Ally Support" },
  ];

  const trendingHashtags = [
    { tag: "#LGBTQRights", tweets: "25.4k", sentiment: "87%" },
    { tag: "#LoveIsLove", tweets: "19.8k", sentiment: "91%" },
    { tag: "#PrideGhana", tweets: "16.2k", sentiment: "89%" },
    { tag: "#InclusionForAll", tweets: "12.7k", sentiment: "93%" },
  ];

  const supportServices = [
    {
      name: "LGBTQ+ Rights Ghana",
      description:
        "Advocacy organization fighting for LGBTQ+ rights and equality",
      services: [
        "Legal Support",
        "Advocacy",
        "Community Building",
        "Education",
      ],
      hotline: "+233-244-777-888",
      email: "support@lgbtqrights.gh",
      website: "",
    },
    {
      name: "Safe Spaces Network",
      description:
        "Creating safe, welcoming spaces for LGBTQ+ individuals across Ghana",
      services: ["Safe Spaces", "Support Groups", "Counseling", "Referrals"],
      hotline: "+233-302-444-555",
      email: "info@safespaces.gh",
      website: "",
    },
    {
      name: "Pride Counseling Services",
      description: "LGBTQ+-affirming mental health and counseling services",
      services: ["Counseling", "Therapy", "Crisis Support", "Family Support"],
      hotline: "+233-244-222-444",
      email: "counseling@pride.gh",
      website: "",
    },
  ];

  const heroTitle =
    typeof focusArea?.title === "string" && focusArea.title.trim()
      ? focusArea.title.trim()
      : "LGBTQ+ Communities";
  const heroDescription =
    typeof focusArea?.description === "string" && focusArea.description.trim()
      ? focusArea.description.trim()
      : "Supporting inclusion, celebrating diversity, and fighting for equal\n            rights. Every person deserves to live authentically with dignity and\n            respect.";
  const heroImageSrc =
    typeof focusArea?.images?.[0] === "string" && focusArea.images[0].trim()
      ? focusArea.images[0]
      : lgbtqImage;

  const primaryStatValue =
    typeof focusArea?.statsValue === "string" && focusArea.statsValue.trim()
      ? focusArea.statsValue.trim()
      : "5-10%";
  const primaryStatLabel =
    typeof focusArea?.statsLabel === "string" && focusArea.statsLabel.trim()
      ? focusArea.statsLabel.trim()
      : "Population estimate";

  const inspiringStoriesData =
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
      : inspiringStories;

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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative h-80 mb-8 rounded-lg overflow-hidden">
            <img
              src={heroImageSrc}
              alt="LGBTQ+ Communities in Ghana"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-lgbtq/90 rounded-lg mb-4">
                <Palette className="h-8 w-8 text-white" />
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
              <div className="text-3xl font-bold text-theme-lgbtq mb-2">
                {primaryStatValue}
              </div>
              <p className="text-sm text-muted-foreground">
                {primaryStatLabel}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-lgbtq mb-2">
                54k
              </div>
              <p className="text-sm text-muted-foreground">Social Mentions</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-lgbtq mb-2">12</div>
              <p className="text-sm text-muted-foreground">Support Groups</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-lgbtq mb-2">
                89%
              </div>
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
              Amplifying voices and building momentum for LGBTQ+ rights and
              acceptance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingHashtags.map((hashtag, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-lg font-mono text-theme-lgbtq">
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
        </section>

        {/* Inspiring Stories */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Inspiring Stories</h2>
            <p className="text-lg text-muted-foreground">
              Lived experiences from LGBTQ+ advocates driving change across
              Ghana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {inspiringStoriesData.map((story, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-theme-lgbtq/10 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-theme-lgbtq" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{story.name}</CardTitle>
                      {story.hashtag ? (
                        <Badge className="bg-theme-lgbtq/10 text-theme-lgbtq">
                          {story.hashtag}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{story.story}</p>
                  {story.impact ? (
                    <div className="flex items-center space-x-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        {story.impact}
                      </span>
                    </div>
                  ) : null}
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
              Influential advocates building bridges and fighting for LGBTQ+
              rights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyVoices.map((influencer, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-theme-lgbtq/10 rounded-full flex items-center justify-center mx-auto">
                    <Palette className="h-6 w-6 text-theme-lgbtq" />
                  </div>
                  <div>
                    <div className="font-semibold text-theme-lgbtq">
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
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Supporting Organizations
            </h2>
            <p className="text-lg text-muted-foreground">
              Safe spaces and support services for LGBTQ+ individuals and their
              families.
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
                        <Phone className="h-4 w-4 text-theme-lgbtq" />
                        <span className="font-semibold text-theme-lgbtq">
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
                  <Button className="w-full bg-theme-lgbtq hover:bg-theme-lgbtq/90 text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Get Support
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
