import os
import re

files = [
    "src/components/home/About.tsx",
    "src/components/home/Stack.tsx"
]

for file in files:
    with open(file, "r") as f:
        content = f.read()
    if "getDictionary" not in content:
        content = 'import { getDictionary } from "@/i18n/getDictionary";\nimport { Locale } from "@/i18n/config";\n' + content
    with open(file, "w") as f:
        f.write(content)

dup_files = [
    "src/components/home/Apps.tsx",
    "src/components/home/Articles.tsx",
    "src/components/home/Projects.tsx"
]

for file in dup_files:
    with open(file, "r") as f:
        content = f.read()
    
    # Remove duplicate imports
    content = content.replace('import { getDictionary } from "@/i18n/getDictionary";\nimport { Locale } from "@/i18n/config";\n', "", 1)
    
    with open(file, "w") as f:
        f.write(content)
