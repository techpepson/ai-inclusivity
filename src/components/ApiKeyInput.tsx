import { useState } from "react";
import { Key, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  isLoading?: boolean;
}

export function ApiKeyInput({ onApiKeySubmit, isLoading }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Key className="h-5 w-5" />
          <span>Runware API Key Required</span>
        </CardTitle>
        <CardDescription>
          Enter your Runware API key to generate professional images for the website.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Get your API key from{" "}
            <a 
              href="https://runware.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              runware.ai
            </a>{" "}
            dashboard.
          </AlertDescription>
        </Alert>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter your Runware API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!apiKey.trim() || isLoading}
          >
            {isLoading ? "Generating Images..." : "Generate Professional Images"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}