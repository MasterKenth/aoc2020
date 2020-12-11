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

  const weakNumber = invalidNumbers[0]

  for (let i = 0; i < numbers.length; i++) {
    let j = i + 1
    let sum = numbers[i]
    do {
      sum += numbers[j]
      j++
    } while (sum < weakNumber)

    if (sum === weakNumber) {
      console.log(`sequence is ${i} to ${j}`)
      const sequence = numbers.slice(i, j + 1).sort((a, b) => a - b)
      const smallest = sequence[0]
      const largest = sequence.slice(-1)[0]
      const sum = smallest + largest
      console.log(`smallest ${smallest}, largest: ${largest}, sum: ${sum}`)
      console.log(sequence)
      break
    }
  }
}

run()
