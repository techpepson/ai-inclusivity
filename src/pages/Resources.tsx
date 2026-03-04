import {
  BookOpen,
  Download,
  ExternalLink,
  Phone,
  Mail,
  FileText,
  Video,
  Users,
  MapPin,
  Search,
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Shield,
  Heart,
  Clock,
  Check,
} from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import resourcesImage from "@/assets/team-collaboration.jpg";
import { logo } from "@/images/images";

const GUIDES = [
  {
    title: "Digital Advocacy Toolkit",
    description:
      "Complete guide for using social media to drive social change and awareness",
    category: "Advocacy",
    format: "PDF",
    pages: 45,
    downloads: 2341,
    icon: Lightbulb,
    bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    title: "Inclusive Language Guide",
    description:
      "Best practices for respectful communication about disability, mental health, and Sexual and Gender minority community issues",
    category: "Communication",
    format: "PDF",
    pages: 28,
    downloads: 1876,
    icon: Users,
    bgColor: "bg-gradient-to-br from-pink-500 to-purple-500",
  },
  {
    title: "Community Organizing Handbook",
    description:
      "Step-by-step guide for building grassroots advocacy movements",
    category: "Organizing",
    format: "PDF",
    pages: 62,
    downloads: 1543,
    icon: Heart,
    bgColor: "bg-gradient-to-br from-purple-600 to-pink-600",
  },
  {
    title: "Social Media Analytics for NGOs",
    description:
      "How to measure and improve your advocacy campaign performance",
    category: "Analytics",
    format: "PDF",
    pages: 35,
    downloads: 1234,
    icon: Shield,
    bgColor: "bg-gradient-to-br from-pink-600 to-purple-600",
  },
];

const POLICY_PAPERS = [
  {
    title: "Disability Rights in Ghana: Policy Gaps and Recommendations",
    authors: "Dr. Ama Osei, Prof. Kwame Asante",
    date: "2024-11-15",
    abstract:
      "Comprehensive analysis of Ghana's disability policy framework and actionable recommendations for improvement.",
    downloads: 892,
  },
  {
    title: "Mental Health Stigma: A Social Media Analysis",
    authors: "Akosua Mensah, Dr. Samuel Boateng",
    date: "2024-10-20",
    abstract:
      "Examination of mental health stigma patterns in Ghanaian social media conversations.",
    downloads: 734,
  },
  {
    title:
      "Sexual and Gender Minority Community Rights and Social Acceptance in Ghana",
    authors: "Prof. Yaa Asantewa, Dr. Kofi Amponsah",
    date: "2024-09-30",
    abstract:
      "Research on social attitudes and policy recommendations for Sexual and Gender minority community inclusion.",
    downloads: 567,
  },
];

const SUPPORT_CONTACTS = [
  {
    category: "Mental Health Support",
    icon: Heart,
    bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
    contacts: [
      {
        name: "Ghana Mental Health Authority",
        phone: "+233-302-234-567",
        email: "info@mentalhealth.gov.gh",
      },
      {
        name: "Mindcare Ghana",
        phone: "+233-244-348-888",
        email: "support@mindcare.gh",
      },
      {
        name: "Crisis Helpline",
        phone: "18555 (Toll-free)",
        email: "crisis@helpline.gh",
      },
    ],
  },
  {
    category: "VAW Support Services",
    icon: Shield,
    bgColor: "bg-gradient-to-br from-pink-500 to-purple-500",
    contacts: [
      {
        name: "Domestic Violence Hotline",
        phone: "+233-800-111-222",
        email: "help@dovvsu.gov.gh",
      },
      {
        name: "Women's Rights Coalition",
        phone: "+233-302-123-456",
        email: "info@wrcghana.org",
      },
      {
        name: "Legal Aid for Women",
        phone: "+233-244-567-890",
        email: "legal@womensaid.gh",
      },
    ],
  },
  {
    category: "Disability Services",
    icon: Users,
    bgColor: "bg-gradient-to-br from-purple-600 to-pink-600",
    contacts: [
      {
        name: "Ghana Federation of Disability Organizations",
        phone: "+233-302-765-432",
        email: "info@gfdo.org.gh",
      },
      {
        name: "National Council on Persons with Disability",
        phone: "+233-302-987-654",
        email: "contact@ncpd.gov.gh",
      },
      {
        name: "Enablement Initiative",
        phone: "+233-244-111-333",
        email: "hello@enablement.org",
      },
    ],
  },
  {
    category: "SGMC Resources",
    icon: Lightbulb,
    bgColor: "bg-gradient-to-br from-pink-600 to-purple-600",
    contacts: [
      {
        name: "SGMC Rights Ghana",
        phone: "+233-244-777-888",
        email: "support@lgbtqrights.gh",
      },
      {
        name: "Safe Spaces Network",
        phone: "+233-302-444-555",
        email: "info@safespaces.gh",
      },
      {
        name: "Pride Counseling Services",
        phone: "+233-244-222-444",
        email: "counseling@pride.gh",
      },
    ],
  },
];

