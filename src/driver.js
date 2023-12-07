import {treeFactory, prettyPrint} from './tree';

function generateArray(size, min, max) {
    return Array.from({length: size}, () => Math.floor((Math.random() * (max - min) + min)));;
}

const myTree = treeFactory(generateArray(10, 0, 100));
prettyPrint(myTree.root);
myTree.isBalanced()? console.log("Tree is balanced!") : console.log("Tree is NOT balanced!") 
console.log("level order traversal: ", myTree.levelOrder());
console.log("preorder traversal: ", myTree.preOrder());
console.log("postorder order traversal: ", myTree.postOrder());
console.log("inorder order traversal: ", myTree.inOrder());

// Adding some random numbers to the tree
for (let i=0; i<10; i++){
    myTree.insert(100+Math.floor((Math.random()*100)));
}
console.log("Inserted 10 additional nodes to tree.")
myTree.isBalanced()? console.log("Tree is balanced!") : console.log("Tree is NOT balanced!") 
myTree.rebalance();
console.log("Calling rebalance...")
myTree.isBalanced()? console.log("Tree is balanced!") : console.log("Tree is NOT balanced!")
console.log("level order traversal: ", myTree.levelOrder());
console.log("preorder traversal: ", myTree.preOrder());
console.log("postorder order traversal: ", myTree.postOrder());
console.log("inorder order traversal: ", myTree.inOrder());