import {
  Users,
  Heart,
  ArrowRight,
  CheckCircle,
  Target,
  TrendingUp,
  Globe,
  Star,
  Zap,
  Award,
  Mail,
  Phone,
  MapPin,
  Send,
  Megaphone,
  Handshake,
  Check,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sendContactMessage } from "@/lib/api-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import campaignImage from "@/assets/team-collaboration.jpg";
import { logo } from "@/images/images";
import { SiteFooter } from "@/components/SiteFooter";

const HERO_STATS = [
  { icon: Target, value: "45+", label: "Active Campaigns" },
  { icon: Users, value: "2.5M+", label: "People Reached" },
  { icon: TrendingUp, value: "89%", label: "Engagement Rate" },
  { icon: Globe, value: "16", label: "Regions Covered" },
];

const FEATURED_CAMPAIGNS = [
  {
    title: "#InclusionMatters",
    description:
      "Promoting disability rights and accessibility across Ghana. This campaign focuses on creating awareness about the challenges faced by persons with disabilities.",
    category: "Disability Rights",
    participants: "15.2k",
    reach: "450K+",
    progress: 78,
    hashtags: [
      "#InclusionMatters",
      "#DisabilityRightsGH",
      "#AccessibilityFirst",
    ],
    impact: "32 accessibility policies proposed",
  },
  {
    title: "#BreakTheStigma",
    description:
      "Mental health awareness and support initiative. Working to normalize conversations about mental health and connect people with resources.",
    category: "Mental Health",
    participants: "12.8k",
    reach: "380K+",
    progress: 65,
    hashtags: ["#BreakTheStigma", "#MentalHealthGH", "#WellnessMatters"],
    impact: "18 counseling centers partnered",
  },
  {
    title: "#EndVAW",
    description:
      "Fighting violence against women through education, awareness, and advocacy for stronger protective legislation.",
    category: "Women's Rights",
    participants: "18.5k",
    reach: "520K+",
    progress: 82,
    hashtags: ["#EndVAW", "#StandWithWomen", "#GBVAwareness"],
    impact: "45% increase in reported cases",
  },
  {
    title: "#PrideGhana",
    description:
      "Advocating for Sexual and Gender minority community rights, equality, and protection from discrimination. Building a more accepting society.",
    category: "SGMC Rights",
    participants: "8.5k",
    reach: "280K+",
    progress: 55,
    hashtags: ["#PrideGhana", "#LoveIsLove", "#EqualityForAll"],
    impact: "12 organizations joined coalition",
  },
];

const WAYS_TO_HELP = [
  {
    icon: Megaphone,
    title: "Become an Advocate",
    description:
      "Join our team of advocates and help amplify important conversations across Ghana.",
    benefits: [
      "Flexible scheduling",
      "Training provided",
      "Networking opportunities",
      "Certificate of service",
    ],
    cta: "Apply to Volunteer",
    type: "volunteer",
    bgColor: "bg-primary",
  },
  {
    icon: Handshake,
    title: "Partner with Us",
    description:
      "Organizations and institutions can collaborate with us to drive systemic change.",
    benefits: [
      "Co-branded campaigns",
      "Data insights",
      "Joint advocacy",
      "Policy influence",
    ],
    cta: "Become a Partner",
    type: "partner",
    bgColor: "bg-secondary",
  },
];

const IMPACT_METRICS = [
  {
    value: "2.5M+",
    label: "People Reached",
    description: "Across all campaigns",
  },
  {
    value: "45+",
    label: "Active Campaigns",
    description: "Running simultaneously",
  },
  {
    value: "500+",
    label: "Partner Organizations",
    description: "Working together",
  },
  { value: "16", label: "Regions Covered", description: "Nationwide presence" },
];

