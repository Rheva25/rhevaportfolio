// Utility for generating SEO alternates

export function getLocalizedAlternates(path: string) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return {
    canonical: `/en${cleanPath}`,
    languages: {
      "en": `/en${cleanPath}`,
      "id": `/id${cleanPath}`,
      "x-default": `/en${cleanPath}`,
    }
  };
}
