[@venite/ldf](../README.md) › [Globals](../globals.md) › ["sharing/sharing"](../modules/_sharing_sharing_.md) › [Sharing](_sharing_sharing_.sharing.md)

# Class: Sharing

## Hierarchy

* **Sharing**

## Index

### Constructors

* [constructor](_sharing_sharing_.sharing.md#constructor)

### Properties

* [collaborators](_sharing_sharing_.sharing.md#collaborators)
* [organization](_sharing_sharing_.sharing.md#optional-organization)
* [owner](_sharing_sharing_.sharing.md#owner)
* [privacy](_sharing_sharing_.sharing.md#privacy)
* [status](_sharing_sharing_.sharing.md#status)

## Constructors

###  constructor

\+ **new Sharing**(`data`: Partial‹[Sharing](_sharing_sharing_.sharing.md)›): *[Sharing](_sharing_sharing_.sharing.md)*

*Defined in [sharing/sharing.ts:19](https://github.com/gbj/venite/blob/f982f6c/ldf/src/sharing/sharing.ts#L19)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Sharing](_sharing_sharing_.sharing.md)› | {} |

**Returns:** *[Sharing](_sharing_sharing_.sharing.md)*

## Properties

###  collaborators

• **collaborators**: *string[]*

*Defined in [sharing/sharing.ts:19](https://github.com/gbj/venite/blob/f982f6c/ldf/src/sharing/sharing.ts#L19)*

Username or API-readable identifying collaborators who have same permissions as owner, except editing collaborators or changing owner

___

### `Optional` organization

• **organization**? : *undefined | string*

*Defined in [sharing/sharing.ts:6](https://github.com/gbj/venite/blob/f982f6c/ldf/src/sharing/sharing.ts#L6)*

API-readable identifier of the organization to which this belongs, if any

___

###  owner

• **owner**: *string*

*Defined in [sharing/sharing.ts:3](https://github.com/gbj/venite/blob/f982f6c/ldf/src/sharing/sharing.ts#L3)*

Username or API-readable string identifying the document's owner

___

###  privacy

• **privacy**: *"public" | "unlisted" | "organization" | "private"*

*Defined in [sharing/sharing.ts:16](https://github.com/gbj/venite/blob/f982f6c/ldf/src/sharing/sharing.ts#L16)*

Who has permission to access this document?
`public` available to anyone
`unlisted` to those with link
`organization` to any user who's part of organization
`private` only to owner and collaborators

___

###  status

• **status**: *"published" | "draft"*

*Defined in [sharing/sharing.ts:9](https://github.com/gbj/venite/blob/f982f6c/ldf/src/sharing/sharing.ts#L9)*

Drafts only available to owner and collaborators, published to anyone who meets privacy standard