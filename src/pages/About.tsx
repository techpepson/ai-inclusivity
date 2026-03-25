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
  fetchFocusAreas,
} from "@/lib/api-client";
import type { TeamMember, Sponsor, AboutSection, FocusArea } from "@/lib/types";
import { Link } from "react-router-dom";
import { logo } from "@/images/images";
import { MapPin } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";

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
    role: "Director of Inclusion",
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
      "Community organizer focused on Sexual and Gender minority community rights and mental health awareness.",
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
    description: "Policy inclusion and disability rights",
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
    description: "Mental wellness inclusion",
    createdAt: "",
    updatedAt: "",
  },
];

const DEFAULT_ABOUT: AboutSection = {
  id: "",
  description:
    "AI4InclusiveGh combines artificial intelligence, social media analytics, and community action to amplify voices, track inclusion trends, and drive policy change for marginalized communities across Ghana.",
  missionDescription:
    "To leverage artificial intelligence and data analytics to monitor social conversations, amplify marginalized voices, and drive evidence-based inclusion for inclusive policies in Ghana.",
  visionDescription:
    "A Ghana where every voice is heard, every community is valued, and data-driven inclusion creates lasting social change for persons with disabilities, women, Sexual and Gender minority community individuals, and those affected by mental health stigma.",
  createdAt: "",
  updatedAt: "",
};

const CORE_VALUES = [
  {
    icon: Heart,
    title: "Empathy & Inclusion",
    description:
      "We center the voices and experiences of marginalized communities in our research.",
    bgColor: "bg-primary",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Impact",
    description:
      "We use AI and data analytics to measure real impact in our research.",
    bgColor: "bg-secondary",
  },
  {
    icon: Shield,
    title: "Ethical AI",
    description:
      "We prioritize privacy, transparency, and bias monitoring in our research.",
    bgColor: "bg-primary",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We believe in the voice of the community to drive teams.",
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
      "Fighting gender-based violence through awareness and policy support.",
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
    title: "Sexual and Gender Minority Community",
    description:
      "Supporting rights, safety, and dignity for Sexual and Gender minority community individuals.",
    reach: "950K reach",
    bgColor: "bg-secondary",
  },
];

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: "Data Extraction",
    description:
      "Our AI dashboard analyzes millions of social media posts to track public sentiment.",
    bgColor: "bg-primary",
  },
  {
    icon: BarChart3,
    title: "Generate Insights",
    description:
      "Real-time analytics provide actionable insights on extracted data from social media posts.",
    bgColor: "bg-secondary",
  },
  {
    icon: Zap,
    title: "Classification",
    description:
      "Analyze and classify new data  from social media posts into positive, negative, or neutral categories.",
    bgColor: "bg-primary",
  },
];

const TIMELINE = [
  {
    year: "202",
    title: "Data Recovery & Groundwork",
    description:
      "Recovered and organized historical social media data from 2018-2023 to establish a baseline for stigma analysis across key themes.",
  },
  {
    year: "2026",
    title: "Project Launch & Data Collection",
    description:
      "Began large-scale data extraction and groundwork for building an AI-based tool to understand stigma across themes.",
  },
  {
    year: "2026",
    title: "Platform Development & Analysis",
    description:
      "Launched the project website, expanded community engagement, and conducted in-depth data analysis to generate early insights.",
  },
  {
    year: "2027",
    title: "Policy Planning",
    description:
      "Project findings are positioned to support policy reforms and strengthen protections for marginalized groups.",
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
  // Fetch team members from API (includes both team and board members)
  const { data: allTeamData = [] } = useQuery({
    queryKey: ["team-members"],
    queryFn: () => fetchTeamMembers(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Separate team members from board members based on role
  const { teamMembers, boardMembers } = (() => {
    // If no data from API, use defaults for both
    if (!allTeamData || allTeamData.length === 0) {
      return {
        teamMembers: DEFAULT_TEAM,
        boardMembers: DEFAULT_BOARD,
      };
    }

    // Board roles keywords
    const boardKeywords = ["board", "chair", "treasurer"];

    const team: TeamMember[] = [];
    const board: TeamMember[] = [];

    for (const member of allTeamData) {
      const roleLower = member.role.toLowerCase();
      const isBoard = boardKeywords.some((keyword) =>
        roleLower.includes(keyword),
      );

      if (isBoard) {
        board.push(member);
      } else {
        team.push(member);
      }
    }

    // If API returned data but no items matched either category,
    // use appropriate defaults only for empty categories
    return {
      teamMembers: team.length > 0 ? team : DEFAULT_TEAM,
      boardMembers: board, // Don't fall back if API had data - show actual board members from server
    };
  })();

  const team = teamMembers;

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

  // Fetch focus areas from API for pillars
  const { data: focusAreasData = [] } = useQuery({
    queryKey: ["focus-areas"],
    queryFn: () => fetchFocusAreas(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Map focus areas to pillar format
  const pillars = (() => {
    if (!focusAreasData || focusAreasData.length === 0) {
      return PILLARS;
    }

    const iconMap: Record<string, typeof Accessibility> = {
      disabilities: Accessibility,
      disability: Accessibility,
      vaw: Heart,
      violence: Heart,
      women: Heart,
      mental: Brain,
      lgbtq: Wifi,
      lgbt: Wifi,
      sgmc: Wifi,
      gender: Wifi,
    };

    return focusAreasData.map((area: FocusArea, index: number) => {
      const lLower = area.title.toLowerCase();
      let icon = Accessibility;

      for (const [key, value] of Object.entries(iconMap)) {
        if (lLower.includes(key)) {
          icon = value;
          break;
        }
      }

      return {
        icon,
        title: area.title,
        description: area.description,
        reach: area.statsValue
          ? `${area.statsValue} reach`
          : PILLARS[index % PILLARS.length]?.reach || "",
        bgColor: index % 2 === 0 ? "bg-primary" : "bg-secondary",
      };
    });
  })();

  const pillarsLabel =
    pillars.length === 4 ? "Four" : pillars.length.toString();

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
            Advancing Inclusivity through{" "}
            <span className="text-yellow-400">AI</span>
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
                    className={`inline-flex items-center justify-center w-14 h-14 ${value.bgColor} rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
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

      {/* Pillars of Impact */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {pillarsLabel} Pillars of{" "}
              <span className="text-primary">Impact</span>
            </h2>
            {/* <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our focus areas where AI-powered inclusion creates real change
            </p> */}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
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
                    {/* <p className="text-muted-foreground text-sm mb-3">
                      {pillar.description}
                    </p> */}
                    {/* <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {pillar.reach}
                    </span> */}
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
                  {/* <div className="flex justify-center gap-3">
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
                  </div> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Funders - only show if there are board members */}
      {boardMembers.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Funders</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The dedicated individuals and organizations funding our mission
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {boardMembers.map((member, index) => (
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
      )}

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
