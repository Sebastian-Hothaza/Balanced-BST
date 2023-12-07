/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/driver.js":
/*!***********************!*\
  !*** ./src/driver.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree */ \"./src/tree.js\");\n\n\nfunction generateArray(size, min, max) {\n    return Array.from({length: size}, () => Math.floor((Math.random() * (max - min) + min)));;\n}\n\nconst myTree = (0,_tree__WEBPACK_IMPORTED_MODULE_0__.treeFactory)(generateArray(10, 0, 100));\n(0,_tree__WEBPACK_IMPORTED_MODULE_0__.prettyPrint)(myTree.root);\nmyTree.isBalanced()? console.log(\"Tree is balanced!\") : console.log(\"Tree is NOT balanced!\") \nconsole.log(\"level order traversal: \", myTree.levelOrder());\nconsole.log(\"preorder traversal: \", myTree.preOrder());\nconsole.log(\"postorder order traversal: \", myTree.postOrder());\nconsole.log(\"inorder order traversal: \", myTree.inOrder());\n\n// Adding some random numbers to the tree\nfor (let i=0; i<10; i++){\n    myTree.insert(100+Math.floor((Math.random()*100)));\n}\nconsole.log(\"Inserted 10 additional nodes to tree.\")\nmyTree.isBalanced()? console.log(\"Tree is balanced!\") : console.log(\"Tree is NOT balanced!\") \nmyTree.rebalance();\nconsole.log(\"Calling rebalance...\")\nmyTree.isBalanced()? console.log(\"Tree is balanced!\") : console.log(\"Tree is NOT balanced!\")\nconsole.log(\"level order traversal: \", myTree.levelOrder());\nconsole.log(\"preorder traversal: \", myTree.preOrder());\nconsole.log(\"postorder order traversal: \", myTree.postOrder());\nconsole.log(\"inorder order traversal: \", myTree.inOrder());\n\n//# sourceURL=webpack://balanced-bst/./src/driver.js?");

/***/ }),

