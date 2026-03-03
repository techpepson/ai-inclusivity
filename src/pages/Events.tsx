import { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Mail,
  Phone,
  MapPinned,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { fetchEvents, sendContactMessage } from "@/lib/api-client";
import type { Event } from "@/lib/types";
import { Link } from "react-router-dom";
import conferenceImage from "@/assets/disability-tech-inclusion.jpg";
import workshopImage from "@/assets/women-empowerment.jpg";
import communityEventImage from "@/assets/team-collaboration.jpg";
import mentalHealthImage from "@/assets/mental-health-support.jpg";
import { logo } from "@/images/images";

type EventTab = "upcoming" | "ongoing" | "past";

const DEFAULT_EVENTS: (Event & {
  description?: string;
  location?: string;
  image?: string;
})[] = [
  {
    id: "1",
    title: "Digital Accessibility Summit 2026",
    description:
      "Join us for a comprehensive summit on digital accessibility, featuring workshops on inclusive design, assistive technologies, and policy discussions.",
    date: "2026-03-15",
    time: "9:00 AM - 5:00 PM",
    type: "Conference",
    location: "Accra International Conference Centre",
    attendees: 250,
    image: conferenceImage,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Women Safety Workshop Series",
    description:
      "Interactive workshops focused on personal safety, legal rights, and community support systems for women across Ghana.",
    date: "2026-03-22",
    time: "2:00 PM - 6:00 PM",
    type: "Workshop",
    location: "Kumasi Community Center",
    attendees: 150,
    image: workshopImage,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    title: "Mental Wellness Community Gathering",
    description:
      "A safe space for open conversations about mental health, featuring therapists, peer support groups, and wellness activities.",
    date: "2026-04-05",
    time: "10:00 AM - 3:00 PM",
    type: "Community Event",
    location: "Takoradi Wellness Center",
    attendees: 100,
    image: mentalHealthImage,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    title: "Pride March 2026: Love is Love",
    description:
      "Annual pride celebration bringing together LGBTQ+ community members and allies for a peaceful march and festival.",
    date: "2026-06-20",
    time: "3:00 PM - 8:00 PM",
    type: "Community Event",
    location: "Accra City Center",
    attendees: 500,
    image: communityEventImage,
    createdAt: "",
    updatedAt: "",
  },
  // Ongoing events
  {
    id: "5",
    title: "Youth Mentorship Program",
    description:
      "An ongoing mentorship initiative connecting young advocates with experienced professionals in social justice fields.",
    date: "2026-01-15",
    time: "Ongoing",
    type: "Workshop",
    location: "Online & Various Locations",
    attendees: 80,
    image: conferenceImage,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "6",
    title: "Weekly Support Circle",
    description:
      "Regular peer support sessions for community members seeking connection and shared experiences.",
    date: "2026-02-01",
    time: "Every Saturday, 4:00 PM",
    type: "Community Event",
    location: "Community Hub, Accra",
    attendees: 30,
    image: communityEventImage,
    createdAt: "",
    updatedAt: "",
  },
  // Past events
  {
    id: "7",
    title: "Inclusive Tech Hackathon 2025",
    description:
      "A 48-hour hackathon focused on developing assistive technologies and inclusive digital solutions.",
    date: "2025-11-15",
    time: "9:00 AM - 9:00 PM",
    type: "Conference",
    location: "Accra Tech Hub",
    attendees: 200,
    image: conferenceImage,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "8",
    title: "End Violence Against Women Rally",
    description:
      "Community gathering to raise awareness about violence against women and advocate for stronger protective measures.",
    date: "2025-12-10",
    time: "10:00 AM - 2:00 PM",
    type: "Community Event",
    location: "Independence Square, Accra",
    attendees: 1500,
    image: workshopImage,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "9",
    title: "Mental Health First Aid Training",
    description:
      "Professional training session on recognizing and responding to mental health emergencies in communities.",
    date: "2025-10-20",
    time: "9:00 AM - 4:00 PM",
    type: "Workshop",
    location: "Kumasi Training Center",
    attendees: 75,
    image: mentalHealthImage,
    createdAt: "",
    updatedAt: "",
  },
];

const EVENT_TYPE_STYLES: Record<
  string,
  { bgColor: string; textColor: string }
> = {
  Conference: { bgColor: "bg-primary", textColor: "text-white" },
  Workshop: { bgColor: "bg-primary/80", textColor: "text-white" },
  "Community Event": { bgColor: "bg-primary/90", textColor: "text-white" },
  March: { bgColor: "bg-primary", textColor: "text-white" },
};

const FOOTER_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Themes", href: "/themes" },
  { name: "Analytics", href: "/analytics" },
  { name: "Campaigns", href: "/get-involved" },
  { name: "Events", href: "/events" },
  { name: "Community", href: "/community" },
];

