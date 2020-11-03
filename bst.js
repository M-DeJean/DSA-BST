const showTree = require('./renderTree')

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        /* Similarly, if the new key is greater than the node's key 
           then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

    _findMax() {
        if (!this.right) {
            return this;
        }
        return this.right._findMax();
    }
}

const bst = new BinarySearchTree();
const bst2 = new BinarySearchTree();

let arr = [3, 1, 4, 6, 20, 2, 5, 7, 8, 12, 15, 18, 0]
let quest = ['E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N']

for (let i = 0; i < arr.length; i++) {
    bst.insert(arr[i], arr[i]);
}

for (let i = 0; i < quest.length; i++) {
    bst2.insert(quest[i], quest[i]);
}

// console.log(bst2.right.right.left.left.key)

function tree(t) {
    if (!t) {
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)

}

function height(t) {
    if (!t) return 0;

    const leftHeight = height(t.left);
    const rightHeight = height(t.right);

    return Math.max(leftHeight, rightHeight) + 1;
}

// console.log(height(bst2))

function isBST(t) {
    if (!t) {
        return true;
    }

    if (t.left != null && t.left.value > t.value) {
        return false;
    }

    if (t.right != null && t.right.value < t.value) {
        return false;
    }
    if (!isBST(t.left) || !isBST(t.right)) {
        return false;
    }

    return true;
}

// console.log(isBST(bst2))

function nthLargest(node, target, count = 0, max) {
 
    // while (node.right && (!max || node.right.value < max)) {
    //     node = node.right
    // }

    if(node.right && (!max || node.right.value < max)) {
        return nthLargest(node.right, target, count, max)
    }
    count++

    max = node.value

    if (count == target) {
        return node.value
    }

    if (node.left) {
        return nthLargest(node.left, target, count, max)
    }

    return nthLargest(node.parent, target, count, max)
}
// showTree(bst)
// console.log(nthLargest(bst, 3))


function balanceBST(arr, start = 0, end = arr.length) {
    if(start === end) {
        return null;
    }

    const index = Math.floor((end + start) /2);
    const value = arr[index];
    const tree = new BinarySearchTree(value);

    const leftSubtree = balanceBST(arr, start, index);
    const rightSubtree = balanceBST(arr, index + 1, end);

    tree.left = leftSubtree;
    tree.right = rightSubtree;
    return tree;
}

showTree((balanceBST([1, 2, 3, 5, 7, 9, 11, 13])))