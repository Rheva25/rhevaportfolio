"use client";

import { MediaAsset, MediaAssetFormData } from "@/lib/validations/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Trash2, 
  Image as ImageIcon,
  Upload,
  Copy,
  Info,
  X,
  Check,
  Loader2,
  AlertTriangle
} from "lucide-react";
import { useState, useTransition, useRef } from "react";
import { deleteMediaAssetAction, updateMediaAssetAction, uploadMediaAction } from "@/app/actions/media";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function MediaList({ mediaAssets, error }: { mediaAssets: MediaAsset[]; error?: string }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("Newest");
  
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inspector form state
  const [inspectorData, setInspectorData] = useState<Partial<MediaAssetFormData>>({});
  const [isDirty, setIsDirty] = useState(false);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-900/50 rounded-lg">
        <div className="bg-red-900/20 p-4 rounded-full mb-4">
          <ImageIcon className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">Database Connection Failed</h3>
        <p className="text-red-400/80 max-w-md mx-auto mb-6">
          {error}
        </p>
      </div>
    );
  }

  const filtered = mediaAssets.filter(m => {
    const matchesSearch = 
      m.fileName.toLowerCase().includes(search.toLowerCase()) ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.altText.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      
    const matchesType = typeFilter === "All" || m.mimeType === typeFilter;
    
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (sortOrder === "Newest") {
      return String(b.createdAt).localeCompare(String(a.createdAt));
    }
    if (sortOrder === "Oldest") {
      return String(a.createdAt).localeCompare(String(b.createdAt));
    }
    if (sortOrder === "Filename") {
      return a.fileName.localeCompare(b.fileName);
    }
    return 0;
  });

  const handleDelete = async (id: string) => {
    const asset = mediaAssets.find(a => a.id === id);
    if (!asset) return;
    
    if (asset.usage && asset.usage.length > 0) {
      alert("This asset is currently used by one or more records and cannot be deleted.");
      return;
    }

    if (!confirm("Are you sure you want to delete this media asset? This action cannot be undone.")) return;
    
    setProcessingId(id);
    try {
      await deleteMediaAssetAction(id);
      if (selectedAsset?.id === id) {
        setSelectedAsset(null);
        setIsInspectorOpen(false);
      }
      router.refresh();
    } catch (e: unknown) {
      alert((e as Error).message || "Failed to delete media asset");
    } finally {
      setProcessingId(null);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleUpdateMetadata = async () => {
    if (!selectedAsset || !isDirty) return;
    
    setProcessingId(selectedAsset.id);
    startTransition(async () => {
      try {
        await updateMediaAssetAction(selectedAsset.id, inspectorData);
        setIsDirty(false);
        router.refresh();
      } catch (e: unknown) {
        alert((e as Error).message || "Failed to update metadata");
      } finally {
        setProcessingId(null);
      }
    });
  };

  const openInspector = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setInspectorData({
      title: asset.title,
      altText: asset.altText,
      caption: asset.caption,
      description: asset.description,
    });
    setIsDirty(false);
    setIsInspectorOpen(true);
  };

  const closeInspector = () => {
    setIsInspectorOpen(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Invalid file type. Only JPG, PNG, WebP, and SVG are supported.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10); // Initial progress
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // We simulate some progress while uploading to Server Action
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      await uploadMediaAction(formData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        router.refresh();
      }, 500);

    } catch (err: unknown) {
      console.error("Upload error:", err);
      setUploadError((err as Error).message || "Failed to upload file to server.");
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-20 relative">
      
      {/* Main Grid Area */}
      <div className={`flex-1 space-y-6 ${isInspectorOpen ? 'hidden lg:block' : 'block'}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
            <p className="text-muted-foreground mt-1">
              Centralized asset management for projects, articles, and content.
            </p>
          </div>
        </div>

        {/* Upload Dropzone */}
        <div 
          className="border-2 border-dashed border-zinc-800 bg-zinc-900/30 rounded-lg p-8 text-center flex flex-col items-center justify-center transition-colors hover:bg-zinc-900/50 hover:border-zinc-700 cursor-pointer relative"
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/jpeg, image/png, image/webp, image/svg+xml"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center max-w-sm w-full">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <h3 className="text-lg font-medium text-zinc-300 mb-2">Uploading... {Math.round(uploadProgress)}%</h3>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-zinc-600 mb-4" />
              <h3 className="text-lg font-medium text-zinc-300 mb-1">Upload Media</h3>
              <p className="text-sm text-zinc-500 mb-4 max-w-sm">
                Click here to select an image (JPG, PNG, WebP, SVG). Max size 5MB.
              </p>
              
              {uploadError && (
                <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-md text-sm text-red-500 flex items-start gap-2 max-w-md text-left mt-2">
                  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-red-400 mb-1">Upload Failed</strong>
                    {uploadError}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assets by filename, title, or alt text..."
              className="pl-8 bg-zinc-900/50 border-zinc-800 focus-visible:ring-zinc-700 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex w-full sm:w-auto gap-2">
            <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val || "All")}>
              <SelectTrigger className="w-[140px] bg-zinc-900/50 border-zinc-800">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="image/png">PNG</SelectItem>
                <SelectItem value="image/jpeg">JPEG/JPG</SelectItem>
                <SelectItem value="image/webp">WebP</SelectItem>
                <SelectItem value="image/svg+xml">SVG</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={(val) => setSortOrder(val || "Newest")}>
              <SelectTrigger className="w-[140px] bg-zinc-900/50 border-zinc-800">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Newest">Newest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
                <SelectItem value="Filename">Filename</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Media Grid / Empty State */}
        {mediaAssets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/30 border border-dashed border-zinc-800 rounded-lg">
            <ImageIcon className="h-10 w-10 text-zinc-600 mb-4" />
            <h3 className="text-lg font-medium text-zinc-300 mb-1">No media yet.</h3>
            <p className="text-zinc-500 mb-6 max-w-sm">
              Upload your first asset to get started.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/30 border border-dashed border-zinc-800 rounded-lg">
            <Search className="h-10 w-10 text-zinc-600 mb-4" />
            <h3 className="text-lg font-medium text-zinc-300 mb-1">No matches found</h3>
            <p className="text-zinc-500 max-w-sm">
              No media matches your current filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((asset) => (
              <div 
                key={asset.id} 
                onClick={() => openInspector(asset)}
                className={`group relative aspect-square rounded-lg border overflow-hidden cursor-pointer transition-all ${
                  selectedAsset?.id === asset.id 
                    ? 'border-blue-500 ring-1 ring-blue-500' 
                    : 'border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {/* Image Preview */}
                <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={asset.downloadURL} 
                    alt={asset.altText || asset.fileName}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Meta Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs font-medium text-white truncate">{asset.fileName}</div>
                  <div className="text-[10px] text-zinc-300 mt-0.5">
                    {asset.mimeType.split('/')[1]?.toUpperCase()} • {Math.round(asset.fileSize / 1024)} KB
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Asset Inspector (Sidebar / Sheet) */}
      {isInspectorOpen && selectedAsset && (
        <div className="lg:w-[380px] shrink-0 border border-zinc-800 rounded-lg bg-card overflow-hidden flex flex-col fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto">
          
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-muted/30">
            <h3 className="font-semibold">Asset Inspector</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeInspector}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="overflow-y-auto flex-1 p-4 space-y-6">
            
            {/* Preview Image */}
            <div className="aspect-video bg-zinc-950 rounded-md border border-zinc-800 flex items-center justify-center overflow-hidden p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedAsset.downloadURL} 
                alt={selectedAsset.altText || selectedAsset.fileName}
                className="w-full h-full object-contain"
              />
            </div>

            {/* File Info */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-muted-foreground">Filename</span>
                <span className="truncate max-w-[200px] font-mono text-xs">{selectedAsset.fileName}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-muted-foreground">Type</span>
                <span>{selectedAsset.mimeType}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-muted-foreground">Size</span>
                <span>{Math.round(selectedAsset.fileSize / 1024)} KB</span>
              </div>
              {selectedAsset.width && selectedAsset.height && (
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span>{selectedAsset.width} × {selectedAsset.height} px</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 text-xs h-8"
                onClick={() => handleCopyUrl(selectedAsset.downloadURL)}
              >
                {isCopied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {isCopied ? "Copied" : "Copy URL"}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 text-xs h-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                onClick={() => handleDelete(selectedAsset.id)}
                disabled={processingId === selectedAsset.id || isPending}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Delete
              </Button>
            </div>
            
            {(selectedAsset.usage?.length ?? 0) > 0 && (
              <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded-md">
                <div className="text-xs font-semibold text-amber-500 mb-1 flex items-center">
                  <Info className="h-3.5 w-3.5 mr-1" />
                  Referenced Asset
                </div>
                <div className="text-[11px] text-amber-500/80 leading-tight">
                  This asset is currently used by {selectedAsset.usage.length} record(s) and cannot be deleted.
                </div>
              </div>
            )}

            {/* Metadata Edit Form */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <h4 className="font-semibold text-sm">Metadata</h4>
              
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs">Title</Label>
                <Input 
                  id="title" 
                  value={inspectorData.title ?? ""} 
                  onChange={(e) => {
                    setInspectorData({...inspectorData, title: e.target.value});
                    setIsDirty(true);
                  }}
                  className="h-8 text-xs bg-zinc-900/50" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="altText" className="text-xs">Alt Text (Accessibility)</Label>
                <Input 
                  id="altText" 
                  value={inspectorData.altText ?? ""} 
                  onChange={(e) => {
                    setInspectorData({...inspectorData, altText: e.target.value});
                    setIsDirty(true);
                  }}
                  className="h-8 text-xs bg-zinc-900/50" 
                  placeholder="Describe the image..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caption" className="text-xs">Caption</Label>
                <Input 
                  id="caption" 
                  value={inspectorData.caption ?? ""} 
                  onChange={(e) => {
                    setInspectorData({...inspectorData, caption: e.target.value});
                    setIsDirty(true);
                  }}
                  className="h-8 text-xs bg-zinc-900/50" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs">Description</Label>
                <Textarea 
                  id="description" 
                  value={inspectorData.description ?? ""} 
                  onChange={(e) => {
                    setInspectorData({...inspectorData, description: e.target.value});
                    setIsDirty(true);
                  }}
                  className="text-xs min-h-[80px] bg-zinc-900/50 resize-none" 
                />
              </div>

              <Button 
                onClick={handleUpdateMetadata}
                disabled={!isDirty || processingId === selectedAsset.id || isPending}
                className="w-full h-8 text-xs"
              >
                {processingId === selectedAsset.id ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : null}
                Save Metadata
              </Button>
            </div>

            {/* Usage Display */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <h4 className="font-semibold text-sm">Usage ({selectedAsset.usage?.length || 0})</h4>
              
              {selectedAsset.usage && selectedAsset.usage.length > 0 ? (
                <div className="space-y-2">
                  {selectedAsset.usage.map((u, i) => (
                    <div key={i} className="text-xs p-2 bg-zinc-900/50 border border-zinc-800 rounded flex items-start gap-2">
                      <div className="uppercase font-semibold text-[9px] text-zinc-500 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-800 shrink-0 mt-0.5">
                        {u.type}
                      </div>
                      <div className="truncate">
                        <div className="font-medium truncate">{u.entityName}</div>
                        <div className="text-muted-foreground">Field: {u.field}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground p-3 bg-zinc-900/30 border border-zinc-800 border-dashed rounded text-center">
                  No active references found.
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
