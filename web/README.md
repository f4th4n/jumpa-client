### Client channel simulation
```
ff.game.position.walkAbsolute(1, 6)
ff.game.profile.setColor('#00ff00') // TODO
```

### Test
```
http://localhost:3000/?player_token=your-token
Example
http://localhost:3000/?player_token=gg
```

### Deploy to Unity
Change isProd to true in config.json
$ npx webpack
copy ./dist/main.js to unity build
