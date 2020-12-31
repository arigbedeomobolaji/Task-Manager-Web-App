const isEmpty = (obj) => {
 var counter = 0;
 for (let key in obj) {
  counter++
 }
return counter === 0
}

module.exports = isEmpty