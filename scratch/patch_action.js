const fs = require('fs');
const file = 'src/app/actions/settings.ts';
let content = fs.readFileSync(file, 'utf8');

// Insert console.log for action
content = content.replace(
  "export async function updateSiteSettingsAction(data: SiteSettingsFormData) {",
  "export async function updateSiteSettingsAction(data: SiteSettingsFormData) {\n  console.log('updateSiteSettingsAction CALLED WITH:', data);"
);

fs.writeFileSync(file, content);
