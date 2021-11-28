/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateUserInput = {
    city: string;
    country: string;
    email: string;
    name?: string | null | undefined;
    profileViews: number;
};
export type NewUserPageMutationVariables = {
    input: CreateUserInput;
};
export type NewUserPageMutationResponse = {
    readonly createUser: {
        readonly id: string;
    };
};
export type NewUserPageMutation = {
    readonly response: NewUserPageMutationResponse;
    readonly variables: NewUserPageMutationVariables;
};



/*
mutation NewUserPageMutation(
  $input: CreateUserInput!
) {
  createUser(input: $input) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "createUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewUserPageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewUserPageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "60aac869427081a3b58a1dbd6d77e6a6",
    "id": null,
    "metadata": {},
    "name": "NewUserPageMutation",
    "operationKind": "mutation",
    "text": "mutation NewUserPageMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8eeb81de09aa3ca29c6e8d7cec029d0d';
export default node;
