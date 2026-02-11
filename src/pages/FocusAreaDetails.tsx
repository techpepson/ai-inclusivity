import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ExternalLink,
  FileText,
  Heart,
  Palette,
  Shield,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchFocusAreaById } from "@/lib/api-client";
import type { FocusArea } from "@/lib/types";
import heroImage from "@/assets/hero-ai-advocacy.jpg";
import disabilityImage from "@/assets/disability-tech-inclusion.jpg";
import womenImage from "@/assets/women-empowerment.jpg";
import mentalHealthImage from "@/assets/mental-health-support.jpg";
import lgbtqImage from "@/assets/lgbtq-community.jpg";

function pickDefaultImage(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("disabil")) return disabilityImage;
  if (
    lower.includes("violence") ||
    lower.includes("vaw") ||
    lower.includes("women")
  ) {
    return womenImage;
  }
  if (lower.includes("mental") || lower.includes("wellness"))
    return mentalHealthImage;
  if (lower.includes("lgbt") || lower.includes("queer")) return lgbtqImage;
  return heroImage;
}

function pickIcon(title: string, hashTag: string) {
  const t = title.toLowerCase();
  const h = hashTag.toLowerCase();
  if (t.includes("disabil") || h.includes("disabil")) return Users;
  if (
    t.includes("violence") ||
    t.includes("women") ||
    t.includes("vaw") ||
    h.includes("vaw")
  )
    return Shield;
  if (t.includes("mental") || t.includes("wellness")) return Heart;
  if (t.includes("lgbt") || t.includes("queer") || h.includes("lgbt"))
    return Palette;
  return FileText;
}

function formatFollowers(value?: number | null) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
  return String(value);
}

export default function FocusAreaDetails() {
  const { id } = useParams();
  const [focusArea, setFocusArea] = useState<FocusArea | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        if (!id) {
          if (active) setNotFound(true);
          return;
        }

        const fa = await fetchFocusAreaById(id);
        if (!active) return;

        if (!fa) {
          setNotFound(true);
          return;
        }

        setFocusArea(fa);
      } catch (_) {
        if (active) setNotFound(true);
      }
    })();

    return () => {
      active = false;
    };
  }, [id]);

  const header = useMemo(() => {
    const title = focusArea?.title ?? "Focus Area";
    const hashTag = focusArea?.hashTag ?? "";
    const Icon = pickIcon(title, hashTag);

    const img =
      focusArea?.images && focusArea.images.length > 0 && focusArea.images[0]
        ? focusArea.images[0]
        : pickDefaultImage(title);

    return { title, hashTag, Icon, img };
  }, [focusArea]);

  if (notFound) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold">Focus area not found</h1>
            <p className="text-muted-foreground">
              This focus area doesn’t exist (or the server didn’t return it).
            </p>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!focusArea) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-muted-foreground">
            Loading focus area…
          </div>
        </div>
      </div>
    );
  }

  const KeyIcon = header.Icon;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="relative h-80 mb-8 rounded-lg overflow-hidden">
            <img
              src={header.img}
              alt={header.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/90 rounded-lg mb-4">
                <KeyIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {header.title}
              </h1>
              {header.hashTag ? (
                <Badge className="bg-white/10 text-white border-white/20">
                  {header.hashTag}
                </Badge>
              ) : null}
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {focusArea.description}
          </p>
        </div>

        {/* Stats (optional) */}
        {focusArea.statsValue || focusArea.statsLabel ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="bg-gradient-card border-0 text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {focusArea.statsValue || "—"}
                </div>
                <p className="text-sm text-muted-foreground">
                  {focusArea.statsLabel || "Statistic"}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Inspiring Stories */}
        {Array.isArray(focusArea.inspiringStories) &&
        focusArea.inspiringStories.length > 0 ? (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Inspiring Stories</h2>
              <p className="text-lg text-muted-foreground">
                Stories associated with this focus area.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {focusArea.inspiringStories.map((story) => (
                <Card key={story.id} className="bg-gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl">{story.speaker}</CardTitle>
                    <CardDescription>Story</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{story.story}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        {/* Key Voices */}
        {Array.isArray(focusArea.keyVoices) &&
        focusArea.keyVoices.length > 0 ? (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Key Voices</h2>
              <p className="text-lg text-muted-foreground">
                People and organizations shaping this conversation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {focusArea.keyVoices.map((kv) => {
                const followers = formatFollowers(kv.followers);
                return (
                  <Card key={kv.id} className="bg-gradient-card border-0">
                    <CardContent className="pt-6 text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <KeyIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="font-semibold text-primary">
                        {kv.name}
                      </div>
                      {followers ? (
                        <div className="text-sm text-muted-foreground">
                          {followers} followers
                        </div>
                      ) : null}
                      <div className="text-xs text-muted-foreground">
                        {kv.description}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* Supporting Organizations */}
        {Array.isArray(focusArea.supportingOrganizations) &&
        focusArea.supportingOrganizations.length > 0 ? (
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Supporting Organizations
              </h2>
              <p className="text-lg text-muted-foreground">
                Connect with organizations associated with this focus area.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {focusArea.supportingOrganizations.map((org) => (
                <Card key={org.id} className="bg-gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl">{org.name}</CardTitle>
                    <CardDescription>{org.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {org.email ? (
                        <div>
                          <strong>Email:</strong> {org.email}
                        </div>
                      ) : null}
                      {org.website ? (
                        <div>
                          <strong>Website:</strong> {org.website}
                        </div>
                      ) : null}
                    </div>

                    {org.website ? (
                      <a href={org.website} target="_blank" rel="noreferrer">
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Website
                        </Button>
                      </a>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
