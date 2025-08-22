import { useState } from "react";
import { FileText, Download, Calendar, Filter, Search, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Reports() {
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  const recentReports = [
    {
      title: "Disability Rights Advocacy Q4 2024",
      theme: "Disabilities",
      date: "2024-12-15",
      downloads: 1247,
      type: "Quarterly Report",
      description: "Comprehensive analysis of disability rights conversations and policy developments"
    },
    {
      title: "Mental Health Awareness Campaign Impact",
      theme: "Mental Health", 
      date: "2024-12-10",
      downloads: 892,
      type: "Campaign Report",
      description: "Measuring the reach and impact of #BreakTheStigma mental health campaign"
    },
    {
      title: "VAW Prevention Social Media Analysis",
      theme: "VAW",
      date: "2024-12-05",
      downloads: 756,
      type: "Monthly Report",
      description: "Social media sentiment and engagement analysis for violence against women prevention"
    },
    {
      title: "LGBTQ+ Inclusion Trends November 2024",
      theme: "LGBTQ+",
      date: "2024-11-30",
      downloads: 634,
      type: "Monthly Report", 
      description: "Analysis of inclusion conversations and advocacy efforts in Ghana"
    },
    {
      title: "Cross-Theme Advocacy Impact Report",
      theme: "All Themes",
      date: "2024-11-15",
      downloads: 1523,
      type: "Impact Report",
      description: "Comprehensive overview of advocacy efforts across all four focus areas"
    }
  ];

  const archivedReports = [
    { title: "Annual Social Impact Report 2023", date: "2024-01-15", downloads: 2341 },
    { title: "Mental Health Stigma Analysis 2023", date: "2023-12-20", downloads: 1876 },
    { title: "Disability Rights Policy Review", date: "2023-11-10", downloads: 1654 },
    { title: "LGBTQ+ Advocacy Trends 2023", date: "2023-10-25", downloads: 1432 }
  ];

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case "Disabilities": return "bg-theme-disability/10 text-theme-disability";
      case "VAW": return "bg-theme-vaw/10 text-theme-vaw";
      case "Mental Health": return "bg-theme-mental/10 text-theme-mental";
      case "LGBTQ+": return "bg-theme-lgbtq/10 text-theme-lgbtq";
      default: return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Reports & Analytics</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access comprehensive reports on social media advocacy, campaign performance, and trend analysis 
            across our four focus areas in Ghana.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search reports..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Filter by theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Themes</SelectItem>
              <SelectItem value="disabilities">Disabilities</SelectItem>
              <SelectItem value="vaw">Violence Against Women</SelectItem>
              <SelectItem value="mental-health">Mental Health</SelectItem>
              <SelectItem value="lgbtq">LGBTQ+</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>

        {/* Generate Custom Report */}
        <Card className="bg-gradient-card border-0 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <BarChart3 className="mr-3 h-6 w-6 text-primary" />
              Generate Custom Report
            </CardTitle>
            <CardDescription>
              Create a personalized report with specific themes, date ranges, and metrics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select themes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Themes</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex space-x-2">
                <Input type="date" className="flex-1" />
                <Input type="date" className="flex-1" />
              </div>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Report format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="bg-gradient-hero hover:opacity-90">
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Recent Reports</h2>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Report
            </Button>
          </div>

          <div className="space-y-6">
            {recentReports.map((report, index) => (
              <Card key={index} className="bg-gradient-card border-0 hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-xl">{report.title}</CardTitle>
                        <Badge className={getThemeColor(report.theme)}>
                          {report.theme}
                        </Badge>
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                      <CardDescription>{report.description}</CardDescription>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span>Published: {new Date(report.date).toLocaleDateString()}</span>
                        <span>Downloads: {report.downloads.toLocaleString()}</span>
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
        </section>

        {/* Archived Reports */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Archived Reports</h2>
            <p className="text-lg text-muted-foreground">
              Access historical reports and track long-term advocacy trends.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {archivedReports.map((report, index) => (
              <Card key={index} className="bg-gradient-card border-0">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm leading-tight">{report.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(report.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {report.downloads.toLocaleString()} downloads
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}