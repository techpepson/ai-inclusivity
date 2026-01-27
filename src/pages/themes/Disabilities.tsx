import { Users, TrendingUp, ExternalLink, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import disabilityImage from "@/assets/disability-tech-inclusion.jpg";

export default function Disabilities() {
  const stories = [
    {
      name: "Akosua Mensah",
      story:
        "After losing her sight at age 25, Akosua became a powerful advocate for digital accessibility in Ghana's tech sector.",
      impact: "Led 3 major accessibility audits",
      hashtag: "#AccessibilityFirst",
    },
    {
      name: "Kwame Osei",
      story:
        "Born with cerebral palsy, Kwame fights for inclusive infrastructure and has influenced policy changes in Accra.",
      impact: "12 accessible buildings implemented",
      hashtag: "#InclusionMatters",
    },
  ];

  const keyInfluencers = [
    {
      name: "@GhanaDisabilityRights",
      followers: "125k",
      focus: "Policy Advocacy",
    },
    { name: "@AccessibleGhana", followers: "89k", focus: "Infrastructure" },
    {
      name: "@InclusiveTechGH",
      followers: "67k",
      focus: "Digital Accessibility",
    },
    { name: "@PwDVoicesGH", followers: "54k", focus: "Community Stories" },
  ];

  const trendingHashtags = [
    { tag: "#InclusionMatters", tweets: "45.2k", sentiment: "89%" },
    { tag: "#DisabilityRightsGH", tweets: "29.8k", sentiment: "82%" },
    { tag: "#AccessibilityFirst", tweets: "18.5k", sentiment: "91%" },
    { tag: "#PwDVoices", tweets: "12.3k", sentiment: "95%" },
  ];

  const resources = [
    {
      title: "Ghana Federation of Disability Organizations",
      description:
        "National umbrella organization representing 17 disability groups",
      contact: "info@gfdo.org.gh",
      services: ["Advocacy", "Policy Reform", "Legal Support"],
    },
    {
      title: "Enablement Initiative",
      description: "Promoting digital accessibility and inclusive technology",
      contact: "hello@enablement.org",
      services: ["Tech Training", "Web Accessibility", "Digital Inclusion"],
    },
    {
      title: "Centre for Disability & Rehabilitation Studies",
      description: "Research and advocacy for disability rights in Ghana",
      contact: "cdrs@ug.edu.gh",
      services: ["Research", "Training", "Community Programs"],
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative h-80 mb-8 rounded-lg overflow-hidden">
            <img
              src={disabilityImage}
              alt="Persons with Disabilities in Ghana"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-disability/90 rounded-lg mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Persons with Disabilities
              </h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advocating for the rights, inclusion, and full participation of
            persons with disabilities in Ghanaian society. Together, we're
            building a more accessible and inclusive Ghana for all.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-disability mb-2">
                3.2M
              </div>
              <p className="text-sm text-muted-foreground">PwDs in Ghana</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-disability mb-2">
                15%
              </div>
              <p className="text-sm text-muted-foreground">of Population</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-disability mb-2">
                125k
              </div>
              <p className="text-sm text-muted-foreground">Social Mentions</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-disability mb-2">
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
              The most active hashtags driving disability rights discussions in
              Ghana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingHashtags.map((hashtag, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-lg font-mono text-theme-disability">
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

        {/* Stories & Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Inspiring Stories</h2>
            <p className="text-lg text-muted-foreground">
              Real stories from persons with disabilities making a difference in
              Ghana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-theme-disability/10 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-theme-disability" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{story.name}</CardTitle>
                      <Badge className="bg-theme-disability/10 text-theme-disability">
                        {story.hashtag}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{story.story}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">
                      {story.impact}
                    </span>
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
              Influential advocates and organizations leading the disability
              rights movement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyInfluencers.map((influencer, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-theme-disability/10 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-6 w-6 text-theme-disability" />
                  </div>
                  <div>
                    <div className="font-semibold text-theme-disability">
                      {influencer.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {influencer.followers} followers
                    </div>
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
              Connect with organizations providing support and advocacy for
              persons with disabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <strong>Contact:</strong> {resource.contact}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resource.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Learn More
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
