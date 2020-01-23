module.exports = function parseStringAsArray(arrayasString) {
     return arrayasString.split(',').map(tech => tech.trim());
}