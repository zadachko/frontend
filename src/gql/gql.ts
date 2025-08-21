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
    "query GetExamQuestions($examId: Int!) {\n  questions(examId: $examId) {\n    id\n    statement\n    type\n    options\n    correctAnswer\n    points\n    diagramData {\n      id\n      x\n      y\n    }\n    diagramSteps {\n      elementType\n      type\n      color\n      id\n      pointData {\n        id\n        x\n        y\n      }\n      angleData {\n        id\n        degrees\n        label\n      }\n      edgeData {\n        from\n        to\n        length\n        label\n      }\n      sideData {\n        id\n        length\n        label\n      }\n      removeId {\n        from\n        to\n      }\n    }\n    solutionSteps {\n      step\n      action\n      result\n      explanation\n      subSteps\n    }\n  }\n}": typeof types.GetExamQuestionsDocument,
};
const documents: Documents = {
    "query GetExamQuestions($examId: Int!) {\n  questions(examId: $examId) {\n    id\n    statement\n    type\n    options\n    correctAnswer\n    points\n    diagramData {\n      id\n      x\n      y\n    }\n    diagramSteps {\n      elementType\n      type\n      color\n      id\n      pointData {\n        id\n        x\n        y\n      }\n      angleData {\n        id\n        degrees\n        label\n      }\n      edgeData {\n        from\n        to\n        length\n        label\n      }\n      sideData {\n        id\n        length\n        label\n      }\n      removeId {\n        from\n        to\n      }\n    }\n    solutionSteps {\n      step\n      action\n      result\n      explanation\n      subSteps\n    }\n  }\n}": types.GetExamQuestionsDocument,
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
export function graphql(source: "query GetExamQuestions($examId: Int!) {\n  questions(examId: $examId) {\n    id\n    statement\n    type\n    options\n    correctAnswer\n    points\n    diagramData {\n      id\n      x\n      y\n    }\n    diagramSteps {\n      elementType\n      type\n      color\n      id\n      pointData {\n        id\n        x\n        y\n      }\n      angleData {\n        id\n        degrees\n        label\n      }\n      edgeData {\n        from\n        to\n        length\n        label\n      }\n      sideData {\n        id\n        length\n        label\n      }\n      removeId {\n        from\n        to\n      }\n    }\n    solutionSteps {\n      step\n      action\n      result\n      explanation\n      subSteps\n    }\n  }\n}"): (typeof documents)["query GetExamQuestions($examId: Int!) {\n  questions(examId: $examId) {\n    id\n    statement\n    type\n    options\n    correctAnswer\n    points\n    diagramData {\n      id\n      x\n      y\n    }\n    diagramSteps {\n      elementType\n      type\n      color\n      id\n      pointData {\n        id\n        x\n        y\n      }\n      angleData {\n        id\n        degrees\n        label\n      }\n      edgeData {\n        from\n        to\n        length\n        label\n      }\n      sideData {\n        id\n        length\n        label\n      }\n      removeId {\n        from\n        to\n      }\n    }\n    solutionSteps {\n      step\n      action\n      result\n      explanation\n      subSteps\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;