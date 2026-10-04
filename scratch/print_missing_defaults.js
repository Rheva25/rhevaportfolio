const fs = require('fs');
const file = 'src/app/(admin)/admin/(protected)/settings/_components/SettingsForm.tsx';
const content = fs.readFileSync(file, 'utf8');
const fields = [
  'contentDefaults.project.category', 'contentDefaults.project.status',
  'contentDefaults.app.category', 'contentDefaults.app.status', 'contentDefaults.app.pricingModel',
  'contentDefaults.article.category', 'contentDefaults.article.status', 'contentDefaults.article.author'
];

fields.forEach(f => {
  if (!content.includes(`"${f}"`)) {
    console.log("Missing:", f);
  }
});
