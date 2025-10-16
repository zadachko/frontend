import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
  JSON: { input: any; output: any; }
};

export type Angle = {
  __typename?: 'Angle';
  degrees: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type Assessment = {
  __typename?: 'Assessment';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  questions: Array<AssessmentQuestion>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type AssessmentQuestion = {
  __typename?: 'AssessmentQuestion';
  position: Scalars['Int']['output'];
  question: Question;
};

export type AssessmentSession = {
  __typename?: 'AssessmentSession';
  assessment: Assessment;
  assessmentId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  expiresAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  lastActivityAt?: Maybe<Scalars['Date']['output']>;
  sessionData?: Maybe<Scalars['JSON']['output']>;
  startedAt: Scalars['Date']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  userId: Scalars['String']['output'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type Edge = {
  __typename?: 'Edge';
  from: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  to: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthResponse;
  refreshToken: AuthResponse;
  startAssessmentSession: AssessmentSession;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationStartAssessmentSessionArgs = {
  input: StartAssessmentSessionInput;
};

export type Point = {
  __typename?: 'Point';
  id: Scalars['String']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getMyAssessment: Assessment;
  getMyLastThreeAssessments: Array<UserAssessmentSubmission>;
  health: Scalars['String']['output'];
  me: User;
};


export type QueryGetMyAssessmentArgs = {
  assessmentId: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  assessments: Array<AssessmentQuestion>;
  correctAnswer: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  diagramData?: Maybe<Array<Point>>;
  diagramSteps?: Maybe<Array<Array<StepAction>>>;
  id: Scalars['ID']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  points: Scalars['Int']['output'];
  solutionSteps?: Maybe<Array<SolutionStep>>;
  statement: Scalars['String']['output'];
  type: QuestionType;
  updatedAt: Scalars['Date']['output'];
};

export enum QuestionType {
  Multiple = 'MULTIPLE',
  Text = 'TEXT'
}

export type RemoveId = {
  __typename?: 'RemoveId';
  from: Scalars['String']['output'];
  to: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  name: Scalars['String']['output'];
};

export type Side = {
  __typename?: 'Side';
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  length: Scalars['Float']['output'];
};

export type SolutionStep = {
  __typename?: 'SolutionStep';
  action: Scalars['String']['output'];
  explanation?: Maybe<Scalars['String']['output']>;
  result: Scalars['String']['output'];
  step: Scalars['Int']['output'];
  subSteps?: Maybe<Array<Scalars['String']['output']>>;
};

export type StartAssessmentSessionInput = {
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type StepAction = {
  __typename?: 'StepAction';
  angleData?: Maybe<Angle>;
  color?: Maybe<Scalars['String']['output']>;
  edgeData?: Maybe<Edge>;
  elementType: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  pointData?: Maybe<Point>;
  removeId?: Maybe<RemoveId>;
  sideData?: Maybe<Side>;
  type: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastLoginAt: Scalars['Date']['output'];
  lastName: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['Date']['output'];
};

export type UserAssessmentSubmission = {
  __typename?: 'UserAssessmentSubmission';
  assessment: Assessment;
  finishedAt: Scalars['Date']['output'];
  score: Scalars['String']['output'];
  startedAt: Scalars['Date']['output'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, createdAt: Date, lastLoginAt: Date, updatedAt: Date, role: { __typename?: 'Role', name: string } } } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, createdAt: Date, lastLoginAt: Date, updatedAt: Date, role: { __typename?: 'Role', name: string } } } };

export type StartAssessmentSessionMutationVariables = Exact<{
  input: StartAssessmentSessionInput;
}>;


export type StartAssessmentSessionMutation = { __typename?: 'Mutation', startAssessmentSession: { __typename?: 'AssessmentSession', id: string, assessment: { __typename?: 'Assessment', questions: Array<{ __typename?: 'AssessmentQuestion', position: number, question: { __typename?: 'Question', statement: string } }> } } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, createdAt: Date, lastLoginAt: Date, updatedAt: Date, role: { __typename?: 'Role', name: string } } };

export type GetMyAssessmentQueryVariables = Exact<{
  assessmentId: Scalars['String']['input'];
}>;


export type GetMyAssessmentQuery = { __typename?: 'Query', getMyAssessment: { __typename?: 'Assessment', title: string, questions: Array<{ __typename?: 'AssessmentQuestion', position: number, question: { __typename?: 'Question', statement: string, type: QuestionType, points: number, options?: Array<string> | null } }> } };

export type GetMyLastThreeAssessmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyLastThreeAssessmentsQuery = { __typename?: 'Query', getMyLastThreeAssessments: Array<{ __typename?: 'UserAssessmentSubmission', startedAt: Date, finishedAt: Date, score: string, assessment: { __typename?: 'Assessment', id: string, title: string, type: string } }> };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
    user {
      id
      email
      firstName
      lastName
      createdAt
      lastLoginAt
      role {
        name
      }
      updatedAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
    user {
      id
      email
      firstName
      lastName
      createdAt
      lastLoginAt
      role {
        name
      }
      updatedAt
    }
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const StartAssessmentSessionDocument = gql`
    mutation StartAssessmentSession($input: StartAssessmentSessionInput!) {
  startAssessmentSession(input: $input) {
    id
    assessment {
      questions {
        position
        question {
          statement
        }
      }
    }
  }
}
    `;
export type StartAssessmentSessionMutationFn = Apollo.MutationFunction<StartAssessmentSessionMutation, StartAssessmentSessionMutationVariables>;

/**
 * __useStartAssessmentSessionMutation__
 *
 * To run a mutation, you first call `useStartAssessmentSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartAssessmentSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startAssessmentSessionMutation, { data, loading, error }] = useStartAssessmentSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStartAssessmentSessionMutation(baseOptions?: Apollo.MutationHookOptions<StartAssessmentSessionMutation, StartAssessmentSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartAssessmentSessionMutation, StartAssessmentSessionMutationVariables>(StartAssessmentSessionDocument, options);
      }
export type StartAssessmentSessionMutationHookResult = ReturnType<typeof useStartAssessmentSessionMutation>;
export type StartAssessmentSessionMutationResult = Apollo.MutationResult<StartAssessmentSessionMutation>;
export type StartAssessmentSessionMutationOptions = Apollo.BaseMutationOptions<StartAssessmentSessionMutation, StartAssessmentSessionMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  me {
    id
    email
    firstName
    lastName
    createdAt
    lastLoginAt
    role {
      name
    }
    updatedAt
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetMyAssessmentDocument = gql`
    query GetMyAssessment($assessmentId: String!) {
  getMyAssessment(assessmentId: $assessmentId) {
    title
    questions {
      position
      question {
        statement
        type
        points
        options
      }
    }
  }
}
    `;

/**
 * __useGetMyAssessmentQuery__
 *
 * To run a query within a React component, call `useGetMyAssessmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAssessmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAssessmentQuery({
 *   variables: {
 *      assessmentId: // value for 'assessmentId'
 *   },
 * });
 */
export function useGetMyAssessmentQuery(baseOptions: Apollo.QueryHookOptions<GetMyAssessmentQuery, GetMyAssessmentQueryVariables> & ({ variables: GetMyAssessmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAssessmentQuery, GetMyAssessmentQueryVariables>(GetMyAssessmentDocument, options);
      }
export function useGetMyAssessmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAssessmentQuery, GetMyAssessmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAssessmentQuery, GetMyAssessmentQueryVariables>(GetMyAssessmentDocument, options);
        }
export function useGetMyAssessmentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyAssessmentQuery, GetMyAssessmentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyAssessmentQuery, GetMyAssessmentQueryVariables>(GetMyAssessmentDocument, options);
        }
export type GetMyAssessmentQueryHookResult = ReturnType<typeof useGetMyAssessmentQuery>;
export type GetMyAssessmentLazyQueryHookResult = ReturnType<typeof useGetMyAssessmentLazyQuery>;
export type GetMyAssessmentSuspenseQueryHookResult = ReturnType<typeof useGetMyAssessmentSuspenseQuery>;
export type GetMyAssessmentQueryResult = Apollo.QueryResult<GetMyAssessmentQuery, GetMyAssessmentQueryVariables>;
export const GetMyLastThreeAssessmentsDocument = gql`
    query GetMyLastThreeAssessments {
  getMyLastThreeAssessments {
    startedAt
    finishedAt
    score
    assessment {
      id
      title
      type
    }
  }
}
    `;

/**
 * __useGetMyLastThreeAssessmentsQuery__
 *
 * To run a query within a React component, call `useGetMyLastThreeAssessmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyLastThreeAssessmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyLastThreeAssessmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyLastThreeAssessmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyLastThreeAssessmentsQuery, GetMyLastThreeAssessmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyLastThreeAssessmentsQuery, GetMyLastThreeAssessmentsQueryVariables>(GetMyLastThreeAssessmentsDocument, options);
      }
export function useGetMyLastThreeAssessmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyLastThreeAssessmentsQuery, GetMyLastThreeAssessmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyLastThreeAssessmentsQuery, GetMyLastThreeAssessmentsQueryVariables>(GetMyLastThreeAssessmentsDocument, options);
        }
export function useGetMyLastThreeAssessmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyLastThreeAssessmentsQuery, GetMyLastThreeAssessmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyLastThreeAssessmentsQuery, GetMyLastThreeAssessmentsQueryVariables>(GetMyLastThreeAssessmentsDocument, options);
        }
export type GetMyLastThreeAssessmentsQueryHookResult = ReturnType<typeof useGetMyLastThreeAssessmentsQuery>;
export type GetMyLastThreeAssessmentsLazyQueryHookResult = ReturnType<typeof useGetMyLastThreeAssessmentsLazyQuery>;
export type GetMyLastThreeAssessmentsSuspenseQueryHookResult = ReturnType<typeof useGetMyLastThreeAssessmentsSuspenseQuery>;
export type GetMyLastThreeAssessmentsQueryResult = Apollo.QueryResult<GetMyLastThreeAssessmentsQuery, GetMyLastThreeAssessmentsQueryVariables>;