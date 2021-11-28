/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UsersPageQueryVariables = {};
export type UsersPageQueryResponse = {
    readonly users: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
        readonly email: string;
    }>;
};
export type UsersPageQuery = {
    readonly response: UsersPageQueryResponse;
    readonly variables: UsersPageQueryVariables;
};



/*
query UsersPageQuery {
  users {
    id
    name
    email
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UsersPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "64f3434db5fcda977516dfe1b15852f7",
    "id": null,
    "metadata": {},
    "name": "UsersPageQuery",
    "operationKind": "query",
    "text": "query UsersPageQuery {\n  users {\n    id\n    name\n    email\n  }\n}\n"
  }
};
})();
(node as any).hash = '7f5aa9079957cc97fa9fb8b13407bb56';
export default node;
