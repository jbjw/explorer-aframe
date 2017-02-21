//

var qs = document.querySelector.bind(document);

var operand1Input = qs('#operand1');
var operaterInput = qs('#operand2');
var operand2Input = qs('#operand2');
var resultInput = qs('#result');

var b1 = parseInt('1011', 2);
var b2 = parseInt('1101', 2);

var result = (b1 & b2);

01111

10000

b && !(b & (b - 1))

~b && !(~b & (~b - 1))


console.log(result.toString(2))
