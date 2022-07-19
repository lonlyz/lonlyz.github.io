import{_ as c,o as r,c as i,b as n,a,w as l,d as s,e as p,r as t}from"./app.2d179ac6.js";const D={},d=n("h1",{id:"\u5BA2\u6237\u7AEF\u914D\u7F6E\u7684\u4F7F\u7528\u65B9\u6CD5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5BA2\u6237\u7AEF\u914D\u7F6E\u7684\u4F7F\u7528\u65B9\u6CD5","aria-hidden":"true"},"#"),s(" \u5BA2\u6237\u7AEF\u914D\u7F6E\u7684\u4F7F\u7528\u65B9\u6CD5")],-1),y=s("\u4F60\u53EF\u4EE5\u76F4\u63A5\u5728\u4F60\u7684\u9879\u76EE\u4E2D\u4F7F\u7528 "),C=s("\u5BA2\u6237\u7AEF\u914D\u7F6E\u6587\u4EF6"),u=s(" \u3002\u6216\u8005\uFF0C\u5728\u4F60\u7684\u63D2\u4EF6\u6216\u8005\u4E3B\u9898\u4E2D\uFF0C\u4F7F\u7528 "),v=s("clientConfigFile"),_=s(" Hook \uFF1A"),h=p(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">path</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@vuepress/utils&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">const</span><span style="color:#D4D4D4;"> </span><span style="color:#4FC1FF;">pluginOrTheme</span><span style="color:#D4D4D4;"> = {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">clientConfigFile:</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">path</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">resolve</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">__dirname</span><span style="color:#D4D4D4;">, </span><span style="color:#CE9178;">&#39;./path/to/clientConfig.ts&#39;</span><span style="color:#D4D4D4;">),</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),m=s("\u5728\u5BA2\u6237\u7AEF\u914D\u7F6E\u6587\u4EF6\u4E2D\uFF0C"),f=n("code",null,"@vuepress/client",-1),b=s(" \u5305\u63D0\u4F9B\u4E86\u4E00\u4E2A "),E=s("defineClientConfig"),g=s(" \u51FD\u6570\u6765\u5E2E\u52A9\u4F60\u5B9A\u4E49\u5BA2\u6237\u7AEF\u914D\u7F6E\uFF1A"),A=p(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">defineClientConfig</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@vuepress/client&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">default</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">defineClientConfig</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#DCDCAA;">enhance</span><span style="color:#D4D4D4;">({ </span><span style="color:#9CDCFE;">app</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">router</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">siteData</span><span style="color:#D4D4D4;"> }){},</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#DCDCAA;">setup</span><span style="color:#D4D4D4;">(){},</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">rootComponents:</span><span style="color:#D4D4D4;"> [],</span></span>
<span class="line"><span style="color:#D4D4D4;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="enhance" tabindex="-1"><a class="header-anchor" href="#enhance" aria-hidden="true">#</a> enhance</h2><p><code>enhance</code> \u51FD\u6570\u65E2\u53EF\u4EE5\u662F\u540C\u6B65\u7684\uFF0C\u4E5F\u53EF\u4EE5\u662F\u5F02\u6B65\u7684\u3002\u5B83\u63A5\u6536\u4E00\u4E2A Context \u53C2\u6570\uFF0C\u5305\u542B\u4EE5\u4E0B\u5C5E\u6027\uFF1A</p>`,3),F=n("code",null,"app",-1),x=s(" \u662F\u7531 "),k={href:"https://staging-cn.vuejs.org/api/application.html#create-app",target:"_blank",rel:"noopener noreferrer"},S=s("createApp"),R=s(" \u521B\u5EFA\u7684 Vue \u5E94\u7528\u5B9E\u4F8B\u3002"),V=n("code",null,"router",-1),B=s(" \u662F\u7531 "),M={href:"https://router.vuejs.org/zh/api/index.html#createrouter",target:"_blank",rel:"noopener noreferrer"},P=s("createRouter"),j=s(" \u521B\u5EFA\u7684\u8DEF\u7531\u5B9E\u4F8B\u3002"),w=n("code",null,"siteData",-1),I=s(" \u662F\u4E00\u4E2A\u6839\u636E\u7528\u6237\u914D\u7F6E\u751F\u6210\u7684 Ref \u5BF9\u8C61\uFF0C\u5305\u542B "),O=s("base"),H=s(", "),L=s("lang"),N=s(", "),U=s("title"),G=s(", "),z=s("description"),T=s(", "),q=s("head"),J=s(" \u548C "),K=s("locales"),Q=s("\u3002"),W=n("p",null,[n("code",null,"enhance"),s(" \u51FD\u6570\u4F1A\u5728\u5BA2\u6237\u7AEF\u5E94\u7528\u521B\u5EFA\u540E\u88AB\u8C03\u7528\uFF0C\u4F60\u53EF\u4EE5\u5BF9 Vue \u5E94\u7528\u6DFB\u52A0\u5404\u79CD\u80FD\u529B\u3002")],-1),X=n("h3",{id:"\u6CE8\u518C-vue-\u7EC4\u4EF6",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u6CE8\u518C-vue-\u7EC4\u4EF6","aria-hidden":"true"},"#"),s(" \u6CE8\u518C Vue \u7EC4\u4EF6")],-1),Y=s("\u4F60\u53EF\u4EE5\u901A\u8FC7 "),Z={href:"https://staging-cn.vuejs.org/api/application.html#app-component",target:"_blank",rel:"noopener noreferrer"},$=s("app.component"),ss=s(" \u65B9\u6CD5\u6765\u6CE8\u518C Vue \u5168\u5C40\u7EC4\u4EF6\uFF1A"),ns=p(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">defineClientConfig</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@vuepress/client&#39;</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">MyComponent</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;./MyComponent.vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">default</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">defineClientConfig</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#DCDCAA;">enhance</span><span style="color:#D4D4D4;">({ </span><span style="color:#9CDCFE;">app</span><span style="color:#D4D4D4;"> }) {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">app</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">component</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;MyComponent&#39;</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">MyComponent</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">  },</span></span>
<span class="line"><span style="color:#D4D4D4;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4F7F\u7528\u4E0D\u652F\u6301-ssr-\u7684\u529F\u80FD" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u4E0D\u652F\u6301-ssr-\u7684\u529F\u80FD" aria-hidden="true">#</a> \u4F7F\u7528\u4E0D\u652F\u6301 SSR \u7684\u529F\u80FD</h3><p>VuePress \u4F1A\u5728\u6784\u5EFA\u8FC7\u7A0B\u4E2D\u751F\u6210\u4E00\u4E2A SSR \u5E94\u7528\uFF0C\u7528\u4EE5\u5BF9\u9875\u9762\u8FDB\u884C\u9884\u6E32\u67D3\u3002\u4E00\u822C\u800C\u8A00\uFF0C\u5982\u679C\u4E00\u6BB5\u4EE3\u7801\u5728\u5BA2\u6237\u7AEF\u5E94\u7528 Mount \u4E4B\u524D\u5C31\u4F7F\u7528\u4E86\u6D4F\u89C8\u5668\u6216 DOM API \uFF0C\u6211\u4EEC\u5C31\u8BA4\u4E3A\u5176\u5BF9 SSR \u4E0D\u53CB\u597D\uFF0C\u5373\u4E0D\u652F\u6301 SSR \u3002</p>`,3),as=s("\u6211\u4EEC\u5DF2\u7ECF\u63D0\u4F9B\u4E86\u4E00\u4E2A "),es=s("ClientOnly"),ls=s(" \u7EC4\u4EF6\u6765\u5305\u88F9\u4E0D\u652F\u6301 SSR \u7684\u5185\u5BB9\u3002"),os=s("\u5728 "),ps=n("code",null,"enhance",-1),ts=s(" \u51FD\u6570\u4E2D\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528 "),cs=n("code",null,[s("_"),n("wbr"),s("_VUEPRESS_SSR__")],-1),rs=s(" \u6807\u8BB0\u6765\u5904\u7406\u8FD9\u79CD\u60C5\u51B5\u3002"),is=p(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">defineClientConfig</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@vuepress/client&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">default</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">defineClientConfig</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#569CD6;">async</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">enhance</span><span style="color:#D4D4D4;">() {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> (!</span><span style="color:#9CDCFE;">_<wbr>_VUEPRESS_SSR__</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#569CD6;">const</span><span style="color:#D4D4D4;"> </span><span style="color:#4FC1FF;">nonSsrFriendlyModule</span><span style="color:#D4D4D4;"> = </span><span style="color:#C586C0;">await</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">import</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;non-ssr-friendly-module&#39;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#6A9955;">// ...</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"><span style="color:#D4D4D4;">  },</span></span>
<span class="line"><span style="color:#D4D4D4;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4F7F\u7528-router-\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-router-\u65B9\u6CD5" aria-hidden="true">#</a> \u4F7F\u7528 Router \u65B9\u6CD5</h3>`,2),Ds=s("\u4F60\u53EF\u4EE5\u4F7F\u7528 vue-router \u63D0\u4F9B\u7684 "),ds={href:"https://router.vuejs.org/zh/api/index.html#router-%E6%96%B9%E6%B3%95",target:"_blank",rel:"noopener noreferrer"},ys=s("Router \u65B9\u6CD5"),Cs=s(" \u3002\u4F8B\u5982\uFF0C\u6DFB\u52A0\u5BFC\u822A\u94A9\u5B50\uFF1A"),us=p(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">defineClientConfig</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@vuepress/client&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">default</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">defineClientConfig</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#DCDCAA;">enhance</span><span style="color:#D4D4D4;">({ </span><span style="color:#9CDCFE;">router</span><span style="color:#D4D4D4;"> }) {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">router</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">beforeEach</span><span style="color:#D4D4D4;">((</span><span style="color:#9CDCFE;">to</span><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">=&gt;</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#9CDCFE;">console</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">log</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;before navigation&#39;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">    })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">router</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">afterEach</span><span style="color:#D4D4D4;">((</span><span style="color:#9CDCFE;">to</span><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">=&gt;</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#9CDCFE;">console</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">log</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;after navigation&#39;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">    })</span></span>
<span class="line"><span style="color:#D4D4D4;">  },</span></span>
<span class="line"><span style="color:#D4D4D4;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u6211\u4EEC\u4E0D\u63A8\u8350\u4F7F\u7528 <code>addRoute</code> \u65B9\u6CD5\u6765\u6DFB\u52A0\u52A8\u6001\u8DEF\u7531\uFF0C\u56E0\u4E3A\u8FD9\u4E9B\u8DEF\u7531\u8BB0\u5F55 <strong>\u4E0D\u4F1A</strong> \u5728\u6784\u5EFA\u6A21\u5F0F\u4E2D\u88AB\u9884\u6E32\u67D3\u51FA\u6765\u3002</p><p>\u5F53\u7136\uFF0C\u5982\u679C\u4F60\u4E86\u89E3\u4E86\u8FD9\u79CD\u7528\u6CD5\u7684\u7F3A\u70B9\uFF0C\u4F60\u8FD8\u662F\u53EF\u4EE5\u8FD9\u6837\u4F7F\u7528\u3002</p></div><h2 id="setup" tabindex="-1"><a class="header-anchor" href="#setup" aria-hidden="true">#</a> setup</h2>`,3),vs=n("code",null,"setup",-1),_s=s(" \u51FD\u6570\u4F1A\u5728\u5BA2\u6237\u7AEF Vue \u5E94\u7528\u7684 "),hs={href:"https://staging-cn.vuejs.org/api/composition-api-setup.html",target:"_blank",rel:"noopener noreferrer"},ms=s("setup"),fs=s(" Hook \u4E2D\u88AB\u8C03\u7528\u3002"),bs=n("h3",{id:"\u4F7F\u7528\u7EC4\u5408\u5F0F-api",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u4F7F\u7528\u7EC4\u5408\u5F0F-api","aria-hidden":"true"},"#"),s(" \u4F7F\u7528\u7EC4\u5408\u5F0F API")],-1),Es=s("\u4F60\u53EF\u4EE5\u628A "),gs=n("code",null,"setup",-1),As=s(" \u51FD\u6570\u5F53\u4F5C\u6839\u7EC4\u4EF6\u7684 "),Fs={href:"https://staging-cn.vuejs.org/api/composition-api-setup.html",target:"_blank",rel:"noopener noreferrer"},xs=s("setup"),ks=s(" Hook \u4E2D\u7684\u4E00\u90E8\u5206\u3002\u56E0\u6B64\uFF0C\u6240\u6709\u7684\u7EC4\u5408\u5F0F API \u90FD\u53EF\u4EE5\u5728\u8FD9\u91CC\u4F7F\u7528\u3002"),Ss=p(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">defineClientConfig</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@vuepress/client&#39;</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">provide</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">ref</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">useRoute</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">useRouter</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;vue-router&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">default</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">defineClientConfig</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#DCDCAA;">setup</span><span style="color:#D4D4D4;">() {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#6A9955;">// \u83B7\u53D6\u5F53\u524D\u7684\u8DEF\u7531\u4F4D\u7F6E</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">const</span><span style="color:#D4D4D4;"> </span><span style="color:#4FC1FF;">route</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">useRoute</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#6A9955;">// \u6216\u8005 vue-router \u5B9E\u4F8B</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">const</span><span style="color:#D4D4D4;"> </span><span style="color:#4FC1FF;">router</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">useRouter</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#6A9955;">// \u4F9B\u7ED9\u4E00\u4E2A\u503C\uFF0C\u53EF\u4EE5\u88AB\u5E03\u5C40\u3001\u9875\u9762\u548C\u5176\u4ED6\u7EC4\u4EF6\u6CE8\u5165</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">const</span><span style="color:#D4D4D4;"> </span><span style="color:#4FC1FF;">count</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">ref</span><span style="color:#D4D4D4;">(</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#DCDCAA;">provide</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;count&#39;</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">count</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4F7F\u7528\u4E0D\u652F\u6301-ssr-\u7684\u529F\u80FD-1" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u4E0D\u652F\u6301-ssr-\u7684\u529F\u80FD-1" aria-hidden="true">#</a> \u4F7F\u7528\u4E0D\u652F\u6301 SSR \u7684\u529F\u80FD</h3>`,2),Rs=s("\u5728 "),Vs=n("code",null,"setup",-1),Bs=s(" \u51FD\u6570\u4E2D\uFF0C"),Ms=n("code",null,[s("_"),n("wbr"),s("_VUEPRESS_SSR__")],-1),Ps=s(" \u6807\u8BB0\u540C\u6837\u53EF\u7528\u3002"),js=s("\u4F7F\u7528\u4E0D\u652F\u6301 SSR \u7684\u529F\u80FD\u7684\u53E6\u4E00\u79CD\u65B9\u5F0F\u5C31\u662F\u5C06\u4ED6\u4EEC\u653E\u5728 "),ws={href:"https://staging-cn.vuejs.org/api/composition-api-lifecycle.html#onmounted",target:"_blank",rel:"noopener noreferrer"},Is=s("onMounted"),Os=s(" Hook \u4E2D\uFF1A"),Hs=p(`<div class="language-typescript ext-ts line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">defineClientConfig</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@vuepress/client&#39;</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">onMounted</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">default</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">defineClientConfig</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#DCDCAA;">setup</span><span style="color:#D4D4D4;">() {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#DCDCAA;">onMounted</span><span style="color:#D4D4D4;">(() </span><span style="color:#569CD6;">=&gt;</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#6A9955;">// \u5728 mounted \u4E4B\u540E\u4F7F\u7528 DOM API</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#9CDCFE;">document</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">querySelector</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;#app&#39;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">    })</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rootcomponents" tabindex="-1"><a class="header-anchor" href="#rootcomponents" aria-hidden="true">#</a> rootComponents</h2><p><code>rootComponents</code> \u662F\u4E00\u4E2A\u7EC4\u4EF6\u6570\u7EC4\uFF0C\u5B83\u4EEC\u5C06\u4F1A\u76F4\u63A5\u88AB\u653E\u7F6E\u5728\u5BA2\u6237\u7AEF Vue \u5E94\u7528\u7684\u6839\u8282\u70B9\u4E0B\u3002</p><p>\u8BE5\u9009\u9879\u7684\u5178\u578B\u4F7F\u7528\u65B9\u5F0F\u5C31\u662F\u653E\u7F6E\u4E00\u4E9B\u5168\u5C40\u7684 UI \u7EC4\u4EF6\uFF0C\u6BD4\u5982\u5168\u5C40\u5F39\u7A97\u7B49\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">defineClientConfig</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@vuepress/client&#39;</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">GlobalPopup</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;./components/GlobalPopup.vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">default</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">defineClientConfig</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">rootComponents:</span><span style="color:#D4D4D4;"> [</span><span style="color:#9CDCFE;">GlobalPopup</span><span style="color:#D4D4D4;">],</span></span>
<span class="line"><span style="color:#D4D4D4;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function Ls(Ns,Us){const e=t("RouterLink"),o=t("ExternalLinkIcon");return r(),i("div",null,[d,n("p",null,[y,a(e,{to:"/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6"},{default:l(()=>[C]),_:1}),u,a(e,{to:"/reference/plugin-api.html#clientconfigfile"},{default:l(()=>[v]),_:1}),_]),h,n("p",null,[m,f,b,a(e,{to:"/reference/client-api.html#defineclientconfig"},{default:l(()=>[E]),_:1}),g]),A,n("ul",null,[n("li",null,[F,x,n("a",k,[S,a(o)]),R]),n("li",null,[V,B,n("a",M,[P,a(o)]),j]),n("li",null,[w,I,a(e,{to:"/reference/config.html#base"},{default:l(()=>[O]),_:1}),H,a(e,{to:"/reference/config.html#lang"},{default:l(()=>[L]),_:1}),N,a(e,{to:"/reference/config.html#title"},{default:l(()=>[U]),_:1}),G,a(e,{to:"/reference/config.html#description"},{default:l(()=>[z]),_:1}),T,a(e,{to:"/reference/config.html#head"},{default:l(()=>[q]),_:1}),J,a(e,{to:"/reference/config.html#locales"},{default:l(()=>[K]),_:1}),Q])]),W,X,n("p",null,[Y,n("a",Z,[$,a(o)]),ss]),ns,n("p",null,[as,a(e,{to:"/reference/components.html#clientonly"},{default:l(()=>[es]),_:1}),ls]),n("p",null,[os,ps,ts,a(e,{to:"/reference/client-api.html#ssr"},{default:l(()=>[cs]),_:1}),rs]),is,n("p",null,[Ds,n("a",ds,[ys,a(o)]),Cs]),us,n("p",null,[vs,_s,n("a",hs,[ms,a(o)]),fs]),bs,n("p",null,[Es,gs,As,n("a",Fs,[xs,a(o)]),ks]),Ss,n("p",null,[Rs,Vs,Bs,a(e,{to:"/reference/client-api.html#ssr"},{default:l(()=>[Ms]),_:1}),Ps]),n("p",null,[js,n("a",ws,[Is,a(o)]),Os]),Hs])}var zs=c(D,[["render",Ls],["__file","usage-of-client-config.html.vue"]]);export{zs as default};