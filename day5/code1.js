const fs = require('fs').promises
const path = require('path')

function makeNode (min, max) {
  const range = max - min
  if (range === 1) {
    return { left: { value: min }, right: { value: max } }
  }
  const breakpoint = min + Math.floor(range / 2)
  return {
    left: makeNode(min, breakpoint),
    right: makeNode(breakpoint + 1, max)
  }
}

function traverseTree (rowNodes, seatNodes, stringSequence) {
  const rows = [...stringSequence.slice(0, 7)]
  const seats = [...stringSequence.slice(7)]

  const rowNode = rows.reduce((prev, cur) => {
    return prev[cur === 'F' ? 'left' : 'right']
  }, rowNodes)

  const seatNode = seats.reduce((prev, cur) => {
    return prev[cur === 'L' ? 'left' : 'right']
  }, seatNodes)

  const seatId = (rowNode.value * 8) + seatNode.value
  return seatId
}

function assert (condition) {
  if (!condition) {
    throw new Error('Bad assertion')
  }
}

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })

  const rowTree = makeNode(0, 127)
  const seatTree = makeNode(0, 7)

  assert(traverseTree(rowTree, seatTree, 'FBFBBFFRLR') === 357)
  assert(traverseTree(rowTree, seatTree, 'BFFFBBFRRR') === 567)
  assert(traverseTree(rowTree, seatTree, 'FFFBBBFRRR') === 119)
  assert(traverseTree(rowTree, seatTree, 'BBFFBBFRLL') === 820)

  const maxSeatId = raw.split('\n')
    .filter(str => str)
    .map(str => traverseTree(rowTree, seatTree, str))
    .reduce((p, c) => c > p ? c : p, 0) // max

  console.log(maxSeatId)
}

run()
