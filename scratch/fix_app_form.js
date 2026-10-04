const fs = require('fs');

const path = 'src/app/(admin)/admin/(protected)/apps/_components/AppForm.tsx';
let code = fs.readFileSync(path, 'utf8');

const imports = `import { normalizeLocalized, normalizeLocalizedArray } from "@/lib/utils/localization";\n`;
if (!code.includes('normalizeLocalized')) {
  code = code.replace('import { useForm, useFieldArray } from "react-hook-form";', imports + 'import { useForm, useFieldArray } from "react-hook-form";');
}

const defaultValuesBlock = `defaultValues: initialData ? {
      ...initialData,
      name: normalizeLocalized(initialData.name),
      shortDescription: normalizeLocalized(initialData.shortDescription),
      description: normalizeLocalized(initialData.description),
      deployment: normalizeLocalized(initialData.deployment),
      seoTitle: normalizeLocalized(initialData.seoTitle),
      seoDescription: normalizeLocalized(initialData.seoDescription),
      benefits: normalizeLocalizedArray(initialData.benefits),
      features: normalizeLocalizedArray(initialData.features),
      requirements: normalizeLocalizedArray(initialData.requirements),
      links: (initialData.links || []).map(l => ({ ...l, label: normalizeLocalized(l.label) })),
    } : {
      name: { id: "", en: "" },
      slug: "",
      shortDescription: { id: "", en: "" },
      description: { id: "", en: "" },
      category: "",
      status: "In Development",
      visibility: "Draft",
      featured: false,
      pricingModel: "Free / Open",
      platform: "",
      technologies: [],
      logo: null,
      heroImage: null,
      gallery: [],
      benefits: [],
      features: [],
      requirements: [],
      deployment: { id: "", en: "" },
      links: [],
      seoTitle: { id: "", en: "" },
      seoDescription: { id: "", en: "" },
      ogImage: null,
    } as unknown as ProductFormData`;

// We just replace everything from `defaultValues: initialData || {` to `} as unknown as ProductFormData`
code = code.replace(/defaultValues: initialData \|\| \{[\s\S]*?\} as unknown as ProductFormData/, defaultValuesBlock);

code = code.replace(/register\("name"\)/g, 'register("name.id")');
code = code.replace(/register\("shortDescription"\)/g, 'register("shortDescription.id")');
code = code.replace(/register\("description"\)/g, 'register("description.id")');
code = code.replace(/register\("deployment"\)/g, 'register("deployment.id")');
code = code.replace(/register\("seoTitle"\)/g, 'register("seoTitle.id")');
code = code.replace(/register\("seoDescription"\)/g, 'register("seoDescription.id")');
code = code.replace(/register\(\`links\.\$\{index\}\.label\` as const\)/g, 'register(`links.${index}.label.id` as const)');

fs.writeFileSync(path, code);
console.log('AppForm fixed');
