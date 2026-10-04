const fs = require('fs');

const path = 'src/app/(admin)/admin/(protected)/projects/_components/ProjectForm.tsx';
let code = fs.readFileSync(path, 'utf8');

// Update defaultValues
code = code.replace(/title: "",/g, 'title: { id: "", en: "" },');
code = code.replace(/shortDescription: "",/g, 'shortDescription: { id: "", en: "" },');
code = code.replace(/description: "",/g, 'description: { id: "", en: "" },');
code = code.replace(/overview: "",/g, 'overview: { id: "", en: "" },');
code = code.replace(/problem: "",/g, 'problem: { id: "", en: "" },');
code = code.replace(/solution: "",/g, 'solution: { id: "", en: "" },');
code = code.replace(/challenges: "",/g, 'challenges: { id: "", en: "" },');
code = code.replace(/outcome: "",/g, 'outcome: { id: "", en: "" },');
code = code.replace(/seoTitle: "",/g, 'seoTitle: { id: "", en: "" },');
code = code.replace(/seoDescription: "",/g, 'seoDescription: { id: "", en: "" },');

// We also need to normalize initialData
const imports = `import { normalizeLocalized, normalizeLocalizedArray } from "@/lib/utils/localization";\n`;
if (!code.includes('normalizeLocalized')) {
  code = code.replace('import { useForm, useFieldArray } from "react-hook-form";', imports + 'import { useForm, useFieldArray } from "react-hook-form";');
}

const defaultValuesBlock = `defaultValues: initialData ? {
      ...initialData,
      title: normalizeLocalized(initialData.title),
      shortDescription: normalizeLocalized(initialData.shortDescription),
      description: normalizeLocalized(initialData.description),
      overview: normalizeLocalized(initialData.overview),
      problem: normalizeLocalized(initialData.problem),
      solution: normalizeLocalized(initialData.solution),
      challenges: normalizeLocalized(initialData.challenges),
      outcome: normalizeLocalized(initialData.outcome),
      seoTitle: normalizeLocalized(initialData.seoTitle),
      seoDescription: normalizeLocalized(initialData.seoDescription),
      features: normalizeLocalizedArray(initialData.features),
      process: normalizeLocalizedArray(initialData.process),
      links: (initialData.links || []).map(l => ({ ...l, label: normalizeLocalized(l.label) })),
    } : {`;
code = code.replace(/defaultValues: initialData \|\| \{/g, defaultValuesBlock);


// Update register bindings
code = code.replace(/register\("title"\)/g, 'register("title.id")');
code = code.replace(/register\("shortDescription"\)/g, 'register("shortDescription.id")');
code = code.replace(/register\("description"\)/g, 'register("description.id")');
code = code.replace(/register\("overview"\)/g, 'register("overview.id")');
code = code.replace(/register\("problem"\)/g, 'register("problem.id")');
code = code.replace(/register\("solution"\)/g, 'register("solution.id")');
code = code.replace(/register\("challenges"\)/g, 'register("challenges.id")');
code = code.replace(/register\("outcome"\)/g, 'register("outcome.id")');
code = code.replace(/register\("seoTitle"\)/g, 'register("seoTitle.id")');
code = code.replace(/register\("seoDescription"\)/g, 'register("seoDescription.id")');
code = code.replace(/register\(\`links\.\$\{index\}\.label\` as const\)/g, 'register(`links.${index}.label.id` as const)');

fs.writeFileSync(path, code);
console.log('ProjectForm fixed');
