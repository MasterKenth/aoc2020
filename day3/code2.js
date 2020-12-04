const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  const lines = raw.split('\n')

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ]

  const answer = slopes.map(slope => lines.reduce((p, c, i) => {
    if (i % slope[1] === 0) {
      const ri = Math.floor(i / slope[1])
      const xLoc = (ri * slope[0]) % c.length
      const isTree = c[xLoc] === '#'
      return (isTree) ? p + 1 : p
    } else {
      return p
    }
  }, 0)
  ).reduce((p, c) => p * c, 1)

  console.log(answer)
}

run()
