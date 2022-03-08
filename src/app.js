import { getIcons } from "./lib/fontawesome.js";

async function main() {
  const version = "6.0.0";
  const includePro = false;

  const icons = await getIcons(version, includePro);
  console.log(JSON.stringify(icons, undefined, 2));
}

main().catch((error) => console.error(error));
