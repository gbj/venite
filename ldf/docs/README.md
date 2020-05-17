[@venite/ldf](README.md) › [Globals](globals.md)

# @venite/ldf

# venite
Spec and rendering components for the Liturgical Document Format (LDF) used by Venite.app.

Ultimately, this will provide:
1. **Liturgical Document Format** (LDF): an open JSON-based document format capable of representing almost any worship bulletin, psalm, prayer, or other liturgical document
2. **Components**: a set of web components that
  - can be embedded in any webpage or HTML-based app to display a liturgical document; currently support IE11 and all modern browsers (Safari, Chrome, Firefox, Edge, Opera, etc.)
  - can collaboratively edit any liturgical document
3. **Server Modules** that implement collaborative editing and database management

This is very much a work in progress. To play with a local copy, the easiest thing to do is:
1. Clone the repository
2. To start the editor socket server: `cd venite/server && npm install && npm run start:dev`
3. To start the editor frontend: `cd venite/components && npm install && npm run start`
4. Stencil should automatically open a tab in your browser. To see the collaborative editing in action, open the same address (probably `http://localhost:3333` or similar) in another browser or another window.
