import { program } from 'commander';
import getIcons from './lib/fontawesome.js';
import buildSty from './lib/sty.js';

async function main() {
  program
    .name('latex-fontawesome')
    .description('Bindings for Font Awesome icons to be used in XeLaTeX.')
    .version('0.0.1');

  program
    .option('-r, --release <release>', 'Font Awesome release version', '6.0.0')
    .option('-p, --pro', 'Include pro icons', false)
    .option(
      '-f, --filename <filename>',
      'Output filename',
      'fontawesome-latest.sty'
    )
    .parse();

  const options = program.opts();

  const icons = await getIcons(options.release, options.pro);
  await buildSty(options.filename, icons);
}

main().catch((error) => console.error(error));
