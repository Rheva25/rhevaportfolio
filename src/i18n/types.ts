export type Dictionary = {
  common: {
    back: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    preview: string;
    search: string;
    loading: string;
    error: string;
    notFound: string;
    success: string;
  };
    home: {
    hero: { availability: string; title: string; subtitle: string; viewWork: string; exploreApps: string; };
    stack: { tag: string; quote: string; verified: string; level1: string; level1Desc: string; level2: string; level2Desc: string; level3: string; level3Desc: string; };
    projects: { tag: string; title: string; subtitle: string; viewAll: string; empty: string; };
    apps: { tag: string; title: string; subtitle: string; viewAll: string; empty: string; };
    services: { tag: string; title: string; subtitle: string; };
    about: { tag: string; title: string; subtitle: string; };
    articles: { tag: string; title: string; subtitle: string; viewAll: string; empty: string; readNote: string; };
    contact: { tag: string; title: string; subtitle: string; button: string; };
  };
  navigation: {
    home: string;
    projects: string;
    apps: string;
    services: string;
    articles: string;
    about: string;
    contact: string;
    admin: string;
  };
};
