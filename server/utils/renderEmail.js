import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function renderTemplate(templateName, data) {
  const templatePath = path.join(__dirname, 'templates', `${templateName}.hbs`);
  const template = fs.readFileSync(templatePath, 'utf-8');
  const compiled = handlebars.compile(template);
  return compiled(data);
}


