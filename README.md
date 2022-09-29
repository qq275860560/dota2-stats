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

## Technology stack

| Name                    | Desc                 |
|-----------------------|--------------------|
| `Vite`  | Build tooling      |
| `Vue3`     | Popular frontedn framework        |
| `TypeScript`        | Type check tools for JavaScript |
| `Pinia`      | Store for Vue        |
| `D3.js`      | Charts generating library        |
| `Vitest`     | Unit test tool        |
| `Element Plus`       | UI framework     |


# FAQ

## how to deploy to cloud server

- prepare the cloud server machine,eg
  - host:97.74.88.173
  - ssh port:22
  - app port:2473
- close firewall or allow the port 22 and the port 2473

- login cloud server,create runtime dir
```
mkdir -pv /usr/local/dota2-stats
```

- upload dota2-stat2/dist folder to cloud server runtime dir

```
scp -r dota2-stat2/dist/* root@97.74.88.173:/usr/local/dota2-stats/
```

- login server to edit nginx.conf

```

cat > /usr/local/dota2-stats/nginx.conf<<-"EOF"
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    sendfile        on;   
    keepalive_timeout  65;
    
    log_format access '$remote_addr $host- $remote_user [$time_local] '
        '"$request" $status $body_bytes_sent '
        '"$http_referer" "$http_user_agent" $http_x_forwarded_for - $http_x_real_ip';
    
    access_log /var/log/nginx/access.log access;
  
    server {
        listen       2473;
        root  html;
  	     index  index.html index.html;

    	  proxy_set_header   Host    $host;
        proxy_set_header   Remote_Addr    $remote_addr;
        proxy_set_header   X-Real-IP    $remote_addr;
     	  proxy_set_header   X-Forwarded-For    $proxy_add_x_forwarded_for;
    
      	location / {
         		try_files $uri $uri/ /index.html;
      	}

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
EOF



```

- download nginx
```
docker pull nginx
```

- start nginx

```
docker kill dota2-stats
docker rm dota2-stats

docker run --restart=always   \
--name dota2-stats \
-p 2473:2473 \
-v /usr/local/dota2-stats:/etc/nginx/html \
-v /usr/local/dota2-stats/nginx.conf:/etc/nginx/nginx.conf \
-v /usr/local/dota2-stats:/var/log/nginx \
-e TZ=Asia/Shanghai \
-d nginx
```

- local execute the command curl to test netwwork

```
curl localhost:2437
```

- browser open url

```
http://97.74.88.173:2473
```

- list page
![图片](https://github.com/daisygogogo/dota2-stats/blob/master/doc/list1.jpg)
 
- detail page
![图片](https://github.com/daisygogogo/dota2-stats/blob/master/doc/list2.jpg)

# unit test introduce

| file                      | desc | result |
| ------------------------- | ---- | ------ |
| dota2-stats/test/test.ts  |      | pass   |
| dota2-stats/test/test2.ts |      | pass   |
| dota2-stats/test/test3.ts |      | pass   |

