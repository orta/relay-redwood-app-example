/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type DeleteUserButtonMutationVariables = {
    id: string;
};
export type DeleteUserButtonMutationResponse = {
    readonly deleteUser: {
        readonly id: string;
    };
};
export type DeleteUserButtonMutation = {
    readonly response: DeleteUserButtonMutationResponse;
    readonly variables: DeleteUserButtonMutationVariables;
};



/*
mutation DeleteUserButtonMutation(
  $id: ID!
) {
  deleteUser(id: $id) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "deleteUser",
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
    "name": "DeleteUserButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteUserButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "52eb00ec71686cdb57623e524fd89060",
    "id": null,
    "metadata": {},
    "name": "DeleteUserButtonMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteUserButtonMutation(\n  $id: ID!\n) {\n  deleteUser(id: $id) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '94a28df5093e1a5b9595a3afc5867698';
export default node;