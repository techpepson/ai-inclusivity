import {
  Users,
  Target,
  Heart,
  BarChart3,
  Shield,
  Globe,
  Zap,
  Eye,
  Accessibility,
  Brain,
  Wifi,
  Linkedin,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import teamImage from "@/assets/team-collaboration.jpg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import {
  fetchTeamMembers,
  fetchSponsors,
  fetchAboutSection,
} from "@/lib/api-client";
import type { TeamMember, Sponsor, AboutSection } from "@/lib/types";
import { Link } from "react-router-dom";
import { logo } from "@/images/images";
import { Phone, MapPin } from "lucide-react";

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Ama Mensah",
    role: "Executive Director",
    description:
      "Former UN advocate with 15+ years in social justice and AI ethics.",
    profilePicture: "https://picsum.photos/id/1005/400/400",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Kwame Osei",
    role: "Chief Technology Officer",
    description:
      "AI researcher specializing in ethical machine learning and NLP systems.",
    profilePicture: "https://picsum.photos/id/1001/400/400",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Efua Asante",
    role: "Director of Advocacy",
    description:
      "Disability rights activist and policy expert with grassroots organizing experience.",
    profilePicture: "https://picsum.photos/id/1006/400/400",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "Kofi Boateng",
    role: "Community Engagement Lead",
    description:
      "Community organizer focused on LGBTQ+ rights and mental health awareness.",
    profilePicture: "https://picsum.photos/id/1000/400/400",
    createdAt: "",
    updatedAt: "",
  },
];

const DEFAULT_BOARD: TeamMember[] = [
  {
    id: "b1",
    name: "Prof. Abena Darko",
    role: "Board Chair",
    description: "University of Ghana, Computer Science",
    profilePicture: "https://picsum.photos/id/1011/400/400",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "b2",
    name: "Hon. Samuel Adjei",
    role: "Board Member",
    description: "Former Minister of Social Welfare",
    profilePicture: "https://picsum.photos/id/1012/400/400",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "b3",
    name: "Dr. Yaa Oppong",
    role: "Board Member",
    description: "Mental Health Foundation Ghana",
    profilePicture: "https://picsum.photos/id/1013/400/400",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "b4",
    name: "Akosua Sarpong",
    role: "Board Treasurer",
    description: "Women's Rights Coalition",
    profilePicture: "https://picsum.photos/id/1014/400/400",
    createdAt: "",
    updatedAt: "",
  },
];

const DEFAULT_SPONSORS: Sponsor[] = [
  {
    id: "1",
    name: "Ghana Federation of Disability Organizations",
    description: "Policy advocacy and disability rights",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Women's Rights Coalition Ghana",
    description: "Gender-based violence prevention",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Mental Health Ghana",
    description: "Mental wellness advocacy",
    createdAt: "",
    updatedAt: "",
  },
];

const DEFAULT_ABOUT: AboutSection = {
  id: "",
  description:
    "AI4InclusiveGh combines artificial intelligence, social media analytics, and community action to amplify voices, track advocacy trends, and drive policy change for marginalized communities across Ghana.",
  missionDescription:
    "To leverage artificial intelligence and data analytics to monitor social conversations, amplify marginalized voices, and drive evidence-based advocacy for inclusive policies in Ghana.",
  visionDescription:
    "A Ghana where every voice is heard, every community is valued, and data-driven advocacy creates lasting social change for persons with disabilities, women, LGBTQ+ individuals, and those affected by mental health stigma.",
  createdAt: "",
  updatedAt: "",
};

const CORE_VALUES = [
  {
    icon: Heart,
    title: "Empathy & Inclusion",
    description:
      "We center the voices and experiences of marginalized communities in all our work.",
    bgColor: "bg-primary",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Impact",
    description:
      "We use AI and analytics to measure real impact and drive evidence-based advocacy.",
    bgColor: "bg-secondary",
  },
  {
    icon: Shield,
    title: "Ethical AI",
    description:
      "We prioritize privacy, transparency, and bias monitoring in all our AI systems.",
    bgColor: "bg-primary",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe in grassroots power and community-led social change initiatives.",
    bgColor: "bg-secondary",
  },
];