const SIGNUP_BENEFITS = [
  {
    icon: Check,
    text: "Launch Campaigns",
    description: "Start your own advocacy initiatives",
  },
  {
    icon: Check,
    text: "Track Impact",
    description: "Real-time analytics on your efforts",
  },
  {
    icon: Check,
    text: "Build Network",
    description: "Connect with fellow advocates",
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

export default function GetInvolved() {
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [getStartedForm, setGetStartedForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    why: "",
  });
  const [partnerForm, setPartnerForm] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    why: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGetStartedInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setGetStartedForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetStartedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fullName = `${getStartedForm.firstName} ${getStartedForm.lastName}`
        .replace(/\s+/g, " ")
        .trim();

      await sendContactMessage({
        name: fullName,
        email: getStartedForm.email,
        subject: "Get Involved - Ready to Get Started",
        message: getStartedForm.message,
      });

      alert("Thank you! We'll be in touch within 24 hours.");
      setGetStartedForm({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting get started form:", error);
      alert(
        "There was an error submitting your application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVolunteerInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setVolunteerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePartnerInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPartnerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const messageLines = [
        volunteerForm.why?.trim()
          ? `Why I want to volunteer: ${volunteerForm.why.trim()}`
          : null,
      ].filter(Boolean);

      await sendContactMessage({
        name: volunteerForm.name,
        email: volunteerForm.email,
        phone: volunteerForm.phone || null,
        subject: "Volunteer Application",
        message: messageLines.join("\n"),
      });

      alert("Thank you! We'll review your application and be in touch soon.");
      setVolunteerModalOpen(false);
      setVolunteerForm({ name: "", email: "", phone: "", why: "" });
    } catch (error) {
      console.error("Error submitting volunteer form:", error);
      alert(
        "There was an error submitting your application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const messageLines = [
        partnerForm.organizationName?.trim()
          ? `Organization: ${partnerForm.organizationName.trim()}`
          : null,
        partnerForm.contactPerson?.trim()
          ? `Contact person: ${partnerForm.contactPerson.trim()}`
          : null,
        partnerForm.why?.trim()
          ? `Partnership details: ${partnerForm.why.trim()}`
          : null,
      ].filter(Boolean);

      await sendContactMessage({
        name: partnerForm.contactPerson || partnerForm.organizationName,
        email: partnerForm.email,
        phone: partnerForm.phone || null,
        subject: "Partnership Proposal",
        message: messageLines.join("\n"),
      });

      alert(
        "Thank you! We'll review your partnership proposal and be in touch soon.",
      );
      setPartnerModalOpen(false);
      setPartnerForm({
        organizationName: "",
        contactPerson: "",
        email: "",
        phone: "",
        why: "",
      });
    } catch (error) {
      console.error("Error submitting partner form:", error);
      alert("There was an error submitting your proposal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWayClick = (type: string) => {
    if (type === "volunteer") {
      setVolunteerModalOpen(true);
    } else if (type === "partner") {
      setPartnerModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={campaignImage}
            alt="Campaigns"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/65"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-5 py-2 mb-8 animate-fade-in-down">
            <span className="text-sm font-medium">Join the Movement</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            Campaigns That <span className="text-yellow-400">Drive Change</span>
          </h1>

          {/* Description */}
          <p
            className="text-lg lg:text-xl text-white/90 mb-10 max-w-3xl mx-auto animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Join our advocacy campaigns using AI-powered insights. Every voice
            matters, every action counts in building a more inclusive Ghana.
          </p>

          {/* Hero Stats */}
          <div
            className="flex flex-wrap justify-center gap-6 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            {HERO_STATS.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <stat.icon className="h-5 w-5 text-yellow-400" />
                <span className="font-bold text-white">{stat.value}</span>
                <span className="text-white/80 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured <span className="text-primary">Campaigns</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our active campaigns and help drive meaningful change in
              communities across Ghana
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURED_CAMPAIGNS.map((campaign, index) => (
              <Card
                key={index}
                className="border border-border/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                        {campaign.category}
                      </Badge>
                      <h3 className="text-2xl font-bold">{campaign.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {campaign.reach}
                      </div>
                      <div className="text-sm text-muted-foreground">Reach</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {campaign.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Campaign Progress
                      </span>
                      <span className="font-medium">{campaign.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        {campaign.participants} participants
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        {campaign.impact}
                      </span>
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {campaign.hashtags.map((hashtag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-mono"
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Join Campaign
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Campaigns
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ways to Make a <span className="text-primary">Difference</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to contribute to our mission of inclusion
              and social justice
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {WAYS_TO_HELP.map((way, index) => (
              <Card
                key={index}
                className="border border-border/50 overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${way.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <way.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{way.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {way.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {way.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handleWayClick(way.type)}
                  >
                    {way.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        {/* Animated background pattern */}
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
          <div
            className="absolute bottom-10 right-1/3 w-16 h-16 bg-white rounded-full animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Collective Impact
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Together, we're creating measurable change across Ghana
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {IMPACT_METRICS.map((metric, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-medium mb-1">{metric.label}</div>
                <div className="text-sm opacity-80">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Form */}
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Ready to Get Started?
                </CardTitle>
                <CardDescription>
                  Tell us how you'd like to get involved and we'll be in touch
                  within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGetStartedSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        First Name *
                      </label>
                      <Input
                        name="firstName"
                        placeholder="First name"
                        value={getStartedForm.firstName}
                        onChange={handleGetStartedInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name *</label>
                      <Input
                        name="lastName"
                        placeholder="Last name"
                        value={getStartedForm.lastName}
                        onChange={handleGetStartedInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={getStartedForm.email}
                      onChange={handleGetStartedInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      How would you like to get involved? *
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your interests, skills, or how you'd like to contribute..."
                      rows={4}
                      value={getStartedForm.message}
                      onChange={handleGetStartedInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* CTA Side */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Join Our Growing{" "}
                  <span className="text-primary">Community</span>
                </h3>
                <p className="text-muted-foreground text-lg">
                  Whether you're an individual advocate, organization, or
                  policymaker, there's a place for you in our movement for a
                  more inclusive Ghana.
                </p>
              </div>

              <div className="space-y-4">
                {SIGNUP_BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">{benefit.text}</h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="outline">Learn More About Us</Button>
                <Button className="bg-primary hover:bg-primary/90">
                  Create Free Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />

      {/* Volunteer Modal */}
      <Dialog open={volunteerModalOpen} onOpenChange={setVolunteerModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply to Become a Volunteer</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll review your application. We'll
              be in touch within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVolunteerSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name *</label>
              <Input
                name="name"
                placeholder="Enter your full name"
                value={volunteerForm.name}
                onChange={handleVolunteerInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address *</label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={volunteerForm.email}
                onChange={handleVolunteerInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number *</label>
              <Input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={volunteerForm.phone}
                onChange={handleVolunteerInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Why do you want to volunteer? *
              </label>
              <Textarea
                name="why"
                placeholder="Tell us about your motivation and how you'd like to contribute..."
                value={volunteerForm.why}
                onChange={handleVolunteerInputChange}
                rows={4}
                required
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setVolunteerModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Partner Modal */}
      <Dialog open={partnerModalOpen} onOpenChange={setPartnerModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Partnership Proposal</DialogTitle>
            <DialogDescription>
              Tell us about your organization and how we can collaborate. We'll
              be in touch within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePartnerSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Organization Name *</label>
              <Input
                name="organizationName"
                placeholder="Enter your organization name"
                value={partnerForm.organizationName}
                onChange={handlePartnerInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Contact Person Name *
              </label>
              <Input
                name="contactPerson"
                placeholder="Enter the contact person's name"
                value={partnerForm.contactPerson}
                onChange={handlePartnerInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address *</label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={partnerForm.email}
                onChange={handlePartnerInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number *</label>
              <Input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={partnerForm.phone}
                onChange={handlePartnerInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                How would you like to partner with us? *
              </label>
              <Textarea
                name="why"
                placeholder="Tell us about your organization, goals, and how we can collaborate..."
                value={partnerForm.why}
                onChange={handlePartnerInputChange}
                rows={4}
                required
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPartnerModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
