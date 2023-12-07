import {treeFactory, consolePrint} from "./tree"
export {loadSite}

// Generates a random array for use in building random tree
function generateArray(size, min, max) {
    return Array.from({length: size}, () => Math.floor((Math.random() * (max - min) + min)));;
}
const myTree = treeFactory(generateArray(10, 0, 100));

// Loadside consists of loading elements to the main page. The operations are:
// 1. Generate tree A
// 2. Add 10 random elements to tree A to cause it to be unbalanced. This is Tree B
// 3. Balance tree B to generate Tree C
function loadSite(){
    const content = document.querySelector('#content');
    
    console.log("Tree A")
    consolePrint(myTree.root);
    content.textContent = "Tree A has been generated and is available for viewing in console";

    // Building and attaching the divs
    const levelOrder = document.createElement('div');
    levelOrder.textContent = "Level Order Traversal of nodes: [" + myTree.levelOrder()+"]";
    const inOrder = document.createElement('div');
    inOrder.textContent = "In Order Traversal of nodes: [" + myTree.inOrder()+"]";
    const preOrder = document.createElement('div');
    preOrder.textContent = "Pre Order Traversal of nodes: [" + myTree.preOrder()+"]";
    const postOrder = document.createElement('div');
    postOrder.textContent = "Post Order Traversal of nodes: [" + myTree.postOrder()+"]";
    const changeNotice = document.createElement('div');
    changeNotice.textContent = "Adding some random elements to our balanced tree...(Tree B)";

    content.appendChild(levelOrder);
    content.appendChild(inOrder);
    content.appendChild(preOrder);
    content.appendChild(postOrder);
    content.appendChild(changeNotice);



    // Adding 10 random nodes to our tree
    for (let i=0; i<10; i++){
        myTree.insert(100+Math.floor((Math.random()*100)));
    }
    console.log("Tree B")
    consolePrint(myTree.root);

    const notifyUnbalanced = document.createElement('div');
    notifyUnbalanced.textContent = myTree.isBalanced()? "Currently, tree is balanced":"Currently, tree is NOT balanced";
    content.appendChild(notifyUnbalanced);

    // Balancing the tree
    myTree.rebalance();
    console.log("Tree C")
    consolePrint(myTree.root);

    // Building and attaching the divs
    const finalNotice = document.createElement('div');
    finalNotice.textContent = "Tree has now been rebalanced! (Tree C)";
    const notifyUnbalancedC = document.createElement('div');
    notifyUnbalancedC.textContent = myTree.isBalanced()? "Currently, tree is balanced":"Currently, tree is NOT balanced";
    const levelOrderC = document.createElement('div');
    levelOrderC.textContent = "Level Order Traversal of nodes: [" + myTree.levelOrder()+"]";
    const inOrderC = document.createElement('div');
    inOrderC.textContent = "In Order Traversal of nodes: [" + myTree.inOrder()+"]";
    const preOrderC = document.createElement('div');
    preOrderC.textContent = "Pre Order Traversal of nodes: [" + myTree.preOrder()+"]";
    const postOrderC = document.createElement('div');
    postOrderC.textContent = "Post Order Traversal of nodes: [" + myTree.postOrder()+"]";

    content.appendChild(finalNotice);
    content.appendChild(notifyUnbalancedC);
    content.appendChild(inOrderC);
    content.appendChild(preOrderC);
    content.appendChild(postOrderC);
    
    
}