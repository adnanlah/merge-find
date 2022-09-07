import { DisjointSetNodeType, DDSType } from "./types"

export class DDS<T> implements DDSType<T> {
  private list: DisjointSetNodeType<T>[]

  constructor() {
    this.list = []
  }

  get getList() {
    return this.list
  }

  add(node: T): number {
    const disjointSetNode: DisjointSetNodeType<T> = Object.assign(
      { id: this.list.length, parent: -1, rank: 0 },
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
    if (node.parent !== -1) {
      return this.findRoot(node.parent)
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

    if (root1.id === root2.id) {
      return
    }

    if (root1.rank < root2.rank) {
      ;[root2, root1] = [root1, root2]
    }

    root2.parent = root1.id
    if (root1.rank === root2.rank) {
      root1.rank++
    }
  }

  areConnected(id1: number, id2: number): boolean {
    const root1 = this.findRoot(id1)
    const root2 = this.findRoot(id2)
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

  subsets(): DisjointSetNodeType<T>[][] {
    const record = this.getList.reduce(
      (
        prev: Record<string, DisjointSetNodeType<T>[]>,
        curr: DisjointSetNodeType<T>
      ): Record<string, DisjointSetNodeType<T>[]> => {
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
      {} as Record<string, DisjointSetNodeType<T>[]>
    )
    return Object.keys(record).map((prop: string) => record[prop])
  }

  subset(id: number): DisjointSetNodeType<T>[] {
    const rootId = this.findRoot(id).id
    return this.getList.filter(
      (node: DisjointSetNodeType<T>) => this.findRoot(node.id).id === rootId
    )
  }

  destroy(): void {
    this.list = []
  }
}
