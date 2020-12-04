/* eslint-disable no-multi-spaces */
const fs = require('fs').promises
const path = require('path')

async function run () {
  const raw = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })

  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  const stringNumIsWithin = (input, min, max) => {
    const num = parseInt(input)
    return num >= min && num <= max
  }

  const yearStringIsWithin = (input, min, max) => {
    const match = input.match(/^(\d{4})$/)
    if (match) {
      return stringNumIsWithin(match[1], min, max)
    }
    return false
  }

  const validators = {
    byr: (input) => yearStringIsWithin(input, 1920, 2002),
    iyr: (input) => yearStringIsWithin(input, 2010, 2020),
    eyr: (input) => yearStringIsWithin(input, 2020, 2030),
    hgt: (input) => {
      const match = input.match(/^(\d{2,3})(in|cm)$/)
      if (match) {
        if (match[2] === 'in') return stringNumIsWithin(match[1], 59, 76)
        else return stringNumIsWithin(match[1], 150, 193)
      }
      return false
    },
    hcl: (input) => /^#[0-9a-f]{6}$/.test(input),
    ecl: (input) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(input),
    pid: (input) => /^\d{9}$/.test(input),
    cid: (input) => true
  }

  const answer = raw.split('\n\n')              // Split into per-passport
    .map(str => str.replace(/\n/g, ' '))        // Convert per-passport to single line
    .map(str => str.split(' ')                  // Split per key-value-pair string (key:value)
      .map(kvpstr => kvpstr.split(':'))         // Split kvp into array
      .map(kvp => ({ [kvp[0]]: kvp[1] }))      // Map to js object
    )
    .map(kvpList => kvpList.reduce((passport, kvp) => ({ ...passport, ...kvp }), {})) // Reduce all kvps into single passport object
    .reduce((count, passport) => { // Reduce to count the valid ones
      const valid = requiredFields.reduce((valid, field) => valid && (field in passport) && validators[field](passport[field]), true)
      return valid ? count + 1 : count
    }, 0)

  console.log(answer)
}

run()
