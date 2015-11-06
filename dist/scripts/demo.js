"use strict";function getParameterByName(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var b=new RegExp("[\\?&]"+a+"=([^&#]*)"),c=b.exec(location.search);return null===c?"":decodeURIComponent(c[1].replace(/\+/g," "))}function getTemplate(a,b){$.get("./templates/card--"+a.template+".html#card",function(c){templates[a.template]=$(c),templateStuff(a,b)})}function templateStuff(a,b){var c=templates[a.template].html(),d=Handlebars.compile(c),e=a,f=d(e);renderComponent(f,b,a)}function renderComponent(a,b,c){var d=$("<div>");d.addClass("gel-grid__item "+c.gridClasses),d.append(a),$grid.append(d);var e=document.querySelectorAll(".js-card")[b],f={card:e};try{switch(dataID){case"sport":cards[b]=new SportCards(f);break;case"news":cards[b]=new NewsCards(f);break;default:cards[b]=new Cards(f)}}catch(g){"undefined"!=typeof console&&console.error(g.stack)}}var cards=[],templates={},compiledTemplates=[],$grid=$(".js-example"),dataID=getParameterByName("product")||"core",tplID=getParameterByName("tpl")||null,allTemplates=[];"core"!==dataID&&document.getElementsByTagName("body")[0].classList.add("gel-"+dataID),$.getJSON("./data/cards--"+dataID+".json",function(a){for(var b=0;b<a.length;b++)if(tplID){if(a[b].template===tplID)return void getTemplate(a[b],b)}else getTemplate(a[b],b)});