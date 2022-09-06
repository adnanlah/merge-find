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

const disjointSet = new DDS<MyNodeTypes>()

disjointSet.add({
    name: 'First node'
})

disjointSet.add({
    name: 'Second node'
})

disjointSet.union(0, 1)
```

## References

- [Disjoint-set data structure (Wikipedia)](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)
- [Disjoint Set Union (Algorithms for Competitive Programming)](https://cp-algorithms.com/data_structures/disjoint_set_union.html#support-distances-up-to-representative)
