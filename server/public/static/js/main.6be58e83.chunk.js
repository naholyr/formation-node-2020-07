(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{13:function(e,n,t){e.exports=t(20)},18:function(e,n,t){},19:function(e,n,t){},20:function(e,n,t){"use strict";t.r(n);var a={};t.r(a),t.d(a,"logIn",(function(){return A})),t.d(a,"logOut",(function(){return C})),t.d(a,"setPlayers",(function(){return I})),t.d(a,"setGrid",(function(){return W})),t.d(a,"showWinner",(function(){return G})),t.d(a,"hideWinner",(function(){return _}));var r=t(0),o=t.n(r),c=t(7),l=t.n(c),i=(t(18),t(11)),u=(t(19),t(2)),s=t(12),m=new Set(["\u2718","\u2714","\u25cf","\u2764","\u25b6","\u2729","\u273f","\u2739","\u272f","\u2601","\u2600","\u2605","\u2606","\u263a","\u25b2","\u265f","\u265e","\u265d","\u265c","\u265b","\u265a","\u2658","\u2657","\u2656","\u2655","\u2654","\u261c","\u262f","\u262e","\u2620","\u25c0"]),d=new Map,f=function(e){var n=d.get(e);if(n)return n;if(0===m.size)throw new Error("No symbol available");var t=Object(s.a)(m)[Math.floor(Math.random()*m.size)];return m.delete(t),d.set(e,t),t},p={auth:{username:null,token:null},players:[],grid:[],winner:null},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,n=arguments.length>1?arguments[1]:void 0;switch(console.log("reducert",n),n.type){case"AUTH":return Object(u.a)(Object(u.a)({},e),{},{auth:n.payload});case"SET_PLAYERS":return Object(u.a)(Object(u.a)({},e),{},{players:n.payload.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{symbol:e.symbol||f(e.username)})}))});case"SET_GRID":return Object(u.a)(Object(u.a)({},e),{},{grid:n.payload});case"SET_WINNER":return Object(u.a)(Object(u.a)({},e),{},{winner:n.payload.username});default:return e}},h=t(8),b=t(9),w=t(1),v=t(10),E=Object(v.a)("handlers"),g=new(function(){function e(){Object(h.a)(this,e),Object.defineProperty(this,E,{writable:!0,value:{}})}return Object(b.a)(e,[{key:"on",value:function(e,n){var t=this;return(Object(w.a)(this,E)[E][e]=Object(w.a)(this,E)[E][e]||[]).push(n),function(){return t.off(e,n)}}},{key:"off",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;console.log("off"),n?Object(w.a)(this,E)[E][e]&&(Object(w.a)(this,E)[E][e]=Object(w.a)(this,E)[E][e].filter((function(e){return e!==n}))):delete Object(w.a)(this,E)[E][e]}},{key:"once",value:function(e,n){var t=this.on(e,(function(){n.apply(void 0,arguments),t()}))}},{key:"emit",value:function(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),a=1;a<n;a++)t[a-1]=arguments[a];return console.log(Object(w.a)(this,E)[E]),!(!Object(w.a)(this,E)[E][e]||!Object(w.a)(this,E)[E][e].length)&&(Object(w.a)(this,E)[E][e].forEach((function(e){return e.apply(void 0,t)})),!0)}}]),e}()),O=t(5),j=t.n(O),k=function(e){var n=e.players;return o.a.createElement("ul",{className:"Players"},n.map((function(e){return o.a.createElement("li",{key:e.username},o.a.createElement("strong",null,e.username),o.a.createElement("em",null,e.score),o.a.createElement("code",null,e.symbol))})))},S=function(e){var n=e.grid,t=Math.sqrt(n.length),a=Array(t).fill().map((function(e,a){return n.slice(a*t,(a+1)*t)})),c=Object(r.useCallback)((function(e,a){return function(r){r.preventDefault(),!n[e*t+a]&&window.onClickCell&&window.onClickCell(e,a)}}),[n,t]);return o.a.createElement("div",{className:"Grid"},a.map((function(e,n){return o.a.createElement("div",{key:n,className:"GridRow"},e.map((function(e,t){return o.a.createElement("span",{key:t,className:j()("GridCell",{empty:!e}),onClick:c(n,t)},e)})))})))},N=function(e){var n=e.grid,t=e.players;return o.a.createElement("div",{className:"Game"},o.a.createElement(k,{players:t}),o.a.createElement(S,{grid:n}))},T=function(){var e=Object(r.useCallback)((function(e){e.preventDefault(),window.onSubmitLogin&&window.onSubmitLogin(e.target.elements.username.value,e.target.elements.password.value)}),[]);return o.a.createElement("form",{className:"Login",onSubmit:e},o.a.createElement("input",{type:"text",placeholder:"username",name:"username"}),o.a.createElement("input",{type:"password",placeholder:"password",name:"password"}),o.a.createElement("button",null,"Log In"))},R=function(){var e=Object(r.useReducer)(y,p),n=Object(i.a)(e,2),t=n[0],a=n[1];Object(r.useEffect)((function(){return g.on("action",a)}),[a]);var c=t.auth,l=t.grid,u=t.players,s=t.winner;return o.a.createElement("div",{className:"App"},o.a.createElement("p",{className:j()("Winner",{visible:!!s})},s," wins!"),c.token?o.a.createElement(N,{grid:l,players:u}):o.a.createElement(T,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var A=function(e,n){return{type:"AUTH",payload:{username:e,token:n}}},C=function(){return{type:"AUTH",payload:{username:null,token:null}}},I=function(e){return{type:"SET_PLAYERS",payload:e}},W=function(e){return{type:"SET_GRID",payload:e}},G=function(e){return{type:"SET_WINNER",payload:{username:e}}},_=function(){return{type:"SET_WINNER",payload:{}}};window.actions=a,window.dispatch=function(e){return g.emit("action",e)},window.onStart&&window.onStart(),l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.6be58e83.chunk.js.map