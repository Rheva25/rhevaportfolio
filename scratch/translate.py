import os
import json
import re

cwd = os.getcwd()

id_home = {
    "hero": {
      "availability": "Tersedia untuk proyek & konsultasi terpilih",
      "title": "Saya membangun produk digital yang menyelesaikan masalah nyata.",
      "subtitle": "Software engineer yang berfokus pada pembangunan solusi digital praktis di bidang pendidikan, administrasi publik, sistem data, dan aplikasi web modern.",
      "viewWork": "Lihat Karya Saya",
      "exploreApps": "Jelajahi Aplikasi Saya"
    },
    "stack": {
      "tag": "00 // FILOSOFI TEKNIK",
      "quote": "Jangan hanya menunjukkan kode. Kirimkan sistem yang tahan terhadap alur kerja operasional sehari-hari.",
      "verified": "Tumpukan Produksi Terverifikasi",
      "level1": "KEMAMPUAN TEKNIK",
      "level1Desc": "Arsitektur aplikasi yang tangguh yang dibangun dengan pengetikan yang ketat, sinkronisasi status yang dapat diprediksi, dan konsistensi data ACID yang andal.",
      "level2": "PENGIRIMAN PRODUK DIGITAL",
      "level2Desc": "Aplikasi web yang dikemas, dihosting mandiri dengan penerapan turnkey, dokumen pemeliharaan berkelanjutan, dan panduan yang disederhanakan.",
      "level3": "SISTEM & ADMINISTRASI",
      "level3Desc": "Perangkat lunak organisasi ujung ke ujung untuk sektor publik, administrasi pendidikan, dan catatan institusional akuntabilitas tinggi."
    },
    "projects": {
      "tag": "01 // KARYA TERPILIH",
      "title": "Proyek Unggulan",
      "subtitle": "Solusi tingkat perusahaan yang digunakan dalam produksi.",
      "viewAll": "Lihat Semua Proyek",
      "empty": "Belum ada proyek unggulan."
    },
    "apps": {
      "tag": "02 // PRODUK DIGITAL",
      "title": "Perangkat Lunak & Aplikasi",
      "subtitle": "Solusi yang dibuat khusus dan perangkat lunak khusus.",
      "viewAll": "Lihat Semua Aplikasi",
      "empty": "Belum ada aplikasi unggulan."
    },
    "services": {
      "tag": "03 // KEAHLIAN",
      "title": "Konsultasi & Layanan",
      "subtitle": "Kemampuan teknis dan konsultasi khusus."
    },
    "about": {
      "tag": "04 // PROFIL",
      "title": "Siapa Saya",
      "subtitle": "Software engineer yang membangun arsitektur web yang tangguh."
    },
    "articles": {
      "tag": "05 // TULISAN & PEMIKIRAN",
      "title": "Catatan Teknik",
      "subtitle": "Penyelaman mendalam tentang arsitektur sistem, pola perangkat lunak, dan kepemimpinan teknis.",
      "viewAll": "Lihat Semua Catatan",
      "empty": "Belum ada artikel yang dipublikasikan.",
      "readNote": "Baca Catatan"
    },
    "contact": {
      "tag": "06 // MULAI BERBICARA",
      "title": "Mari Berkolaborasi",
      "subtitle": "Tertarik mendiskusikan proyek, konsultasi, atau hanya ingin menyapa? Hubungi saya.",
      "button": "Hubungi Saya Sekarang"
    }
}

