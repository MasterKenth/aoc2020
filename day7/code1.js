const fs = require('fs').promises
const path = require('path')

function goUpBaby (bags, color, traversedSet) {
  traversedSet = traversedSet || new Set()
  traversedSet.add(color)
  bags[color].forEach(bag => goUpBaby(bags, bag, traversedSet))
  return traversedSet
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

  // Maps a given color to a list of bags that contain that color
  const bagMapping = bags.reduce((obj, bag) => ({
    ...obj,
    [bag.color]: bags.filter(b => b.subBags.filter(sb => sb.color === bag.color).length > 0).map(b => b.color)
  }), {})

  console.log(bagMapping['shiny gold'])

  const traversedBags = goUpBaby(bagMapping, 'shiny gold')
  console.log(traversedBags.size - 1) // The correct answer is -1 for the shiny gold bag itself
}

run()
