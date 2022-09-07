# merge-find

Implementation of Disjoint-set data structure algorithm (also called a union–find data structure or merge–find set) with TypeScript support.

Hit the Star button if you love this project ⭐️

## 📝 Disjoint-set data structure algorithm

In computer science, a disjoint-set data structure, also called a union–find data structure or merge–find set, is a data structure that stores a collection of disjoint (non-overlapping) sets. Equivalently, it stores a partition of a set into disjoint subsets. It provides operations for adding new sets, merging sets (replacing them by their union), and finding a representative member of a set. The last operation makes it possible to find out efficiently if any two elements are in the same or different sets.

## 🚀 Installation

### NPM

```
npm install merge-find
```

### Yarn

```
yarn add merge-find
```

## 👩‍💻 Usage

```ts
import {DDS} from 'merge-find'

type MyNodeType = {
    name: string
}

// instantiate disjoint-set data structure
const disjointSet = new DDS<MyNodeType>()

// add nodes to the set
const id1 = disjointSet.add({
    name: 'First node'
}) // 0

const id2 = disjointSet.add({
    name: 'Second node'
}) // 1

const id3 = disjointSet.add({
    name: 'Third node'
}) // 2

// Merge some nodes together
disjointSet.union(0, 1)

// Check if nodes are connected
disjointSet.areConnected(0, 1); // true
disjointSet.areConnected(0, 2); // false

// Number of subsets
disjointSet.numberOfSubsets(); // 2
 
// List of all subsets
disjointSet.subsets(); 
/* [ [ { id: 0, parent: -1, rank: 1, name: 'First node' },
    { id: 1, parent: 0, rank: 0, name: 'Second node' } ],
  [ { id: 2, parent: -1, rank: 0, name: 'Third node' } ] ] */
 
// Subset containing a specific node
disjointSet.subset(2) // [ { id: 2, parent: -1, rank: 0, name: 'Third node' } ]
```

You can try it live on [replit](https://replit.com/@adnanlah/Testing-merge-find-package).

## 🌐 API

### Creation

|Factory|Description|
|---|---|
|new DDS<T\>()|Instantiates disjoint-set data structure.|

### Methods

|Method|Return|Description|
|---|---|---|
|add(node: T)|Number|Creates a new subset consisting of the new element `node`.|
|union(id1: number, id2: number)|Void|Merges the two specified subsets (the subset in which the element a is located, and the subset in which the element b is located). The merge is by rank.|
|find(id: number)|DisjointSetNodeType<T\>|Returns the representative (the root node) of the subset that contains the element with and id `id`.|
|areConnected(id1: number, id2: number)|Boolean|Check if 2 nodes are connected (in the same subset).|
|numberOfSubsets()|Number|It returns the number of subsets in the set.|
|subsets()|DisjointSetNodeType<T\>[][]|It returns a list of all subsets. Each subset is an array of elements contained in that subset.|
|subset(id: number)|DisjointSetNodeType<T\>[]|It returns an array of elements in the subset containing element with and id `id`.|
|destroy()|void|It resets the set list to an empty array.|

### Types

The `DisjointSetNodeType<T>` type is:

```ts
type DisjointSetNodeType<T> = T & {
  id: number
  parent: number
  rank: number
}
```

## 📌 References

- [Disjoint-set data structure (Wikipedia)](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)
- [Disjoint Set Union (Algorithms for Competitive Programming)](https://cp-algorithms.com/data_structures/disjoint_set_union.html#support-distances-up-to-representative)
