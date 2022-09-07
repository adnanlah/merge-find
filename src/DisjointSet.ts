import { DisjointSetNodeType, DisjointSetType } from "./types"

export class DisjointSet<T> implements DisjointSetType<T> {
  private list: DisjointSetNodeType<T>[]

  constructor() {
    this.list = []
  }

  get getList() {
    return this.list
  }

  add(node: T): number {
    const disjointSetNode: DisjointSetNodeType<T> = Object.assign(
      { DisjointSet: { id: this.list.length, parent: -1, rank: 0 } },
      node
    )
    this.list.push(disjointSetNode)
    return this.list.length - 1
  }

  findRoot(id: number): DisjointSetNodeType<T> {
    const node = this.list[id]
    if (!node) {
      throw new Error("Node doesnt exist")
    }
    if (node.DisjointSet.parent !== -1) {
      return this.findRoot(node.DisjointSet.parent)
    } else {
      return node
    }
  }

  union(id1: number, id2: number): void {
    let root1 = this.findRoot(id1)
    let root2 = this.findRoot(id2)

    if (!root1 || !root2) {
      return
    }

    if (root1.DisjointSet.id === root2.DisjointSet.id) {
      return
    }

    if (root1.DisjointSet.rank < root2.DisjointSet.rank) {
      ;[root2, root1] = [root1, root2]
    }

    root2.DisjointSet.parent = root1.DisjointSet.id
    if (root1.DisjointSet.rank === root2.DisjointSet.rank) {
      root1.DisjointSet.rank++
    }
  }

  areConnected(id1: number, id2: number): boolean {
    const root1 = this.findRoot(id1)
    const root2 = this.findRoot(id2)
    if (!root1 || !root2) {
      return false
    }
    if (root1.DisjointSet.id === root2.DisjointSet.id) {
      return true
    } else {
      return false
    }
  }

  numberOfSubsets(): number {
    return this.getList.filter(n => n.DisjointSet.parent === -1).length
  }

  subsets(): DisjointSetNodeType<T>[][] {
    const record = this.getList.reduce(
      (
        prev: Record<string, DisjointSetNodeType<T>[]>,
        curr: DisjointSetNodeType<T>
      ): Record<string, DisjointSetNodeType<T>[]> => {
        const rootId = this.findRoot(curr.DisjointSet.id).DisjointSet.id
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
      {} as Record<string, DisjointSetNodeType<T>[]>
    )
    return Object.keys(record).map((prop: string) => record[prop])
  }

  subset(id: number): DisjointSetNodeType<T>[] {
    const rootId = this.findRoot(id).DisjointSet.id
    return this.getList.filter(
      (node: DisjointSetNodeType<T>) => this.findRoot(node.DisjointSet.id).DisjointSet.id === rootId
    )
  }

  destroy(): void {
    this.list = []
  }
}
