import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Video as VideoIcon,
  Search,
  Loader2,
  Sparkles,
} from "lucide-react";
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
import { fetchResources } from "@/lib/api-client";
import type { Resource } from "@/lib/types";
import resourcesImage from "@/assets/team-collaboration.jpg";
import { SiteFooter } from "@/components/SiteFooter";

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ["resources"],
    queryFn: fetchResources,
    staleTime: 1000 * 60 * 5,
  });

  const filteredResources = resources.filter((resource) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      resource.title.toLowerCase().includes(searchLower) ||
      resource.description.toLowerCase().includes(searchLower) ||
      resource.type.toLowerCase().includes(searchLower)
    );
  });

  const files = filteredResources.filter((r) => r.type.toUpperCase() === "FILE");
  const images = filteredResources.filter((r) => r.type.toUpperCase() === "IMAGE");
  const videos = filteredResources.filter((r) => r.type.toUpperCase() === "VIDEO");

  const handleDownload = async (url: string, filename: string) => {
    try {
      // Fetch the file and create a blob to force download
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Force download failed, opening in new tab:", error);
      // Fallback: open in new tab
      window.open(url, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative min-h-[450px] flex items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0">
          <img
            src={resourcesImage}
            alt="Resources Hub"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/65 backdrop-blur-xs"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 mb-8 animate-fade-in-down">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">Digital Resource Center</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            Resources & <span className="text-yellow-400">Documents</span>
          </h1>

          {/* Description */}
          <p className="text-lg lg:text-xl text-white/95 mb-10 max-w-3xl mx-auto animate-fade-in-up">
            Access, stream, and download guides, images, videos, and policy materials
            to empower your advocacy work across Ghana.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources, guides, files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-white/20 bg-white/95 text-foreground placeholder:text-muted-foreground shadow-lg focus-visible:ring-yellow-400 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resource Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading company resources...</p>
            </div>
          ) : (
            <Tabs defaultValue="all" className="space-y-12">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-muted/80 p-1.5 rounded-full h-auto shadow-md">
                <TabsTrigger
                  value="all"
                  className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-medium"
                >
                  All ({resources.length})
                </TabsTrigger>
                <TabsTrigger
                  value="files"
                  className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-medium"
                >
                  Files ({resources.filter(r => r.type === "FILE").length})
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-medium"
                >
                  Images ({resources.filter(r => r.type === "IMAGE").length})
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-medium"
                >
                  Videos ({resources.filter(r => r.type === "VIDEO").length})
                </TabsTrigger>
              </TabsList>

              {/* All Resources */}
              <TabsContent value="all" className="space-y-8">
                {filteredResources.length === 0 ? (
                  <NoResourcesFound />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} onDownload={handleDownload} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Files */}
              <TabsContent value="files" className="space-y-8">
                {files.length === 0 ? (
                  <NoResourcesFound type="files" />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {files.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} onDownload={handleDownload} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Images */}
              <TabsContent value="images" className="space-y-8">
                {images.length === 0 ? (
                  <NoResourcesFound type="images" />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} onDownload={handleDownload} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Videos */}
              <TabsContent value="videos" className="space-y-8">
                {videos.length === 0 ? (
                  <NoResourcesFound type="videos" />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} onDownload={handleDownload} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

function NoResourcesFound({ type = "resources" }: { type?: string }) {
  return (
    <Card className="max-w-md mx-auto text-center border-dashed border-2 py-10">
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">No {type} found matching your criteria.</p>
      </CardContent>
    </Card>
  );
}

function ResourceCard({
  resource,
  onDownload,
}: {
  resource: Resource;
  onDownload: (url: string, filename: string) => void;
}) {
  const getIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case "IMAGE":
        return <ImageIcon className="h-6 w-6 text-blue-500" />;
      case "VIDEO":
        return <VideoIcon className="h-6 w-6 text-red-500" />;
      default:
        return <FileText className="h-6 w-6 text-purple-500" />;
    }
  };

  const isImage = resource.type.toUpperCase() === "IMAGE";
  const isVideo = resource.type.toUpperCase() === "VIDEO";

  return (
    <Card className="flex flex-col justify-between overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 group">
      <div>
        {/* Media Preview for Images and Videos */}
        {isImage && (
          <div className="relative h-48 overflow-hidden bg-slate-100">
            <img
              src={resource.url}
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        {isVideo && (
          <div className="relative h-48 overflow-hidden bg-slate-900 flex items-center justify-center">
            <video
              src={resource.url}
              controls
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-3">
          {!isImage && !isVideo && (
            <div className="p-2 bg-slate-100 rounded-lg group-hover:scale-110 transition-transform">
              {getIcon(resource.type)}
            </div>
          )}
          <div className="flex-1 space-y-1">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold capitalize mb-1">
              {resource.type.toLowerCase()}
            </Badge>
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
              {resource.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {resource.description}
          </p>
        </CardContent>
      </div>

      <CardContent className="pt-0 pb-6">
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 gap-2 font-medium"
            onClick={() => onDownload(resource.url, `${resource.title}.${resource.url.split('.').pop()}`)}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block"
          >
            <Button variant="outline" size="icon" title="View Source">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
