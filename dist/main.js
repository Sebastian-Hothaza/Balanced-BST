/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const nodeFactory = (data, left, right) => {\n    return{\n        get data(){return data;}, set data(newData){data=newData},\n        get left(){return left;}, set left(newLeft){left=newLeft},\n        get right(){return right;}, set right(newRight){right=newRight}\n    };\n};\n\n\nconst treeFactory = (arr, root) => {\n    root = buildTree([...new Set(arr)].sort((a,b) => a-b));\n\n    // Takes an array of data and turns it into a balanced BST. Returns level 0 root node.\n    // Requires arr to be sorted and with duplicates removed\n    function buildTree(arr){\n        if (arr.length == 0) return null;\n        const mid = parseInt((arr.length-1)/2);\n        const root = nodeFactory(arr[mid], buildTree(arr.slice(0,mid)), buildTree(arr.slice(mid+1, arr.length)));\n        return root;\n    }\n\n    // Note: insert does not guarantee tree balance is preserved\n    function insert(value, cur = this.root){\n        if (cur == null){ // reached beyond leaf node in the \"correct null\", thus we insert\n            cur = nodeFactory(value,null,null);\n            return cur;\n        }\n    \n        if (value == cur.data) return cur; // Duplicate insertion, thus ignored\n        if (value > cur.data){ // We must traverse down right side\n            cur.right = insert(value, cur.right);\n        } else {\n            cur.left = insert(value, cur.left);\n        }\n        return cur;\n    }\n\n    \n\n    return{\n        get root(){return root},\n        set root(newRoot){root=newRoot},\n        insert\n    };\n}\n\n\n\nconst prettyPrint = (node, prefix = \"\", isLeft = true) => {\n    if (node === null) {\n      return;\n    }\n    if (node.right !== null) {\n      prettyPrint(node.right, `${prefix}${isLeft ? \"│   \" : \"    \"}`, false);\n    }\n    console.log(`${prefix}${isLeft ? \"└── \" : \"┌── \"}${node.data}`);\n    if (node.left !== null) {\n      prettyPrint(node.left, `${prefix}${isLeft ? \"    \" : \"│   \"}`, true);\n    }\n  };\n\n  const myTree = treeFactory([1,2,3,4,5,6,7,8,9]);\n  prettyPrint(myTree.root);\n  prettyPrint(myTree.insert(10));\n\n  \n\n//# sourceURL=webpack://balanced-bst/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;