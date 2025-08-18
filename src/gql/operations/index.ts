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
};

export type Query = {
  __typename?: 'Query';
  health: Scalars['String']['output'];
  questions: Array<Question>;
};


export type QueryQuestionsArgs = {
  examId: Scalars['Int']['input'];
};

export type Question = {
  __typename?: 'Question';
  correctAnswer?: Maybe<Scalars['String']['output']>;
  diagramData?: Maybe<Scalars['String']['output']>;
  diagramSteps?: Maybe<Array<Array<Scalars['String']['output']>>>;
  id: Scalars['Int']['output'];
  isCorrect?: Maybe<Scalars['Boolean']['output']>;
  options?: Maybe<Array<Scalars['String']['output']>>;
  points?: Maybe<Scalars['Int']['output']>;
  solution?: Maybe<Scalars['String']['output']>;
  solutionSteps?: Maybe<Array<Scalars['String']['output']>>;
  statement: Scalars['String']['output'];
  type: Scalars['String']['output'];
  userAnswer?: Maybe<Scalars['String']['output']>;
};

export type GetExamQuestionsQueryVariables = Exact<{
  examId: Scalars['Int']['input'];
}>;


export type GetExamQuestionsQuery = { __typename?: 'Query', questions: Array<{ __typename?: 'Question', id: number, statement: string, type: string, options?: Array<string> | null, points?: number | null, diagramData?: string | null, diagramSteps?: Array<Array<string>> | null, solution?: string | null, solutionSteps?: Array<string> | null }> };


export const GetExamQuestionsDocument = gql`
    query GetExamQuestions($examId: Int!) {
  questions(examId: $examId) {
    id
    statement
    type
    options
    points
    diagramData
    diagramSteps
    solution
    solutionSteps
  }
}
    `;

/**
 * __useGetExamQuestionsQuery__
 *
 * To run a query within a React component, call `useGetExamQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExamQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExamQuestionsQuery({
 *   variables: {
 *      examId: // value for 'examId'
 *   },
 * });
 */
export function useGetExamQuestionsQuery(baseOptions: Apollo.QueryHookOptions<GetExamQuestionsQuery, GetExamQuestionsQueryVariables> & ({ variables: GetExamQuestionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExamQuestionsQuery, GetExamQuestionsQueryVariables>(GetExamQuestionsDocument, options);
      }
export function useGetExamQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExamQuestionsQuery, GetExamQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExamQuestionsQuery, GetExamQuestionsQueryVariables>(GetExamQuestionsDocument, options);
        }
export function useGetExamQuestionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExamQuestionsQuery, GetExamQuestionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExamQuestionsQuery, GetExamQuestionsQueryVariables>(GetExamQuestionsDocument, options);
        }
export type GetExamQuestionsQueryHookResult = ReturnType<typeof useGetExamQuestionsQuery>;
export type GetExamQuestionsLazyQueryHookResult = ReturnType<typeof useGetExamQuestionsLazyQuery>;
export type GetExamQuestionsSuspenseQueryHookResult = ReturnType<typeof useGetExamQuestionsSuspenseQuery>;
export type GetExamQuestionsQueryResult = Apollo.QueryResult<GetExamQuestionsQuery, GetExamQuestionsQueryVariables>;