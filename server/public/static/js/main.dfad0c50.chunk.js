(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{13:function(e,n,t){e.exports=t(20)},18:function(e,n,t){},19:function(e,n,t){},20:function(e,n,t){"use strict";t.r(n);var r={};t.r(r),t.d(r,"logIn",(function(){return T})),t.d(r,"logOut",(function(){return C})),t.d(r,"setPlayers",(function(){return _})),t.d(r,"setGrid",(function(){return A})),t.d(r,"showWinner",(function(){return I})),t.d(r,"hideWinner",(function(){return L})),t.d(r,"setCurrentPlayer",(function(){return W}));var a=t(0),l=t.n(a),o=t(7),c=t.n(o),u=(t(18),t(11)),i=(t(19),t(1)),s=t(12),m=new Set(["\u2718","\u2714","\u25cf","\u2764","\u25b6","\u2729","\u273f","\u2739","\u272f","\u2601","\u2600","\u2605","\u2606","\u263a","\u25b2","\u265f","\u265e","\u265d","\u265c","\u265b","\u265a","\u2658","\u2657","\u2656","\u2655","\u2654","\u261c","\u262f","\u262e","\u2620","\u25c0"]),d=new Map,y=function(e){var n=d.get(e);if(n)return n;if(0===m.size)throw new Error("No symbol available");var t=Object(s.a)(m)[Math.floor(Math.random()*m.size)];return m.delete(t),d.set(e,t),t},f={auth:{username:null,token:null},players:[],grid:[],winner:null,currentPlayer:null},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,n=arguments.length>1?arguments[1]:void 0;switch(console.log("reducer",n),n.type){case"AUTH":return Object(i.a)(Object(i.a)({},e),{},{auth:n.payload});case"SET_PLAYERS":return Object(i.a)(Object(i.a)({},e),{},{players:n.payload.players.map((function(e){return Object(i.a)(Object(i.a)({},e),{},{symbol:e.symbol||y(e.username)})})),currentPlayer:e.currentPlayer||n.payload.currentPlayer||n.payload.players[0].username});case"SET_GRID":return Object(i.a)(Object(i.a)({},e),{},{grid:n.payload});case"SET_WINNER":return Object(i.a)(Object(i.a)({},e),{},{winner:n.payload.username});case"SET_CURRENT_PLAYER":return Object(i.a)(Object(i.a)({},e),{},{currentPlayer:n.payload.username});default:return e}},b=t(8),h=t(9),E=t(2),w=t(10),v=Object(w.a)("handlers"),O=new(function(){function e(){Object(b.a)(this,e),Object.defineProperty(this,v,{writable:!0,value:{}})}return Object(h.a)(e,[{key:"on",value:function(e,n){var t=this;return(Object(E.a)(this,v)[v][e]=Object(E.a)(this,v)[v][e]||[]).push(n),function(){return t.off(e,n)}}},{key:"off",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;console.log("off"),n?Object(E.a)(this,v)[v][e]&&(Object(E.a)(this,v)[v][e]=Object(E.a)(this,v)[v][e].filter((function(e){return e!==n}))):delete Object(E.a)(this,v)[v][e]}},{key:"once",value:function(e,n){var t=this.on(e,(function(){n.apply(void 0,arguments),t()}))}},{key:"emit",value:function(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];return console.log(Object(E.a)(this,v)[v]),!(!Object(E.a)(this,v)[v][e]||!Object(E.a)(this,v)[v][e].length)&&(Object(E.a)(this,v)[v][e].forEach((function(e){return e.apply(void 0,t)})),!0)}}]),e}()),g=t(5),j=t.n(g),k=function(e){var n=e.players,t=e.currentPlayer,r=e.myself;return l.a.createElement("ul",{className:"Players"},n.map((function(e){return l.a.createElement("li",{key:e.username,className:j()("Player",{current:t===e.username,myself:r===e.username})},l.a.createElement("strong",null,e.username),l.a.createElement("em",null,e.score),l.a.createElement("code",null,e.symbol))})))},P=function(e){var n=e.grid,t=Math.sqrt(n.length),r=Array(t).fill().map((function(e,r){return n.slice(r*t,(r+1)*t)})),o=Object(a.useCallback)((function(e,r){return function(a){a.preventDefault(),!n[e*t+r]&&window.onClickCell&&window.onClickCell(e,r)}}),[n,t]);return l.a.createElement("div",{className:"Grid"},r.map((function(e,n){return l.a.createElement("div",{key:n,className:"GridRow"},e.map((function(e,t){return l.a.createElement("span",{key:t,className:j()("GridCell",{empty:!e}),onClick:o(n,t)},e)})))})))},N=function(e){var n=e.grid,t=e.players,r=e.currentPlayer,a=e.myself;return l.a.createElement("div",{className:"Game"},l.a.createElement(k,{players:t,currentPlayer:r,myself:a}),l.a.createElement(P,{grid:n}))},S=function(){var e=Object(a.useCallback)((function(e){e.preventDefault(),window.onSubmitLogin&&window.onSubmitLogin(e.target.elements.username.value,e.target.elements.password.value)}),[]);return l.a.createElement("form",{className:"Login",onSubmit:e},l.a.createElement("input",{type:"text",placeholder:"username",name:"username"}),l.a.createElement("input",{type:"password",placeholder:"password",name:"password"}),l.a.createElement("button",null,"Log In"))},R=function(){var e=Object(a.useReducer)(p,f),n=Object(u.a)(e,2),t=n[0],r=n[1];console.log("state",t),Object(a.useEffect)((function(){return O.on("action",r)}),[r]);var o=t.auth,c=t.grid,i=t.players,s=t.winner,m=t.currentPlayer;return l.a.createElement("div",{className:"App"},l.a.createElement("p",{className:j()("Winner",{visible:!!s})},s," wins!"),o.token?l.a.createElement(N,{grid:c,players:i,currentPlayer:m,myself:o.username}):l.a.createElement(S,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var T=function(e,n){return{type:"AUTH",payload:{username:e,token:n}}},C=function(){return{type:"AUTH",payload:{username:null,token:null}}},_=function(e,n){return{type:"SET_PLAYERS",payload:{players:e,currentPlayer:n}}},A=function(e){return{type:"SET_GRID",payload:e}},I=function(e){return{type:"SET_WINNER",payload:{username:e}}},L=function(){return{type:"SET_WINNER",payload:{}}},W=function(e){return{type:"SET_CURRENT_PLAYER",payload:{username:e}}};window.actions=r,window.dispatch=function(e){return O.emit("action",e)},window.onStart&&window.onStart(),c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.dfad0c50.chunk.js.map