var $ = require('./jDummy');

var a = $('<div>', {
    html: 'hello'
});
var b = $('<div>', {
    class: 'foo'
});
var c = $('<span>', {
    class: 'bar',
    html: 'bam'
});
b.append(c);
a.append(b);
console.log(a.html());