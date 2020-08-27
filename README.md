# React as sub app

### Brief
 
- Htmls are generated from Pug templates via Rollup + Gulp
- The React app is built via Webpack and is integrated on run time via pug as external js script.
- Generated htmls are served via Webpack (Can be served by any http server but Webpack enables hot-module-reloading for React apps)


#### Note, while development:
- for React app, any changes will make the app part of the page to hot-reload
- for Static website, the page needs to be manually refreshed

----

### Install dependencies

##### 1. Setup for static website
 
```
npm i
```
##### 2. Setup for React app

```
cd app && npm i
```



### Development


##### 1. Watch static website (pug templates) - Gulp
```
npm start
```

##### 2. Watch React app - Webpack
```
cd app && npm start
```


### Open in browser for demo
```
http://localhost:7000/airbnb
```

**Demo screenshot**
1. The part highlighted are 2 separate React app instances connected via common Redux store
2. Rest of the page is part of Static website
![Alt text](/demo-screenshot.png?raw=true "React-as-library: Demo Screenshot")
