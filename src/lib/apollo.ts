import { HttpLink, NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

export const makeClient = (): ApolloClient<NormalizedCacheObject> =>
	new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
			fetchOptions: { cache: 'no-store' },
			// credentials: "include",
			headers: process.env.NEXT_PUBLIC_GRAPHQL_TOKEN
				? {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`,
				  }
				: undefined,
		}),
	});
