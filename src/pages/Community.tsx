import { useState } from "react";
import {
  MessageCircle,
  Users,
  Mail,
  Send,
  Award,
  Bell,
  Heart,
  Zap,
  Check,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import {
  fetchSocials,
  fetchTestimonials,
  sendContactMessage,
} from "@/lib/api-client";
import type { Event, Social, Testimonial } from "@/lib/types";
import { Link } from "react-router-dom";
import communityImage from "@/assets/team-collaboration.jpg";
import { logo } from "@/images/images";
import { SiteFooter } from "@/components/SiteFooter";

const DEFAULT_SOCIALS: Social[] = [
  {
    id: "1",
    platform: "Twitter",
    url: "https://twitter.com/AI4InclusiveGh",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    platform: "Facebook",
    url: "https://facebook.com/AI4InclusiveGhana",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    platform: "LinkedIn",
    url: "https://linkedin.com",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    platform: "Instagram",
    url: "https://instagram.com/ai4inclusivegh",
    createdAt: "",
    updatedAt: "",
  },
];

const HERO_STATS = [
  { icon: Users, value: "12,500+", label: "Active Members" },
  { icon: MessageCircle, value: "450+", label: "Daily Discussions" },
  { icon: Heart, value: "98%", label: "Satisfaction Rate" },
  { icon: Zap, value: "24/7", label: "Community Support" },
];

const MEMBER_BENEFITS = [
  {
    icon: MessageCircle,
    title: "Join Discussions",
    description:
      "Participate in meaningful conversations about social justice issues.",
    bgColor: "bg-primary",
  },
  {
    icon: Bell,
    title: "Campaign Updates",
    description:
      "Get real-time notifications about campaigns and their impact.",
    bgColor: "bg-secondary",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Earn badges and recognition for your advocacy contributions.",
    bgColor: "bg-primary",
  },
  {
    icon: Zap,
    title: "Make Impact",
    description:
      "Your voice matters in driving policy change and social progress.",
    bgColor: "bg-secondary",
  },
];

const TESTIMONIALS = [
  {
    name: "Akosua",
    role: "Mental Health",
    avatar: "A",
    quote:
      "AI4InclusiveGh has given us the data and insights we needed to make our mental health advocacy more effective. The platform is revolutionary!",
  },
  {
    name: "Kwame",
    role: "pwds",
    avatar: "K",
    quote:
      "Being part of this community has connected me with advocates nationwide. Together, we're making real change for persons with disabilities in Ghana.",
  },
  {
    name: "Ama",
    role: "VAW",
    avatar: "A",
    quote:
      "The analytics show us exactly where our message is resonating. This platform has transformed how we approach advocacy against gender-based violence.",
  },
  {
    name: "Kofi",
    role: "SGM",
    avatar: "K",
    quote:
      "Finally, a platform that combines data with heart. The community support here is incredible, and the tools help us measure real impact.",
  },
  {
    name: "Efua",
    role: "Engagement Lead",
    avatar: "E",
    quote:
      "The AI insights help us understand what messaging works best. We've seen our campaign reach grow by 300% since joining this platform.",
  },
  {
    name: "Yaw",
    role: "Insights Analyst",
    avatar: "Y",
    quote:
      "The data exports and reports are invaluable for our research. This platform bridges the gap between grassroots advocacy and policy change.",
  },
];

const SIGNUP_BENEFITS = [
  {
    icon: Check,
    text: "Free Forever",
    description: "No hidden fees or premium tiers",
  },
  {
    icon: Check,
    text: "Full Access",
    description: "All analytics and campaign tools included",
  },
  {
    icon: Check,
    text: "Community Support",
    description: "24/7 help from fellow advocates",
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

export default function Community() {
  const [email, setEmail] = useState("");
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventApplicationForm, setEventApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const { data: socialData = DEFAULT_SOCIALS } = useQuery({
    queryKey: ["socials"],
    queryFn: () => fetchSocials(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Fetch testimonials from API
  const { data: testimonialData = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => fetchTestimonials(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const normalizeName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return name;
    return trimmed.split(/\s+/)[0];
  };

  const normalizeRole = (role: string) => {
    const lower = role.toLowerCase();

    if (lower.includes("sexual and gender minority")) return "SGM";
    if (
      lower.includes("violence against women") ||
      lower.includes("women's rights") ||
      lower.includes("womens rights")
    ) {
      return "VAW";
    }
    if (
      lower.includes("persons with disabilities") ||
      lower.includes("disability") ||
      lower.includes("pwd")
    ) {
      return "pwds";
    }
    if (lower.includes("mental health")) return "Mental Health";
    if (lower.includes("community organizer")) return "Engagement Lead";
    if (lower.includes("policy researcher")) return "Insights Analyst";

    const withoutAdvocacyTerms = role
      .replace(/\badvocate\b/gi, "")
      .replace(/\bactivist\b/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim()
      .replace(/^[-,\s]+|[-,\s]+$/g, "");

    return withoutAdvocacyTerms || "Community Member";
  };

  // Map API testimonials to display format, fall back to defaults
  const testimonials = (() => {
    if (testimonialData && testimonialData.length > 0) {
      return testimonialData.map((t: Testimonial) => ({
        name: normalizeName(t.speaker),
        role: normalizeRole(t.role),
        avatar: t.speaker.charAt(0).toUpperCase(),
        quote: t.statement,
      }));
    }
    return TESTIMONIALS.map((t) => ({
      ...t,
      name: normalizeName(t.name),
      role: normalizeRole(t.role),
    }));
  })();

  const handleEventInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEventApplicationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribing(true);
    try {
      await sendContactMessage({
        name: "Newsletter Subscriber",
        email: email.trim(),
        phone: null,
        subject: "Newsletter Subscription",
        message: `New newsletter subscription request from: ${email.trim()}`,
      });
      setSubscribeSuccess(true);
      setEmail("");
      setTimeout(() => setSubscribeSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to subscribe:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleEventApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEvent(true);

    try {
      const eventTitle = selectedEvent?.title?.trim() ?? "";
      const subject = eventTitle
        ? `Event Registration: ${eventTitle}`
        : "Event Registration";

      const messageLines = [
        eventTitle ? `Event: ${eventTitle}` : null,
        eventApplicationForm.reason?.trim()
          ? `Reason: ${eventApplicationForm.reason.trim()}`
          : null,
      ].filter(Boolean);

      await sendContactMessage({
        name: eventApplicationForm.name,
        email: eventApplicationForm.email,
        phone: eventApplicationForm.phone || null,
        subject,
        message: messageLines.join("\n"),
      });

      alert(
        "Thank you for registering! We'll send you confirmation details soon.",
      );
      setEventModalOpen(false);
      setEventApplicationForm({ name: "", email: "", phone: "", reason: "" });
    } catch (error) {
      console.error("Error submitting event registration:", error);
      alert("There was an error registering for this event. Please try again.");
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  const openEventModal = (event: Event) => {
    setSelectedEvent(event);
    setEventModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={communityImage}
            alt="Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/65"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-5 py-2 mb-8 animate-fade-in-down">
            <span className="text-sm font-medium">Join Conversation</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            Join the <span className="text-yellow-400">Conversation</span>
          </h1>

          {/* Description */}
          <p
            className="text-lg lg:text-xl text-white/90 mb-10 max-w-3xl mx-auto animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Join thousands of organizations and changemakers working together to
            create a more inclusive Ghana.
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

      {/* Member Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Member <span className="text-primary">Benefits</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEMBER_BENEFITS.map((benefit, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="pt-8 pb-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 ${benefit.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <benefit.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Voices from the <span className="text-primary">Community</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    {testimonial.quote}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Newsletter */}
            <Card className="border border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter for monthly advocacy insights,
                  campaign updates, and community highlights.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                    disabled={isSubscribing}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubscribing ? "Sending..." : "Subscribe"}
                  </Button>
                </form>
                {subscribeSuccess && (
                  <p className="text-green-600 text-sm mt-2">
                    Thank you for subscribing! We'll be in touch.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border-0 bg-primary text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Make a Difference?
                </h3>
                <p className="opacity-90 mb-6">
                  Join our community of advocates today and help shape a more
                  inclusive future for Ghana.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <Link to="/about">
                    <Button
                      variant="outline"
                      className="border-white bg-white/10 text-white hover:bg-white/10"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {SIGNUP_BENEFITS.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <benefit.icon className="h-3 w-3" />
                      </div>
                      <span className="font-medium">{benefit.text}</span>
                      <span className="text-white/70 text-sm">
                        {benefit.description}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />

      {/* Event Registration Modal */}
      <Dialog open={eventModalOpen} onOpenChange={setEventModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Register for Event</DialogTitle>
            <DialogDescription>
              {selectedEvent && (
                <span>
                  Register for: <strong>{selectedEvent.title}</strong>
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEventApplicationSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name *</label>
              <Input
                name="name"
                placeholder="Enter your full name"
                value={eventApplicationForm.name}
                onChange={handleEventInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address *</label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={eventApplicationForm.email}
                onChange={handleEventInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number *</label>
              <Input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={eventApplicationForm.phone}
                onChange={handleEventInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Why do you want to attend? *
              </label>
              <Textarea
                name="reason"
                placeholder="Tell us about your interest in this event and what you hope to learn or contribute..."
                value={eventApplicationForm.reason}
                onChange={handleEventInputChange}
                rows={4}
                required
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEventModalOpen(false)}
                disabled={isSubmittingEvent}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmittingEvent}
              >
                {isSubmittingEvent ? "Registering..." : "Register for Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
