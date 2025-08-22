import { Shield, TrendingUp, ExternalLink, Phone, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VAW() {
  const campaigns = [
    {
      name: "#EndVAW Campaign",
      reach: "2.3M people",
      engagement: "89k interactions",
      description: "Month-long awareness campaign highlighting the need to end violence against women in Ghana"
    },
    {
      name: "#StandWithWomen",
      reach: "1.8M people", 
      engagement: "67k interactions",
      description: "Solidarity campaign supporting survivors and promoting women's safety"
    }
  ];

  const keyInfluencers = [
    { name: "@WomenAdvocateGH", followers: "98k", focus: "Policy Advocacy" },
    { name: "@SafeSpacesGhana", followers: "76k", focus: "Support Services" },
    { name: "@GBVAwareness", followers: "64k", focus: "Education & Awareness" },
    { name: "@WomensRightsGH", followers: "58k", focus: "Legal Rights" }
  ];

  const trendingHashtags = [
    { tag: "#EndVAW", tweets: "32.1k", sentiment: "78%" },
    { tag: "#StandWithWomen", tweets: "28.4k", sentiment: "85%" },
    { tag: "#GBVAwareness", tweets: "19.7k", sentiment: "82%" },
    { tag: "#WomensSafety", tweets: "15.2k", sentiment: "90%" }
  ];

  const supportServices = [
    {
      name: "Domestic Violence & Victim Support Unit (DOVVSU)",
      description: "Ghana Police Service specialized unit for domestic violence cases",
      services: ["24/7 Hotline", "Emergency Response", "Investigation", "Court Support"],
      hotline: "191 (Toll-free)",
      email: "dovvsu@ghanapolice.gov.gh"
    },
    {
      name: "Women's Rights Coalition Ghana",
      description: "Advocacy organization fighting for women's rights and gender equality",
      services: ["Legal Aid", "Counseling", "Advocacy", "Education"],
      hotline: "+233-302-123-456",
      email: "info@wrcghana.org"
    },
    {
      name: "Legal Aid for Women",
      description: "Free legal services for women experiencing violence and discrimination",  
      services: ["Legal Consultation", "Court Representation", "Documentation", "Referrals"],
      hotline: "+233-244-567-890",
      email: "legal@womensaid.gh"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Emergency Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Need Immediate Help?</AlertTitle>
          <AlertDescription className="text-red-700">
            If you or someone you know is in immediate danger, call <strong>191</strong> (DOVVSU Hotline) or <strong>999</strong> (Emergency Services) immediately.
          </AlertDescription>
        </Alert>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-vaw/10 rounded-lg mb-6">
            <Shield className="h-8 w-8 text-theme-vaw" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Violence Against Women</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fighting gender-based violence through awareness, advocacy, and support. Together, we're working 
            toward a Ghana where all women can live free from violence and fear.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-card border-0 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-theme-vaw mb-2">1 in 3</div>
              <p className="text-sm text-muted-foreground">Women experience GBV</p>
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
              <p className="text-sm text-muted-foreground">Positive Sentiment</p>
            </CardContent>
          </Card>
        </div>

        {/* Trending Hashtags */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Active Campaigns</h2>
            <p className="text-lg text-muted-foreground">
              Join the conversation and help amplify awareness about VAW prevention.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {trendingHashtags.map((hashtag, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-lg font-mono text-theme-vaw">{hashtag.tag}</div>
                    <div className="text-2xl font-bold">{hashtag.tweets}</div>
                    <div className="text-sm text-muted-foreground">tweets</div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
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
                      <div className="font-semibold text-theme-vaw">{campaign.reach}</div>
                      <div className="text-muted-foreground">Reach</div>
                    </div>
                    <div>
                      <div className="font-semibold text-theme-vaw">{campaign.engagement}</div>
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
            <h2 className="text-3xl font-bold mb-4">Leading Advocates</h2>
            <p className="text-lg text-muted-foreground">
              Influential voices driving the fight against gender-based violence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyInfluencers.map((influencer, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-theme-vaw/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-theme-vaw" />
                  </div>
                  <div>
                    <div className="font-semibold text-theme-vaw">{influencer.name}</div>
                    <div className="text-sm text-muted-foreground">{influencer.followers} followers</div>
                    <div className="text-xs text-muted-foreground mt-1">{influencer.focus}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Services */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Support Services & Helplines</h2>
            <p className="text-lg text-muted-foreground">
              If you need help or know someone who does, these organizations provide confidential support.
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
                      <Phone className="h-4 w-4 text-theme-vaw" />
                      <span className="font-semibold text-theme-vaw">{service.hotline}</span>
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
                  <Button className="w-full bg-theme-vaw hover:bg-theme-vaw/90 text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Get Help Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mt-16">
          <Card className="bg-gradient-hero text-white border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Remember: You Are Not Alone</CardTitle>
              <CardDescription className="text-white/90">
                Violence against women is never acceptable. If you're experiencing violence, 
                it's not your fault and help is available.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="text-2xl font-bold">Emergency: 999 | DOVVSU: 191</div>
                <Button variant="secondary" size="lg">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Find Local Support Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}