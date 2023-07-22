class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BalancedBST {
  constructor(inputArray) {
    const uniqueSortedArray = this.mergeSort([...new Set(inputArray)]);
    this.root = this.buildTree(
      uniqueSortedArray,
      0,
      uniqueSortedArray.length - 1
    );
  }

  buildTree(inputArray, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(inputArray[mid]);

    root.left = this.buildTree(inputArray, start, mid - 1);
    root.right = this.buildTree(inputArray, mid + 1, end);
    return root;
  }

  insert(value, root = this.root) {
    if (root == null) {
      return (root = new Node(value));
    }

    if (root.data < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }

    return root;
  }

  delete(value, root = this.root) {
    if (root == null) {
      return root;
    }

    if (root.data > value) {
      root.left = this.delete(value, root.left);
    } else if (root.data < value) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }

      root.data = this.findMinValue(root.right);
      root.right = this.delete(root.data, root.right);
    }

    return root;
  }

  find(value, root = this.root) {
    if (root == null) return null;

    if (root.data === value) return root;

    if (root.data > value) {
      return this.find(value, root.left);
    } else {
      return this.find(value, root.right);
    }
  }

  levelOrder() {
    const queue = [];
    const result = [];

    if (this.root == null) return [];

    queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.data);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }

    return result;
  }

  inOrder(root = this.root, result = []) {
    if (root == null) return;

    this.inOrder(root.left, result);
    result.push(root.data);
    this.inOrder(root.right, result);
  }

  preOrder(root = this.root, result = []) {
    if (root == null) return;

    result.push(root.data);
    this.preOrder(root.left, result);
    this.preOrder(root.right, result);
  }

  postOrder(root = this.root, result = []) {
    if (root == null) return;

    this.postOrder(root.left, result);
    this.postOrder(root.right, result);
    result.push(root.data);
  }

  height(root = this.root) {
    if (root == null) {
      return -1;
    } else {
      const left = this.height(root.left);
      const right = this.height(root.right);
      return Math.max(left, right) + 1;
    }
  }

  depth(nodeVal, root = this.root, edgeCount = 0) {
    if (root === null) return -1;
    if (root.data === nodeVal) return edgeCount;

    if (root.data < nodeVal) {
      return this.depth(nodeVal, root.right, edgeCount + 1);
    } else {
      return this.depth(nodeVal, root.left, edgeCount + 1);
    }
  }

  isBalanced(root = this.root) {
    if (root == null) return true;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    } else {
      return this.isBalanced(root.left) && this.isBalanced(root.right);
    }
  }

  rebalance() {
    if (this.isBalanced(this.root)) return this.root;

    const inOrderArray = [];
    this.inOrder(this.root, inOrderArray);
    return this.buildTree(inOrderArray, 0, inOrderArray.length - 1);
  }

  findMinValue(root) {
    let min = root.data;
    while (root != null) {
      min = root.data;
      root = root.left;
    }
    return min;
  }

  mergeSort(inputArray) {
    if (inputArray.length == 1) return inputArray;

    const newArray = [];

    const left = this.mergeSort(inputArray.slice(0, inputArray.length / 2));
    const right = this.mergeSort(inputArray.slice(inputArray.length / 2));

    while (left.length && right.length) {
      if (left[0] < right[0]) {
        newArray.push(left.shift());
      } else {
        newArray.push(right.shift());
      }
    }

    return [...newArray, ...left, ...right];
  }
}

const testInputArray = [1, 2, 3, 4, 5, 6, 7];
const balancedBST = new BalancedBST(testInputArray);
balancedBST.insert(8);
balancedBST.insert(9);
balancedBST.delete(3);
console.log(balancedBST.find(8));
console.log("Level Order:", balancedBST.levelOrder());
console.log("In Order:", balancedBST.inOrder());
console.log("Pre Order:", balancedBST.preOrder());
console.log("Post Order:", balancedBST.postOrder());
console.log("Tree Height:", balancedBST.height());
console.log("Tree Depth of 7:", balancedBST.depth(7));
console.log("Is the tree balanced?:", balancedBST.isBalanced());
console.log("Rebalancing the tree!...", balancedBST.rebalance());
