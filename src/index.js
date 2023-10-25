const nodeFactory = (data, left, right) => {
    return{
        get data(){return data;}, set data(newData){data=newData},
        get left(){return left;}, set left(newLeft){left=newLeft},
        get right(){return right;}, set right(newRight){right=newRight}
    };
};


const treeFactory = (arr, root) => {
    root = buildTree([...new Set(arr)].sort((a,b) => a-b));

    // Takes an array of data and turns it into a balanced BST. Returns level 0 root node.
    // Requires arr to be sorted and with duplicates removed
    function buildTree(arr){
        if (arr.length == 0) return null;
        const mid = parseInt((arr.length-1)/2);
        const root = nodeFactory(arr[mid], buildTree(arr.slice(0,mid)), buildTree(arr.slice(mid+1, arr.length)));
        return root;
    }

    // Note: insert does not guarantee tree balance is preserved
    function insert(value, cur = this.root){
        if (cur == null){ // reached beyond leaf node in the "correct null", thus we insert
            cur = nodeFactory(value,null,null);
            return cur;
        }
    
        if (value == cur.data) return cur; // Duplicate insertion, thus ignored
        if (value > cur.data){ // We must traverse down right side
            cur.right = insert(value, cur.right);
        } else {
            cur.left = insert(value, cur.left);
        }
        return cur;
    }

    

    return{
        get root(){return root},
        set root(newRoot){root=newRoot},
        insert
    };
}



const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const myTree = treeFactory([1,2,3,4,5,6,7,8,9]);
  prettyPrint(myTree.root);
  prettyPrint(myTree.insert(10));

  