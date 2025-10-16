/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      firstName\n      lastName\n      createdAt\n      lastLoginAt\n      role {\n        name\n      }\n      updatedAt\n    }\n  }\n}": typeof types.LoginDocument,
    "mutation RefreshToken($refreshToken: String!) {\n  refreshToken(refreshToken: $refreshToken) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      firstName\n      lastName\n      createdAt\n      lastLoginAt\n      role {\n        name\n      }\n      updatedAt\n    }\n  }\n}": typeof types.RefreshTokenDocument,
    "mutation StartAssessmentSession($input: StartAssessmentSessionInput!) {\n  startAssessmentSession(input: $input) {\n    id\n    assessment {\n      id\n      questions {\n        position\n        question {\n          statement\n        }\n      }\n    }\n  }\n}": typeof types.StartAssessmentSessionDocument,
    "query GetCurrentUser {\n  me {\n    id\n    email\n    firstName\n    lastName\n    createdAt\n    lastLoginAt\n    role {\n      name\n    }\n    updatedAt\n  }\n}": typeof types.GetCurrentUserDocument,
    "query GetMyAssessment($assessmentId: String!) {\n  getMyAssessment(assessmentId: $assessmentId) {\n    title\n    questions {\n      position\n      question {\n        statement\n        type\n        points\n        options\n      }\n    }\n  }\n}": typeof types.GetMyAssessmentDocument,
    "query GetMyLastThreeAssessments {\n  getMyLastThreeAssessments {\n    startedAt\n    finishedAt\n    score\n    assessment {\n      id\n      title\n      type\n    }\n  }\n}": typeof types.GetMyLastThreeAssessmentsDocument,
};
const documents: Documents = {
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      firstName\n      lastName\n      createdAt\n      lastLoginAt\n      role {\n        name\n      }\n      updatedAt\n    }\n  }\n}": types.LoginDocument,
    "mutation RefreshToken($refreshToken: String!) {\n  refreshToken(refreshToken: $refreshToken) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      firstName\n      lastName\n      createdAt\n      lastLoginAt\n      role {\n        name\n      }\n      updatedAt\n    }\n  }\n}": types.RefreshTokenDocument,
    "mutation StartAssessmentSession($input: StartAssessmentSessionInput!) {\n  startAssessmentSession(input: $input) {\n    id\n    assessment {\n      id\n      questions {\n        position\n        question {\n          statement\n        }\n      }\n    }\n  }\n}": types.StartAssessmentSessionDocument,
    "query GetCurrentUser {\n  me {\n    id\n    email\n    firstName\n    lastName\n    createdAt\n    lastLoginAt\n    role {\n      name\n    }\n    updatedAt\n  }\n}": types.GetCurrentUserDocument,
    "query GetMyAssessment($assessmentId: String!) {\n  getMyAssessment(assessmentId: $assessmentId) {\n    title\n    questions {\n      position\n      question {\n        statement\n        type\n        points\n        options\n      }\n    }\n  }\n}": types.GetMyAssessmentDocument,
    "query GetMyLastThreeAssessments {\n  getMyLastThreeAssessments {\n    startedAt\n    finishedAt\n    score\n    assessment {\n      id\n      title\n      type\n    }\n  }\n}": types.GetMyLastThreeAssessmentsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      firstName\n      lastName\n      createdAt\n      lastLoginAt\n      role {\n        name\n      }\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      firstName\n      lastName\n      createdAt\n      lastLoginAt\n      role {\n        name\n      }\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RefreshToken($refreshToken: String!) {\n  refreshToken(refreshToken: $refreshToken) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      firstName\n      lastName\n      createdAt\n      lastLoginAt\n      role {\n        name\n      }\n      updatedAt\n    }\n  }\n}"): (typeof documents)["mutation RefreshToken($refreshToken: String!) {\n  refreshToken(refreshToken: $refreshToken) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      firstName\n      lastName\n      createdAt\n      lastLoginAt\n      role {\n        name\n      }\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation StartAssessmentSession($input: StartAssessmentSessionInput!) {\n  startAssessmentSession(input: $input) {\n    id\n    assessment {\n      id\n      questions {\n        position\n        question {\n          statement\n        }\n      }\n    }\n  }\n}"): (typeof documents)["mutation StartAssessmentSession($input: StartAssessmentSessionInput!) {\n  startAssessmentSession(input: $input) {\n    id\n    assessment {\n      id\n      questions {\n        position\n        question {\n          statement\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCurrentUser {\n  me {\n    id\n    email\n    firstName\n    lastName\n    createdAt\n    lastLoginAt\n    role {\n      name\n    }\n    updatedAt\n  }\n}"): (typeof documents)["query GetCurrentUser {\n  me {\n    id\n    email\n    firstName\n    lastName\n    createdAt\n    lastLoginAt\n    role {\n      name\n    }\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMyAssessment($assessmentId: String!) {\n  getMyAssessment(assessmentId: $assessmentId) {\n    title\n    questions {\n      position\n      question {\n        statement\n        type\n        points\n        options\n      }\n    }\n  }\n}"): (typeof documents)["query GetMyAssessment($assessmentId: String!) {\n  getMyAssessment(assessmentId: $assessmentId) {\n    title\n    questions {\n      position\n      question {\n        statement\n        type\n        points\n        options\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMyLastThreeAssessments {\n  getMyLastThreeAssessments {\n    startedAt\n    finishedAt\n    score\n    assessment {\n      id\n      title\n      type\n    }\n  }\n}"): (typeof documents)["query GetMyLastThreeAssessments {\n  getMyLastThreeAssessments {\n    startedAt\n    finishedAt\n    score\n    assessment {\n      id\n      title\n      type\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;