en_home = {
    "hero": {
      "availability": "Available for selected projects & consulting",
      "title": "I build digital products that solve real problems.",
      "subtitle": "Software engineer focused on building practical digital solutions across education, public administration, data systems, and modern web applications.",
      "viewWork": "View My Work",
      "exploreApps": "Explore My Apps"
    },
    "stack": {
      "tag": "00 // ENGINEERING PHILOSOPHY",
      "quote": "Don't just show code. Deliver systems that withstand daily operational workflows.",
      "verified": "Verified Production Stack",
      "level1": "Engineering Capability",
      "level1Desc": "Resilient application architecture built with strict typing, predictable state synchronization, and reliable ACID data consistency.",
      "level2": "Digital Product Delivery",
      "level2Desc": "Packaged, self-hosted web applications with turnkey deployment, continuous maintenance docs, and streamlined guides.",
      "level3": "Systems & Administration",
      "level3Desc": "End-to-end organizational software for public sectors, educational administration, and high-accountability institutional records."
    },
    "projects": {
      "tag": "01 // SELECTED WORK",
      "title": "Featured Projects",
      "subtitle": "Enterprise-grade solutions deployed in production.",
      "viewAll": "View All Projects",
      "empty": "No featured projects yet."
    },
    "apps": {
      "tag": "02 // DIGITAL PRODUCTS",
      "title": "Software & Applications",
      "subtitle": "Purpose-built solutions and specialized software.",
      "viewAll": "View All Apps",
      "empty": "No featured apps yet."
    },
    "services": {
      "tag": "03 // EXPERTISE",
      "title": "Consulting & Services",
      "subtitle": "Technical capabilities and specialized consulting."
    },
    "about": {
      "tag": "04 // PROFILE",
      "title": "Who I Am",
      "subtitle": "Software engineer building robust web architectures."
    },
    "articles": {
      "tag": "05 // WRITING & THOUGHTS",
      "title": "Engineering Notes",
      "subtitle": "Deep dives into system architecture, software patterns, and technical leadership.",
      "viewAll": "View All Notes",
      "empty": "No published articles yet.",
      "readNote": "Read Note"
    },
    "contact": {
      "tag": "06 // START A CONVERSATION",
      "title": "Let's Collaborate",
      "subtitle": "Interested in discussing a project, consulting, or just want to say hi? Reach out.",
      "button": "Contact Me Today"
    }
}

types_def = """  home: {
    hero: { availability: string; title: string; subtitle: string; viewWork: string; exploreApps: string; };
    stack: { tag: string; quote: string; verified: string; level1: string; level1Desc: string; level2: string; level2Desc: string; level3: string; level3Desc: string; };
    projects: { tag: string; title: string; subtitle: string; viewAll: string; empty: string; };
    apps: { tag: string; title: string; subtitle: string; viewAll: string; empty: string; };
    services: { tag: string; title: string; subtitle: string; };
    about: { tag: string; title: string; subtitle: string; };
    articles: { tag: string; title: string; subtitle: string; viewAll: string; empty: string; readNote: string; };
    contact: { tag: string; title: string; subtitle: string; button: string; };
  };
  navigation: {"""


with open("src/i18n/types.ts", "r") as f:
    content = f.read()
content = re.sub(r"home: \{[\s\S]*?navigation: \{", types_def, content)
with open("src/i18n/types.ts", "w") as f:
    f.write(content)

for locale, d in [("id", id_home), ("en", en_home)]:
    path = f"src/i18n/dictionaries/{locale}/index.ts"
    with open(path, "r") as f:
        content = f.read()
    replacement = f"home: {json.dumps(d, indent=4)},\n  navigation: {{"
    content = re.sub(r"home: \{[\s\S]*?navigation: \{", replacement, content)
    with open(path, "w") as f:
        f.write(content)

