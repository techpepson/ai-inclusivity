import { useState } from "react";
import {
  MessageCircle,
  Users,
  Mail,
  Send,
  ExternalLink,
  Hash,
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
import { fetchEvents } from "@/lib/api-client";
import type { Event } from "@/lib/types";

const DEFAULT_EVENTS: Event[] = [
  {
    id: "1",
    title: "Digital Advocacy Workshop",
    date: "2024-12-28",
    time: "2:00 PM GMT",
    type: "Workshop",
    attendees: 89,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Mental Health Awareness Week",
    date: "2025-01-05",
    time: "All Week",
    type: "Campaign",
    attendees: 234,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    title: "Inclusive Policy Forum",
    date: "2025-01-15",
    time: "10:00 AM GMT",
    type: "Forum",
    attendees: 156,
    createdAt: "",
    updatedAt: "",
  },
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/event-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...eventApplicationForm,
          eventTitle: selectedEvent?.title,
        }),
      });

      if (response.ok) {
        alert(
          "Thank you for registering! We'll send you confirmation details soon.",
        );
        setEventModalOpen(false);
        setEventApplicationForm({ name: "", email: "", phone: "", reason: "" });
      } else {
        alert(
          "There was an error registering for this event. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error submitting event registration:", error);
      alert("There was an error registering for this event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEventModal = (event: Event) => {
    setSelectedEvent(event);
    setEventModalOpen(true);
  };

  const communityStats = [
    { label: "Active Members", value: "15.2k", icon: Users },
    { label: "Monthly Discussions", value: "3.4k", icon: MessageCircle },
    { label: "Advocacy Campaigns", value: "24", icon: Hash },
    { label: "Partner Organizations", value: "89", icon: ExternalLink },
  ];

  const discussions = [
    // {
    //   title: "Improving Accessibility in Public Transport",
    //   author: "Akosua M.",
    //   replies: 23,
    //   lastActive: "2 hours ago",
    //   category: "Disabilities",
    //   excerpt: "Let's discuss practical solutions for making Ghana's public transport more accessible for persons with disabilities..."
    // },
    // {
    //   title: "Mental Health Resources in Rural Areas",
    //   author: "Dr. Kwame A.",
    //   replies: 18,
    //   lastActive: "5 hours ago",
    //   category: "Mental Health",
    //   excerpt: "How can we extend mental health support to underserved rural communities? Looking for innovative approaches..."
    // },
    // {
    //   title: "Building Safe Spaces for LGBTQ+ Youth",
    //   author: "Samuel B.",
    //   replies: 31,
    //   lastActive: "1 day ago",
    //   category: "LGBTQ+",
    //   excerpt: "Sharing experiences and strategies for creating inclusive environments for young LGBTQ+ individuals..."
    // },
    // {
    //   title: "VAW Prevention in Educational Settings",
    //   author: "Prof. Yaa A.",
    //   replies: 15,
    //   lastActive: "2 days ago",
    //   category: "VAW",
    //   excerpt: "Discussing comprehensive approaches to prevent violence against women in schools and universities..."
    // }
  ];

  const socialChannels = [
    {
      platform: "Twitter",
      handle: "@AI4InclusiveGh",
      followers: "45.2k",
      description: "Daily updates and campaign highlights",
    },
    {
      platform: "Facebook",
      handle: "AI4InclusiveGhana",
      followers: "38.7k",
      description: "Community discussions and events",
    },
    {
      platform: "LinkedIn",
      handle: "AI4Inclusive Ghana",
      followers: "22.1k",
      description: "Professional networking and policy updates",
    },
    {
      platform: "Instagram",
      handle: "@ai4inclusivegh",
      followers: "31.5k",
      description: "Stories and visual advocacy content",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Disabilities":
        return "bg-theme-disability/10 text-theme-disability";
      case "Mental Health":
        return "bg-theme-mental/10 text-theme-mental";
      case "LGBTQ+":
        return "bg-theme-lgbtq/10 text-theme-lgbtq";
      case "VAW":
        return "bg-theme-vaw/10 text-theme-vaw";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Community & Connect
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our vibrant community of advocates, share experiences, learn
            from others, and collaborate on building a more inclusive Ghana.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-0 text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Discussions */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recent Discussions</h2>
              <p className="text-lg text-muted-foreground">
                Join ongoing conversations in our community forum.
              </p>
            </div>
            <Button className="bg-gradient-hero hover:opacity-90">
              <MessageCircle className="mr-2 h-4 w-4" />
              Join Forum
            </Button>
          </div>

          <div className="space-y-6">
            {discussions.map((discussion, index) => (
              <Card
                key={index}
                className="bg-gradient-card border-0 hover:shadow-card transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-xl">
                          {discussion.title}
                        </CardTitle>
                        <Badge
                          className={getCategoryColor(discussion.category)}
                        >
                          {discussion.category}
                        </Badge>
                      </div>
                      <CardDescription className="mb-3">
                        {discussion.excerpt}
                      </CardDescription>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>by {discussion.author}</span>
                        <span>{discussion.replies} replies</span>
                        <span>Last active {discussion.lastActive}</span>
                      </div>
                    </div>
                    <Button variant="outline">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Join Discussion
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground">
              Don't miss these opportunities to connect and learn with our
              community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{event.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {event.attendees} attending
                    </span>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Time:</strong> {event.time}
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => openEventModal(event)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <Card className="bg-gradient-hero text-white border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Stay Connected</CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Get weekly updates on advocacy campaigns, community discussions,
                and upcoming events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                  <Button variant="secondary">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-white/70 mt-2 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Social Media Channels */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Follow Us</h2>
            <p className="text-lg text-muted-foreground">
              Stay updated across all our social media channels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialChannels.map((channel, index) => (
              <Card
                key={index}
                className="bg-gradient-card border-0 text-center"
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg">
                      {channel.platform}
                    </h4>
                    <p className="text-sm text-primary font-mono">
                      {channel.handle}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {channel.followers} followers
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {channel.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Follow
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
                <CardTitle className="text-2xl" id="contact">
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Have a question, suggestion, or want to collaborate? We'd love
                  to hear from you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="What's this about?" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Tell us more about your question or idea..."
                    rows={4}
                  />
                </div>

                <Button className="w-full bg-gradient-hero hover:opacity-90">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

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
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-hero hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register for Event"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
