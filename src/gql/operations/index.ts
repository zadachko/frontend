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
  Date: { input: any; output: any; }
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

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type CreateAssessmentInput = {
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
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
  createAssessment: Assessment;
  login: AuthResponse;
  refreshToken: AuthResponse;
};


export type MutationCreateAssessmentArgs = {
  input: CreateAssessmentInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
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

export type GetMyAssessmentQueryVariables = Exact<{
  assessmentId: Scalars['String']['input'];
}>;


export type GetMyAssessmentQuery = { __typename?: 'Query', getMyAssessment: { __typename?: 'Assessment', id: string, title: string, questions: Array<{ __typename?: 'AssessmentQuestion', position: number, question: { __typename?: 'Question', id: string, statement: string, type: QuestionType, points: number, options?: Array<string> | null } }> } };

export type GetMyLastThreeAssessmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyLastThreeAssessmentsQuery = { __typename?: 'Query', getMyLastThreeAssessments: Array<{ __typename?: 'UserAssessmentSubmission', startedAt: any, finishedAt: any, score: string, assessment: { __typename?: 'Assessment', id: string, title: string, type: string } }> };


export const GetMyAssessmentDocument = gql`
    query GetMyAssessment($assessmentId: String!) {
  getMyAssessment(assessmentId: $assessmentId) {
    id
    title
    questions {
      position
      question {
        id
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