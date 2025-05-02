
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Link, Upload } from "lucide-react";

interface VideoInputProps {
  videoUrl: string;
  onVideoUrlChange: (url: string) => void;
}

const VideoInput = ({ videoUrl, onVideoUrlChange }: VideoInputProps) => {
  const [activeTab, setActiveTab] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate file upload (in a real app, this would be an API call)
    setUploading(true);
    setFileName(file.name);

    // Simulate upload delay
    setTimeout(() => {
      // Create a blob URL for the file (for demo purposes)
      const blobUrl = URL.createObjectURL(file);
      onVideoUrlChange(blobUrl);
      setUploading(false);
      
      // In a real app, you would upload to a server and get back a URL
      console.log("Video file uploaded:", file.name);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "url" | "upload")} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            <span>Video URL</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Upload File</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="mt-0">
          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL *</Label>
            <Input
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => onVideoUrlChange(e.target.value)}
              placeholder="https://example.com/video.mp4"
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter a direct link to your video file or embed URL from YouTube, Vimeo, etc.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="upload" className="mt-0">
          <div className="space-y-2">
            <Label htmlFor="videoFile">Upload Video File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="videoFile"
                type="file"
                accept="video/*"
                onChange={handleUpload}
                className="hidden"
              />
              <Label 
                htmlFor="videoFile" 
                className="cursor-pointer border border-dashed border-input rounded-md p-6 w-full flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">MP4, WebM, or OGG (max 100MB)</p>
                </div>
              </Label>
            </div>
            
            {uploading && (
              <div className="mt-2 bg-muted p-2 rounded flex items-center gap-2">
                <div className="animate-pulse bg-primary/30 h-2 w-full rounded-full" />
                <p className="text-xs whitespace-nowrap">Uploading...</p>
              </div>
            )}
            
            {fileName && !uploading && (
              <div className="mt-2 bg-muted/50 p-2 rounded flex items-center justify-between">
                <p className="text-sm truncate">{fileName}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs"
                  onClick={() => setFileName("")}
                >
                  Change
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {videoUrl && !uploading && activeTab === "url" && (
        <div className="mt-4">
          <Label>Video Preview</Label>
          <div className="aspect-video mt-2 bg-black/10 rounded-md overflow-hidden">
            <video 
              src={videoUrl}
              controls
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoInput;