const PILLARS = [
  {
    icon: Accessibility,
    title: "Persons with Disabilities",
    description:
      "Advocating for accessibility, equal opportunities, and inclusive policies.",
    reach: "1.2M reach",
    bgColor: "bg-primary",
  },
  {
    icon: Heart,
    title: "Violence Against Women",
    description:
      "Fighting gender-based violence through awareness and policy advocacy.",
    reach: "2.1M reach",
    bgColor: "bg-secondary",
  },
  {
    icon: Brain,
    title: "Mental Health & Wellness",
    description: "Breaking stigma and promoting accessible mental healthcare.",
    reach: "1.8M reach",
    bgColor: "bg-primary",
  },
  {
    icon: Wifi,
    title: "LGBTQ+ Communities",
    description:
      "Supporting rights, safety, and dignity for LGBTQ+ individuals.",
    reach: "950K reach",
    bgColor: "bg-secondary",
  },
];

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: "Monitor Conversations",
    description:
      "Our AI analyzes millions of social media posts to track advocacy trends and public sentiment.",
    bgColor: "bg-primary",
  },
  {
    icon: BarChart3,
    title: "Generate Insights",
    description:
      "Real-time analytics provide actionable insights on campaign performance and engagement.",
    bgColor: "bg-secondary",
  },
  {
    icon: Zap,
    title: "Drive Action",
    description:
      "Data-driven campaigns mobilize communities and influence policy change at scale.",
    bgColor: "bg-primary",
  },
];

const TIMELINE = [
  {
    year: "2024",
    title: "Platform Launch",
    description:
      "AI4InclusiveGh launches with initial focus on disability rights advocacy.",
  },
  {
    year: "2025",
    title: "Expanding Impact",
    description:
      "Added three more focus areas and onboarded 30+ partner organizations.",
  },
  {
    year: "2026",
    title: "Policy Wins",
    description:
      "Contributed to 12 policy changes benefiting marginalized communities.",
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

export default function About() {
  // Fetch team members from API
  const { data: teamData = DEFAULT_TEAM } = useQuery({
    queryKey: ["team-members"],
    queryFn: () => fetchTeamMembers(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const team = teamData && teamData.length > 0 ? teamData : DEFAULT_TEAM;

  // Fetch sponsors from API
  const { data: sponsorData = DEFAULT_SPONSORS } = useQuery({
    queryKey: ["sponsors"],
    queryFn: () => fetchSponsors(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Fetch about section from API
  const { data: aboutData = DEFAULT_ABOUT } = useQuery({
    queryKey: ["about-section"],
    queryFn: () => fetchAboutSection(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const about = aboutData || DEFAULT_ABOUT;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={teamImage}
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/65"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-5 py-2 mb-8 animate-fade-in-down">
            <span className="text-sm font-medium">About Us</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight animate-fade-in-up opacity-0 text-white"
            style={{ animationDelay: "0.1s" }}
          >
            Advocacy Through <span className="text-yellow-400">AI & Data</span>
          </h1>

          {/* Description */}
          <p
            className="text-lg lg:text-xl text-white mb-8 max-w-3xl mx-auto animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            {about.description || DEFAULT_ABOUT.description}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <Card className="border-0 bg-primary/10 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {about.missionDescription || DEFAULT_ABOUT.missionDescription}
                </p>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="border-0 bg-secondary/10 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {about.visionDescription || DEFAULT_ABOUT.visionDescription}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((value, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group"
              >
                <CardContent className="pt-8 pb-6">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 ${value.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Four Pillars of Impact */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Four Pillars of <span className="text-primary">Impact</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our focus areas where AI-powered advocacy creates real change
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PILLARS.map((pillar, index) => (
              <Card
                key={index}
                className="border-0 bg-muted/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 ${pillar.bgColor} rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <pillar.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {pillar.description}
                    </p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {pillar.reach}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${step.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our <span className="text-primary">Journey</span>
            </h2>
          </div>

          <div className="relative max-w-2xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary rounded-full"></div>

            {TIMELINE.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 last:mb-0 ${index % 2 === 0 ? "justify-end pr-[calc(50%+2rem)]" : "justify-start pl-[calc(50%+2rem)]"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white border-4 border-primary rounded-full z-10"></div>

                <div className={`text-${index % 2 === 0 ? "right" : "left"}`}>
                  <span className="text-2xl font-bold text-primary">
                    {item.year}
                  </span>
                  <h4 className="text-lg font-bold mt-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The key individuals driving our mission and vision
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    <div className="absolute inset-0 bg-primary rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                    <Avatar className="w-24 h-24 relative rounded-2xl border-4 border-white">
                      <AvatarImage
                        src={member.profilePicture}
                        alt={member.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-xl rounded-2xl">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {member.description}
                  </p>
                  <div className="flex justify-center gap-3">
                    <a
                      href="#"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Board Members
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The dedicated individuals guiding our organization
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEFAULT_BOARD.map((member, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="relative mx-auto w-20 h-20 mb-4">
                    <div className="absolute inset-0 bg-primary rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                    <Avatar className="w-20 h-20 relative rounded-2xl border-4 border-white">
                      <AvatarImage
                        src={member.profilePicture}
                        alt={member.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-lg rounded-2xl">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Accra, Ghana</span>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Platform</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.slice(0, 7).map((link) => (
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
                <Button className="bg-primary hover:bg-primary/90 text-sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">
                © 2026 AI4InclusiveGh. All rights reserved. | Built with{" "}
                <span className="text-red-500">❤</span> for a more inclusive
                Ghana
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
    </div>
  );
}
