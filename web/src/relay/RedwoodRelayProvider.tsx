import type { AuthContextInterface } from '@redwoodjs/auth'
import { useAuth as useRWAuth } from '@redwoodjs/auth'
import { FetchConfigProvider, useFetchConfig, GraphQLHooksProvider } from '@redwoodjs/web'

import { GraphQLHooks } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

import { RelayEnvironmentProvider, useLazyLoadQuery, useMutation } from 'react-relay'

import { Environment, FetchFunction, Network, RecordSource, Store } from 'relay-runtime'

export type UseAuthProp = () => AuthContextInterface

const RelayProviderWithFetchConfig: React.FunctionComponent<{
  environment: Environment
  useAuth: UseAuthProp
}> = ({ environment, children, useAuth }) => {
  const { uri, headers } = useFetchConfig()
  const { getToken, type: authProviderType, isAuthenticated } = useAuth()

  async function fetcher(operation, variables) {
    // Gets the access token before every query, this IMO is wasteful
    // but is what redwood does OOTB
    let token: string | undefined = undefined
    if (isAuthenticated && getToken) {
      token = await getToken()
    }

    const authHeaders = token
      ? {
          'auth-provider': authProviderType,
          authorization: `Bearer ${token}`,
        }
      : {}

    // Relay offers a lot of info in the original outgoing request
    // { cacheID: "64f3434db5fcda977516dfe1b15852f7", id: null, metadata: {}, name: "UsersPageQuery", operationKind: "query", text: "...", variables: {} }
    // We re-format it to fit the setup inside graphql-helix
    const body = {
      query: operation.text,
      operationName: operation.name,
      operationKind: operation.operationKind,
      variables,
    }

    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        ...headers,
        ...authHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    // Get the response as JSON
    return await response.json()
  }

  const env = environment || createDefaultEnvironment(fetcher)
  const hooks = createHooks(env)

  return (
    <RelayEnvironmentProvider environment={env}>
      <GraphQLHooksProvider useQuery={hooks.useQuery} useMutation={hooks.useMutation}>
        {children}
      </GraphQLHooksProvider>
    </RelayEnvironmentProvider>
  )
}


export const createDefaultEnvironment = (fetch: FetchFunction) => {
  // // Export a singleton instance of Relay Environment configured with our network function:
  return new Environment({
    network: Network.create(fetch),
    store: new Store(new RecordSource()),
  })
}

export const RedwoodRelayProvider: React.FunctionComponent<{
  environment?: Environment
  useAuth?: UseAuthProp
}> = ({ environment, useAuth = useRWAuth, children }) => {
  return (
    <FetchConfigProvider useAuth={useAuth}>
      <RelayProviderWithFetchConfig environment={environment} useAuth={useAuth}>
        {children}
      </RelayProviderWithFetchConfig>
    </FetchConfigProvider>
  )
}
