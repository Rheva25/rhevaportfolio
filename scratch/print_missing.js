const fs = require('fs');
const file = 'src/app/(admin)/admin/(protected)/settings/_components/SettingsForm.tsx';
const content = fs.readFileSync(file, 'utf8');
const fields = [
  'siteName', 'siteDescription.id', 'siteUrl', 'language', 'timezone', 'dateFormat',
  'profile.fullName', 'profile.professionalTitle.id', 'profile.shortBio.id', 
  'profile.profilePhoto.url', 'profile.profilePhoto.alt', 'profile.location', 
  'profile.email', 'profile.phone', 'profile.professionalFocus.id',
  'contact.primaryEmail', 'contact.whatsapp', 'contact.secondaryEmail', 
  'contact.serviceArea', 'contact.successMessage.id',
  'seo.defaultTitle.id', 'seo.defaultDescription.id', 'seo.ogImage.url', 
  'seo.ogImage.alt', 'seo.favicon.url', 'seo.favicon.alt'
];

fields.forEach(f => {
  if (!content.includes(`"${f}"`)) {
    console.log("Missing:", f);
  }
});
