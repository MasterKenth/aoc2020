const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  const numbers = raw
    .split('\n')
    .filter(s => s.length > 0)
    .map(s => parseInt(s))

  const invalidNumbers = numbers.reduce((list, num, i, arr) => {
    if (i < 25) return list // skip first 25
    const addends = arr.slice(i - 25, i)
    const pairIndex = addends
      .map((a, i) => addends.slice(i + 1).map(b => a + b))
      .flat()
      .findIndex(sum => sum === num)
    return pairIndex === -1 ? [...list, num] : list
  }, [])

  console.log(invalidNumbers) // should be only one
}

run()
