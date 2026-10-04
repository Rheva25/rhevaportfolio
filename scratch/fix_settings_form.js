const fs = require('fs');

const path = 'src/app/(admin)/admin/(protected)/settings/_components/SettingsForm.tsx';
let code = fs.readFileSync(path, 'utf8');

const imports = `import { normalizeLocalized } from "@/lib/utils/localization";\n`;
if (!code.includes('normalizeLocalized')) {
  code = code.replace('import { useForm, useFieldArray } from "react-hook-form";', imports + 'import { useForm, useFieldArray } from "react-hook-form";');
}

const defaultValuesBlock = `defaultValues: {
      ...initialData,
      siteDescription: normalizeLocalized(initialData.siteDescription),
      profile: {
        ...initialData.profile,
        professionalTitle: normalizeLocalized(initialData.profile?.professionalTitle),
        shortBio: normalizeLocalized(initialData.profile?.shortBio),
        professionalFocus: normalizeLocalized(initialData.profile?.professionalFocus),
      },
      contact: {
        ...initialData.contact,
        successMessage: normalizeLocalized(initialData.contact?.successMessage),
      },
      seo: {
        ...initialData.seo,
        defaultTitle: normalizeLocalized(initialData.seo?.defaultTitle),
        defaultDescription: normalizeLocalized(initialData.seo?.defaultDescription),
      },
      publicSite: {
        ...initialData.publicSite,
        navigation: (initialData.publicSite?.navigation || []).map(l => ({ ...l, label: normalizeLocalized(l.label) })),
        homepageSections: (initialData.publicSite?.homepageSections || []).map(s => ({ ...s, label: normalizeLocalized(s.label) })),
      }
    }`;

code = code.replace(/defaultValues: initialData/g, defaultValuesBlock);

code = code.replace(/register\("siteDescription"\)/g, 'register("siteDescription.id")');
code = code.replace(/register\("profile\.professionalTitle"\)/g, 'register("profile.professionalTitle.id")');
code = code.replace(/register\("profile\.shortBio"\)/g, 'register("profile.shortBio.id")');
code = code.replace(/register\("profile\.professionalFocus"\)/g, 'register("profile.professionalFocus.id")');
code = code.replace(/register\("contact\.successMessage"\)/g, 'register("contact.successMessage.id")');
code = code.replace(/register\("seo\.defaultTitle"\)/g, 'register("seo.defaultTitle.id")');
code = code.replace(/register\("seo\.defaultDescription"\)/g, 'register("seo.defaultDescription.id")');
code = code.replace(/register\(\`publicSite\.navigation\.\$\{index\}\.label\`\)/g, 'register(`publicSite.navigation.${index}.label.id`)');

fs.writeFileSync(path, code);
console.log('SettingsForm fixed');
