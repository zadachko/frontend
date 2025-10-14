import { registerApolloClient } from '@apollo/client-integration-nextjs';
import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
            fetchOptions: { cache: 'no-store' },
            headers: process.env.GRAPHQL_SERVER_TOKEN
                ? {
                      Authorization: `Bearer ${process.env.GRAPHQL_SERVER_TOKEN}`,
                  }
                : undefined,
        }),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
            query: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
        },
    });
});
