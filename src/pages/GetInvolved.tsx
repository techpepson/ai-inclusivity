import { Users, Heart, Share2, DollarSign, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function GetInvolved() {
  const ways = [
    {
      icon: Users,
      title: "Become a Volunteer",
      description: "Join our team of advocates and help amplify important conversations across Ghana.",
      benefits: ["Flexible scheduling", "Training provided", "Networking opportunities", "Certificate of service"],
      cta: "Apply to Volunteer"
    },
    {
      icon: Heart,
      title: "Partner with Us",
      description: "Organizations and institutions can collaborate with us to drive systemic change.",
      benefits: ["Co-branded campaigns", "Data insights", "Joint advocacy", "Policy influence"],
      cta: "Become a Partner"
    },
    {
      icon: Share2,
      title: "Amplify Our Message",
      description: "Help spread awareness by sharing our campaigns and using our hashtags.",
      benefits: ["Ready-made content", "Hashtag toolkits", "Social media guides", "Community recognition"],
      cta: "Get Social Kit"
    },
    {
      icon: DollarSign,
      title: "Support Our Mission",
      description: "Your donations help us expand our reach and develop new advocacy tools.",
      benefits: ["Tax deductible", "Impact reports", "Donor recognition", "Exclusive updates"],
      cta: "Donate Now"
    }
  ];

  const campaigns = [
    {
      title: "#InclusionMatters",
      description: "Promoting disability rights and accessibility",
      participants: "15.2k",
      hashtags: ["#InclusionMatters", "#DisabilityRightsGH", "#AccessibilityFirst"]
    },
    {
      title: "#BreakTheStigma",
      description: "Mental health awareness and support",
      participants: "12.8k",
      hashtags: ["#BreakTheStigma", "#MentalHealthGH", "#WellnessMatters"]
    },
    {
      title: "#EndVAW",
      description: "Fighting violence against women",
      participants: "18.5k",
      hashtags: ["#EndVAW", "#StandWithWomen", "#GBVAwareness"]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get Involved</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of advocates, organizations, and changemakers working toward a more inclusive Ghana. 
            Every voice matters, every action counts.
          </p>
        </div>

        {/* Ways to Get Involved */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ways to Make a Difference</h2>
            <p className="text-lg text-muted-foreground">
              Choose how you'd like to contribute to our mission of inclusion and social justice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ways.map((way, index) => (
              <Card key={index} className="bg-gradient-card border-0 hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <way.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{way.title}</CardTitle>
                      <CardDescription>{way.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    {way.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-hero hover:opacity-90">
                    {way.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Active Campaigns */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Active Campaigns</h2>
            <p className="text-lg text-muted-foreground">
              Participate in ongoing advocacy campaigns by using our hashtags and sharing content.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl">{campaign.title}</CardTitle>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <strong>{campaign.participants}</strong> participants
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {campaign.hashtags.map((hashtag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-mono">
                        {hashtag}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Campaign
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
                <CardDescription>
                  Tell us how you'd like to get involved and we'll be in touch within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Enter your email address" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">How would you like to get involved?</label>
                  <Textarea 
                    placeholder="Tell us about your interests, skills, or how you'd like to contribute..."
                    rows={4}
                  />
                </div>
                
                <Button className="w-full bg-gradient-hero hover:opacity-90">
                  Submit Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}