(function(){function h(a,b){return[].slice.call((b||document).querySelectorAll(a))}if(window.addEventListener){var b=window.StyleFix={link:function(a){try{if(!/\bstylesheet\b/i.test(a.rel)||!a.sheet.cssRules)return}catch(c){return}var d=a.href||a.getAttribute("data-href"),f=d.replace(/[^\/]+$/,""),g=a.parentNode,e=new XMLHttpRequest;e.open("GET",d);e.onreadystatechange=function(){if(4===e.readyState){var c=e.responseText;if(c&&a.parentNode){c=b.fix(c,!0,a);f&&(c=c.replace(/url\((?:'|")?(.+?)(?:'|")?\)/gi,
function(a,c){return!/^([a-z]{3,10}:|\/|#)/i.test(c)?'url("'+f+c+'")':a}),c=c.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+f,"gi"),"$1"));var d=document.createElement("style");d.textContent=c;d.media=a.media;d.disabled=a.disabled;d.setAttribute("data-href",a.getAttribute("href"));g.insertBefore(d,a);g.removeChild(a)}}};e.send(null);a.setAttribute("data-inprogress","")},styleElement:function(a){var c=a.disabled;a.textContent=b.fix(a.textContent,!0,a);a.disabled=c},styleAttribute:function(a){var c=
a.getAttribute("style"),c=b.fix(c,!1,a);a.setAttribute("style",c)},process:function(){h('link[rel~="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);h("style").forEach(StyleFix.styleElement);h("[style]").forEach(StyleFix.styleAttribute)},register:function(a,c){(b.fixers=b.fixers||[]).splice(void 0===c?b.fixers.length:c,0,a)},fix:function(a,c){for(var d=0;d<b.fixers.length;d++)a=b.fixers[d](a,c)||a;return a},camelCase:function(a){return a.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()}).replace("-",
"")},deCamelCase:function(a){return a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}};(function(){setTimeout(function(){h('link[rel~="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()}})();
(function(h){if(window.StyleFix&&window.getComputedStyle){var b=window.PrefixFree={prefixCSS:function(a,c){function d(c,d,f,g){c=b[c];c.length&&(c=RegExp(d+"("+c.join("|")+")"+f,"gi"),a=a.replace(c,g))}var f=b.prefix;d("functions","(\\s|:|,)","\\s*\\(","$1"+f+"$2(");d("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+f+"$2$3");d("properties","(^|\\{|\\s|;)","\\s*:","$1"+f+"$2:");if(b.properties.length){var g=RegExp("\\b("+b.properties.join("|")+")(?!:)","gi");d("valueProperties","\\b",":(.+?);",function(a){return a.replace(g,
f+"$1")})}c&&(d("selectors","","\\b",b.prefixSelector),d("atrules","@","\\b","@"+f+"$1"));return a=a.replace(RegExp("-"+f,"g"),"-")},prefixSelector:function(a){return a.replace(/^:{1,2}/,function(a){return a+b.prefix})},prefixProperty:function(a,c){var d=b.prefix+a;return c?StyleFix.camelCase(d):d}};(function(){var a={},c=[],d=getComputedStyle(document.documentElement,null),f=document.createElement("div").style,g=function(b){if("-"===b.charAt(0)){c.push(b);var b=b.split("-"),d=b[1];for(a[d]=++a[d]||
1;3<b.length;)b.pop(),d=b.join("-"),StyleFix.camelCase(d)in f&&-1===c.indexOf(d)&&c.push(d)}};if(0<d.length)for(var e=0;e<d.length;e++)g(d[e]);else for(var i in d)g(StyleFix.deCamelCase(i));var e=0,j,h;for(h in a)d=a[h],e<d&&(j=h,e=d);b.prefix="-"+j+"-";b.Prefix=StyleFix.camelCase(b.prefix);b.properties=[];for(e=0;e<c.length;e++)i=c[e],0===i.indexOf(b.prefix)&&(j=i.slice(b.prefix.length),StyleFix.camelCase(j)in f||b.properties.push(j));"Ms"==b.Prefix&&!("transform"in f)&&!("MsTransform"in f)&&"msTransform"in
f&&b.properties.push("transform","transform-origin");b.properties.sort()})();(function(){function a(a,b){f[b]="";f[b]=a;return!!f[b]}var c={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"}};c["repeating-linear-gradient"]=c["repeating-radial-gradient"]=c["radial-gradient"]=c["linear-gradient"];var d={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display"};
b.functions=[];b.keywords=[];var f=document.createElement("div").style,g;for(g in c){var e=c[g],i=e.property,e=g+"("+e.params+")";!a(e,i)&&a(b.prefix+e,i)&&b.functions.push(g)}for(var h in d)i=d[h],!a(h,i)&&a(b.prefix+h,i)&&b.keywords.push(h)})();(function(){function a(a){f.textContent=a+"{}";return!!f.sheet.cssRules.length}var c={":read-only":null,":read-write":null,":any-link":null,"::selection":null},d={keyframes:"name",viewport:null,document:'regexp(".")'};b.selectors=[];b.atrules=[];var f=h.appendChild(document.createElement("style")),
g;for(g in c){var e=g+(c[g]?"("+c[g]+")":"");!a(e)&&a(b.prefixSelector(e))&&b.selectors.push(g)}for(var i in d)e=i+" "+(d[i]||""),!a("@"+e)&&a("@"+b.prefix+e)&&b.atrules.push(i);h.removeChild(f)})();b.valueProperties=["transition","transition-property"];h.className+=" "+b.prefix;StyleFix.register(b.prefixCSS)}})(document.documentElement);
