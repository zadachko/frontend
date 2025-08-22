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

export type AngleInput = {
  degrees: Scalars['Float']['input'];
  id: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
};

export type AssignExamInput = {
  examId: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type CreateExamInput = {
  questionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CreateQuestionInput = {
  correctAnswer?: InputMaybe<Scalars['String']['input']>;
  diagramData?: InputMaybe<Array<PointInput>>;
  diagramSteps?: InputMaybe<Array<Array<StepActionInput>>>;
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  points?: InputMaybe<Scalars['Int']['input']>;
  solutionSteps?: InputMaybe<Array<SolutionStepInput>>;
  statement: Scalars['String']['input'];
  type: QuestionType;
  userAnswer?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type Edge = {
  __typename?: 'Edge';
  from: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  to: Scalars['String']['output'];
};

export type EdgeInput = {
  from: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  to: Scalars['String']['input'];
};

export type Exam = {
  __typename?: 'Exam';
  createdAt: Scalars['Date']['output'];
  examQuestions?: Maybe<Array<ExamQuestion>>;
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  userExams?: Maybe<Array<UserExam>>;
};

export type ExamQuestion = {
  __typename?: 'ExamQuestion';
  exam: Exam;
  examId: Scalars['Int']['output'];
  position: Scalars['Int']['output'];
  question: Question;
  questionId: Scalars['Int']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignExamToUser: UserExam;
  createExam: Exam;
  createQuestion: Question;
  createUser: User;
  deleteExam: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: AuthResponse;
  refreshToken: AuthResponse;
  removeExamFromUser: Scalars['Boolean']['output'];
  removeQuestion: Scalars['Boolean']['output'];
  updateExam: Exam;
  updateQuestion: Question;
  updateUser: User;
};


export type MutationAssignExamToUserArgs = {
  input: AssignExamInput;
};


export type MutationCreateExamArgs = {
  input: CreateExamInput;
};


export type MutationCreateQuestionArgs = {
  createQuestionInput: CreateQuestionInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteExamArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRemoveExamFromUserArgs = {
  examId: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};


export type MutationRemoveQuestionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateExamArgs = {
  id: Scalars['Int']['input'];
  input: UpdateExamInput;
};


export type MutationUpdateQuestionArgs = {
  id: Scalars['Int']['input'];
  updateQuestionInput: UpdateQuestionInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Point = {
  __typename?: 'Point';
  id: Scalars['String']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type PointInput = {
  id: Scalars['String']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getExam?: Maybe<Exam>;
  getExams?: Maybe<Array<Exam>>;
  getMyExams?: Maybe<Array<Exam>>;
  getUser?: Maybe<User>;
  getUserExams?: Maybe<Array<Exam>>;
  getUsers?: Maybe<Array<User>>;
  health: Scalars['String']['output'];
  question: Question;
  questions: Array<Question>;
};


export type QueryGetExamArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserExamsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryQuestionArgs = {
  id: Scalars['Int']['input'];
};

export type Question = {
  __typename?: 'Question';
  correctAnswer?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  diagramData?: Maybe<Array<Point>>;
  diagramSteps?: Maybe<Array<Array<StepAction>>>;
  id: Scalars['Int']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  points?: Maybe<Scalars['Int']['output']>;
  solutionSteps?: Maybe<Array<SolutionStep>>;
  statement: Scalars['String']['output'];
  type: QuestionType;
  updatedAt: Scalars['Date']['output'];
  userAnswer?: Maybe<Scalars['String']['output']>;
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

export type RemoveIdInput = {
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
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

export type SideInput = {
  id: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  length: Scalars['Float']['input'];
};

export type SolutionStep = {
  __typename?: 'SolutionStep';
  action: Scalars['String']['output'];
  explanation?: Maybe<Scalars['String']['output']>;
  result: Scalars['String']['output'];
  step: Scalars['Int']['output'];
  subSteps?: Maybe<Array<Scalars['String']['output']>>;
};

export type SolutionStepInput = {
  action: Scalars['String']['input'];
  explanation?: InputMaybe<Scalars['String']['input']>;
  result: Scalars['String']['input'];
  step: Scalars['Int']['input'];
  subSteps?: InputMaybe<Array<Scalars['String']['input']>>;
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

export type StepActionInput = {
  angleData?: InputMaybe<AngleInput>;
  color?: InputMaybe<Scalars['String']['input']>;
  edgeData?: InputMaybe<EdgeInput>;
  elementType: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  pointData?: InputMaybe<PointInput>;
  removeId?: InputMaybe<RemoveIdInput>;
  sideData?: InputMaybe<SideInput>;
  type: Scalars['String']['input'];
};

export type UpdateExamInput = {
  questionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateQuestionInput = {
  correctAnswer?: InputMaybe<Scalars['String']['input']>;
  diagramData?: InputMaybe<Array<PointInput>>;
  diagramSteps?: InputMaybe<Array<Array<StepActionInput>>>;
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  points?: InputMaybe<Scalars['Int']['input']>;
  solutionSteps?: InputMaybe<Array<SolutionStepInput>>;
  statement?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<QuestionType>;
  userAnswer?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastLoginAt?: Maybe<Scalars['Date']['output']>;
  lastName: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['Date']['output'];
  userExams?: Maybe<Array<UserExam>>;
};

export type UserExam = {
  __typename?: 'UserExam';
  assignedAt: Scalars['Date']['output'];
  completedAt?: Maybe<Scalars['Date']['output']>;
  exam: Exam;
  examId: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
  user: User;
  userId: Scalars['String']['output'];
};

export type GetExamQuestionsQueryVariables = Exact<{
  examId: Scalars['Int']['input'];
}>;


export type GetExamQuestionsQuery = { __typename?: 'Query', getExam?: { __typename?: 'Exam', id: number, examQuestions?: Array<{ __typename?: 'ExamQuestion', position: number, question: { __typename?: 'Question', id: number, statement: string, type: QuestionType, options?: Array<string> | null, correctAnswer?: string | null, points?: number | null, diagramData?: Array<{ __typename?: 'Point', id: string, x: number, y: number }> | null, diagramSteps?: Array<Array<{ __typename?: 'StepAction', elementType: string, type: string, color?: string | null, id?: string | null, pointData?: { __typename?: 'Point', id: string, x: number, y: number } | null, angleData?: { __typename?: 'Angle', id: string, degrees: number, label?: string | null } | null, edgeData?: { __typename?: 'Edge', from: string, to: string, length?: number | null, label?: string | null } | null, sideData?: { __typename?: 'Side', id: string, length: number, label?: string | null } | null, removeId?: { __typename?: 'RemoveId', from: string, to: string } | null }>> | null, solutionSteps?: Array<{ __typename?: 'SolutionStep', step: number, action: string, result: string, explanation?: string | null, subSteps?: Array<string> | null }> | null } }> | null } | null };


export const GetExamQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExamQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"examId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"examId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"examQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswer"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"diagramData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}},{"kind":"Field","name":{"kind":"Name","value":"diagramSteps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elementType"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pointData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}},{"kind":"Field","name":{"kind":"Name","value":"angleData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"degrees"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edgeData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sideData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"removeId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"solutionSteps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"step"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"explanation"}},{"kind":"Field","name":{"kind":"Name","value":"subSteps"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetExamQuestionsQuery, GetExamQuestionsQueryVariables>;