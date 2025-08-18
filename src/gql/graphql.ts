/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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


export const GetExamQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExamQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"examId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"examId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"examId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"diagramData"}},{"kind":"Field","name":{"kind":"Name","value":"diagramSteps"}},{"kind":"Field","name":{"kind":"Name","value":"solution"}},{"kind":"Field","name":{"kind":"Name","value":"solutionSteps"}}]}}]}}]} as unknown as DocumentNode<GetExamQuestionsQuery, GetExamQuestionsQueryVariables>;