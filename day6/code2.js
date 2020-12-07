const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })

  const aCharCode = 'a'.charCodeAt(0)

  const answer = raw.split('\n\n') // split into groups
    .map(groupStr => groupStr.split('\n') // split each group into individuals
      .filter(individual => individual.length > 0)
      .map(individual => [...individual].reduce((azList, answer) => { // reduce each individual into a list of counts for each letter a-z
        const newList = [...azList]
        newList[answer.charCodeAt(0) - aCharCode] += 1
        return newList
      }, Array(26).fill(0))))
    .map(group => group.reduce((azList, individualAZList) => { // join individual lists
      return azList.map((c, i) => c + individualAZList[i])
    }, Array(26).fill(0))
      .filter(answerCount => answerCount === group.length) // filter for where everyone answered
      .length
    )
    .reduce((fullCount, groupCount) => fullCount + groupCount, 0)

  console.log(answer)
}

run()
