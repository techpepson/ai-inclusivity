import { BookOpen, Download, ExternalLink, Phone, Mail, FileText, Video, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Resources() {
  const guides = [
    {
      title: "Digital Advocacy Toolkit",
      description: "Complete guide for using social media to drive social change and awareness",
      category: "Advocacy",
      format: "PDF",
      pages: 45,
      downloads: 2341
    },
    {
      title: "Inclusive Language Guide",
      description: "Best practices for respectful communication about disability, mental health, and LGBTQ+ issues",
      category: "Communication",
      format: "PDF",
      pages: 28,
      downloads: 1876
    },
    {
      title: "Community Organizing Handbook",
      description: "Step-by-step guide for building grassroots advocacy movements",
      category: "Organizing",
      format: "PDF",
      pages: 62,
      downloads: 1543
    },
    {
      title: "Social Media Analytics for NGOs",
      description: "How to measure and improve your advocacy campaign performance",
      category: "Analytics",
      format: "PDF",
      pages: 35,
      downloads: 1234
    }
  ];

  const policyPapers = [
    {
      title: "Disability Rights in Ghana: Policy Gaps and Recommendations",
      authors: "Dr. Ama Osei, Prof. Kwame Asante",
      date: "2024-11-15",
      abstract: "Comprehensive analysis of Ghana's disability policy framework and actionable recommendations for improvement.",
      downloads: 892
    },
    {
      title: "Mental Health Stigma: A Social Media Analysis",
      authors: "Akosua Mensah, Dr. Samuel Boateng",
      date: "2024-10-20",
      abstract: "Examination of mental health stigma patterns in Ghanaian social media conversations.",
      downloads: 734
    },
    {
      title: "LGBTQ+ Rights and Social Acceptance in Ghana",
      authors: "Prof. Yaa Asantewa, Dr. Kofi Amponsah",
      date: "2024-09-30",
      abstract: "Research on social attitudes and policy recommendations for LGBTQ+ inclusion.",
      downloads: 567
    }
  ];

  const supportContacts = [
    {
      category: "Mental Health Support",
      contacts: [
        { name: "Ghana Mental Health Authority", phone: "+233-302-234-567", email: "info@mentalhealth.gov.gh" },
        { name: "Mindcare Ghana", phone: "+233-244-348-888", email: "support@mindcare.gh" },
        { name: "Crisis Helpline", phone: "18555 (Toll-free)", email: "crisis@helpline.gh" }
      ]
    },
    {
      category: "VAW Support Services",
      contacts: [
        { name: "Domestic Violence Hotline", phone: "+233-800-111-222", email: "help@dovvsu.gov.gh" },
        { name: "Women's Rights Coalition", phone: "+233-302-123-456", email: "info@wrcghana.org" },
        { name: "Legal Aid for Women", phone: "+233-244-567-890", email: "legal@womensaid.gh" }
      ]
    },
    {
      category: "Disability Services",
      contacts: [
        { name: "Ghana Federation of Disability Organizations", phone: "+233-302-765-432", email: "info@gfdo.org.gh" },
        { name: "National Council on Persons with Disability", phone: "+233-302-987-654", email: "contact@ncpd.gov.gh" },
        { name: "Enablement Initiative", phone: "+233-244-111-333", email: "hello@enablement.org" }
      ]
    },
    {
      category: "LGBTQ+ Resources",
      contacts: [
        { name: "LGBTQ+ Rights Ghana", phone: "+233-244-777-888", email: "support@lgbtqrights.gh" },
        { name: "Safe Spaces Network", phone: "+233-302-444-555", email: "info@safespaces.gh" },
        { name: "Pride Counseling Services", phone: "+233-244-222-444", email: "counseling@pride.gh" }
      ]
    }
  ];

  const educational = [
    {
      title: "Understanding Disability Rights",
      type: "Video Series",
      duration: "6 episodes, 45 min total",
      description: "Educational videos covering the basics of disability rights and advocacy in Ghana."
    },
    {
      title: "Mental Health First Aid",
      type: "Online Course",
      duration: "2 hours",
      description: "Learn how to provide initial support to someone experiencing a mental health crisis."
    },
    {
      title: "Inclusive Communication Workshop",
      type: "Interactive Guide",
      duration: "Self-paced",
      description: "Practice using inclusive language and communication techniques."
    },
    {
      title: "Building Allyship",
      type: "Toolkit",
      duration: "1 hour reading",
      description: "Resources for becoming a better ally to marginalized communities."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Resources & Support</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access comprehensive resources, support contacts, and educational materials to support 
            your advocacy work and connect with help when needed.
          </p>
        </div>

        {/* Resource Tabs */}
        <Tabs defaultValue="guides" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="guides">Guides & Toolkits</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="support">Support Contacts</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          {/* Guides & Toolkits */}
          <TabsContent value="guides" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Advocacy Guides & Toolkits</h2>
              <p className="text-lg text-muted-foreground">
                Practical resources to help activists, NGOs, and advocates maximize their impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {guides.map((guide, index) => (
                <Card key={index} className="bg-gradient-card border-0">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center ml-4">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <Badge variant="outline">{guide.category}</Badge>
                      <span>{guide.format}</span>
                      <span>{guide.pages} pages</span>
                      <span>{guide.downloads.toLocaleString()} downloads</span>
                    </div>
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Research Papers */}
          <TabsContent value="research" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Policy Papers & Case Studies</h2>
              <p className="text-lg text-muted-foreground">
                Research findings and policy recommendations from our team and partners.
              </p>
            </div>

            <div className="space-y-6">
              {policyPapers.map((paper, index) => (
                <Card key={index} className="bg-gradient-card border-0">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{paper.title}</CardTitle>
                        <div className="text-sm text-muted-foreground mb-3">
                          By {paper.authors} • Published {new Date(paper.date).toLocaleDateString()}
                        </div>
                        <CardDescription>{paper.abstract}</CardDescription>
                        <div className="text-sm text-muted-foreground mt-2">
                          {paper.downloads.toLocaleString()} downloads
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Support Contacts */}
          <TabsContent value="support" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Support Contacts</h2>
              <p className="text-lg text-muted-foreground">
                Emergency contacts, helplines, and support services across Ghana.
              </p>
            </div>

            <div className="space-y-8">
              {supportContacts.map((category, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-bold mb-6">{category.category}</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {category.contacts.map((contact, idx) => (
                      <Card key={idx} className="bg-gradient-card border-0">
                        <CardHeader>
                          <CardTitle className="text-lg">{contact.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-primary" />
                            <span className="text-sm">{contact.phone}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-primary" />
                            <span className="text-sm">{contact.email}</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Educational Materials</h2>
              <p className="text-lg text-muted-foreground">
                Interactive learning resources and training materials for advocacy and allyship.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {educational.map((resource, index) => (
                <Card key={index} className="bg-gradient-card border-0">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        {resource.type === "Video Series" && <Video className="h-6 w-6 text-accent" />}
                        {resource.type === "Online Course" && <BookOpen className="h-6 w-6 text-accent" />}
                        {resource.type === "Interactive Guide" && <Users className="h-6 w-6 text-accent" />}
                        {resource.type === "Toolkit" && <FileText className="h-6 w-6 text-accent" />}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{resource.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{resource.type}</Badge>
                          <span className="text-sm text-muted-foreground">{resource.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{resource.description}</CardDescription>
                    <Button className="w-full bg-gradient-accent hover:opacity-90">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}