export function getOptimizedOgImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  
  if (url.includes('res.cloudinary.com') && url.includes('/image/upload/')) {
    // Check if it already has transformations, to prevent double transformation
    // Usually transformations don't start with 'v' followed by numbers (like v1791161552)
    const parts = url.split('/image/upload/');
    if (parts.length === 2 && parts[1].match(/^v\d+\//)) {
      return `${parts[0]}/image/upload/w_1200,h_630,c_fill,q_80,f_jpg/${parts[1]}`;
    }
  }
  
  return url;
}
