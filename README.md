# Disjoint-set data structure algorithm

In computer science, a disjoint-set data structure, also called a union–find data structure or merge–find set, is a data structure that stores a collection of disjoint (non-overlapping) sets. Equivalently, it stores a partition of a set into disjoint subsets. It provides operations for adding new sets, merging sets (replacing them by their union), and finding a representative member of a set. The last operation makes it possible to find out efficiently if any two elements are in the same or different sets.

## Installation

```ts
npm install merge-find
yarn add merge-find
```

## Usage

```ts
import {DDS} from 'merge-find'

type MyNodeTypes = {
    name: string
}

// instantiate disjoint-set data structure
const disjointSet = new DDS<MyNodeTypes>()

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

// merge some nodes together
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

## References

- [Disjoint-set data structure (Wikipedia)](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)
- [Disjoint Set Union (Algorithms for Competitive Programming)](https://cp-algorithms.com/data_structures/disjoint_set_union.html#support-distances-up-to-representative)
