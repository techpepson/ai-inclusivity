import { Users, Target, Heart, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutProps {
  images: Record<string, string>;
}

export default function About({ images }: AboutProps) {
  const values = [
    {
      icon: Heart,
      title: "Inclusion First",
      description: "We believe every person deserves dignity, respect, and equal opportunities regardless of ability, gender, or identity."
    },
    {
      icon: Target,
      title: "Data-Driven Impact",
      description: "We use AI and social media analytics to understand conversations and drive meaningful change."
    },
    {
      icon: Users,
      title: "Community Centered",
      description: "Our work is guided by the voices and experiences of the communities we serve."
    },
    {
      icon: Award,
      title: "Transparency",
      description: "We operate with full transparency, sharing our findings and methodologies openly."
    }
  ];

  const team = [
    {
      name: "Dr. Ama Osei",
      role: "Executive Director",
      description: "Social justice advocate with 15+ years experience in disability rights and policy reform."
    },
    {
      name: "Kwame Asante",
      role: "Data Science Lead",
      description: "AI researcher specializing in social media analysis and natural language processing."
    },
    {
      name: "Akosua Mensah",
      role: "Community Engagement Director",
      description: "Mental health advocate and community organizer with grassroots experience."
    },
    {
      name: "Samuel Boateng",
      role: "Policy Research Manager",
      description: "Human rights lawyer focused on LGBTQ+ advocacy and legal reform."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About AI4InclusiveGh</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're a technology-driven advocacy platform dedicated to promoting inclusion and social justice 
            in Ghana through AI-powered social media analysis and community engagement.
          </p>
        </div>

        {/* Team Image */}
        {images.team && (
          <div className="mb-16">
            <img 
              src={images.team} 
              alt="Our diverse team working together" 
              className="w-full h-96 object-cover rounded-2xl shadow-card"
            />
          </div>
        )}

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                To amplify the voices of marginalized communities in Ghana by leveraging artificial intelligence 
                and social media analytics to track conversations, identify trends, and drive policy change 
                around disability rights, gender-based violence prevention, mental health awareness, and LGBTQ+ inclusion.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                A Ghana where every individual, regardless of ability, gender identity, or mental health status, 
                can participate fully in society with dignity, respect, and equal opportunities. We envision 
                a future where data-driven advocacy creates lasting social change.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide our work and shape our approach to advocacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center bg-gradient-card border-0">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
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
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold">{member.role}</CardDescription>
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
              We collaborate with organizations that share our commitment to social justice.
            </p>
          </div>

          <Card className="bg-gradient-card border-0">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h4 className="font-semibold mb-2">Ghana Federation of Disability Organizations</h4>
                  <p className="text-sm text-muted-foreground">Policy advocacy and disability rights</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Women's Rights Coalition Ghana</h4>
                  <p className="text-sm text-muted-foreground">Gender-based violence prevention</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mental Health Ghana</h4>
                  <p className="text-sm text-muted-foreground">Mental wellness advocacy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}