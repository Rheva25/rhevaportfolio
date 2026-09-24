const fs = require('fs');
const path = require('path');

function translateHero() {
  const filePath = path.join(process.cwd(), 'src/components/home/Hero.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Add getDictionary import
  if (!content.includes('getDictionary')) {
    content = content.replace(
      'import { ArrowRight, Terminal } from "lucide-react";',
      'import { ArrowRight, Terminal } from "lucide-react";\nimport { getDictionary } from "@/i18n/getDictionary";\nimport { Locale } from "@/i18n/config";'
    );
  }

  // Change function signature
  content = content.replace(
    /export function Hero\(\{ locale \}: \{ locale: string \}\) \{/,
    'export async function Hero({ locale }: { locale: Locale }) {\n  const dict = await getDictionary(locale);'
  );

  // Replace texts
  content = content.replace('Available for selected projects & consulting', '{dict.home.hero.availability}');
  content = content.replace('I build digital products that solve real problems.', '{dict.home.hero.title}');
  content = content.replace('Software engineer focused on building practical digital solutions across education, public administration, data systems, and modern web applications.', '{dict.home.hero.subtitle}');
  content = content.replace('<span>View My Work</span>', '<span>{dict.home.hero.viewWork}</span>');
  content = content.replace('<span>Explore My Apps</span>', '<span>{dict.home.hero.exploreApps}</span>');

  fs.writeFileSync(filePath, content);
}

function updateDicts() {
  // Update types.ts
  let types = fs.readFileSync(path.join(process.cwd(), 'src/i18n/types.ts'), 'utf8');
  if (!types.includes('home: {')) {
    types = types.replace(
      'navigation: {',
      `home: {
    hero: {
      availability: string;
      title: string;
      subtitle: string;
      viewWork: string;
      exploreApps: string;
    };
  };
  navigation: {`
    );
    fs.writeFileSync(path.join(process.cwd(), 'src/i18n/types.ts'), types);
  }

  // Update id/index.ts
  let id = fs.readFileSync(path.join(process.cwd(), 'src/i18n/dictionaries/id/index.ts'), 'utf8');
  if (!id.includes('home: {')) {
    id = id.replace(
      'navigation: {',
      `home: {
    hero: {
      availability: "Tersedia untuk proyek & konsultasi terpilih",
      title: "Saya membangun produk digital yang menyelesaikan masalah nyata.",
      subtitle: "Software engineer yang berfokus pada pembangunan solusi digital praktis di bidang pendidikan, administrasi publik, sistem data, dan aplikasi web modern.",
      viewWork: "Lihat Karya Saya",
      exploreApps: "Jelajahi Aplikasi Saya",
    },
  },
  navigation: {`
    );
    fs.writeFileSync(path.join(process.cwd(), 'src/i18n/dictionaries/id/index.ts'), id);
  }

  // Update en/index.ts
  let en = fs.readFileSync(path.join(process.cwd(), 'src/i18n/dictionaries/en/index.ts'), 'utf8');
  if (!en.includes('home: {')) {
    en = en.replace(
      'navigation: {',
      `home: {
    hero: {
      availability: "Available for selected projects & consulting",
      title: "I build digital products that solve real problems.",
      subtitle: "Software engineer focused on building practical digital solutions across education, public administration, data systems, and modern web applications.",
      viewWork: "View My Work",
      exploreApps: "Explore My Apps",
    },
  },
  navigation: {`
    );
    fs.writeFileSync(path.join(process.cwd(), 'src/i18n/dictionaries/en/index.ts'), en);
  }
}

try {
  updateDicts();
  translateHero();
  console.log("Success");
} catch (e) {
  console.error(e);
}
