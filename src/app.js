import getIcons from './lib/fontawesome.js';
import buildSty from './lib/sty.js';

async function main() {
  const version = '6.1.0';
  const includePro = false;
  const outputFile = 'fontawesome-latest.sty';

  const icons = await getIcons(version, includePro);
  await buildSty(outputFile, icons);
}

main().catch((error) => console.error(error));