function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function categorizeEvent(
  event: Event,
  today: Date,
): "upcoming" | "ongoing" | "past" {
  const eventDate = new Date(event.date);

  // Check if event is ongoing (date has passed but time indicates ongoing)
  if (
    event.time?.toLowerCase().includes("ongoing") ||
    event.time?.toLowerCase().includes("every")
  ) {
    return "ongoing";
  }

  // Check if event is in the past
  if (eventDate < today) {
    return "past";
  }

  return "upcoming";
}

export default function Events() {
  const [activeTab, setActiveTab] = useState<EventTab>("upcoming");
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [proposalForm, setProposalForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventTitle: "",
    eventDescription: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch events from API
  const { data: apiEvents } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5,
  });

  const events = apiEvents?.length ? apiEvents : DEFAULT_EVENTS;

  // Categorize events
  const categorizedEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming: typeof events = [];
    const ongoing: typeof events = [];
    const past: typeof events = [];

    events.forEach((event) => {
      const category = categorizeEvent(event, today);
      if (category === "upcoming") upcoming.push(event);
      else if (category === "ongoing") ongoing.push(event);
      else past.push(event);
    });

    return { upcoming, ongoing, past };
  }, [events]);

  const currentEvents =
    activeTab === "upcoming"
      ? categorizedEvents.upcoming
      : activeTab === "ongoing"
        ? categorizedEvents.ongoing
        : categorizedEvents.past;

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendContactMessage({
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone || null,
        subject: `Event Registration: ${selectedEvent?.title}`,
        message: `I would like to register for the event "${selectedEvent?.title}".\n\nAdditional message: ${registerForm.message || "N/A"}`,
      });
      setSubmitSuccess(true);
      setRegisterForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        setRegisterModalOpen(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to submit registration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendContactMessage({
        name: proposalForm.name,
        email: proposalForm.email,
        phone: proposalForm.phone || null,
        subject: `Event Proposal: ${proposalForm.eventTitle}`,
        message: proposalForm.eventDescription,
      });
      setSubmitSuccess(true);
      setProposalForm({
        name: "",
        email: "",
        phone: "",
        eventTitle: "",
        eventDescription: "",
      });
      setTimeout(() => {
        setProposalModalOpen(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to submit proposal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openRegisterModal = (event: Event) => {
    setSelectedEvent(event);
    setRegisterModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="relative py-20 overflow-hidden bg-primary">
        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            Events & Activities
          </h1>
          <p
            className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Join us in creating positive change through workshops, campaigns,
            conferences, and community gatherings
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={() => setActiveTab("upcoming")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeTab === "upcoming"
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Upcoming Events
              <Badge
                variant="secondary"
                className={`ml-2 ${
                  activeTab === "upcoming"
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {categorizedEvents.upcoming.length}
              </Badge>
            </Button>
            <Button
              size="lg"
              onClick={() => setActiveTab("ongoing")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeTab === "ongoing"
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Ongoing Events
              <Badge
                variant="secondary"
                className={`ml-2 ${
                  activeTab === "ongoing"
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {categorizedEvents.ongoing.length}
              </Badge>
            </Button>
            <Button
              size="lg"
              onClick={() => setActiveTab("past")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeTab === "past"
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Past Events
              <Badge
                variant="secondary"
                className={`ml-2 ${
                  activeTab === "past"
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {categorizedEvents.past.length}
              </Badge>
            </Button>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentEvents.map((event, index) => {
              const typeStyle = EVENT_TYPE_STYLES[event.type] || {
                bgColor: "bg-gray-500",
                textColor: "text-white",
              };
              const eventWithExtras = event as Event & {
                description?: string;
                location?: string;
                image?: string;
              };

              return (
                <Card
                  key={event.id}
                  className="overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 group animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={eventWithExtras.image || conferenceImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={`${typeStyle.bgColor} ${typeStyle.textColor} px-3 py-1`}
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Event Content */}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {eventWithExtras.description ||
                        "Join us for this exciting event!"}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{formatEventDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="line-clamp-1">
                          {eventWithExtras.location || "Location TBA"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{event.attendees} expected attendees</span>
                      </div>
                    </div>

                    {/* Register Button */}
                    {activeTab !== "past" ? (
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white group"
                        onClick={() => openRegisterModal(event)}
                      >
                        Register Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        Event Concluded
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {currentEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No {activeTab} events at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Want to Host an Event */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Want to Host an Event?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Partner with us to organize impactful events that drive change in
            your community
          </p>
          <Button
            size="lg"
            onClick={() => setProposalModalOpen(true)}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 hover:scale-105 transition-transform duration-300 group"
          >
            Submit Event Proposal
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
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
                  <p className="text-sm text-slate-400">Advocacy Through AI</p>
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
                  <span>contact@ai4inclusivegh.org</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+233 (0) 50 123 4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <MapPinned className="h-4 w-4 text-primary" />
                  <span>Accra, Ghana</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Event Types */}
            <div>
              <h3 className="font-bold text-lg mb-6">Event Types</h3>
              <ul className="space-y-3">
                <li className="text-slate-300 text-sm">Conferences</li>
                <li className="text-slate-300 text-sm">Workshops</li>
                <li className="text-slate-300 text-sm">Community Gatherings</li>
                <li className="text-slate-300 text-sm">Training Sessions</li>
                <li className="text-slate-300 text-sm">Awareness Campaigns</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-lg mb-6">Stay Updated</h3>
              <p className="text-slate-300 mb-4 text-sm">
                Subscribe for event updates and community news.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
              <p>
                © 2026 AI4InclusiveGh. All rights reserved. | Built with{" "}
                <span className="text-red-400">♥</span> for Ghana
              </p>
              <div className="flex gap-6">
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Register Modal */}
      <Dialog open={registerModalOpen} onOpenChange={setRegisterModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Register for Event</DialogTitle>
            <DialogDescription>{selectedEvent?.title}</DialogDescription>
          </DialogHeader>
          {submitSuccess ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Registration Submitted!
              </h3>
              <p className="text-muted-foreground">
                We'll send you a confirmation email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <Input
                  required
                  value={registerForm.name}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, name: e.target.value })
                  }
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                  }
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={registerForm.phone}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, phone: e.target.value })
                  }
                  placeholder="+233 XX XXX XXXX"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Additional Message (Optional)
                </label>
                <Textarea
                  value={registerForm.message}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      message: e.target.value,
                    })
                  }
                  placeholder="Any questions or special requirements?"
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Register Now"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Proposal Modal */}
      <Dialog open={proposalModalOpen} onOpenChange={setProposalModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Submit Event Proposal</DialogTitle>
            <DialogDescription>
              Partner with us to host an impactful event
            </DialogDescription>
          </DialogHeader>
          {submitSuccess ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Proposal Submitted!
              </h3>
              <p className="text-muted-foreground">
                Our team will review and get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleProposalSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Your Name *</label>
                <Input
                  required
                  value={proposalForm.name}
                  onChange={(e) =>
                    setProposalForm({ ...proposalForm, name: e.target.value })
                  }
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  required
                  value={proposalForm.email}
                  onChange={(e) =>
                    setProposalForm({ ...proposalForm, email: e.target.value })
                  }
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={proposalForm.phone}
                  onChange={(e) =>
                    setProposalForm({ ...proposalForm, phone: e.target.value })
                  }
                  placeholder="+233 XX XXX XXXX"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Event Title *</label>
                <Input
                  required
                  value={proposalForm.eventTitle}
                  onChange={(e) =>
                    setProposalForm({
                      ...proposalForm,
                      eventTitle: e.target.value,
                    })
                  }
                  placeholder="Name of your proposed event"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Event Description *
                </label>
                <Textarea
                  required
                  value={proposalForm.eventDescription}
                  onChange={(e) =>
                    setProposalForm({
                      ...proposalForm,
                      eventDescription: e.target.value,
                    })
                  }
                  placeholder="Describe your event, target audience, expected outcomes..."
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
