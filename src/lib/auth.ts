import { setContext } from '@apollo/client/link/context';
import { getCookie } from './cookies';

// Apollo auth link for adding authorization headers
export const createAuthLink = () => {
    const authLink = setContext((_, { headers }) => {
        const token = getCookie(`sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}-auth-token`);
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            },
        };
    });

    return authLink;
};
