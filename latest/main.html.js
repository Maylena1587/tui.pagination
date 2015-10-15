ne.util.defineNamespace("fedoc.content", {});
fedoc.content["main.html"] = "<div id=\"main\" class=\"main\">\n\n\n\n    \n\n\n    <h3> </h3>\n\n\n\n\n\n\n\n\n\n\n    \n\n\n\n\n    <section class=\"main-content\">\n        <article><div class=\"readme\"><h1>Pagination</h1><p>Pagination component<br>\nMake page list and provide indicator of pages.</p>\n<h2>Feature</h2><ul>\n<li>Move first page, last page</li>\n<li>Move previous page, next page </li>\n<li>Move specific page</li>\n<li>Supprt to custom event before or after move page</li>\n</ul>\n<h2>Documentation</h2><ul>\n<li><strong>API</strong> : https://nhnent.github.io/fe.component-pagination/latest</li>\n<li><strong>Tutorial</strong> : https://github.com/nhnent/fe.component-pagination/wiki/Pagination-tutorial</li>\n<li><strong>Sample</strong> - https://nhnent.github.io/fe.component-pagination/latest/tutorial-sample1.html</li>\n</ul>\n<h2>Sample Image</h2><p><img src=\"https://cloud.githubusercontent.com/assets/11814228/8349426/9449564a-1b57-11e5-96fa-0a067b8e718c.png\" alt=\"paging\"></p>\n<h2>Dependency</h2><ul>\n<li>jquery: ~1.8.3</li>\n<li>ne-code-snippet: ~1.0.2</li>\n</ul>\n<h2>Test environment</h2><ul>\n<li>PC<ul>\n<li>IE7~11</li>\n<li>Chrome</li>\n<li>Firefox</li>\n</ul>\n</li>\n</ul>\n<h2>Download/Install</h2><ul>\n<li>Bower:<ul>\n<li>latest : <code>bower install ne-component-pagination#master</code></li>\n<li>each version : <code>bower install ne-component-pagination[#tag]</code></li>\n</ul>\n</li>\n<li>Download: https://github.com/nhnent/fe.component-pagination</li>\n</ul>\n<h2>History</h2><table>\n<thead>\n<tr>\n<th>Version</th>\n<th>Description</th>\n<th>Date</th>\n<th>Developer</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1.0.2</td>\n<td>item count 0 case, broweriy+gulp</td>\n<td>2015.05</td>\n<td>NHN Entertainment. FE dev team<a href=\"&#x6d;&#97;&#105;&#x6c;&#x74;&#111;&#58;&#x64;&#108;&#x5f;&#x6a;&#x61;&#118;&#97;&#115;&#99;&#114;&#x69;&#x70;&#x74;&#64;&#x6e;&#104;&#110;&#x65;&#x6e;&#x74;&#x2e;&#x63;&#x6f;&#109;\">&#x64;&#108;&#x5f;&#x6a;&#x61;&#118;&#97;&#115;&#99;&#114;&#x69;&#x70;&#x74;&#64;&#x6e;&#104;&#110;&#x65;&#x6e;&#x74;&#x2e;&#x63;&#x6f;&#109;</a></td>\n</tr>\n<tr>\n<td>1.0.1a</td>\n<td>defineNamespace apply</td>\n<td>2015.05</td>\n<td>NHN Entertainment. FE dev team Jein Yi <a href=\"&#x6d;&#x61;&#105;&#x6c;&#116;&#x6f;&#58;&#106;&#101;&#105;&#x6e;&#x2e;&#121;&#x69;&#64;&#x6e;&#104;&#x6e;&#101;&#110;&#x74;&#x2e;&#x63;&#x6f;&#x6d;\">&#106;&#101;&#105;&#x6e;&#x2e;&#121;&#x69;&#64;&#x6e;&#104;&#x6e;&#101;&#110;&#x74;&#x2e;&#x63;&#x6f;&#x6d;</a></td>\n</tr>\n<tr>\n<td>1.0.1</td>\n<td>Bug fix(Align center bug)</td>\n<td>2015.04</td>\n<td>NHN Entertainment. FE dev team Jein Yi <a href=\"&#109;&#x61;&#105;&#108;&#x74;&#111;&#58;&#106;&#x65;&#x69;&#x6e;&#x2e;&#x79;&#105;&#x40;&#x6e;&#x68;&#x6e;&#101;&#x6e;&#x74;&#46;&#x63;&#111;&#109;\">&#106;&#x65;&#x69;&#x6e;&#x2e;&#x79;&#105;&#x40;&#x6e;&#x68;&#x6e;&#101;&#x6e;&#x74;&#46;&#x63;&#111;&#109;</a></td>\n</tr>\n<tr>\n<td><a href=\"https://github.nhnent.com/pages/fe/component-pagination/1.0.0\">1.0.0</a></td>\n<td>Release</td>\n<td>2015.03</td>\n<td>NHN Entertainment. FE dev team Jein Yi <a href=\"&#109;&#x61;&#x69;&#108;&#116;&#111;&#58;&#106;&#101;&#x69;&#x6e;&#x2e;&#121;&#105;&#64;&#110;&#x68;&#110;&#x65;&#110;&#x74;&#46;&#99;&#111;&#x6d;\">&#106;&#101;&#x69;&#x6e;&#x2e;&#121;&#105;&#64;&#110;&#x68;&#110;&#x65;&#110;&#x74;&#46;&#99;&#111;&#x6d;</a></td>\n</tr>\n<tr>\n<td>0.1.0</td>\n<td>Develop</td>\n<td>2014.11</td>\n<td>NHN Entertainment. FE dev team Jein Yi <a href=\"&#x6d;&#x61;&#105;&#108;&#x74;&#111;&#x3a;&#x6a;&#101;&#x69;&#x6e;&#x2e;&#121;&#x69;&#64;&#x6e;&#x68;&#x6e;&#x65;&#x6e;&#x74;&#x2e;&#99;&#x6f;&#109;\">&#x6a;&#101;&#x69;&#x6e;&#x2e;&#121;&#x69;&#64;&#x6e;&#x68;&#x6e;&#x65;&#x6e;&#x74;&#x2e;&#99;&#x6f;&#109;</a></td>\n</tr>\n</tbody>\n</table>\n<h2>LICENSE</h2><p><a href=\"LICENSE\">MIT LICENSE</a></p></div></article>\n    </section>\n\n\n\n\n\n\n\n\n\n<section>\n\n<header>\n    \n        <h2>\n        \n        pagination.js\n        \n        \n        </h2>\n        \n    \n</header>\n\n<article>\n    \n    <div class=\"container-overview\">\n    \n        \n            <div class=\"description\"><p>Core of pagination component, create pagination view and attach events.\n(from pug.Pagination)</p></div>\n        \n\n        \n\n\n<dl class=\"details main-detail\">\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n    <dt class=\"tag-author\">Author:</dt>\n    <dd class=\"tag-author\">\n        <ul>\n            <li>NHN entertainment FE dev team(dl_javascript@nhnent.com)</li>\n        </ul>\n    </dd>\n    \n\n    \n\n    \n\n    \n\n    \n    <dt class=\"tag-source\">Source:</dt>\n        <dd class=\"tag-source\"><ul class=\"dummy\"><li>\n            file, line 1\n        </li></ul></dd>\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n        \n    \n    </div>\n    \n\n    \n\n    \n\n    \n\n     \n\n    \n\n    \n\n    \n\n    \n\n    \n</article>\n\n</section>\n\n\n\n\n\n\n\n<section>\n\n<header>\n    \n        <h2>\n        \n        view.js\n        \n        \n        </h2>\n        \n    \n</header>\n\n<article>\n    \n    <div class=\"container-overview\">\n    \n        \n            <div class=\"description\"><p>Pagination view manage all of draw elements\n(from pug.Pagination)</p></div>\n        \n\n        \n\n\n<dl class=\"details main-detail\">\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n    <dt class=\"tag-author\">Author:</dt>\n    <dd class=\"tag-author\">\n        <ul>\n            <li>NHN entertainment FE dev team Jein Yi(jein.yi@nhnent.com)</li>\n        </ul>\n    </dd>\n    \n\n    \n\n    \n\n    \n\n    \n    <dt class=\"tag-source\">Source:</dt>\n        <dd class=\"tag-source\"><ul class=\"dummy\"><li>\n            file, line 1\n        </li></ul></dd>\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n        \n    \n    </div>\n    \n\n    \n\n    \n\n    \n\n     \n\n    \n\n    \n\n    \n\n    \n\n    \n</article>\n\n</section>\n\n\n\n</div>"