const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })

  const aCharCode = 'a'.charCodeAt(0)

  const answer = raw.split('\n\n') // split into groups
    .map(groupStr => groupStr.replace(/\n/g, '')) // turn group into one long string
    .map(groupStr => [...groupStr].reduce((azList, answer) => { // reduce each group into a list of counts for each letter a-z
      const newList = [...azList]
      newList[answer.charCodeAt(0) - aCharCode] += 1
      return newList
    }, Array(26).fill(0))
      .reduce((count, letterCount) => letterCount > 0 ? count + 1 : count, 0) // further reduce each list of counts into count for every non-zero entry
    )
    .reduce((fullCount, groupCount) => fullCount + groupCount, 0) // reduce all groups into a single count

  console.log(answer)
}

run()