components = [
    {
        "name": "Hero.tsx",
        "replacements": [
            ("export function Hero({ locale }: { locale: string }) {", "export async function Hero({ locale }: { locale: Locale }) {\n  const dict = await getDictionary(locale);"),
            ("Available for selected projects & consulting", "{dict.home.hero.availability}"),
            ("I build digital products that solve real problems.", "{dict.home.hero.title}"),
            ("Software engineer focused on building practical digital solutions across education, public administration, data systems, and modern web applications.", "{dict.home.hero.subtitle}"),
            ("<span>View My Work</span>", "<span>{dict.home.hero.viewWork}</span>"),
            ("<span>Explore My Apps</span>", "<span>{dict.home.hero.exploreApps}</span>"),
        ]
    },
    {
        "name": "Stack.tsx",
        "replacements": [
            ("export function Stack({ locale }: { locale: string }) {", "export async function Stack({ locale }: { locale: Locale }) {\n  const dict = await getDictionary(locale);"),
            ("00 // ENGINEERING PHILOSOPHY", "{dict.home.stack.tag}"),
            ("&ldquo;Don&rsquo;t just show code. Deliver systems that withstand daily operational workflows.&rdquo;", "&ldquo;{dict.home.stack.quote}&rdquo;"),
            ("Verified Production Stack", "{dict.home.stack.verified}"),
            ("Engineering Capability", "{dict.home.stack.level1}"),
            ("Resilient application architecture built with strict typing, predictable state synchronization, and reliable ACID data consistency.", "{dict.home.stack.level1Desc}"),
            ("Digital Product Delivery", "{dict.home.stack.level2}"),
            ("Packaged, self-hosted web applications with turnkey deployment, continuous maintenance docs, and streamlined guides.", "{dict.home.stack.level2Desc}"),
            ("Systems & Administration", "{dict.home.stack.level3}"),
            ("End-to-end organizational software for public sectors, educational administration, and high-accountability institutional records.", "{dict.home.stack.level3Desc}")
        ]
    },
    {
        "name": "Projects.tsx",
        "replacements": [
            ("export async function Projects({ locale }: { locale: string }) {", "export async function Projects({ locale }: { locale: Locale }) {\n  const dict = await getDictionary(locale);"),
            ("01 // SELECTED WORK", "{dict.home.projects.tag}"),
            ("Featured Projects", "{dict.home.projects.title}"),
            ("Enterprise-grade solutions deployed in production.", "{dict.home.projects.subtitle}"),
            ("<span>View All Projects ({allProjects.length})</span>", "<span>{dict.home.projects.viewAll} ({allProjects.length})</span>"),
            ("No featured projects yet.", "{dict.home.projects.empty}")
        ]
    },
    {
        "name": "Apps.tsx",
        "replacements": [
            ("export async function Apps({ locale }: { locale: string }) {", "export async function Apps({ locale }: { locale: Locale }) {\n  const dict = await getDictionary(locale);"),
            ("02 // DIGITAL PRODUCTS", "{dict.home.apps.tag}"),
            ("Software & Applications", "{dict.home.apps.title}"),
            ("Purpose-built solutions and specialized software.", "{dict.home.apps.subtitle}"),
            ("<span>View All Apps ({allApps.length})</span>", "<span>{dict.home.apps.viewAll} ({allApps.length})</span>"),
            ("No featured apps yet.", "{dict.home.apps.empty}")
        ]
    },
    {
        "name": "Services.tsx",
        "replacements": [
            ("export function Services({ locale }: { locale: string }) {", "export async function Services({ locale }: { locale: Locale }) {\n  const dict = await getDictionary(locale);"),
            ("03 // EXPERTISE", "{dict.home.services.tag}"),
            ("Consulting & Services", "{dict.home.services.title}"),
            ("Technical capabilities and specialized consulting.", "{dict.home.services.subtitle}")
        ]
    },
    {
        "name": "About.tsx",
        "replacements": [
            ("export function About({ locale }: { locale: string }) {", "export async function About({ locale }: { locale: Locale }) {\n  const dict = await getDictionary(locale);"),
            ("04 // PROFILE", "{dict.home.about.tag}"),
            ("Who I Am", "{dict.home.about.title}"),
            ("Software engineer building robust web architectures.", "{dict.home.about.subtitle}")
        ]
    },
    {
        "name": "Articles.tsx",
        "replacements": [
            ("export async function Articles({ locale }: { locale: Locale }) {", "export async function Articles({ locale }: { locale: Locale }) {\n  const dict = await getDictionary(locale);"),
            ("05 // WRITING & THOUGHTS", "{dict.home.articles.tag}"),
            ("Engineering Notes", "{dict.home.articles.title}"),
            ("Deep dives into system architecture, software patterns, and technical leadership.", "{dict.home.articles.subtitle}"),
            ("<span>View All Notes ({allArticles.length})</span>", "<span>{dict.home.articles.viewAll} ({allArticles.length})</span>"),
            ("No published articles yet.", "{dict.home.articles.empty}"),
            ("<span>Read Note</span>", "<span>{dict.home.articles.readNote}</span>")
        ]
    },
    {
        "name": "Contact.tsx",
        "replacements": [
            ("export function Contact({ locale }: { locale: string }) {", "export async function Contact({ locale }: { locale: Locale }) {\n  const dict = await getDictionary(locale);"),
            ("06 // START A CONVERSATION", "{dict.home.contact.tag}"),
            ("Let's Collaborate", "{dict.home.contact.title}"),
            ("Interested in discussing a project, consulting, or just want to say hi? Reach out.", "{dict.home.contact.subtitle}"),
            ("Contact Me Today", "{dict.home.contact.button}")
        ]
    }
]

for comp in components:
    path = f"src/components/home/{comp['name']}"
    if not os.path.exists(path):
        continue
    with open(path, "r") as f:
        content = f.read()
    
    if "getDictionary" not in content:
        match = re.search(r'import .* from ".*";\n', content)
        if match:
            content = content[:match.end()] + 'import { getDictionary } from "@/i18n/getDictionary";\nimport { Locale } from "@/i18n/config";\n' + content[match.end():]
            
    for search, replacement in comp["replacements"]:
        content = content.replace(search, replacement)
        
    with open(path, "w") as f:
        f.write(content)

print("Done!")
