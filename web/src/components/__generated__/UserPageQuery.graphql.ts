/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UserPageQueryVariables = {
    id: string;
};
export type UserPageQueryResponse = {
    readonly user: {
        readonly id: string;
        readonly name: string | null;
        readonly email: string;
        readonly profileViews: number;
        readonly city: string;
        readonly country: string;
    } | null;
};
export type UserPageQuery = {
    readonly response: UserPageQueryResponse;
    readonly variables: UserPageQueryVariables;
};



/*
query UserPageQuery(
  $id: ID!
) {
  user(id: $id) {
    id
    name
    email
    profileViews
    city
    country
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
    "name": "user",
    "plural": false,
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "profileViews",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "city",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "country",
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
    "name": "UserPageQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserPageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4dfb207ef9affa80a5da56a238bbd442",
    "id": null,
    "metadata": {},
    "name": "UserPageQuery",
    "operationKind": "query",
    "text": "query UserPageQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n    email\n    profileViews\n    city\n    country\n  }\n}\n"
  }
};
})();
(node as any).hash = '4ede9883ecfae65deebd0856cd217e77';
export default node;
