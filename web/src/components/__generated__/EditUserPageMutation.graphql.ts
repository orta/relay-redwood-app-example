/**
 * @generated SignedSource<<9eccd65ceac1233a922964bc72eea1f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateUserInput = {
  city?: string | null;
  country?: string | null;
  email?: string | null;
  name?: string | null;
  profileViews?: number | null;
};
export type EditUserPageMutation$variables = {
  id: string;
  input: UpdateUserInput;
};
export type EditUserPageMutation$data = {
  readonly updateUser: {
    readonly id: string;
  };
};
export type EditUserPageMutation = {
  variables: EditUserPageMutation$variables;
  response: EditUserPageMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
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
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "updateUser",
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
    "name": "EditUserPageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditUserPageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "89f4f5bfca6faa449218552467389fc1",
    "id": null,
    "metadata": {},
    "name": "EditUserPageMutation",
    "operationKind": "mutation",
    "text": "mutation EditUserPageMutation(\n  $id: ID!\n  $input: UpdateUserInput!\n) {\n  updateUser(id: $id, input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bae1f5684b76f8501d68d80895b819b2";

export default node;
