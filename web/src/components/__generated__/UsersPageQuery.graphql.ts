/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UsersPageQueryVariables = {};
export type UsersPageQueryResponse = {
    readonly users: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string | null;
                readonly email: string;
            };
        } | null> | null;
        readonly pageInfo: {
            readonly endCursor: string;
        };
    } | null;
};
export type UsersPageQuery = {
    readonly response: UsersPageQueryResponse;
    readonly variables: UsersPageQueryVariables;
};



/*
query UsersPageQuery {
  users(first: 5) {
    edges {
      node {
        id
        name
        email
      }
    }
    pageInfo {
      endCursor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 5
      }
    ],
    "concreteType": "UserConnection",
    "kind": "LinkedField",
    "name": "users",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "node",
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "kind": "LinkedField",
        "name": "pageInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endCursor",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "users(first:5)"
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
    "cacheID": "5ffdcc2e3a908ecb7069b92eb4922323",
    "id": null,
    "metadata": {},
    "name": "UsersPageQuery",
    "operationKind": "query",
    "text": "query UsersPageQuery {\n  users(first: 5) {\n    edges {\n      node {\n        id\n        name\n        email\n      }\n    }\n    pageInfo {\n      endCursor\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'eb6f41ac746b1927effe181654d1309f';
export default node;
