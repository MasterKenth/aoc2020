const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  const re = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/

  const answer = raw.split('\n')
    .map(line => ({
      line: line,
      ...((r) => ({
        valid: ((a, b, l, s) => (((s[a - 1] === l) ^ (s[b - 1] === l)) === 1))(
          parseInt(r[1]),
          parseInt(r[2]),
          r[3],
          r[4]
        )
      }))([...line.match(re)])
    }))
    .filter(l => l.valid)
    .length

  console.log(answer)
}

run()
