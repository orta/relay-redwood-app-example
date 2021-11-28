/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import {  } from "relay-runtime";
export type UserForm_user = {
    readonly id: string;
    readonly name: string | null;
    readonly email: string;
    readonly profileViews: number;
    readonly city: string;
    readonly country: string;
    readonly " $refType": "UserForm_user";
};
export type UserForm_user$data = UserForm_user;
export type UserForm_user$key = {
    readonly " $data"?: UserForm_user$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UserForm_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserForm_user",
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
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '0bcd0d6ff4ae882226ce6ac96ba90469';
export default node;
