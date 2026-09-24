import os
import glob

base_dir = "src/app/(public)/[locale]"
files = glob.glob(f"{base_dir}/**/page.tsx", recursive=True) + [f"{base_dir}/page.tsx"]

for f in files:
    if not os.path.isfile(f):
        continue
    
    with open(f, 'r') as file:
        content = file.read()
        
    if 'generateMetadata' in content:
        continue
        
    # Determine path for alternates
    rel_path = f.replace(base_dir, "").replace("/page.tsx", "").replace("\\", "/")
    if rel_path == "":
        rel_path = ""
        
    imports = """import { Metadata } from "next";
import { getLocalizedAlternates } from "@/lib/utils/seo";
"""
    
    if "[slug]" in f:
        # Dynamic page
        if "/projects/" in f:
            metadata_fn = f"""
export async function generateMetadata({{ params }}: {{ params: Promise<{{ locale: string, slug: string }}> }}): Promise<Metadata> {{
  const {{ slug }} = await params;
  return {{
    alternates: getLocalizedAlternates(`/projects/${{slug}}`)
  }};
}}
"""
        elif "/apps/" in f:
             metadata_fn = f"""
export async function generateMetadata({{ params }}: {{ params: Promise<{{ locale: string, slug: string }}> }}): Promise<Metadata> {{
  const {{ slug }} = await params;
  return {{
    alternates: getLocalizedAlternates(`/apps/${{slug}}`)
  }};
}}
"""
        elif "/articles/" in f:
             metadata_fn = f"""
export async function generateMetadata({{ params }}: {{ params: Promise<{{ locale: string, slug: string }}> }}): Promise<Metadata> {{
  const {{ slug }} = await params;
  return {{
    alternates: getLocalizedAlternates(`/articles/${{slug}}`)
  }};
}}
"""
    else:
        # Static page
        metadata_fn = f"""
export async function generateMetadata(): Promise<Metadata> {{
  return {{
    alternates: getLocalizedAlternates("{rel_path}")
  }};
}}
"""
    
    # Prepend imports and append function
    with open(f, 'w') as file:
        file.write(imports + "\n" + content + "\n" + metadata_fn)
        
print("Updated metadata")
