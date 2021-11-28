// export async function relayFetch(text, variables) {
//   const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN

//   // Fetch data from GitHub's GraphQL API:
//   const response = await fetch('https://api.github.com/graphql', {
//     method: 'POST',
//     headers: {
//       Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: text,
//       variables,
//     }),
//   })

//   // Get the response as JSON
//   return await response.json()
// }
