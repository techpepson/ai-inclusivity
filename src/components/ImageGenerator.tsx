import { useState, useEffect } from "react";
import { toast } from "sonner";
import { RunwareService, GeneratedImage } from "@/services/runware";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { Loader2 } from "lucide-react";

interface ImageGeneratorProps {
  children: (images: Record<string, string>) => React.ReactNode;
}

export function ImageGenerator({ children }: ImageGeneratorProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [images, setImages] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  const imagePrompts = {
    hero: "Professional diverse group of people holding hands in unity, modern Ghana cityscape background, inspiring and hopeful atmosphere, photorealistic, high quality, 16:9 aspect ratio",
    disability: "Person in wheelchair using accessible ramp in modern building, inclusive design, professional photography, warm lighting, empowering perspective",
    vaw: "Strong diverse women standing together in solidarity, professional portrait style, empowering and supportive atmosphere, warm colors",
    mentalHealth: "Peaceful meditation scene with diverse people, mental wellness concept, soft natural lighting, calming and serene atmosphere",
    lgbtq: "Diverse group celebrating pride with rainbow colors, joyful and inclusive atmosphere, professional photography, vibrant and positive",
    analytics: "Modern data visualization dashboard on computer screen, professional office setting, clean and technical aesthetic",
    team: "Professional diverse team in modern office meeting room, collaborative atmosphere, business photography style",
    community: "Large diverse crowd at peaceful rally with signs, aerial view, community gathering, professional photojournalism style"
  };

  const generateImages = async (runwareApiKey: string) => {
    setIsGenerating(true);
    setHasApiKey(true);
    
    try {
      const runware = new RunwareService(runwareApiKey);
      const generatedImages: Record<string, string> = {};

      for (const [key, prompt] of Object.entries(imagePrompts)) {
        try {
          toast.info(`Generating ${key} image...`);
          const result = await runware.generateImage({
            positivePrompt: prompt,
            width: key === 'hero' ? 1920 : 1024,
            height: key === 'hero' ? 1080 : 1024,
            model: "runware:100@1",
            numberResults: 1,
            outputFormat: "WEBP"
          });

          generatedImages[key] = result.imageURL;
          toast.success(`Generated ${key} image successfully!`);
        } catch (error) {
          console.error(`Error generating ${key} image:`, error);
          toast.error(`Failed to generate ${key} image`);
        }
      }

      setImages(generatedImages);
      toast.success("All images generated successfully!");
    } catch (error) {
      console.error("Error generating images:", error);
      toast.error("Failed to generate images. Please check your API key.");
      setHasApiKey(false);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasApiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <ApiKeyInput onApiKeySubmit={generateImages} isLoading={isGenerating} />
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <div className="text-xl font-semibold">Generating Professional Images</div>
          <div className="text-muted-foreground">This may take a few minutes...</div>
        </div>
      </div>
    );
  }

  return <>{children(images)}</>;
}