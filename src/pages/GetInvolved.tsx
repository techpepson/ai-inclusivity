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
      <footer className="bg-slate-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={logo}
                  alt="AI4InclusiveGh logo"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">AI4InclusiveGh</h3>
                </div>
              </div>
              <p className="text-slate-300 mb-6 text-sm">
                Using artificial intelligence and social media analytics to
                amplify voices, track advocacy trends, and drive policy change
                for marginalized communities in Ghana.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>ai4inclusiveghana@ug.edu.gh</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+233 (0) 50 123 4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Accra, Ghana</span>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Platform</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-300 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h3 className="font-bold text-lg mb-6">Get Involved</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setVolunteerModalOpen(true)}
                    className="text-slate-300 hover:text-primary transition-colors text-sm"
                  >
                    Volunteer
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPartnerModalOpen(true)}
                    className="text-slate-300 hover:text-primary transition-colors text-sm"
                  >
                    Partner With Us
                  </button>
                </li>
                <li>
                  <Link
                    to="/community"
                    className="text-slate-300 hover:text-primary transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-lg mb-6">Stay Updated</h3>
              <p className="text-slate-300 mb-4 text-sm">
                Subscribe to receive monthly reports on advocacy trends and
                campaign results.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 text-sm"
                />
                <button className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">
                © 2026 AI4InclusiveGh. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
                {/* Legal Links */}
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Use
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    Ethics & AI
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
