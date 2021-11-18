# Colyseus Tutorial

A multiplayer scene with [Colyseus]{https://www.colyseus.io/} for websockets multiplayer messaging. The game logic is carried out server-side.

![demo]()

This scene shows you:

- How to support [Colyseus]{https://www.colyseus.io/} in a Decentraland scene
- How to set up a simple scene state in Colyseus
- How to handle game state changes from the server in your scene
- How to fetch a player's realm
- How to keep track of the state of each realm as a separate room in your game

The server keeps track of the color selected by each player and the changes in cube colors.

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```
$ npm i -g decentraland
```

**Run the server locally**

```
$ cd server
$ npm run build
$ npm run start
```
NOTE: If this is your first time running the scene then you need to run `npm install` before `npm start`

**Run the scene**

Keep the server running, run the scene on a separate command line window:

```
$ cd scene
$ dcl start
```

**Scene Usage**


Open two separate browser windows, click on the cones to pick a color, then click on the cubes to paint them that same color.


## Using Colyseus SDK with Decentraland

Install `colyseus.js`:

```
npm install --save colyseus.js
```

Add `colyseus.js` to your `"bundleDependencies"` in your `package.json`:

```json
  "bundleDependencies": [
    "colyseus.js"
  ]
```

To avoid TypeScript compilation errors you'll need to edit `tsconfig.json`, and include a few `///<reference` to your source-code, as you can see in the [scene/src/connection.ts](scene/src/connection.ts) file.

```json
{
  "compilerOptions": {
    // ...
    "noLib": false,
    // ...
  }
}
```

```typescript
///<reference lib="es2015.symbol" />
///<reference lib="es2015.symbol.wellknown" />
///<reference lib="es2015.collection" />
///<reference lib="es2015.iterable" />

import { Client } from "colyseus.js";
```

> The Colyseus SDK requires a few TypeScript libraries that are excluded by default by Decentraland.


---

## Creating a Colyseus server:

```
npm init colyseus-app ./server
```


## Deploying to [Colyseus Arena](https://www.colyseus.io/arena)

```
npm run build
```

Upload the `lib` folder from the Arena control panel.

## More


Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

If something doesn’t work, please [file an issue](https://github.com/decentraland-scenes/Awesome-Repository/issues/new).

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
