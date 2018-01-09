
underscore = require('./node_modules/underscore/underscore-min.js')
fs = require('fs')
// import fs from 'fs'

console.log('\nMPJ "Fun Fun Function" YouTube Series:')
console.log(' + Functional Javascript')
console.log(' - Higher Order Functions')

console.log('\nWhy use higher order functions?')
console.log('\n- less bugs (easier to reason code)\n- better code reusability')

console.log('\nTechnical:\n')
console.log('functions are values.')
console.log('They can be passed into other funcntiuons - higher order functions.')
console.log('This facilitates composition.')

console.log('\nExamples:\n')

// Example vanilla function.
function triple (x) {
  return x * 3
}

// Anonymous function assigned to variable.
var triple = function (x) {
  return x * 3
}

// Taking it farther...
var waffle = triple
// console.log(waffle(30))   // 90

// LIST TRANSFORMATIONS & HOF: Filter, (Reject), Find, Map, Reduce

// Test Data.
var animals = [
 { name: 'Almotheuselah Slumbig', species: 'cat' },
 { name: 'Bilgorbrino Callafey', species: 'dog' },
 { name: 'Sneerdawb Glerfnerder', species: 'mouse' },
 { name: 'Squeeshaw Megaplor', species: 'bird' },
 { name: 'Zephnorslengdune Grelzborg', species: 'cat' },
 { name: 'Xylophornbog Dildrongus', species: 'dog' },
 { name: 'Waldo', species: 'fly' },
 { name: 'Jurgencrudgeball Vinegrastor', species: 'bird' },
 { name: 'Grimlorbahn Freshdig', species: 'cat' },
 { name: 'Saquahatchee Tuxmond', species: 'dog' },
 { name: 'Tryphtanus Mekidatees', species: 'mouse' },
 { name: 'Vordungul Paradeegra', species: 'bird' },
 { name: 'Nelfor Brythmeling', species: 'cat' },
 { name: 'Draguleent Morgunalis', species: 'dog' },
 { name: 'Fornitudinas Phaedridast', species: 'mouse' },
 { name: 'Reglinarshal Mungdoon', species: 'bird' },
 { name: 'Creptyfoil Smattershod', species: 'mouse' }
]
console.log('\nAnimals array: ', animals)


// FILTER METHOD.

// Using vanilla function.
var dogs = []
for (var i=0; i < animals.length; i++) {
  if (animals[i].species === 'dog')
    dogs.push(animals[i])
}
console.log('\nDogs array: \n', dogs)

// Using filter function.
var doges = animals.filter(function(animal) {
  return animal.species === 'dog'
})
console.log('\nDoges array: \n', doges)

// Breaking the filter function into parts.
var isDog = function(animal) {
  return animal.species === 'dog'
}
var modoges = animals.filter(isDog)
console.log('\nModoges array: \n', modoges)

// Try cats.
var isCat = function(animal) {
  return animal.species === 'cat'
}
var cats = animals.filter(isCat)
console.log('\nCats array: \n', cats)


// REJECT METHOD.

// Try NOT dogs. Requires underscore.
var notdoges = underscore.reject(animals, isDog)
console.log('\nNotdoges array: \n', notdoges)


// MAP METHOD.
// GOAL: Get list of the names of all the animals.

// Vanilla approach.
var names = []
for (var i=0; i < animals.length; i++) {
  names.push(animals[i].name)
}
console.log('\nNames array: \n', names)

// Using map function.
var mapnames = animals.map(function(animal) {
  return animal.name
})
console.log('\nMapnames array: \n', mapnames)

// Return a new object instead.
var momapnames = animals.map(function(animal) {
  return animal.name + ' is a ' + animal.species
})
console.log('\nMomapnames array: \n', momapnames)

// Arrow functions! Even more concise.
// var arrownames = animals.map((animal) => { return animal.name })
// var arrownames = animals.map((animal) => animal.name )
var arrownames = animals.map((x) => x.name )
console.log('\nArrownames array: \n', arrownames)


// REDUCE METHOD.

// Review:
// MAP - Takes an array and transforms to array of same length with each individual item transformed.
// FILTER - Takes an array and transforms it into a smaller (filtered) array.
// REJECT - Same as filter but inverted.
// FIND - Same as filter but only returns the first item.

// So what is reduce? What if you can't find an object that fits the criteria for the other list transformations?
// REDUCE can be used to implement any other list transformation. It is the SUPER list transformation method. It can express any list transformation.

// Some Dummy Data.
var orders = [
  { amount: 250 },
  { amount: 400 },
  { amount: 100 },
  { amount: 325 }
]

// GOAL: Summarize the amounts.

// Vanilla method.
var totalAmount = 0
for (var i=0; i < orders.length; i++) {
  totalAmount += orders[i].amount
  console.log('\niteration: ', i, totalAmount)
}
console.log('\ntotalAmount: \n', totalAmount)

// Using reduce.
// var reduceTotalAmount = orders.reduce(function(sum, order) {
//   console.log('\nreduce iteration: ', sum, order)
//   return sum + order.amount
// }, 0)

// Arrow functions!
var reduceTotalAmount = orders.reduce((sum, order) => sum + order.amount, 0)
console.log('\nreduceTotalAmount: \n', reduceTotalAmount)


// MOAR REDUCE METHOD.

// We can use reduce for much more than reducing numbers.
// Lets reduce an array and mutate an object.

// GOAL: Transform plain text data into object literals.
// user name, item name, item price, item qty

// Raw Buffer data.
// var output = fs.readFileSync('data.txt')
// console.log('\noutput:\n', output)

// UTF-8 data.
// var output = fs.readFileSync('data.txt', 'utf8')
// console.log('\noutput:\n', output)

// Split up into elements.
// var output = fs.readFileSync('data.txt', 'utf8').split('\n')
// console.log('\noutput:\n', output)

// Trim the lines.
// var output = fs.readFileSync('data.txt', 'utf8').trim().split('\n')
// console.log('\noutput:\n', output)

// Map the lines to array objects.
// var output = fs.readFileSync('data.txt', 'utf8')
//   .trim()
//   .split('\n')
//   .map(line => line.split('\t'))
// console.log('\noutput:\n', output)

// Reduce the array objects.
var output = fs.readFileSync('test-data.txt', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split('\t'))
  .reduce((customers, line) => {
    // console.log('line: ', line)
    customers[line[0]] = customers[line[0]] || []
    customers[line[0]].push({
      name: line[1],
      price: line[2],
      quantity: line[3]
    })
    return customers
  }, {})
// console.log('\noutput:\n', output)
console.log('\noutput:\n', JSON.stringify(output, null, 4))   // Better output logging.




//
