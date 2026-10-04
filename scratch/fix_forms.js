const fs = require('fs');
const path = require('path');
const glob = require('glob');

const files = glob.sync('src/app/(admin)/admin/(protected)/**/_components/*Form.tsx');

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');

  // Replace default empty strings for localized fields
  const fields = [
    'title', 'shortDescription', 'description', 'overview', 'problem', 'solution',
    'challenges', 'outcome', 'seoTitle', 'seoDescription', 'name', 'deployment',
    'excerpt', 'content', 'siteName', 'siteDescription', 'professionalTitle',
    'shortBio', 'professionalFocus', 'successMessage', 'defaultTitle', 'defaultDescription'
  ];

  fields.forEach(f => {
    const regex = new RegExp(`${f}: "",`, 'g');
    code = code.replace(regex, `${f}: { id: "", en: "" },`);
  });

  // Inject normalize imports if missing
  const imports = `import { normalizeLocalized, normalizeLocalizedArray } from "@/lib/utils/localization";\n`;
  if (!code.includes('normalizeLocalized')) {
    code = code.replace('import { useForm', imports + 'import { useForm');
  }

  // Inject normalization in defaultValues
  // We need to parse where defaultValues: initialData || { ... } is.
  // This might be tricky via regex for all forms. We can do it by replacing the defaultValues block manually.
  
  // Actually, I can just replace `register("field")` -> `register("field.id")`
  fields.forEach(f => {
    const r1 = new RegExp(`register\\("${f}"\\)`, 'g');
    code = code.replace(r1, `register("${f}.id")`);
  });
  
  // Link labels
  code = code.replace(/register\(\`links\.\$\{index\}\.label\` as const\)/g, 'register(`links.${index}.label.id` as const)');
  
  fs.writeFileSync(file, code);
  console.log('Fixed:', file);
});
