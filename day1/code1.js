const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  const inputs = raw.split('\n').map(i => parseInt(i))

  for (let i = 0; i < inputs.length; i++) {
    for (let j = i + 1; j < inputs.length; j++) {
      const a = inputs[i]
      const b = inputs[j]
      if (a + b === 2020) {
        const product = a * b
        console.log(`entries are ${i} (${a}) and ${j} (${b})`)
        console.log(`product is ${product}`)
        return
      }
    }
  }
}

run()
