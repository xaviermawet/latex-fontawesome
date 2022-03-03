import { request, gql } from "graphql-request";

async function main() {
  const endpoint = "https://api.fontawesome.com";
  const query = gql`
    {
      release(version: "6.0.0") {
        version
        icons {
          id
          unicode
          membership {
            free
          }
        }
      }
    }
  `;

  const data = await request(endpoint, query);
  console.log(JSON.stringify(data, undefined, 2));
}

main().catch((error) => console.error(error));
