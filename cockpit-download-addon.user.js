// ==UserScript==
// @name         cockpit download addon
// @version      2.0.0
// @description  cockpit download helper addon.
// @author       8th713
// @homepage     https://github.com/8th713/cockpit-download-addon
// @supportURL   https://github.com/8th713/cockpit-download-addon/issues
// @license      MIT
// @namespace    http://github.com/8th713
// @match        https://www.pixiv.net/*
// @exclude      https://www.pixiv.net/novel/*
// @exclude      https://www.pixiv.net/member_illust.php?mode*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      i.pximg.net
// @connect      pixiv.net
// ==/UserScript==

(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='/',b(b.s=1)})([function(a,b){'use strict';function c(a){const b=a.lastIndexOf('.');return a.slice(b+1)}b.__esModule=!0,b.getExt=c,b.getDownloadName=function(a){let b;return b='image'===a.type?c(a.images[0].src):'zip',`${a.author} - ${a.title}.${b}`}},function(a,b,c){a.exports=c(2)},function(a,b,c){'use strict';function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}async function e(a){let b='comic'===a.type?await i.fromMultiple(a):await i.fromSingle(a);const c=document.createElement('a');c.style.cssText='display: none',c.href=URL.createObjectURL(b),c.download=g.getDownloadName(a);const d=k.append(c);c.click(),setTimeout(()=>{d(),window.URL.revokeObjectURL(c.href)},100)}var f=c(0),g=d(f),h=c(3),i=d(h),j=c(4),k=d(j);const l=document.createElement('script');l.src='https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js',k.append(l);window.addEventListener('message',(a)=>{if(a.origin===window.location.origin){const{data:b}=a;if(b.action==='cockpit-download-addon'){e(b.src)}}})},function(a,b,c){'use strict';function d(a,b){return new Promise((c,d)=>{GM_xmlhttpRequest({url:a,responseType:b,method:'GET',headers:{referer:a},onload:(a)=>c(a.response),onerror:d})})}b.__esModule=!0,b.fromSingle=function(a){const b=a.images[0];return d(b.src,'blob')},b.fromMultiple=async function(a){const b=new unsafeWindow.JSZip;let c=0;for(const e of a.images){const a=f.getExt(e.src),g=(++c+'').padStart(3,'000')+`.${a}`,h=await d(e.src,'blob');b.file(g,h)}return b.generateAsync({type:'blob'})};var e=c(0),f=function(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}(e)},function(a,b){'use strict';b.__esModule=!0,b.append=function(a){return document.body&&document.body.appendChild(a),()=>{document.body&&document.body.removeChild(a)}}}]);