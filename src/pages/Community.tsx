import { useState } from "react";
import {
  MessageCircle,
  Users,
  Mail,
  Send,
  ExternalLink,
  Award,
  Bell,
  Heart,
  Zap,
  Check,
  Phone,
  MapPin,
  Calendar,
  Clock,
  MapPinned,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useQuery } from "@tanstack/react-query";
import {
  fetchEvents,
  fetchSocials,
  sendContactMessage,
} from "@/lib/api-client";
import type { Event, Social } from "@/lib/types";
import { Link } from "react-router-dom";
import communityImage from "@/assets/team-collaboration.jpg";
import { logo } from "@/images/images";

const DEFAULT_EVENTS: Event[] = [
  {
    id: "1",
    title: "Digital Accessibility Summit 2026",
    date: "2026-03-15",
    time: "9:00 AM - 5:00 PM",
    type: "Conference",
    attendees: 250,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Women Safety Workshop Series",
    date: "2026-03-22",
    time: "2:00 PM - 6:00 PM",
    type: "Workshop",
    attendees: 150,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    title: "Mental Wellness Community Gathering",
    date: "2026-04-05",
    time: "10:00 AM - 3:00 PM",
    type: "Community Event",
    attendees: 100,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    title: "Pride March 2026: Love is Love",
    date: "2026-06-20",
    time: "3:00 PM - 8:00 PM",
    type: "March",
    attendees: 500,
    createdAt: "",
    updatedAt: "",
  },
];

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
    name: "Akosua Mensah",
    role: "Mental Health Advocate",
    avatar: "A",
    quote:
      "AI4InclusiveGh has given us the data and insights we needed to make our mental health advocacy more effective. The platform is revolutionary!",
    campaigns: 8,
  },
  {
    name: "Kwame Asante",
    role: "Disability Rights Activist",
    avatar: "K",
    quote:
      "Being part of this community has connected me with advocates nationwide. Together, we're making real change for persons with disabilities in Ghana.",
    campaigns: 12,
  },
  {
    name: "Ama Osei",
    role: "Women's Rights Advocate",
    avatar: "A",
    quote:
      "The analytics show us exactly where our message is resonating. This platform has transformed how we approach advocacy against gender-based violence.",
    campaigns: 15,
  },
  {
    name: "Kofi Boateng",
    role: "Sexual and Gender Minority Community Advocate",
    avatar: "K",
    quote:
      "Finally, a platform that combines data with heart. The community support here is incredible, and the tools help us measure real impact.",
    campaigns: 6,
  },
  {
    name: "Efua Darko",
    role: "Community Organizer",
    avatar: "E",
    quote:
      "The AI insights help us understand what messaging works best. We've seen our campaign reach grow by 300% since joining this platform.",
    campaigns: 10,
  },
  {
    name: "Yaw Mensah",
    role: "Policy Researcher",
    avatar: "Y",
    quote:
      "The data exports and reports are invaluable for our research. This platform bridges the gap between grassroots advocacy and policy change.",
    campaigns: 7,
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

  // Fetch events from API
  const { data: eventData = DEFAULT_EVENTS } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEvents(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const upcomingEvents =
    eventData && eventData.length > 0 ? eventData : DEFAULT_EVENTS;

  const { data: socialData = DEFAULT_SOCIALS } = useQuery({
    queryKey: ["socials"],
    queryFn: () => fetchSocials(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const handleEventInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEventApplicationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            <span className="text-sm font-medium">Join Our Community</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            Be Part of the <span className="text-yellow-400">Movement</span>
          </h1>

          {/* Description */}
          <p
            className="text-lg lg:text-xl text-white/90 mb-10 max-w-3xl mx-auto animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Join thousands of advocates, organizations, and changemakers working
            together to create a more inclusive Ghana.
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

      {/* Upcoming Events */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Upcoming <span className="text-primary">Events</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us in creating positive change through workshops, campaigns,
              conferences, and community gatherings
            </p>
          </div> */}

          {/* <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.slice(0, 4).map((event, index) => (
              <Card
                key={event.id}
                className="border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                        {event.type}
                      </Badge>
                      <h3 className="text-xl font-bold mb-3">{event.title}</h3>

                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{event.attendees} expected attendees</span>
                        </div>
                      </div>

                      <Button
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => openEventModal(event)}
                      >
                        Register Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}

          {/* Want to Host an Event */}
          <Card className="mt-8 border-0 bg-primary text-white">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Want to Host an Event?
                </h3>
                <p className="opacity-90">
                  Partner with us to organize impactful events that drive change
                  in your community
                </p>
              </div>
              <Button variant="secondary" className="shrink-0">
                Submit Event Proposal
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Voices from Our <span className="text-primary">Community</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
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
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      {testimonial.campaigns} Campaigns Joined
                    </span>
                  </div>
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
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-primary hover:bg-primary/90">
                    <Send className="h-4 w-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
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
                  inclusive future for Ghana. Registration is free and takes
                  less than a minute.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <Button className="bg-white/10" variant="secondary">
                    Create Free Account
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white bg-white/10 text-white hover:bg-white/10"
                  >
                    Learn More
                  </Button>
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
                amplify voices for marginalized communities in Ghana.
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
