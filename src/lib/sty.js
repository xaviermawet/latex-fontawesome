import { appendFile, writeFile } from 'fs/promises';
import { camelCase, union, upperFirst } from 'lodash-es';
import * as os from 'os';

const styleParts = {
  solid: { suffix: 'S', prefix: '\\FAS' },
  regular: { suffix: 'R', prefix: '\\FAR' },
  light: { suffix: 'L', prefix: '\\FAL' },
  thin: { suffix: 'T', prefix: '\\FAT' },
  duotone: { suffix: 'D', prefix: '\\FAD' },
  brands: { suffix: 'B', prefix: '\\FAB' },
};

async function buildSty(outputFile, icons) {
  const preambule = `\\NeedsTeXFormat{LaTeX2e}
\\ProvidesPackage{${outputFile.replace(/\.[^/.]+$/, '')}}
\\usepackage{fontspec}
`;

  await writeFile(outputFile, preambule);

  const iconDefinitions = getIconsDefinitions(icons);
  await appendFile(outputFile, iconDefinitions.join(os.EOL));

  await appendFile(
    outputFile,
    `
\\endinput`
  );
}

function sanitizeId(id) {
  // convert to PascalCase
  const result = upperFirst(camelCase(id))
    .replace('20', 'Twenty')
    .replace('42', 'FortyTwo')
    .replace('500', 'FiveHundred')
    .replace('0', 'Zero')
    .replace('1', 'One')
    .replace('2', 'Two')
    .replace('3', 'Three')
    .replace('4', 'Four')
    .replace('5', 'Five')
    .replace('6', 'Six')
    .replace('7', 'Seven')
    .replace('8', 'Eight')
    .replace('9', 'Nine');

  return result;
}

function getIconsDefinitions(icons) {
  let definitions = [];

  for (const icon of icons) {
    const sanitizedId = sanitizeId(icon.id);
    // loop over styles to add definition for all icon variants
    const styles = union(icon.membership.free, icon.membership.pro);
    for (const style of styles) {
      const suffix = styles.length === 1 ? '' : styleParts[style].suffix;
      const prefix = styleParts[style].prefix;
      // icon definition in LaTeX
      const definition = `\\def\\fa${sanitizedId}${suffix}{{${prefix}\\symbol{"${icon.unicode.toUpperCase()}}}~}`;
      // Add to results
      definitions.push(definition);
    }
  }

  return definitions;
}

export { buildSty };
