/*!
 * react-lazy-router-dom v0.0.2
 * (c) 2022-2023 yao guan shou (姚观寿) 281113270@qq.com
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prop-types'), require('react'), require('@babel/runtime/regenerator'), require('hoist-non-react-statics')) :
  typeof define === 'function' && define.amd ? define(['exports', 'prop-types', 'react', '@babel/runtime/regenerator', 'hoist-non-react-statics'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactRouterDOM = {}, global.PropTypes, global.React, global._regeneratorRuntime, global.hoistStatics));
})(this, (function (exports, PropTypes, React, _regeneratorRuntime, hoistStatics) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
  var hoistStatics__default = /*#__PURE__*/_interopDefaultLegacy(hoistStatics);

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
  }

  function _createForOfIteratorHelper(o,allowArrayLike){var it=typeof Symbol!=="undefined"&&o[Symbol.iterator]||o["@@iterator"];if(!it){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&typeof o.length==="number"){if(it)o=it;var i=0;var F=function F(){};return {s:F,n:function n(){if(i>=o.length)return {done:true};return {done:false,value:o[i++]};},e:function e(_e){throw _e;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion=true,didErr=false,err;return {s:function s(){it=it.call(o);},n:function n(){var step=it.next();normalCompletion=step.done;return step;},e:function e(_e2){didErr=true;err=_e2;},f:function f(){try{if(!normalCompletion&&it["return"]!=null)it["return"]();}finally{if(didErr)throw err;}}};}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2;}var lazy=function lazy(loader){lazy.loaderArr=[].concat(_toConsumableArray(lazy.loaderArr),[loader]);return function(){return loader().then(function(res){return res["default"];})["catch"](function(e){throw new Error(e);});};};lazy.loaderArr=[];var preloadReady=function preloadReady(){var onSuccess=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(){};var onError=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};var promiseArr=[];var _iterator=_createForOfIteratorHelper(lazy.loaderArr),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var item=_step.value;promiseArr.push(item());}}catch(err){_iterator.e(err);}finally{_iterator.f();}return Promise.all(promiseArr).then(function(){onSuccess();})["catch"](function(error){onError(error);throw new Error(error);});};

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  /* eslint-disable   */var isarray=Array.isArray||function(arr){var _ref={},toString=_ref.toString;return toString.call(arr)==="[object Array]";};/**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */var PATH_REGEXP=new RegExp([// Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  "(\\\\.)",// Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");/**
   * Parse a string for the raw tokens.
   *
   * @param  {string}  str
   * @param  {Object=} options
   * @return {!Array}
   */function parse(str,options){var tokens=[];var key=0;var index=0;var path="";var defaultDelimiter=options&&options.delimiter||"/";var res;while((res=PATH_REGEXP.exec(str))!=null){var m=res[0];var escaped=res[1];var offset=res.index;path+=str.slice(index,offset);index=offset+m.length;// Ignore already escaped sequences.
  if(escaped){path+=escaped[1];continue;}var next=str[index];var prefix=res[2];var name=res[3];var capture=res[4];var group=res[5];var modifier=res[6];var asterisk=res[7];// Push the current path onto the tokens.
  if(path){tokens.push(path);path="";}var partial=prefix!=null&&next!=null&&next!==prefix;var repeat=modifier==="+"||modifier==="*";var optional=modifier==="?"||modifier==="*";var delimiter=res[2]||defaultDelimiter;var pattern=capture||group;tokens.push({name:name||key++,prefix:prefix||"",delimiter:delimiter,optional:optional,repeat:repeat,partial:partial,asterisk:!!asterisk,pattern:pattern?escapeGroup(pattern):asterisk?".*":"[^"+escapeString(delimiter)+"]+?"});}// Match any characters still remaining.
  if(index<str.length){path+=str.substr(index);}// If the path exists, push it onto the end.
  if(path){tokens.push(path);}return tokens;}/**
   * Escape a regular expression string.
   *
   * @param  {string} str
   * @return {string}
   */function escapeString(str){return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1");}/**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {string} group
   * @return {string}
   */function escapeGroup(group){return group.replace(/([=!:$\/()])/g,"\\$1");}/**
   * Attach the keys as a property of the regexp.
   *
   * @param  {!RegExp} re
   * @param  {Array}   keys
   * @return {!RegExp}
   */function attachKeys(re,keys){re.keys=keys;return re;}/**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {string}
   */function flags(options){return options&&options.sensitive?"":"i";}/**
   * Pull out keys from a regexp.
   *
   * @param  {!RegExp} path
   * @param  {!Array}  keys
   * @return {!RegExp}
   */function regexpToRegexp(path,keys){// Use a negative lookahead to match only capturing groups.
  var groups=path.source.match(/\((?!\?)/g);if(groups){for(var i=0;i<groups.length;i++){keys.push({name:i,prefix:null,delimiter:null,optional:false,repeat:false,partial:false,asterisk:false,pattern:null});}}return attachKeys(path,keys);}/**
   * Transform an array into a regexp.
   *
   * @param  {!Array}  path
   * @param  {Array}   keys
   * @param  {!Object} options
   * @return {!RegExp}
   */function arrayToRegexp(path,keys,options){var parts=[];for(var i=0;i<path.length;i++){parts.push(pathToRegexp(path[i],keys,options).source);}var regexp=new RegExp("(?:"+parts.join("|")+")",flags(options));return attachKeys(regexp,keys);}/**
   * Create a path regexp from string input.
   *
   * @param  {string}  path
   * @param  {!Array}  keys
   * @param  {!Object} options
   * @return {!RegExp}
   */function stringToRegexp(path,keys,options){return tokensToRegExp(parse(path,options),keys,options);}/**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {!Array}          tokens
   * @param  {(Array|Object)=} keys
   * @param  {Object=}         options
   * @return {!RegExp}
   */function tokensToRegExp(tokens,keys,options){if(!isarray(keys)){options=/** @type {!Object} */keys||options;keys=[];}options=options||{};var _options=options,strict=_options.strict;var end=options.end!==false;var route="";// Iterate over the tokens and create our regexp string.
  for(var i=0;i<tokens.length;i++){var token=tokens[i];if(typeof token==="string"){route+=escapeString(token);}else {var prefix=escapeString(token.prefix);var capture="(?:"+token.pattern+")";keys.push(token);if(token.repeat){capture+="(?:"+prefix+capture+")*";}if(token.optional){if(!token.partial){capture="(?:"+prefix+"("+capture+"))?";}else {capture=prefix+"("+capture+")?";}}else {capture=prefix+"("+capture+")";}route+=capture;}}var delimiter=escapeString(options.delimiter||"/");var endsWithDelimiter=route.slice(-delimiter.length)===delimiter;// In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if(!strict){route=(endsWithDelimiter?route.slice(0,-delimiter.length):route)+"(?:"+delimiter+"(?=$))?";}if(end){route+="$";}else {// In non-ending mode, we need the capturing groups to match as much as
  // possible by using a positive lookahead to the end or next path segment.
  route+=strict&&endsWithDelimiter?"":"(?="+delimiter+"|$)";}return attachKeys(new RegExp("^"+route,flags(options)),keys);}/**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(string|RegExp|Array)} path
   * @param  {(Array|Object)=}       keys
   * @param  {Object=}               options
   * @return {!RegExp}
   */function pathToRegexp(path,keys,options){if(!isarray(keys)){options=/** @type {!Object} */keys||options;keys=[];}options=options||{};if(path instanceof RegExp){return regexpToRegexp(path,/** @type {!Array} */keys);}if(isarray(path)){return arrayToRegexp(/** @type {!Array} */path,/** @type {!Array} */keys,options);}return stringToRegexp(/** @type {string} */path,/** @type {!Array} */keys,options);}/* eslint-enable   */

  var cache={};var cacheLimit=10000;var cacheCount=0;var compilePath=function compilePath(path,options){var cacheKey=""+options.end+options.strict+options.sensitive;var pathCache=cache[cacheKey]||(cache[cacheKey]={});if(pathCache[path]){return pathCache[path];}var keys=[];var regexp=pathToRegexp(path,keys,options);var result={regexp:regexp,keys:keys};if(cacheCount<cacheLimit){pathCache[path]=result;cacheCount++;}return result;};var matchPath=function matchPath(pathname){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};if(typeof options==="string"||Array.isArray(options)){options={path:options};}var _options=options,_options$path=_options.path,path=_options$path===void 0?false:_options$path,_options$exact=_options.exact,exact=_options$exact===void 0?false:_options$exact,_options$strict=_options.strict,strict=_options$strict===void 0?false:_options$strict,_options$sensitive=_options.sensitive,sensitive=_options$sensitive===void 0?false:_options$sensitive;var paths=[].concat(path);return paths.reduce(function(matched,path){if(!path&&path!==""){return null;}if(matched){return matched;}var _compilePath=compilePath(path,{end:exact,strict:strict,sensitive:sensitive}),regexp=_compilePath.regexp,keys=_compilePath.keys;var match=regexp.exec(pathname);if(!match){return null;}var url=match[0],values=match.slice(1);var isExact=pathname===url;if(exact&&!isExact){return null;}return {path:path,// the path used to match
  url:path==="/"&&url===""?"/":url,// the matched portion of the URL
  isExact:isExact,// whether or not we matched exactly
  params:keys.reduce(function(memo,key,index){memo[key.name]=values[index];return memo;},{})};},null);};

  var Route=function Route(props){var children=props.children;return children?React.Children.map(children,function(child){return/*#__PURE__*/React.cloneElement(child,props);}):null;};Route.propTypes={//   key: PropTypes.string.isRequired,
  //   exact: PropTypes.bool.isRequired,
  component:PropTypes__default["default"].oneOfType([PropTypes__default["default"].func,PropTypes__default["default"].object]).isRequired};

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function _createSuper$2(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct$2();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else {result=Super.apply(this,arguments);}return _possibleConstructorReturn(this,result);};}function _isNativeReflectConstruct$2(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}var createNamedContext$1=function createNamedContext(name){var context=/*#__PURE__*/React.createContext();context.displayName=name;return context;};var RouterContext=createNamedContext$1("Router");var Router=/*#__PURE__*/function(_Component){_inherits(Router,_Component);var _super=_createSuper$2(Router);function Router(props){var _this;_classCallCheck(this,Router);_this=_super.call(this,props);_defineProperty(_assertThisInitialized(_this),"computeRootMatch",function(pathname){return {path:"/",url:"/",params:{},isExact:pathname==="/"};});var _this$props=_this.props,history=_this$props.history,staticContext=_this$props.staticContext;_this.state={location:history.location};_this._isMounted=false;_this._pendingLocation=null;if(!staticContext){_this.unlisten=history.listen(function(_ref){var location=_ref.location;_this._pendingLocation=location;});}return _possibleConstructorReturn(_this,_assertThisInitialized(_this));}_createClass(Router,[{key:"componentDidMount",value:function componentDidMount(){var _this2=this;this._isMounted=true;var _this$props2=this.props,staticContext=_this$props2.staticContext,history=_this$props2.history;if(this.unlisten){this.unlisten();}if(!staticContext){this.unlisten=history.listen(function(_ref2){var location=_ref2.location;if(_this2._isMounted){_this2.setState({location:location});}});}if(this._pendingLocation){this.setState({location:this._pendingLocation});}}},{key:"componentWillUnmount",value:function componentWillUnmount(){if(this.unlisten){this.unlisten();this._isMounted=false;this._pendingLocation=null;}}},{key:"render",value:function render(){var _this$props3=this.props,children=_this$props3.children,staticContext=_this$props3.staticContext,loading=_this$props3.loading,history=_this$props3.history,routesComponent=_this$props3.routesComponent;var location=this.state.location;/* eslint-disable   */return/*#__PURE__*/React.createElement(RouterContext.Provider,{value:{history:history,location:location,staticContext:staticContext,loading:loading,routesComponent:routesComponent},children:children?React.Children.only(children):null});/* eslint-enable */}}]);return Router;}(React.Component);Router.propTypes={history:PropTypes__default["default"].object.isRequired,staticContext:PropTypes__default["default"].object,/* eslint-disable   */routesComponent:PropTypes__default["default"].array,/* eslint-enable   */loading:function loading(props,propName,componentName){if(!props[propName]){return new Error("In component ".concat(componentName," props ").concat(propName," type is invalid -- expected a ").concat(propName," is component"));}try{/*#__PURE__*/React.createElement(props[propName]);}catch(error){return new Error("In component ".concat(componentName," props ").concat(propName," type is invalid -- expected a ").concat(propName," is component"));}}};

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }

  var isProduction = process.env.NODE_ENV === 'production';
  var prefix = 'Invariant failed';
  function invariant(condition, message) {
      if (condition) {
          return;
      }
      if (isProduction) {
          throw new Error(prefix);
      }
      var provided = typeof message === 'function' ? message() : message;
      var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
      throw new Error(value);
  }

  function _createSuper$1(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct$1();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else {result=Super.apply(this,arguments);}return _possibleConstructorReturn(this,result);};}function _isNativeReflectConstruct$1(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}var createNamedContext=function createNamedContext(name){var context=/*#__PURE__*/React.createContext();context.displayName=name;return context;};var MatchContext=createNamedContext("Router-Match");// const isValidElement = (object) => {
  //   // return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  //   return typeof object === "object" && object !== null && object.$$typeof;
  // };
  var isValidElementType=function isValidElementType(type){// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol=typeof Symbol==="function"&&Symbol["for"];var REACT_ELEMENT_TYPE=hasSymbol?Symbol["for"]("react.element"):0xeac7;var REACT_PORTAL_TYPE=hasSymbol?Symbol["for"]("react.portal"):0xeaca;var REACT_FRAGMENT_TYPE=hasSymbol?Symbol["for"]("react.fragment"):0xeacb;var REACT_STRICT_MODE_TYPE=hasSymbol?Symbol["for"]("react.strict_mode"):0xeacc;var REACT_PROFILER_TYPE=hasSymbol?Symbol["for"]("react.profiler"):0xead2;var REACT_PROVIDER_TYPE=hasSymbol?Symbol["for"]("react.provider"):0xeacd;var REACT_CONTEXT_TYPE=hasSymbol?Symbol["for"]("react.context"):0xeace;// TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?
  var REACT_ASYNC_MODE_TYPE=hasSymbol?Symbol["for"]("react.async_mode"):0xeacf;var REACT_CONCURRENT_MODE_TYPE=hasSymbol?Symbol["for"]("react.concurrent_mode"):0xeacf;var REACT_FORWARD_REF_TYPE=hasSymbol?Symbol["for"]("react.forward_ref"):0xead0;var REACT_SUSPENSE_TYPE=hasSymbol?Symbol["for"]("react.suspense"):0xead1;var REACT_SUSPENSE_LIST_TYPE=hasSymbol?Symbol["for"]("react.suspense_list"):0xead8;var REACT_MEMO_TYPE=hasSymbol?Symbol["for"]("react.memo"):0xead3;var REACT_LAZY_TYPE=hasSymbol?Symbol["for"]("react.lazy"):0xead4;var REACT_BLOCK_TYPE=hasSymbol?Symbol["for"]("react.block"):0xead9;var REACT_FUNDAMENTAL_TYPE=hasSymbol?Symbol["for"]("react.fundamental"):0xead5;var REACT_RESPONDER_TYPE=hasSymbol?Symbol["for"]("react.responder"):0xead6;var REACT_SCOPE_TYPE=hasSymbol?Symbol["for"]("react.scope"):0xead7;return(// typeof type === "string" ||
  // typeof type === "function" ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type===REACT_FRAGMENT_TYPE||type===REACT_CONCURRENT_MODE_TYPE||type===REACT_PROFILER_TYPE||type===REACT_STRICT_MODE_TYPE||type===REACT_SUSPENSE_TYPE||type===REACT_SUSPENSE_LIST_TYPE||_typeof(type)==="object"&&type!==null&&(type.$$typeof===REACT_FRAGMENT_TYPE||type.$$typeof===REACT_CONCURRENT_MODE_TYPE||type.$$typeof===REACT_PROFILER_TYPE||type.$$typeof===REACT_STRICT_MODE_TYPE||type.$$typeof===REACT_SUSPENSE_TYPE||type.$$typeof===REACT_SUSPENSE_LIST_TYPE||type.$$typeof===REACT_ELEMENT_TYPE||type.$$typeof===REACT_ASYNC_MODE_TYPE||type.$$typeof===REACT_PORTAL_TYPE||type.$$typeof===REACT_LAZY_TYPE||type.$$typeof===REACT_MEMO_TYPE||type.$$typeof===REACT_PROVIDER_TYPE||type.$$typeof===REACT_CONTEXT_TYPE||type.$$typeof===REACT_FORWARD_REF_TYPE||type.$$typeof===REACT_FUNDAMENTAL_TYPE||type.$$typeof===REACT_RESPONDER_TYPE||type.$$typeof===REACT_SCOPE_TYPE||type.$$typeof===REACT_BLOCK_TYPE));};var NullComponent=function NullComponent(){return/*#__PURE__*/React__default["default"].createElement("div",null," ");};var Switch=/*#__PURE__*/function(_Component){_inherits(Switch,_Component);var _super=_createSuper$1(Switch);function Switch(props){var _this;_classCallCheck(this,Switch);_this=_super.call(this,props);_defineProperty(_assertThisInitialized(_this),"getSyncComponent",function(component){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};if(Object.prototype.toString.call(component).slice(1,-1)==="object Object"){if(isValidElementType(component)){return component;}else if(component.__esModule){component=_this.getSyncComponent(component["default"],callback);}}else if(Object.prototype.toString.call(component).slice(1,-1)==="object Function"){component=component(_this.props);component=_this.getSyncComponent(component,callback);}else if(Object.prototype.toString.call(component).slice(1,-1)==="object Promise"){_this.resolveComponent(component,callback).then(function(AsynComponent){callback(AsynComponent);});return null;}return component;});_defineProperty(_assertThisInitialized(_this),"resolveComponent",/*#__PURE__*/function(){var _ref=_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(component){var callback,_args=arguments;return _regeneratorRuntime__default["default"].wrap(function _callee$(_context){while(1)switch(_context.prev=_context.next){case 0:callback=_args.length>1&&_args[1]!==undefined?_args[1]:function(){};if(!(Object.prototype.toString.call(component).slice(1,-1)==="object Promise")){_context.next=10;break;}_context.next=4;return component;case 4:component=_context.sent;_context.next=7;return _this.resolveComponent(component,callback);case 7:component=_context.sent;_context.next=11;break;case 10:component=_this.getSyncComponent(component,callback);case 11:return _context.abrupt("return",component);case 12:case"end":return _context.stop();}},_callee);}));return function(_x){return _ref.apply(this,arguments);};}());_defineProperty(_assertThisInitialized(_this),"getComponent",function(){var _newMatch,_newMatch2;var _this$state=_this.state,AsynComponent=_this$state.AsynComponent,locationKey=_this$state.locationKey,match=_this$state.match;var children=_this.props.children;var _this$context=_this.context,_this$context$history=_this$context.history,history=_this$context$history===void 0?{}:_this$context$history,_this$context$locatio=_this$context.location,location=_this$context$locatio===void 0?{}:_this$context$locatio,_this$context$routesC=_this$context.routesComponent,routesComponent=_this$context$routesC===void 0?[]:_this$context$routesC;var key=location.key;if(!Object.keys(_this.context).length){throw new Error(invariant(false,"You should not use <Switch/> outside a <Router>"));}if(key===locationKey){return/*#__PURE__*/React__default["default"].createElement(MatchContext.Provider,{value:{history:history,location:location,match:match}},/*#__PURE__*/React__default["default"].createElement(AsynComponent,{match:match,history:history,location:location,exact:match.isExact,routesComponent:routesComponent}));}var newMatch=null;var SyncComponent=null;React.Children.forEach(children,function(el){if(newMatch===null){var _el$props=el.props,pathProp=_el$props.path,exact=_el$props.exact,strict=_el$props.strict,sensitive=_el$props.sensitive,from=_el$props.from,component=_el$props.component,element=_el$props.element,render=_el$props.render;var path=pathProp||from;component=component||element||render;newMatch=matchPath(location.pathname,{path:path,exact:exact,strict:strict,sensitive:sensitive});if(newMatch){SyncComponent=_this.getSyncComponent(component,function(AsynComponent){_this.setState({isSync:false,AsynComponent:AsynComponent,match:newMatch,locationKey:key});});if(SyncComponent){_this.setState({isSync:true,AsynComponent:SyncComponent,match:newMatch,locationKey:key});}}}});return SyncComponent?/*#__PURE__*/React__default["default"].createElement(MatchContext.Provider,{value:{history:history,location:location,match:newMatch}},/*#__PURE__*/React__default["default"].createElement(SyncComponent,{match:newMatch,history:history,location:location,exact:(_newMatch=newMatch)===null||_newMatch===void 0?void 0:_newMatch.isExact,routesComponent:routesComponent})):/*#__PURE__*/React__default["default"].createElement(MatchContext.Provider,{value:{history:history,location:location,match:newMatch}},/*#__PURE__*/React__default["default"].createElement(AsynComponent,{match:newMatch,history:history,location:location,exact:(_newMatch2=newMatch)===null||_newMatch2===void 0?void 0:_newMatch2.isExact,routesComponent:routesComponent}));});_this.state={AsynComponent:NullComponent,locationKey:"",match:null,isSync:true};return _this;}_createClass(Switch,[{key:"componentDidMount",value:function componentDidMount(){var Loading=this.context.loading;if(Loading){this.setState({AsynComponent:Loading});}}},{key:"render",value:function render(){return this.getComponent();}}]);return Switch;}(React.Component);Switch.contextType=RouterContext;Switch.propTypes={children:PropTypes__default["default"].oneOfType([PropTypes__default["default"].arrayOf(PropTypes__default["default"].node),PropTypes__default["default"].node]).isRequired};

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else {result=Super.apply(this,arguments);}return _possibleConstructorReturn(this,result);};}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}var withRouter=function withRouter(Target){var displayName="withRouter("+(Target.displayName||Target.name)+")";var WithRouter=/*#__PURE__*/function(_Component){_inherits(WithRouter,_Component);var _super=_createSuper(WithRouter);function WithRouter(){_classCallCheck(this,WithRouter);return _super.apply(this,arguments);}_createClass(WithRouter,[{key:"render",value:function render(){var _this=this;return/*#__PURE__*/React.createElement(MatchContext.Consumer,null,function(context){!context?invariant(false,"You should not use <"+displayName+" /> outside a <Switch>"):void 0;return/*#__PURE__*/React__default["default"].createElement(Target,_extends({},context,_this.props));});}}]);return WithRouter;}(React.Component);WithRouter.displayName=displayName;WithRouter.WrappedComponent=Target;return hoistStatics__default["default"](WithRouter,Target);};

  exports.MatchContext = MatchContext;
  exports.Route = Route;
  exports.Router = Router;
  exports.Switch = Switch;
  exports.__RouterContext = RouterContext;
  exports.isValidElementType = isValidElementType;
  exports.lazy = lazy;
  exports.matchPath = matchPath;
  exports.preloadReady = preloadReady;
  exports.withRouter = withRouter;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
