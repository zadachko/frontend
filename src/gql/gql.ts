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
    "query GetExamLive($examId: String!) {\n  getExam(id: $examId) {\n    createdAt\n    examQuestions {\n      question {\n        points\n        statement\n        options\n        type\n      }\n    }\n  }\n}": typeof types.GetExamLiveDocument,
    "query GetExamOverview($getExamId: String!) {\n  getExam(id: $getExamId) {\n    examQuestions {\n      question {\n        correctAnswer\n        diagramData {\n          id\n          x\n          y\n        }\n        diagramSteps {\n          angleData {\n            degrees\n            id\n            label\n          }\n          color\n          edgeData {\n            from\n            label\n            length\n            to\n          }\n          elementType\n          id\n          pointData {\n            id\n            x\n            y\n          }\n          removeId {\n            from\n            to\n          }\n          sideData {\n            id\n            label\n            length\n          }\n          type\n        }\n        options\n        points\n        solutionSteps {\n          action\n          explanation\n          result\n          step\n          subSteps\n        }\n        statement\n        type\n        userAnswer\n      }\n    }\n  }\n}": typeof types.GetExamOverviewDocument,
};
const documents: Documents = {
    "query GetExamLive($examId: String!) {\n  getExam(id: $examId) {\n    createdAt\n    examQuestions {\n      question {\n        points\n        statement\n        options\n        type\n      }\n    }\n  }\n}": types.GetExamLiveDocument,
    "query GetExamOverview($getExamId: String!) {\n  getExam(id: $getExamId) {\n    examQuestions {\n      question {\n        correctAnswer\n        diagramData {\n          id\n          x\n          y\n        }\n        diagramSteps {\n          angleData {\n            degrees\n            id\n            label\n          }\n          color\n          edgeData {\n            from\n            label\n            length\n            to\n          }\n          elementType\n          id\n          pointData {\n            id\n            x\n            y\n          }\n          removeId {\n            from\n            to\n          }\n          sideData {\n            id\n            label\n            length\n          }\n          type\n        }\n        options\n        points\n        solutionSteps {\n          action\n          explanation\n          result\n          step\n          subSteps\n        }\n        statement\n        type\n        userAnswer\n      }\n    }\n  }\n}": types.GetExamOverviewDocument,
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
export function graphql(source: "query GetExamLive($examId: String!) {\n  getExam(id: $examId) {\n    createdAt\n    examQuestions {\n      question {\n        points\n        statement\n        options\n        type\n      }\n    }\n  }\n}"): (typeof documents)["query GetExamLive($examId: String!) {\n  getExam(id: $examId) {\n    createdAt\n    examQuestions {\n      question {\n        points\n        statement\n        options\n        type\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetExamOverview($getExamId: String!) {\n  getExam(id: $getExamId) {\n    examQuestions {\n      question {\n        correctAnswer\n        diagramData {\n          id\n          x\n          y\n        }\n        diagramSteps {\n          angleData {\n            degrees\n            id\n            label\n          }\n          color\n          edgeData {\n            from\n            label\n            length\n            to\n          }\n          elementType\n          id\n          pointData {\n            id\n            x\n            y\n          }\n          removeId {\n            from\n            to\n          }\n          sideData {\n            id\n            label\n            length\n          }\n          type\n        }\n        options\n        points\n        solutionSteps {\n          action\n          explanation\n          result\n          step\n          subSteps\n        }\n        statement\n        type\n        userAnswer\n      }\n    }\n  }\n}"): (typeof documents)["query GetExamOverview($getExamId: String!) {\n  getExam(id: $getExamId) {\n    examQuestions {\n      question {\n        correctAnswer\n        diagramData {\n          id\n          x\n          y\n        }\n        diagramSteps {\n          angleData {\n            degrees\n            id\n            label\n          }\n          color\n          edgeData {\n            from\n            label\n            length\n            to\n          }\n          elementType\n          id\n          pointData {\n            id\n            x\n            y\n          }\n          removeId {\n            from\n            to\n          }\n          sideData {\n            id\n            label\n            length\n          }\n          type\n        }\n        options\n        points\n        solutionSteps {\n          action\n          explanation\n          result\n          step\n          subSteps\n        }\n        statement\n        type\n        userAnswer\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;