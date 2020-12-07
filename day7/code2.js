const fs = require('fs').promises
const path = require('path')

function goDownMate (bags, color) {
  return bags[color].reduce((c, bag) => c + bag.count + goDownMate(bags, bag.color) * bag.count, 0)
}

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })

  const rBagColor = /^(.*?) bags contain/
  const rSubBags = /(\d) (.*?) bags?/g

  const bags = raw.split('\n')
    .filter(line => line.length > 0)
    .map(line => ({
      color: line.match(rBagColor)[1],
      subBags: [...line.matchAll(rSubBags)]
        .map(match => ({ count: parseInt(match[1]), color: match[2] }))
    }))

  // Maps a given color to a list of bags that color contains
  const bagMapping = bags.reduce((obj, bag) => ({
    ...obj,
    [bag.color]: bag.subBags
  }), {})

  const traversedBags = goDownMate(bagMapping, 'shiny gold')
  console.log(traversedBags)
}

run()
