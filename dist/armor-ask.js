// armor-ask v0.1.0 Mon Aug 06 2018  
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ArmorAsk=t():e.ArmorAsk=t()}("undefined"!=typeof self?self:this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r=a(n(1)),o=a(n(6)),u=a(n(5)),i=n(2),s=n(4);function a(e){return e&&e.__esModule?e:{default:e}}var f={ask:function(e,t){return(0,r.default)(e,t)},answer:function(e,t,n){return(0,o.default)(this,e,t,n)},shut:function(e,t){return(0,u.default)(this,e,t)}},c={has:function(e,t){void 0==e&&(e="");for(var n=t||{},r=n.ns,o=n.all?Object.keys(i.namespaces):[r],u=void 0,a=void 0,f=!1,c=0;c<o.length;c++)if((u=(0,i.getRegistry)(o[c]))&&(a=u[e])&&a.hasOwnProperty(s.SOLUTION)){f=!0;break}return f},list:function(e){for(var t=e||{},n=t.ns,r=t.all?Object.keys(i.namespaces):[void 0==n?"default":n],o={},u=void 0,a=void 0,f=0;f<r.length;f++)if(u=(0,i.getRegistry)(r[f])){var c=[];for(var l in u)(a=u[l])&&a.hasOwnProperty(s.SOLUTION)&&c.push(l);c.length&&(o[r[f]]=c)}return o},_getNamespaces:function(){return Object.assign({},i.namespaces)}};Object.assign(f.ask,c),e.exports=f},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){var n=t||{},s=n.evaluate,a=void 0===s||s,f=n.ns,c=n.wait,l=n.params;c*=1,(0,o.isNumber)(c)||(c=0);var d=(0,r.getRegistry)(f,c);if(!d)return;void 0==e&&(e="");var v=d[e];if(!v&&!c)return;v||(v=d[e]={waiting:[]});if(v.hasOwnProperty(u.SOLUTION)){var p=v,g=p[u.SOLUTION],y=p.ctx,_=p.once,m=p.answerer;return _&&(0,i.default)(m,e,{ns:f}),function(e,t){return t?Promise.resolve(e):e}(a&&(0,o.isFunction)(g)?g.call(y,l,e,f):g,c)}return c?new Promise(function(t,n){var r=void 0;c>0&&(r=setTimeout(function(){u._rejected=!0,n(e)},c));var u=function(n,u){c>0&&clearTimeout(r);var i=a&&(0,o.isFunction)(n)?n.call(u,l,e,f):n;t(i)};v.waiting.push(u)}):void 0};var r=n(2),o=n(3),u=n(4),i=function(e){return e&&e.__esModule?e:{default:e}}(n(5))},function(e,t,n){"use strict";t.__esModule=!0,t.getRegistry=function(e,t){null==e&&(e="default");var n=r[e];!n&&t&&(n=r[e]={});return n};var r=t.namespaces={default:{}}},function(e,t,n){"use strict";t.__esModule=!0,t.isFunction=function(e){return"function"==typeof e},t.isNumber=function(e){return"number"==typeof e&&!isNaN(e)&&e!==1/0}},function(e,t,n){"use strict";t.__esModule=!0;t.SOLUTION="solution"},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t,n){var r=n||{},o=r.ns,i=r.all,s=e._armorAskAnswers;if(!s||!s.length)return e;for(var a=void 0,f=[],c=0;c<s.length;c++)a=s[c],void 0!=t&&t!==a.question||(i||void 0==o?void 0!=a.ns:a.ns!==o)?f.push(a):u(a);return e._armorAskAnswers=f,e};var r=n(2),o=n(3);function u(e){var t=e.question,n=e.ns,u=e.registry;void 0==n&&(n="default");var i=u[t]||{},s=i.waiting,a=i.onShut,f=i.ctx;s&&s.length?u[t]={waiting:s}:(delete u[t],Object.keys(u).length||delete r.namespaces[n]),(0,o.isFunction)(a)&&a.call(f,t,n)}},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t,n,i){var s,a=i||{},f=a.update,c=a.ns,l=a.ctx,d=a.once,v=a.onShut;l||(l=e);void 0==t&&(t="");var p=(0,o.getRegistry)(c,!0),g=p[t],y=(g||{}).waiting;if(g&&g.hasOwnProperty(u.SOLUTION)){if(!f)return!1;(0,r.default)(g.answerer,t,{ns:c})}g=p[t]=((s={})[u.SOLUTION]=n,s.ctx=l,s.waiting=y,s.answerer=e,s.once=d,s.onShut=v,s),e._armorAskAnswers||(e._armorAskAnswers=[]);if(e._armorAskAnswers.push({question:t,ns:c,registry:p}),y&&y.length)for(var _=void 0;y.length;)if(!(_=y.shift())._rejected&&(_(n,l),d)){(0,r.default)(e,t,{ns:c});break}return!0};var r=function(e){return e&&e.__esModule?e:{default:e}}(n(5)),o=n(2),u=n(4)}])});