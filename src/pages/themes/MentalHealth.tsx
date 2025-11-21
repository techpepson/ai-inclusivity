import { Heart, TrendingUp, ExternalLink, Phone, Brain } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import mentalHealthImage from "@/assets/mental-health-support.jpg";

export default function MentalHealth() {
  const campaigns = [
    {
      name: "#BreakTheStigma",
      reach: "3.1M people",
      engagement: "125k interactions",
      description:
        "National campaign promoting mental health awareness and reducing stigma",
    },
    {
      name: "#MentalHealthAwareness",
      reach: "2.4M people",
      engagement: "98k interactions",
      description:
        "Educational initiative sharing mental health resources and stories",
    },
    {
      name: "#WellnessMatters",
      reach: "1.9M people",
      engagement: "76k interactions",
      description:
        "Holistic wellness campaign focusing on mental, physical, and social health",
    },
  ];

  const keyInfluencers = [
    {
      name: "@MentalHealthGH",
      followers: "87k",
      focus: "Education & Awareness",
    },
    { name: "@WellnessAdvocate", followers: "72k", focus: "Community Support" },
    { name: "@TherapyGhana", followers: "65k", focus: "Professional Services" },
    { name: "@MindCareGH", followers: "59k", focus: "Youth Mental Health" },
  ];

  const trendingHashtags = [
    { tag: "#BreakTheStigma", tweets: "38.7k", sentiment: "92%" },
    { tag: "#MentalHealthAwareness", tweets: "27.3k", sentiment: "89%" },
    { tag: "#WellnessMatters", tweets: "22.1k", sentiment: "94%" },
    { tag: "#ItsOkayToNotBeOkay", tweets: "18.5k", sentiment: "96%" },
  ];

  const supportServices = [
    {
      name: "Ghana Mental Health Authority",
      description:
        "National authority providing mental health policy and coordination",
      services: [
        "Policy Development",
        "Training",
        "Public Education",
        "Advocacy",
      ],
      hotline: "+233-302-234-567",
      email: "info@mentalhealth.gov.gh",
    },
    {
      name: "Mindcare Ghana",
      description:
        "NGO providing accessible mental health support and counseling",
      services: [
        "Counseling",
        "Support Groups",
        "Crisis Intervention",
        "Referrals",
      ],
      hotline: "+233-244-348-888",
      email: "support@mindcare.gh",
    },
    {
      name: "Crisis Helpline Ghana",
      description: "24/7 confidential support for mental health crises",
      services: [
        "Crisis Support",
        "Emotional Support",
        "Information",
        "Referrals",
      ],
      hotline: "18555 (Toll-free)",
      email: "crisis@helpline.gh",
    },
  ];

  const mentalHealthFacts = [
    "1 in 4 people experience mental health issues in their lifetime",
    "Depression affects over 300 million people worldwide",
    "Mental health conditions are treatable with proper support",
    "Seeking help is a sign of strength, not weakness",
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative h-80 mb-8 rounded-lg overflow-hidden">
            <img
              src={mentalHealthImage}
              alt="Mental Health and Wellness support in Ghana"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-mental/90 rounded-lg mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Mental Health & Wellness
              </h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Breaking stigma and promoting mental wellness for all. Creating
            supportive communities where mental health is prioritized and every
            individual can thrive.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-mental mb-2">
                1 in 4
              </div>
              <p className="text-sm text-muted-foreground">
                People affected annually
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-mental mb-2">
                98k
              </div>
              <p className="text-sm text-muted-foreground">Social Mentions</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-mental mb-2">
                24/7
              </div>
              <p className="text-sm text-muted-foreground">Crisis Support</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-mental mb-2">
                92%
              </div>
              <p className="text-sm text-muted-foreground">
                Positive Sentiment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mental Health Facts */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Understanding Mental Health
            </h2>
            <p className="text-lg text-muted-foreground">
              Important facts everyone should know about mental health and
              wellness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mentalHealthFacts.map((fact, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-theme-mental/10 rounded-full flex items-center justify-center mt-1">
                      <Brain className="h-5 w-5 text-theme-mental" />
                    </div>
                    <p className="text-lg">{fact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Hashtags */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Trending Conversations</h2>
            <p className="text-lg text-muted-foreground">
              Join the movement to normalize mental health discussions in Ghana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingHashtags.map((hashtag, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-lg font-mono text-theme-mental">
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

        {/* Active Campaigns */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Active Awareness Campaigns
            </h2>
            <p className="text-lg text-muted-foreground">
              Supporting mental health through education, advocacy, and
              community building.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl">{campaign.name}</CardTitle>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-theme-mental">
                        {campaign.reach}
                      </div>
                      <div className="text-muted-foreground">Reach</div>
                    </div>
                    <div>
                      <div className="font-semibold text-theme-mental">
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

        {/* Key Influencers */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Mental Health Advocates</h2>
            <p className="text-lg text-muted-foreground">
              Influential voices promoting mental wellness and breaking stigma.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyInfluencers.map((influencer, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-theme-mental/10 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-6 w-6 text-theme-mental" />
                  </div>
                  <div>
                    <div className="font-semibold text-theme-mental">
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

        {/* Support Services */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Mental Health Support Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional help and support are available. You don't have to
              face this alone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportServices.map((service, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-theme-mental" />
                      <span className="font-semibold text-theme-mental">
                        {service.hotline}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Email:</strong> {service.email}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.services.map((serviceType, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {serviceType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-theme-mental hover:bg-theme-mental/90 text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Get Support
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="bg-gradient-hero text-white border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                Your Mental Health Matters
              </CardTitle>
              <CardDescription className="text-white/90">
                Taking care of your mental health is just as important as your
                physical health. It's okay to not be okay, and it's okay to ask
                for help.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="text-xl font-semibold">
                  Crisis Support: 18555 (Toll-free)
                </div>
                <Button variant="secondary" size="lg">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Find Professional Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
