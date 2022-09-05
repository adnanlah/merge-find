import { disjointSetNodeType, DDSType } from "./types"

export class DDS<T> implements DDSType<T> {
  private list: disjointSetNodeType<T>[]

  constructor() {
    this.list = []
  }

  get getList() {
    return this.list
  }

  add(node: T): number {
    const disjointSetNode: disjointSetNodeType<T> = Object.assign(
      { id: this.list.length, parent: -1, rank: 0 },
      node
    )
    this.list.push(disjointSetNode)
    return this.list.length - 1
  }

  findRoot(idx: number): disjointSetNodeType<T> {
    const node = this.list[idx]
    if (!node) {
      throw new Error(`Node doesn't exist`)
    }
    if (node.parent !== -1) {
      return this.findRoot(node.parent)
    } else {
      return node
    }
  }

  findRootByPathCompression(idx: number): number | undefined {
    const node = this.list[idx]
    if (!node) {
      return undefined
    }
    if (node.parent !== -1) {
      return (node.parent = this.findRoot(node.parent).id)
    } else {
      return node.id
    }
  }

  union(idx1: number, idx2: number) {
    let root1 = this.findRoot(idx1)
    let root2 = this.findRoot(idx2)

    if (!root1 || !root2) {
      return
    }

    if (root1.id === root2.id) {
      return
    }

    if (root1.rank < root2.rank) {
      ;[root2, root1] = [root1, root2]
    }

    // Make x the new root
    root2.parent = root1.id
    if (root1.rank === root2.rank) {
      root1.rank++
    }
  }

  areConnected(idx1: number, idx2: number) {
    const root1 = this.findRoot(idx1)
    const root2 = this.findRoot(idx2)
    if (!root1 || !root2) {
      return false
    }
    if (root1.id === root2.id) {
      return true
    } else {
      return false
    }
  }

  numberOfSubsets(): number {
    return this.getList.filter(n => n.parent === -1).length
  }

  subsets(): disjointSetNodeType<T>[][] {
    const record = this.getList.reduce(
      (
        prev: Record<string, disjointSetNodeType<T>[]>,
        curr: disjointSetNodeType<T>
      ): Record<string, disjointSetNodeType<T>[]> => {
        const rootId = this.findRoot(curr.id).id
        if (!(prev[rootId]?.length > 0)) {
          return {
            ...prev,
            [rootId]: [curr]
          }
        }
        return {
          ...prev,
          [rootId]: [...prev[rootId], curr]
        }
      },
      {} as Record<string, disjointSetNodeType<T>[]>
    )
    return Object.keys(record).map((prop: string) => record[prop])
  }

  subset(idx: number): disjointSetNodeType<T>[] {
    const rootId = this.findRoot(idx).id
    return this.getList.filter(
      (node: disjointSetNodeType<T>) => this.findRoot(node.id).id === rootId
    )
  }

  destroy() {
    this.list = []
  }
}