/***/ "./src/tree.js":
/*!*********************!*\
  !*** ./src/tree.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prettyPrint: () => (/* binding */ prettyPrint),\n/* harmony export */   treeFactory: () => (/* binding */ treeFactory)\n/* harmony export */ });\n\n\nconst nodeFactory = (data, left, right) => {\n    return{\n        get data(){return data;}, set data(newData){data=newData},\n        get left(){return left;}, set left(newLeft){left=newLeft},\n        get right(){return right;}, set right(newRight){right=newRight}\n    };\n};\n\n\nconst treeFactory = (arr, root) => {\n    root = buildTree([...new Set(arr)].sort((a,b) => a-b));\n\n    // Takes an array of data and turns it into a balanced BST. Returns level 0 root node.\n    // Requires arr to be sorted and with duplicates removed\n    function buildTree(arr){\n        if (arr.length == 0) return null;\n        const mid = parseInt((arr.length-1)/2);\n        const root = nodeFactory(arr[mid], buildTree(arr.slice(0,mid)), buildTree(arr.slice(mid+1, arr.length)));\n        return root;\n    }\n\n    // Note: insert does not guarantee tree balance is preserved\n    function insert(value, cur = this.root){\n        if (cur == null){ // reached beyond leaf node in the \"correct null\", thus we insert\n            cur = nodeFactory(value,null,null);\n            return cur;\n        }\n    \n        if (value == cur.data) return cur; // Duplicate insertion, thus ignored\n        if (value > cur.data){ // We must traverse down right side\n            cur.right = insert(value, cur.right);\n        } else {\n            cur.left = insert(value, cur.left);\n        }\n        return cur;\n    }\n\n    function remove(value, cur = this.root){\n        if (cur==null){ //We reached leaf without finding a node to delete\n            \n            return cur;\n        }\n        if (cur.data == value){ // This is the node we want to delete\n            if (!cur.right && !cur.left){ //case I; node to delete is a single leaf. EZPZ\n                return null;\n            } else if (cur.right && cur.left){ //Case III; node to delete has 2 children\n                // We must find the the in-order successor of the node, copy it, then delete it\n                // 1. Find the in-order successor\n                let successor = cur.right; // known to be non-null\n                while (successor.left){\n                    successor = successor.left;\n                }\n                // 2. Copy contents of succesor to node, then delete the in-order successor\n                cur.data = successor.data;\n                cur.right = remove(successor.data, cur.right);\n                return cur;\n            } else{ // Case II, node has 1 child\n                return (cur.left) ?  cur.left :  cur.right;\n            }\n        }\n        if (value > cur.data){\n            cur.right = remove(value, cur.right);\n        } else {\n            cur.left = remove(value, cur.left);\n        }\n        return cur;\n    }\n\n    function find(value, cur = this.root){\n        if (!cur) return null;\n        if (cur.data == value) return cur;\n        if (value > cur.data) return find(value, cur.right);\n        return find(value, cur.left);\n    }\n\n    // Traverse the BST in breadth-first level order optionally applying callback fn.\n    function levelOrder(callback, queue = [this.root], result=[]){\n        if (queue.length == 0) return result //we've reached end of the queue, thus visited all nodes\n\n        callback? result.push(callback(queue[0].data)) : result.push(queue[0].data) // Visit front of queue\n\n        if (queue[0].left) queue.push(queue[0].left) //If children are non-null, push them onto the queue\n        if (queue[0].right) queue.push(queue[0].right)\n\n        queue.splice(0,1); // Remove the visited node from the queue\n    \n        return levelOrder(callback, queue, result)\n    }\n\n    // Traverse the BST in depth-frist in-order optionally applying callback fn.\n    function inOrder(callback, cur=this.root, result=[]){\n        if (!cur) return;\n        inOrder(callback, cur.left, result);\n        callback? result.push(callback(cur.data)) : result.push(cur.data)\n        inOrder(callback, cur.right, result);\n        return result;\n    }\n\n    // Traverse the BST in depth-frist pre-order optionally applying callback fn.\n    function preOrder(callback, cur=this.root, result=[]){\n        if (!cur) return;\n        callback? result.push(callback(cur.data)) : result.push(cur.data)\n        preOrder(callback, cur.left, result);\n        preOrder(callback, cur.right, result);\n        return result;\n    }\n\n    // Traverse the BST in depth-frist post-order optionally applying callback fn.\n    function postOrder(callback, cur=this.root, result=[]){\n        if (!cur) return;\n        postOrder(callback, cur.left, result);\n        postOrder(callback, cur.right, result);\n        callback? result.push(callback(cur.data)) : result.push(cur.data)\n        return result;\n    }\n\n    function height(cur=this.root){\n        if (!cur) return -1;\n        let lHeight = height(cur.left)+1;\n        let rHeight = height(cur.right)+1;\n        if (lHeight > rHeight) return lHeight;\n        return rHeight;\n    }\n\n    // Given a root and target, returns depth of target relative to root\n    function depth(target, cur=this.root, depthIDX=0){\n        if (!cur) return null;\n        if (cur.data == target){\n            return depthIDX;\n        } else if (cur.data<target){\n            depthIDX++;\n            return depth(target, cur.right, depthIDX)\n        } else {\n            depthIDX++;\n            return depth(target, cur.left, depthIDX)\n        }\n    }\n\n    function isBalanced(cur=this.root){\n        return Math.abs(height(cur.left) - height(cur.right)) <= 1\n    }\n\n    function rebalance(cur=this.root){\n        return this.root = buildTree(this.inOrder()); // this is how we modify existing\n    }\n\n\n\n    return{\n        get root(){return root},\n        set root(newRoot){root=newRoot},\n        insert, remove, find, levelOrder, inOrder, preOrder, postOrder, height, depth, isBalanced, rebalance\n    };\n}\n\n\n\nconst prettyPrint = (node, prefix = \"\", isLeft = true) => {\n    if (node === null) {\n      return;\n    }\n    if (node.right !== null) {\n      prettyPrint(node.right, `${prefix}${isLeft ? \"│   \" : \"    \"}`, false);\n    }\n    console.log(`${prefix}${isLeft ? \"└── \" : \"┌── \"}${node.data}`);\n    if (node.left !== null) {\n      prettyPrint(node.left, `${prefix}${isLeft ? \"    \" : \"│   \"}`, true);\n    }\n};\n\n//# sourceURL=webpack://balanced-bst/./src/tree.js?");

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
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/driver.js");
/******/ 	
/******/ })()
;