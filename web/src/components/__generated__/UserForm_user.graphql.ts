/**
 * @generated SignedSource<<87a10a7835737db864ff9cecc9472a0a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserForm_user$data = {
  readonly id: string;
  readonly name: string | null;
  readonly email: string;
  readonly profileViews: number;
  readonly city: string;
  readonly country: string;
  readonly " $fragmentType": "UserForm_user";
};
export type UserForm_user$key = {
  readonly " $data"?: UserForm_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserForm_user">;
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

(node as any).hash = "0bcd0d6ff4ae882226ce6ac96ba90469";

export default node;
