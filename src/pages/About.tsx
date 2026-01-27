import { Users, Target, Heart, Award } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import teamImage from "@/assets/team-collaboration.jpg";
import missionImage from "@/assets/mission-vision.jpg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import {
  fetchTeamMembers,
  fetchSponsors,
  fetchAboutSection,
} from "@/lib/api-client";
import type { TeamMember, Sponsor, AboutSection } from "@/lib/types";

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Ama Osei",
    role: "Executive Director",
    description:
      "Social justice advocate with 15+ years experience in disability rights and policy reform.",
    profilePicture: "https://picsum.photos/id/1005/400/400",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Kwame Asante",
    role: "Data Science Lead",
    description:
      "AI researcher specializing in social media analysis and natural language processing.",
    profilePicture: "https://picsum.photos/id/1001/400/400",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Akosua Mensah",
    role: "Community Engagement Director",
    description:
      "Mental health advocate and community organizer with grassroots experience.",
    profilePicture: "https://picsum.photos/id/1006/400/400",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "Samuel Boateng",
    role: "Policy Research Manager",
    description:
      "Human rights lawyer focused on LGBTQ+ advocacy and legal reform.",
    profilePicture: "https://picsum.photos/id/1000/400/400",
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
    "We're a technology-driven advocacy platform dedicated to promoting inclusion and social justice in Ghana through AI-powered social media analysis and community engagement.",
  missionDescription:
    "To amplify the voices of marginalized communities in Ghana by leveraging artificial intelligence and social media analytics to track conversations, identify trends, and drive policy change around disability rights, gender-based violence prevention, mental health awareness, and LGBTQ+ inclusion.",
  visionDescription:
    "A Ghana where every individual, regardless of ability, gender identity, or mental health status, can participate fully in society with dignity, respect, and equal opportunities. We envision a future where data-driven advocacy creates lasting social change.",
  createdAt: "",
  updatedAt: "",
};

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Inclusion First",
      description:
        "We believe every person deserves dignity, respect, and equal opportunities regardless of ability, gender, or identity.",
    },
    {
      icon: Target,
      title: "Data-Driven Impact",
      description:
        "We use AI and social media analytics to understand conversations and drive meaningful change.",
    },
    {
      icon: Users,
      title: "Community Centered",
      description:
        "Our work is guided by the voices and experiences of the communities we serve.",
    },
    {
      icon: Award,
      title: "Transparency",
      description:
        "We operate with full transparency, sharing our findings and methodologies openly.",
    },
  ];

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

  const sponsors =
    sponsorData && sponsorData.length > 0 ? sponsorData : DEFAULT_SPONSORS;

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
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
            <img
              src={teamImage}
              alt="AI4InclusiveGh team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                About AI4InclusiveGh
              </h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're a technology-driven advocacy platform dedicated to promoting
            inclusion and social justice in Ghana through AI-powered social
            media analysis and community engagement.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="relative mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={missionImage}
                alt="Our mission and vision"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
            </div>

            <div className="space-y-8">
              <Card className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">
                    {about.missionDescription}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">
                    {about.visionDescription}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide our work and shape our approach to
              advocacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center bg-gradient-card border-0"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the passionate individuals driving change across Ghana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage
                        src={member.profilePicture}
                        alt={member.name}
                      />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <CardDescription className="text-primary font-semibold">
                        {member.role}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partners & Sponsors</h2>
            <p className="text-lg text-muted-foreground">
              We collaborate with organizations that share our commitment to
              social justice.
            </p>
          </div>

          <Card className="bg-gradient-card border-0">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {sponsors.map((sponsor, index) => (
                  <div key={index}>
                    <h4 className="font-semibold mb-2">{sponsor.name}</h4>
                    {sponsor.description && (
                      <p className="text-sm text-muted-foreground">
                        {sponsor.description}
                      </p>
                    )}
                    {sponsor.website && (
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline mt-2 inline-block"
                      >
                        Visit website
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
