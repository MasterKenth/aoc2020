const fs = require('fs').promises
const path = require('path')

function runOp (instructions, opIdx, acc, visited, visitedJmpNops) {
  opIdx = opIdx || 0
  acc = acc || 0
  visited = visited || Array(instructions.length).fill(0)
  visitedJmpNops = visitedJmpNops || []

  const op = instructions[opIdx]

  if (++visited[opIdx] > 1) {
    return { acc: acc, crash: true, visitedJmpNops: visitedJmpNops }
  } else {
    let nextOpIdx = opIdx + 1

    switch (op.op) {
      case 'acc':
        acc += op.arg
        break
      case 'jmp':
        nextOpIdx = opIdx + op.arg
        visitedJmpNops.push(opIdx)
        break
      case 'nop':
        visitedJmpNops.push(opIdx)
        break
    }

    if (nextOpIdx >= instructions.length) {
      return { acc: acc, crash: false, visitedJmpNops: visitedJmpNops }
    } else {
      return runOp(instructions, nextOpIdx, acc, visited, visitedJmpNops)
    }
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

  // first gather initial pass
  const firstPass = runOp(instructions)

  // next loop visited jmp/nop and flip them one by one, testing for success between each iteration
  for (let i = firstPass.visitedJmpNops.length - 1; i >= 0; i--) {
    const newInstructions = [...instructions]
    const opIdx = firstPass.visitedJmpNops[i]
    const op = { ...newInstructions[opIdx] } // make sure to create a copy and not modify original
    op.op = op.op === 'jmp' ? 'nop' : 'jmp' // flip jmp/nop
    newInstructions[opIdx] = op

    const res = runOp(newInstructions)
    if (!res.crash) {
      console.log(`changing op ${i} to ${op.op} fixed program`)
      console.log(res)
      break
    }
  }

  /**
   for (let i = firstPass.visitedJmpNops.length - 1; i >= 0; i--) {
    const newInstructions = [...instructions]
    const opIdx = firstPass.visitedJmpNops[i]
    const op = newInstructions[opIdx]
    op.op = op.op === 'jmp' ? 'nop' : 'jmp' // flip jmp/nop

    const res = runOp(newInstructions)
    console.log(`changing ${opIdx} ${res.crash} ${newInstructions[i].op} vs ${instructions[i].op}`)
    if (!res.crash) {
      console.log(`changing op ${i} to ${op.op} fixed program`)
      console.log(res)
      break
    }
  }
   */
}

run()
