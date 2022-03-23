import { request, gql } from 'graphql-request';

const endpoint = 'https://api.fontawesome.com';

function getRelease(version, includePro) {
  const query = gql`
    {
      release(version: "${version}") {
        version
        icons {
          id
          unicode
          membership {
            free
            ${includePro ? 'pro' : ''}
          }
        }
      }
    }
  `;

  return request(endpoint, query);
}

async function getIcons(version, includePro) {
  const data = await getRelease(version);
  return includePro
    ? data.release.icons
    : data.release.icons.filter((icon) => icon.membership.free.length > 0);
}

export { getIcons };
