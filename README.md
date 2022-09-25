# dota2-stats

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## View it online

[Dota2 Stats](http://47.243.32.241:2473)

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Make sure that your project environment is ready

### Check in your terminal

```sh
node -v  (should be 14.18+，16+)
npm -v

```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# FAQ

## how to deploy to cloud server

- prepare the cloud server machine,eg
  - host:47.243.32.241
  - ssh port:22
  - app port:2473
- close firewall or allow the port 22 and the port 2473
- upload dota2-stat2/dist folder to cloud server

```
scp -r dota2-stat2/dist root@47.243.32.241:/usr/local/dota2-stat2/
```

- login server,download nginx,and edit nginx.conf

```
server {
   listen 2473;
   server_name localhost;
   root /usr/local/dota2-stat2/dist;
   location / {
        try_files $uri /index.html;
   }
}
```

- start nginx

```
/usr/bin/nginx
```

- local execute the command curl to test netwwork

```
curl localhost:2437
```

- browser open url

```
http://47.243.32.241:2473
```

- list page
  <img width="1220" alt="image" src="https://user-images.githubusercontent.com/23239075/192129272-d3991873-e06a-4aa5-9a44-956b323e873e.png">
- detail page
  <img width="1272" alt="image" src="https://user-images.githubusercontent.com/23239075/192129323-f83c9e44-762d-42e8-a283-c386ee876436.png">

# unit test introduce

| file                      | desc | result |
| ------------------------- | ---- | ------ |
| dota2-stats/test/test.ts  |      | pass   |
| dota2-stats/test/test2.ts |      | pass   |
| dota2-stats/test/test3.ts |      | pass   |

# where is d3 used

- code screenshots

- function display
