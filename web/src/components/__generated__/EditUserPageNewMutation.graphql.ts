/**
 * @generated SignedSource<<e531f4e14a404f2769e67d0848d7aa62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateUserInput = {
  city: string;
  country: string;
  email: string;
  name?: string | null;
  profileViews: number;
};
export type EditUserPageNewMutation$variables = {
  input: CreateUserInput;
};
export type EditUserPageNewMutation$data = {
  readonly createUser: {
    readonly id: string;
  };
};
export type EditUserPageNewMutation = {
  response: EditUserPageNewMutation$data;
  variables: EditUserPageNewMutation$variables;
};

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
    "name": "EditUserPageNewMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditUserPageNewMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1e72bc524457b46332b0accafccc75a9",
    "id": null,
    "metadata": {},
    "name": "EditUserPageNewMutation",
    "operationKind": "mutation",
    "text": "mutation EditUserPageNewMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "407f065e176de19a7cecb54b34d65765";

export default node;
