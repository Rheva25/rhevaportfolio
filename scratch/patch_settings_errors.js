const fs = require('fs');
const file = 'src/app/(admin)/admin/(protected)/settings/_components/SettingsForm.tsx';
let content = fs.readFileSync(file, 'utf8');

// Insert console.log for errors
content = content.replace(
  "const loading = isPending || isSubmitting;",
  "const loading = isPending || isSubmitting;\n  console.log('--- FORM ERRORS ---', errors);"
);

fs.writeFileSync(file, content);
