# react-lazy-router-dom

## [English document ](./README.md)

# 教程

## 介绍

React Router 是一个用于 React 的全功能客户端和服务器端路由库，它是一个用于构建用户界面的 JavaScript 库。React Router 可以在任何 React 运行的地方运行；在 web 上，在带有 node.js 的服务器上，以及在 React Native 上。

React Router 与 React >= 16.x兼容。

我们将保持本教程的快速和重点。最后，您将了解您使用 React Router 日常处理的 API。之后，您可以深入研究其他一些文档以更深入地了解。

react-lazy-router-dom 是由 yao guan shou (姚观寿) 作者编写，基于React Router的基础上面进行重写了 lazy，Route ，Router ，Switch ，withRouter 使得 react-lazy-router-dom 可以实现  支持同步异步 渲染，与 代码 切分和按需加载功能，我们只需要简单的配置即可实现。

至于为什么要写这个软件,因为当时我很需要这样的路由,我在github Issues  React Router 作者告诉他我需要这样的功能路由,可以帮我实现吗?他告诉我 React Router 是不能异步渲染加载的.是的,正常情况下是不能这样做,但是我思考了好久. 看了 React Router  与  react-loadable源码中我得到一些启发.所以就实现了这个功能

其他api 均与React Router保持一致性。 如果你对React Router不够熟悉的话，请点击查看 [React Router api文档](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md)。



## 使用 react-lazy-router-dom

```npm
npm i --save react-lazy-router-dom
# or
yarn add react-lazy-router-dom
```




### 引入加载组件

假如我们的项目是在k盘并且目录是这样子的

```

├── client      #  Client Directory react code
│   ├── pages        #  Route page Page directory
│   │   ├── Home
│   │   ├── User
│   │   └── Marketing
│   ├── router     #  react   router
│   │   ├── Routers.js
│   │   ├── history.js
│   │   ├── routesComponent.js
│   ├── index.js
│   ├── index.html
├── server  
│   ├── index.js  


```



### 路由配置

 我们可以把引入的组件放到一个配置中，然后到处去使用 routesComponent.js 配置为

```
// 按需加载插件
import { lazy } from "react-lazy-router-dom";
let routesComponentConfig = [
  {
    path: "/",
    exact: true,
    name: "home",
    Component: lazy(() =>
      import(/* webpackChunkName:"home" */ "K:/client/pages/Home/index.js")
    ),
  },
  {
    path: "/marketing",
    exact: true,
    name: "marketing",
    Component: lazy(() =>
      import(
        /* webpackChunkName:"marketing" */ "K:/client/pages/Marketing/index.js"
      )
    ),
  },
  {
    path: "/user",
    exact: false,
    name: "user",
    Component: lazy(() =>
      import(/* webpackChunkName:"user" */ "K:/client/pages/User/index.js")
    ),
  }
];

export default routesComponentConfig;

```



### 添加一些路线

```
import React from "react";
import PropTypes from "prop-types";
import { Router, Switch as Routes, Route } from "react-lazy-router-dom";

const Loading=()=>{
   return <div>...Loading</div>
}routesComponent

const Routers = (props) => {
  const { history, routesComponent = [] } = props;
  return (
    <Router history={history} loading={Loading}>
      <Routes>
        {routesComponent.map((route) => {
          let { path, exact = true, Component } = route;
          return (
            <Route key={path} exact={exact} path={path} component={Component} />
          );
        })}
        <Route
          path="*"
          component={
            <div style={{ padding: "1rem" }}>
              <p>There s nothing here!</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  state: PropTypes.object,
  context: PropTypes.object
};
export default Routers;

```



### 使用history

```
npm i --save   history@5.3.0
#or
yarn add  history@5.3.0
```

#### 配置 history


```
import { createBrowserHistory, createMemoryHistory } from "history";

export const getBrowserHistory = (props = {}) =>
  createBrowserHistory({
    basename: "/", // 基链接
    forceRefresh: false, // 是否强制刷新整个页面
    // keyLength: 10, // location.key的长度
    //  getUserConfirmation: (message,callback) => callback(window.confirm(message)) // 跳转拦截函数
    ...props
  });

export const getMemoryHistory = (props = {}) => createMemoryHistory(props);

```



### 项目入口文件

 client  entry     index.js

```
import { createRoot, hydrateRoot } from "react-dom/client";
import Routers from "K:/client/router/Routers";
import { getBrowserHistory } from "K:/client/router/history";
import routesComponent from "K:/client/router/routesComponent";
const renderApp = () => {
  const history = getBrowserHistory();
    createRoot(document.getElementById("root")).render(
       <Routers
          history={history}
          routesComponent={routesComponent}
      />
    );

};

window.main = () => {renderApp();};

```



