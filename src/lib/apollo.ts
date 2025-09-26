import { HttpLink, NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { createAuthLink } from './auth';

export const makeClient = (refreshTokenCallback?: () => Promise<void>): ApolloClient<NormalizedCacheObject> => {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
		fetchOptions: { cache: 'no-store' },
		// credentials: "include",
		headers: process.env.NEXT_PUBLIC_GRAPHQL_TOKEN
			? {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`,
			  }
			: undefined,
	});

	const authLink = createAuthLink(refreshTokenCallback);

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: authLink.concat(httpLink),
	});
};
