const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  const lines = raw.split('\n')

  const trees = lines.reduce((p, c, i) => {
    const xLoc = (i * 3) % c.length
    const isTree = c[xLoc] === '#'
    return (isTree) ? p + 1 : p
  }, 0)

  console.log(trees)
}

run()
