const fs = require('fs');

const path = 'src/app/(admin)/admin/(protected)/articles/_components/ArticleForm.tsx';
let code = fs.readFileSync(path, 'utf8');

const imports = `import { normalizeLocalized } from "@/lib/utils/localization";\n`;
if (!code.includes('normalizeLocalized')) {
  code = code.replace('import { useForm, useFieldArray } from "react-hook-form";', imports + 'import { useForm, useFieldArray } from "react-hook-form";');
}

const defaultValuesBlock = `defaultValues: initialData ? {
      ...initialData,
      title: normalizeLocalized(initialData.title),
      excerpt: normalizeLocalized(initialData.excerpt),
      content: normalizeLocalized(initialData.content),
      seoTitle: normalizeLocalized(initialData.seoTitle),
      seoDescription: normalizeLocalized(initialData.seoDescription),
    } : {
      title: { id: "", en: "" },
      slug: "",
      excerpt: { id: "", en: "" },
      content: { id: "", en: "" },
      coverImage: null,
      category: "",
      tags: [],
      author: "Rheva",
      status: "Draft",
      featured: false,
      readingTime: 5,
      seoTitle: { id: "", en: "" },
      seoDescription: { id: "", en: "" },
    } as unknown as ArticleFormData`;

code = code.replace(/defaultValues: initialData \|\| \{[\s\S]*?\} as unknown as ArticleFormData/, defaultValuesBlock);

code = code.replace(/register\("title"\)/g, 'register("title.id")');
code = code.replace(/register\("excerpt"\)/g, 'register("excerpt.id")');
code = code.replace(/register\("content"\)/g, 'register("content.id")');
code = code.replace(/register\("seoTitle"\)/g, 'register("seoTitle.id")');
code = code.replace(/register\("seoDescription"\)/g, 'register("seoDescription.id")');

fs.writeFileSync(path, code);
console.log('ArticleForm fixed');
