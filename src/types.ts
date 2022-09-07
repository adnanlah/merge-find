export type DisjointSetNodeType<T> = T & {
  DisjointSet: {
    id: number
    parent: number
    rank: number
  }
}

export type DisjointSetType<T> = {
  add(node: T): number
  findRoot(idx: number): DisjointSetNodeType<T>
  union(idx1: number, idx2: number): void
  areConnected(idx1: number, idx2: number): boolean
  numberOfSubsets(): number
  subset(idx: number): DisjointSetNodeType<T>[]
  subsets(): DisjointSetNodeType<T>[][]
  destroy(): void
}
