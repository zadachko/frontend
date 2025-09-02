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
  /** Date custom scalar type */
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
  score: Scalars['Int']['output'];
  startedAt: Scalars['Date']['output'];
};

export type MutationMutationVariables = Exact<{
  input: LoginInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type GetMyLastThreeAssessmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyLastThreeAssessmentsQuery = { __typename?: 'Query', getMyLastThreeAssessments: Array<{ __typename?: 'UserAssessmentSubmission', score: number, finishedAt: any, assessment: { __typename?: 'Assessment', type: string, title: string } }> };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const GetMyLastThreeAssessmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyLastThreeAssessments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyLastThreeAssessments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}}]}}]}}]} as unknown as DocumentNode<GetMyLastThreeAssessmentsQuery, GetMyLastThreeAssessmentsQueryVariables>;