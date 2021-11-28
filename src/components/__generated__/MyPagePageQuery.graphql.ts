/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MyPagePageQueryVariables = {
    id: string;
};
export type MyPagePageQueryResponse = {
    readonly user: {
        readonly name: string | null;
        readonly email: string;
    } | null;
};
export type MyPagePageQuery = {
    readonly response: MyPagePageQueryResponse;
    readonly variables: MyPagePageQueryVariables;
};



/*
query MyPagePageQuery(
  $id: ID!
) {
  user(id: $id) {
    name
    email
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MyPagePageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MyPagePageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "fb05268409180b5024ac81c9c57a2236",
    "id": null,
    "metadata": {},
    "name": "MyPagePageQuery",
    "operationKind": "query",
    "text": "query MyPagePageQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    name\n    email\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ec4780a346e4c7105c1c408d615b44b0';
export default node;
