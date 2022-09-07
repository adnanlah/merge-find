import { DisjointSet } from "../src"

type TestType = {
  name: string
}

let d: DisjointSet<TestType>

describe("DisjointSet without path compression", () => {
  beforeAll(() => {
    d = new DisjointSet<TestType>()
  })

  it("aDisjointSet 4 new nodes to the list and returns their correct indexes", () => {
    const idx0 = d.add({ name: "A" })
    const idx1 = d.add({ name: "B" })
    const idx2 = d.add({ name: "C" })
    const idx3 = d.add({ name: "D" })
    const idx4 = d.add({ name: "E" })
    expect(d.getList).toHaveLength(5)
    expect(idx0).toEqual(0)
    expect(idx1).toEqual(1)
    expect(idx2).toEqual(2)
    expect(idx3).toEqual(3)
    expect(idx4).toEqual(4)
  })

  it("merges 2 nodes", () => {
    d.union(0, 1)
    d.union(2, 3)
    expect(d.areConnected(0, 1)).toEqual(true)
    expect(d.areConnected(2, 3)).toEqual(true)
    expect(d.getList[1].DisjointSet.parent).toEqual(d.getList[0].DisjointSet.id)
    expect(d.getList[3].DisjointSet.parent).toEqual(d.getList[2].DisjointSet.id)
  })

  it("returns the correct number of subsets", () => {
    expect(d.numberOfSubsets()).toEqual(3)
  })

  it("returns the correct array of subsets", () => {
    const s = d.subsets()
    expect(s).toHaveLength(3)
    expect(s[0]).toHaveLength(2)
    expect(s[1]).toHaveLength(2)
    expect(s[2]).toHaveLength(1)
    expect(s.flat()).toHaveLength(5)
  })

  it("returns the correct array of a subset", () => {
    const s = d.subset(0)
    expect(s).toHaveLength(2)
    expect(s[0].name).toEqual("A")
    expect(s[1].name).toEqual("B")
  })

  it("finds the correct root of a node", () => {
    const root1 = d.findRoot(0)
    const root2 = d.findRoot(1)
    expect(root1.DisjointSet.parent).toEqual(-1)
    expect(root2.DisjointSet.parent).toEqual(-1)
    expect(root1.DisjointSet.id).toEqual(root2.DisjointSet.id)
  })

  it("merges 2 sets", () => {
    d.union(1, 3)
    expect(d.areConnected(0, 1)).toEqual(true)
    expect(d.areConnected(0, 2)).toEqual(true)
    expect(d.areConnected(0, 3)).toEqual(true)
    expect(d.areConnected(1, 2)).toEqual(true)
    expect(d.areConnected(1, 3)).toEqual(true)
    expect(d.areConnected(2, 3)).toEqual(true)
  })

  it("merges the set with the lowest rank to the one with the highest rank", () => {
    d.union(3, 4)
    expect(d.areConnected(3, 4)).toEqual(true)
    expect(d.findRoot(3).DisjointSet.id).toEqual(d.getList[4].DisjointSet.parent)
  })

  it("resets to an empty array", () => {
    d.destroy()
    expect(d.getList).toHaveLength(0)
  })
})