### ssr渲染

如果需要ssr 渲染, client则 index 需要这样.

```
import { createRoot, hydrateRoot } from "react-dom/client";
import Routers from "K:/client/router/Routers";
import { getBrowserHistory } from "K:/client/router/history";
import routesComponent from "K:/client/router/routesComponent";
const renderApp = () => {
  const history = getBrowserHistory();
  // client
  if (module.hot) {
    createRoot(document.getElementById("root")).render(
       <Routers
          history={history}
          routesComponent={routesComponent}
      />
    );
  } else {
    // ssr
    hydrateRoot(
      document.getElementById("root"),
      <Routers
        history={history}
        routesComponent={routesComponent}
      />
    );
  }
};

window.main = () => { renderApp();};

```



如果需要ssr 渲染, server则 index 需要这样.

```
import express from "express";
import React from "react";
import { getMemoryHistory } from "K:/client/router/history";
import * as ReactDOMServer from "react-dom/server";
import Routers from "K:/client/router/Routers";
import { matchPath } from "react-lazy-router-dom";
import routesComponent from "K:/client/router/routesComponent";
import path from "path";

const app = express();
app.use(express.static(path.resolve(__dirname, "./dist/**/*")));
const htmlTemplate = function (root) {
  return `
  <!DOCTYPE HTML>
  <html>
    <head>
    </head>
    <body>
      <div id="app">${root}</div>
      <script src="/dist/build.js"></script>
    </body>
  </html>
  `;
};

const getMatch = (routesArray, url) => {
  for (let router of routesArray) {
    let $router = matchPath(url, {
      path: router.path,
      exact: router.exact
    });

    if ($router) {
      return {
        ...router,
        ...$router
      };
    }
  }
};

app.get("*", async (req, res) => {
  let history = getMemoryHistory({ initialEntries: [req.url] });
  let isMatchRoute = getMatch(routesComponent, req._parsedUrl.pathname);
  if (isMatchRoute) {
    /* eslint-disable   */
    const routeComponent = await Component();
    /* eslint-enable   */
    const root = ReactDOMServer.renderToString(
      <Routers
        history={history}
        routesComponent={{
          ...isMatchRoute,
          Component: routeComponent
        }}
      />
    );
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.end(htmlTemplate(root));
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("SSR server start at ", PORT);
});


```





html  文件

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="aplus-waiting" content="MAN">
  <meta name="spm-id" content="a2e0b">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="renderer" content="webkit">
  <meta name="referrer" content="no-referrer" />
  <title>
  </title>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root">
  </div>
</body>
 <script src="/dist/build.js"></script>
<script>window.main()</script>
</html>
```



### 使用 react-lazy-router-dom 组件的 [ssr 框架](https://github.com/qq281113270/react-ssr-lazy-loading)



## 解释如何实现这个路由

我们知道ssr渲染是不支持异步加载的,这个问题我想过很久,后面才能解决到方案.

那我们是如何做到同时支持ssr渲染和异步加载的呢?

首先我们看到我们的  routesComponent.js  配置引入组件代码为:

```
   Component: lazy(() =>
      import(/* webpackChunkName:"home" */ "K:/client/pages/Home/index.js")
    ),
```

我们看到使用的是 import() , import promise方式导入组件,这样会变成下面这样,这样子就可以实现按需加载和代码切分功能.

```
 import('xxxx.js'),then(component=>{

})
```

再看看我们写的 lazy 方法核心代码

```
const lazy = (loader) => {
  lazy.loaderArr = [...lazy.loaderArr, loader];
  return () => {
    return loader()
      .then((res) => {
        return res.default;
      })
      .catch((e) => {
        throw new Error(e);
      });
  };
};
```

上面代码是我们是返回了一个promise 函数组件 .那如何配置React Rout使用?



我们来看看我们的 react-lazy-router-dom 核心代码,在Switch组件中getComponent 方法是用来判断加载切换路由的. 首先我们Children.forEach 去循环路由 用 matchPath 方法与路径匹配到url对应的路由

```
    Children.forEach(children, (el) => {
      if (newMatch === null) {
        let {
          path: pathProp,
          exact,
          strict,
          sensitive,
          from,
          component,
          element,
          render
        } = el.props;
        let path = pathProp || from;
        component = component || element || render;
        newMatch = matchPath(location.pathname, {
          path: path,
          exact: exact,
          strict: strict,
          sensitive: sensitive
        });
        if (newMatch) {
          
        }
      }
    });
