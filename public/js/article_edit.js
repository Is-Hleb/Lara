/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/article_edit.js":
/*!**************************************!*\
  !*** ./resources/js/article_edit.js ***!
  \**************************************/
/***/ (() => {

var block = document.getElementById("editBlock");
var article = document.getElementById("article");
var articleHTMLContent = "";
var cur_el = 0;
var cur_page = [];
var out_page = [];
var article_data = {};
var make_edit_url = "";

function add_to_article_button() {
  return "<button class=\"btn btn-success mt-2\" type=\"button\" id=\"addButton\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>";
}

function textarea() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return "<textarea class=\"form-control\" id=\"textarea\" rows=\"10\">".concat(content, "</textarea>");
}

function delete_button(id) {
  return "<button class=\"btn btn-warning mt-0\" type=\"button\" onclick=\"delete_el(".concat(id, ")\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>");
}

function edit_button(id) {
  return "<button class=\"btn btn-primary mt-0\" type=\"button\" onclick=\"edit_el(".concat(id, ")\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>");
}

function save_button() {
  return "<button class=\"btn btn-success mt-0\" type=\"button\" id=\"save_el\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>";
}

function text_input(placeholder) {
  return "<input type=\"text\" class=\"form-control\" id=\"text_input\" placeholder=\"".concat(placeholder, "\">");
}

function stringToHtml(str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
}

function getElValue(id) {
  var _document$getElementB;

  if (document.getElementById(id.toString())) return (_document$getElementB = document.getElementById(id.toString()).value) !== null && _document$getElementB !== void 0 ? _document$getElementB : document.getElementById(id.toString()).textContent;
  return "";
}

function show(text) {
  block.classList.remove("d-none");
  block.innerHTML += text;
}

function render() {
  article.innerHTML = "";
  articleHTMLContent = "";

  for (var i = 0; i < cur_page.length; i++) {
    if (!out_page[i]) continue;
    article.innerHTML += cur_page[i];
    articleHTMLContent += out_page[i];
  }
}

function clean() {
  block.innerHTML = "";
  block.classList.add("d-none");
}

function add_one_tag_to_article(tag, props) {
  out_page[cur_el] = "<".concat(tag, " ").concat(props, " id=\"").concat(cur_el, "\"/>");
  cur_page[cur_el] = "<".concat(tag, " ").concat(props, " id=\"").concat(cur_el, "\"/>") + delete_button(cur_el);
  article.innerHTML += cur_page[cur_el];
  cur_el++;
  clean();
  saveChanges();
}

function add_to_article(input_id, tag, props) {
  var addButton = document.getElementById("addButton");
  addButton.addEventListener("click", function (e) {
    var text = getElValue(input_id);
    out_page[cur_el] = "<".concat(tag, " ").concat(props, " id=\"").concat(cur_el, "\">").concat(text, "</").concat(tag, ">");
    cur_page[cur_el] = "<".concat(tag, " ").concat(props, " id=\"").concat(cur_el, "\">").concat(text, "</").concat(tag, ">") + delete_button(cur_el) + edit_button(cur_el);
    article.innerHTML += cur_page[cur_el];
    cur_el++;
    console.log(out_page);
    clean();
    saveChanges();
  });
}

window.delete_el = function (id) {
  cur_page[id] = "";
  out_page[id] = "";
  render();
  saveChanges();
};

window.edit_el = function (id) {
  clean();
  show(textarea(getElValue(id)));
  show(save_button());
  var saveButton = document.getElementById("save_el");
  saveButton.addEventListener("click", function () {
    var content = getElValue("textarea");
    var new_el = stringToHtml(out_page[id]);
    new_el.textContent = content;
    out_page[id] = new_el.outerHTML;
    cur_page[id] = new_el.outerHTML + delete_button(id) + edit_button(id);
    saveChanges();
    render();
    clean();
  });
};

function addTag(tag, props) {
  clean();
  add_to_article("textarea", tag, props);
  saveChanges();
}

function addTextareaTag(tag) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  clean();
  show(textarea());
  show(add_to_article_button());
  add_to_article("textarea", tag, props);
}

function addTextInputTag(tag) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  clean();
  show(text_input("Заголовок"));
  show(add_to_article_button());
  add_to_article("text_input", tag, props);
}

function preferData() {
  article_data.content = "";
  article_data.prodution = false;
  article_data._token = document.getElementsByName("_token")[0].value;
  article_data.content = JSON.stringify(out_page);
}

function saveChanges() {
  preferData();
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': article_data._token
    }
  });
  $.ajax({
    type: "POST",
    url: make_edit_url,
    data: article_data,
    dataType: 'json',
    success: function success(data) {
      console.log(data);
    },
    error: function error(data) {// console.log(data);
    }
  });
}

window.onload = function () {
  console.log(1);
  var data = document.querySelector('meta[name="article_content"]').content;
  make_edit_url = document.querySelector('meta[name="make_edit_url"]').content;
  article_data.id = document.querySelector('meta[name="article_id"]').content;

  if (data !== "") {
    out_page = JSON.parse(data);
    console.log(data);
    cur_el = out_page.length + 1;
    cur_page = [];

    for (var i = 0; i < out_page.length; i++) {
      var cur = out_page[i];

      if (cur) {
        cur_page[i] = cur + delete_button(i) + edit_button(i);
      }
    }

    render();
  }
};

window.save_article = function () {
  saveChanges();
};

window.addTitle = function (tag) {
  addTextInputTag(tag, "class=\"text-center border-bottom\"");
};

window.addParagraph = function () {
  addTextareaTag('p');
};

window.addHr = function () {
  add_one_tag_to_article('hr', "");
};

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/article_edit": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			__webpack_require__.O();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/article_edit.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/sass/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;