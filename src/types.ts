export type disjointSetNodeType<T> = T & {
  id: number
  parent: number
  rank: number
}

export interface DDSType<T> {
  add(node: T): number
  findRoot(idx: number): disjointSetNodeType<T> | undefined
  findRootByPathCompression(idx: number): number | undefined
  union(idx1: number, idx2: number): void
  areConnected(idx1: number, idx2: number): boolean
  numberOfSubsets(): number
  subset(idx: number): disjointSetNodeType<T>[]
  subsets(): disjointSetNodeType<T>[][]
  destroy(): void
}
