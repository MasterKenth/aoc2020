const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  const re = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/

  const answer = raw.split('\n')
    .map(line => ({
      line: line,
      ...((r) => ({
        /* min: parseInt(r[1]),
        max: parseInt(r[2]),
        letter: r[3],
        passwd: r[4], */
        valid: ((min, max, n) => (n >= min && n <= max))(parseInt(r[1]), parseInt(r[2]), [...r[4]].filter(w => w === r[3]).length)
      }))([...line.match(re)])
    }))
    .filter(l => l.valid)
    .length

  console.log(answer)
}

run()
