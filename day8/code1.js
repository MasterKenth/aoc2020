const fs = require('fs').promises
const path = require('path')

function runOp (instructions, opIdx, acc, visited) {
  opIdx = opIdx || 0
  acc = acc || 0
  visited = visited || Array(instructions.length).fill(0)

  const op = instructions[opIdx]

  if (++visited[opIdx] > 1) {
    console.log('infinite loop!')
    console.log(`acc: ${acc} opIdx: ${opIdx} op: ${JSON.stringify(op)}`)
  } else {
    let nextOpIdx = opIdx + 1

    switch (op.op) {
      case 'acc':
        acc += op.arg
        break
      case 'jmp':
        nextOpIdx = opIdx + op.arg
        break
    }

    runOp(instructions, nextOpIdx, acc, visited)
  }
}

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })

  const rInstruction = /^(nop|acc|jmp) ([\+-]\d+)$/
  const instructions = raw.split('\n')
    .filter(line => line.length > 0)
    .map(line => [...line.match(rInstruction)])
    .map(match => ({
      op: match[1],
      arg: parseInt(match[2])
    }))

  runOp(instructions)
}

run()
