import {
  Users,
  Heart,
  Share2,
  DollarSign,
  ArrowRight,
  CheckCircle,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  const ways = [
    {
      icon: Users,
      title: "Become a Volunteer",
      description:
        "Join our team of advocates and help amplify important conversations across Ghana.",
      benefits: [
        "Flexible scheduling",
        "Training provided",
        "Networking opportunities",
        "Certificate of service",
      ],
      cta: "Apply to Volunteer",
      action: () => setVolunteerModalOpen(true),
    },
    {
      icon: Heart,
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
      action: () => setPartnerModalOpen(true),
    },
    // {
    //   icon: Share2,
    //   title: "Amplify Our Message",
    //   description:
    //     "Help spread awareness by sharing our campaigns and using our hashtags.",
    //   benefits: [
    //     "Ready-made content",
    //     "Hashtag toolkits",
    //     "Social media guides",
    //     "Community recognition",
    //   ],
    //   cta: "Get Social Kit",
    // },
    // {
    //   icon: DollarSign,
    //   title: "Support Our Mission",
    //   description:
    //     "Your donations help us expand our reach and develop new advocacy tools.",
    //   benefits: [
    //     "Tax deductible",
    //     "Impact reports",
    //     "Donor recognition",
    //     "Exclusive updates",
    //   ],
    //   cta: "Donate Now",
    // },
  ];

  const campaigns = [
    {
      title: "#InclusionMatters",
      description: "Promoting disability rights and accessibility",
      participants: "15.2k",
      hashtags: [
        "#InclusionMatters",
        "#DisabilityRightsGH",
        "#AccessibilityFirst",
      ],
    },
    {
      title: "#BreakTheStigma",
      description: "Mental health awareness and support",
      participants: "12.8k",
      hashtags: ["#BreakTheStigma", "#MentalHealthGH", "#WellnessMatters"],
    },
    {
      title: "#EndVAW",
      description: "Fighting violence against women",
      participants: "18.5k",
      hashtags: ["#EndVAW", "#StandWithWomen", "#GBVAwareness"],
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get Involved</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of advocates, organizations, and changemakers working
            toward a more inclusive Ghana. Every voice matters, every action
            counts.
          </p>
        </div>

        {/* Ways to Get Involved */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Ways to Make a Difference
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose how you'd like to contribute to our mission of inclusion
              and social justice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ways.map((way, index) => (
              <Card
                key={index}
                className="bg-gradient-card border-0 hover:shadow-card transition-all duration-300"
              >
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
                  <Button
                    className="w-full bg-gradient-hero hover:opacity-90"
                    onClick={way.action}
                  >
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
            <h2 className="text-3xl font-bold mb-4">
              Join Our Active Campaigns
            </h2>
            <p className="text-lg text-muted-foreground">
              Participate in ongoing advocacy campaigns by using our hashtags
              and sharing content.
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
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-mono"
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>
                  {/* <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Campaign
                  </Button> */}
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
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input
                        name="firstName"
                        placeholder="Enter your first name"
                        value={getStartedForm.firstName}
                        onChange={handleGetStartedInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input
                        name="lastName"
                        placeholder="Enter your last name"
                        value={getStartedForm.lastName}
                        onChange={handleGetStartedInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
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
                      How would you like to get involved?
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
                    className="w-full bg-gradient-hero hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

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
                  className="bg-gradient-hero hover:opacity-90"
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
                Tell us about your organization and how we can collaborate.
                We'll be in touch within 24 hours.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePartnerSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Organization Name *
                </label>
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
                  className="bg-gradient-hero hover:opacity-90"
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
    </div>
  );
}
