/* eslint-disable no-multi-spaces */
const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })

  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  const answer = raw.split('\n\n')              // Split into per-passport
    .map(str => str.replace(/\n/g, ' '))        // Convert per-passport to single line
    .map(str => str.split(' ')                  // Split per key-value-pair string (key:value)
      .map(kvpstr => kvpstr.split(':'))         // Split kvp into array
      .map(kvp => ({ [kvp[0]]: kvp[1] }))      // Map to js object
    )
    .map(kvpList => kvpList.reduce((passport, kvp) => ({ ...passport, ...kvp }), {})) // Reduce all kvps into single passport object
    .reduce((count, passport) => { // Reduce to count the valid ones
      const valid = requiredFields.reduce((valid, field) => valid && (field in passport), true)
      return valid ? count + 1 : count
    }, 0)

  console.log(answer)
}

run()