const EDUCATIONAL = [
  {
    title: "Understanding Disability Rights",
    type: "Video Series",
    duration: "6 episodes, 45 min total",
    description:
      "Educational videos covering the basics of disability rights and advocacy in Ghana.",
    icon: Video,
    progress: 0,
  },
  {
    title: "Mental Health First Aid",
    type: "Online Course",
    duration: "2 hours",
    description:
      "Learn how to provide initial support to someone experiencing a mental health crisis.",
    icon: GraduationCap,
    progress: 0,
  },
  {
    title: "Inclusive Communication Workshop",
    type: "Interactive Guide",
    duration: "Self-paced",
    description:
      "Practice using inclusive language and communication techniques.",
    icon: Users,
    progress: 0,
  },
  {
    title: "Building Allyship",
    type: "Toolkit",
    duration: "1 hour reading",
    description:
      "Resources for becoming a better ally to marginalized communities.",
    icon: Heart,
    progress: 0,
  },
];

const HERO_STATS = [
  { value: "50+", label: "Resources" },
  { value: "10K+", label: "Downloads" },
  { value: "24/7", label: "Support" },
  { value: "Free", label: "Access" },
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

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={resourcesImage}
            alt="Resources"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-5 py-2 mb-8 animate-fade-in-down">
            <span className="text-sm font-medium">Knowledge Hub</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            Resources & <span className="text-primary">Support</span>
          </h1>

          {/* Description */}
          <p
            className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Access comprehensive resources, support contacts, and educational
            materials to support your advocacy work and connect with help when
            needed.
          </p>

          {/* Search Bar */}
          <div
            className="max-w-xl mx-auto animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources, guides, contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-border/50 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap justify-center gap-6 mt-10 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.7s" }}
          >
            {HERO_STATS.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              >
                <span className="font-bold text-primary">{stat.value}</span>
                <span className="text-muted-foreground text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Tabs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="guides" className="space-y-12">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-muted/50 p-1 rounded-full h-auto">
              <TabsTrigger
                value="guides"
                className="rounded-full py-3 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Guides
              </TabsTrigger>
              <TabsTrigger
                value="research"
                className="rounded-full py-3 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Research
              </TabsTrigger>
              <TabsTrigger
                value="support"
                className="rounded-full py-3 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Support
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="rounded-full py-3 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Education
              </TabsTrigger>
            </TabsList>

            {/* Guides & Toolkits */}
            <TabsContent value="guides" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Advocacy Guides &{" "}
                  <span className="text-primary">Toolkits</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Practical resources to help activists, NGOs, and advocates
                  maximize their impact.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {GUIDES.map((guide, index) => (
                  <Card
                    key={index}
                    className="border border-border/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`inline-flex items-center justify-center w-14 h-14 ${guide.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}
                        >
                          <guide.icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
                            {guide.category}
                          </Badge>
                          <h3 className="text-xl font-bold mb-2">
                            {guide.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {guide.description}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span>{guide.format}</span>
                            <span>•</span>
                            <span>{guide.pages} pages</span>
                            <span>•</span>
                            <span>
                              {guide.downloads.toLocaleString()} downloads
                            </span>
                          </div>

                          <Button className="w-full bg-primary hover:bg-primary/90">
                            <Download className="mr-2 h-4 w-4" />
                            Download Guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Research Papers */}
            <TabsContent value="research" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Policy Papers &{" "}
                  <span className="text-primary">Case Studies</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Research findings and policy recommendations from our team and
                  partners.
                </p>
              </div>

              <div className="space-y-6">
                {POLICY_PAPERS.map((paper, index) => (
                  <Card
                    key={index}
                    className="border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        <div className="flex-1">
                          <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                            Policy Paper
                          </Badge>
                          <h3 className="text-xl font-bold mb-2">
                            {paper.title}
                          </h3>
                          <div className="text-sm text-muted-foreground mb-3">
                            By {paper.authors} • Published{" "}
                            {new Date(paper.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {paper.abstract}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Download className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">
                              {paper.downloads.toLocaleString()} downloads
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-3 lg:flex-col">
                          <Button variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Preview
                          </Button>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Support Contacts */}
            <TabsContent value="support" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Support <span className="text-primary">Contacts</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Emergency contacts, helplines, and support services across
                  Ghana.
                </p>
              </div>

              <div className="space-y-12">
                {SUPPORT_CONTACTS.map((category, index) => (
                  <div
                    key={index}
                    className="animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 ${category.bgColor} rounded-xl`}
                      >
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">
                        {category.category}
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {category.contacts.map((contact, idx) => (
                        <Card
                          key={idx}
                          className="border border-border/50 hover:shadow-lg transition-all duration-300"
                        >
                          <CardContent className="p-6">
                            <h4 className="font-bold text-lg mb-4">
                              {contact.name}
                            </h4>
                            <div className="space-y-3 mb-4">
                              <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-primary" />
                                <span className="text-sm">{contact.phone}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary" />
                                <span className="text-sm">{contact.email}</span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <ExternalLink className="mr-2 h-3 w-3" />
                              Contact Now
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Educational Materials */}
            <TabsContent value="education" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Educational <span className="text-primary">Materials</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Interactive learning resources and training materials for
                  advocacy and allyship.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {EDUCATIONAL.map((resource, index) => (
                  <Card
                    key={index}
                    className="border border-border/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <resource.icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                              {resource.type}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{resource.duration}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {resource.description}
                          </p>

                          <Button className="w-full bg-primary hover:bg-primary/90">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Access Resource
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Our team is here to help. Reach out to us and we'll point you in the
            right direction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg">
              Contact Support
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Request a Resource
            </Button>
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
