# react-lazy-router-dom

## [中文文档](./README.cn.md)

# Tutorial

## introduce

React Router is a full-featured client and server routing library for React. It is a JavaScript library for building user interfaces. React Router can be run anywhere React is running; On the Web, on servers with Node.js, and on React Native.。

React Router is compatible with React >= 16.x 

We'll keep this tutorial fast and focused. Finally, you'll learn about the apis that you handle daily using the React Router. After that, you can dig into some of the other documents to get more insight。

React-lazy-router-dom was written by Yao Guan Shou (姚观寿). Based on the React Router, lazy, Route, router and Switch were rewritten. WithRouter enables react-Lazy-Router-DOM to support synchronous and asynchronous rendering, split with code, and load on demand with a simple configuration。

As for why I wrote this software, I needed such a route very much at that time. I told him in Github Issues React Router that I needed such a function route. Could you help me realize it? He told me that the React Router doesn't load asynchronously. Yeah, normally you can't do that, but I thought about it a lot. See React Router and React -loadable source code I get some inspiration. So that's what it does

Other apis are consistent with the React Router. If you're not familiar with the React Router, check it out [React Router api document](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md)。



## Use the react-lazy-router-dom

```npm
npm i --save react-lazy-router-dom
# or
yarn add react-lazy-router-dom
```



### Introducing load components

Let's say our project is on disk K and the directory looks like this

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



### route configuration

We can put the introduced components in a configuration and then go around using routesComponent.js as

```
// Load plug-ins on demand
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



###  Add some routes 

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



### The use history

```
npm i --save   history@5.3.0
#or
yarn add  history@5.3.0
```

#### config history


```
import { createBrowserHistory, createMemoryHistory } from "history";

export const getBrowserHistory = (props = {}) =>
  createBrowserHistory({
    basename: "/", // 基链接
    forceRefresh: false, // 是否强制刷新整个页面
    ...props
  });

export const getMemoryHistory = (props = {}) => createMemoryHistory(props);

```



### Project entry file

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



### SSR rendering

If SSR rendering is required, Client index is required.

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



 If SSR rendering is required, Server index is required.

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



### Using the react-lazy-router-dom component [SSR framework](https://github.com/qq281113270/react-ssr-lazy-loading)





## Explain how to implement this routing

We know that SSR rendering does not support asynchronous loading, I thought about this problem for a long time, later to solve the solution.

So how did we manage to support both SSR rendering and asynchronous loading?

First we see that our routesComponent.js configuration introduces the component code as:

```
   Component: lazy(() =>
      import(/* webpackChunkName:"home" */ "K:/client/pages/Home/index.js")
    ),
```

We see the use of import(), import Promise to import components, which will become, so we can do component loading on demand and code splitting

```
 import('xxxx.js'),then(component=>{

})
```

Take a look at the lazy method core code we wrote

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

We returned a Promise function. How do we configure React Rout?



Taking a look at our react-lazy-router-dom core code, the getComponent method in the Switch component is used to determine whether to load the Switch route. First, we child. forEach to loop the route and match the path to the route corresponding to the URL using the matchPath method

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

If it's a match, then great. We use getSyncComponent to load the route, which can be a function or a Promise component. It can be a Promise function component, or it can be a component.

Let's take a look at what this function does

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

The above code is a recursion that executes if it is a function and then if it is a Promise until the React component appears.



### Asynchronous component rendering

How is the Promise component rendered?

We use getSyncComponent to get the Promise component AsynComponent and store it in the state.AsynComponent 

The state.AsynComponent is an empty component at first and if the Promise component is loaded, replace it and render it again.

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



After the Switch component is runder again we return the AsynComponent

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







### Synchronous component rendering

However, we know that Promise is not supported in SSR, so we await the component in server index.js and return it to client after matching to JS

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



#### The Switch component synchronizes rendering code

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

SyncComponent gets a component directly if it is rendered synchronously.

If a synchronous component exists, it is rendered directly. It also does not go into the getSyncComponent Callback.

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



## statement

This code is open source free to use. This software uses React and react-router-DOM codes. If there is any infringement, please contact me at 281113270@qq.com. Thank you.

If it works for you, please move your finger and click STAR for me. Thank you very much.

under the [MIT License](http://mit-license.org/) Authored and maintained by yao guan shou(姚观寿).



 









