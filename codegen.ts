// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

let endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!;
if (!/^https?:\/\//i.test(endpoint)) endpoint = `http://${endpoint}`;

const headers: Record<string, string> = {};
if (process.env.GRAPHQL_SERVER_TOKEN) {
	headers.Authorization = `Bearer ${process.env.GRAPHQL_SERVER_TOKEN}`;
}

const config: CodegenConfig = {
	schema: [{ [endpoint]: { headers } }],
	documents: 'src/**/*.{ts,tsx,graphql,gql}',
	generates: {
		'src/services/gql/': { preset: 'client', plugins: [] }, // typed `graphql()` helper
		'src/services/gql/operations/index.ts': {
			// <<— file, not folder
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-apollo',
			],
			config: {
				withHooks: true,
				reactApolloVersion: 3,
				dedupeFragments: true,
				scalars: {
					Date: 'Date',
				},
			},
		},
	},
};

export default config;
