const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  const inputs = raw.split('\n').map(i => parseInt(i))

  for (let i = 0; i < inputs.length; i++) {
    for (let j = i + 1; j < inputs.length; j++) {
      for (let k = j + 1; k < inputs.length; k++) {
        const a = inputs[i]
        const b = inputs[j]
        const c = inputs[k]
        if (a + b + c === 2020) {
          const product = a * b * c
          console.log(`entries are ${i} (${a}), ${j} (${b}), and ${k} (${c})`)
          console.log(`product is ${product}`)
          return
        }
      }
    }
  }
}

run()