```

如果匹配上了,那么很好. 我们用getSyncComponent去加载这个路由, 这个路由可以是 函数,也可以是promise 函数组件. 也可以是promise 函数组件, 也可以是一个组件.

我们来看看这个函数功能

```
  getSyncComponent = (component, callback = () => {}) => {
    if (
      Object.prototype.toString.call(component).slice(1, -1) === "object Object"
    ) {
      if (isValidElement(component)) {
        return component;
      } else if (component.__esModule) {
        component = this.getSyncComponent(component.default, callback);
      }
    } else if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Function"
    ) {
      component = component(this.props);
      component = this.getSyncComponent(component, callback);
    } else if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Promise"
    ) {
      this.resolveComponent(component, callback).then((AsynComponent) => {
        callback(AsynComponent);
      });
      return null;
    }
    return component;
  };

  resolveComponent = async (component, callback = () => {}) => {
    if (
      Object.prototype.toString.call(component).slice(1, -1) ===
      "object Promise"
    ) {
      /* eslint-disable   */
      // component = await new Promise(async (relove, reject) => {
      //   setTimeout(async () => {
      //     let data = await component;
      //     relove(data);
      //   }, 2000);
      // });
      /* eslint-enable   */
      component = await component;
      component = this.resolveComponent(component, callback);
    } else {
      component = this.getSyncComponent(component, callback);
    }
    return component;
  };

```

上面代码其实就是一个递归,如果是函数则执行 如果是Promise 则 then, 知道出现 react 组件为止.



#### 异步组件渲染

那Promise 组件是如何渲染的呢?

我们使用getSyncComponent获取到Promise 组件 AsynComponent   然后存放到 state.AsynComponent中

然后也把 locationKey 存起来.  一开始state.AsynComponent 是一个空组件 如果 Promise 组件加载完毕则替换他,然后重新render.

```
     if (newMatch) {
          SyncComponent = this.getSyncComponent(component, (AsynComponent) => {
            this.setState({
              isSync: false,
              AsynComponent,
              match: newMatch,
              locationKey: key
            });
          });
          if (SyncComponent) {
            this.setState({
              isSync: true,
              AsynComponent: SyncComponent,
              match: newMatch,
              locationKey: key
            });
          }
        }
```



Switch 组件重新 runder 之后我们就返回 AsynComponent 组件

```

     if (key === locationKey) {
      return (
        <MatchContext.Provider
          value={{
            history,
            location,
            match
          }}>
          <AsynComponent
            match={match}
            history={history}
            location={location}
            exact={match.isExact}
          />
        </MatchContext.Provider>
      );
    }
```



#### 同步组件渲染

但是我们知道在 ssr 中 是不支持Promise 的, 所以我们在 server index.js 中在匹配到js中就 await 获取到组件在返回给 客户端

```
app.get("*", async (req, res) => {
  let history = getMemoryHistory({ initialEntries: [req.url] });
  let isMatchRoute = getMatch(routesComponent, req._parsedUrl.pathname);
  if (isMatchRoute) {
    /* eslint-disable   */
    const routeComponent = await Component();
    /* eslint-enable   */
    const root = ReactDOMServer.renderToString(
      <Routers
        history={history}
        routesComponent={{
          ...isMatchRoute,
          Component: routeComponent
        }}
      />
    );
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.end(htmlTemplate(root));
  }
});
```



##### Switch 组件同步渲染代码



```
       if (newMatch) {
          SyncComponent = this.getSyncComponent(component, (AsynComponent) => {
            this.setState({
              isSync: false,
              AsynComponent,
              match: newMatch,
              locationKey: key
            });
          });
          if (SyncComponent) {
            this.setState({
              isSync: true,
              AsynComponent: SyncComponent,
              match: newMatch,
              locationKey: key
            });
          }
        }
        
        
```

如果是同步渲染 那么SyncComponent直接得到一个组件.

如果同步组件存在则直接渲染 . 他也不会进去getSyncComponent callback 中.

```
    return SyncComponent ? (
      <MatchContext.Provider
        value={{
          history,
          location,
          match: newMatch
        }}>
        <SyncComponent
          match={newMatch}
          history={history}
          location={location}
          exact={newMatch.isExact}
        />
      </MatchContext.Provider>
    ) : (
      <MatchContext.Provider
        value={{
          history,
          location,
          match: newMatch
        }}>
        <AsynComponent
          match={newMatch}
          history={history}
          location={location}
          exact={newMatch.isExact}
        />
      </MatchContext.Provider>
    );
```



## 声明

本代码为开源免费使用.本软件使用了 react  和 react-router-dom 代码,如果有侵权则联系我的邮箱告知 281113270@请求.com 谢谢.

如果你对你有用，请移动你的手指，为我点击 star。谢谢你！

根据[MIT许可证](http://mit-license.org/。)  作者 姚观寿 维护



 









