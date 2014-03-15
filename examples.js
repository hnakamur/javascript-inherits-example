var obj1 = {x: 12, y: "ab"};
var obj2 = new Object;
obj2.x = 34;
obj2.y = "cd";

var obj3 = [12, "ab"];
var obj4 = new Array(34, "cd");

console.log('instanceof Object tests');
console.log(obj1 instanceof Object);
console.log(obj2 instanceof Object);
console.log(obj3 instanceof Object);
console.log(obj4 instanceof Object);

console.log('constructor tests');
console.log(obj1.constructor === Object);
console.log(obj2.constructor === Object);
console.log(obj3.constructor === Array);
console.log(obj4.constructor === Array);

console.log('instanceof Array tests');
console.log(obj1 instanceof Array);
console.log(obj2 instanceof Array);
console.log(obj3 instanceof Array);
console.log(obj4 instanceof Array);

console.log('__proto__ and prototype tests');
console.log(obj1.__proto__ === Object.prototype);
console.log(obj2.__proto__ === Object.prototype);
console.log(obj3.__proto__ === Array.prototype);
console.log(obj4.__proto__ === Array.prototype);

console.log('__proto__.__proto__ tests');
console.log('obj1.__proto__.__proto__', obj1.__proto__.__proto__);
console.log('obj2.__proto__.__proto__', obj1.__proto__.__proto__);
console.log('obj3.__proto__.__proto__', obj1.__proto__.__proto__);
console.log('obj4.__proto__.__proto__', obj1.__proto__.__proto__);
console.log('obj1.__proto__', obj1.__proto__);
console.log('Object.prototype', Object.prototype);
console.log('Object.prototype.__proto__', Object.prototype.__proto__);
//console.log(obj1.__proto__.__proto__ === null);
//console.log(obj2.__proto__.__proto__ === null);
//console.log(obj3.__proto__.__proto__ === Object.prototype);
//console.log(obj4.__proto__.__proto__ === Object.prototype);
//console.log(obj3.__proto__.__proto__.__proto__ === null);
//console.log(obj4.__proto__.__proto__.__proto__ === null);

console.log('constructor name');
console.log('obj1.constructor.name:', obj1.constructor.name);
console.log('obj2.constructor.name:', obj2.constructor.name);
console.log('obj3.constructor.name:', obj3.constructor.name);
console.log('obj4.constructor.name:', obj4.constructor.name);

var x1 = {w: 10, h: 20, calc: function() {return this.w * this.h}};
var x2 = {w: 20, h: 30, calc: function() {return this.w * this.h}};

console.log('# calc');
console.log('x1.calc():', x1.calc());
console.log('x2.calc():', x2.calc());
console.log('x1.calc === x2.calc:', x1.calc === x2.calc);
console.log('x1.calc.toString() === x2.calc.toString():', x1.calc.toString() === x2.calc.toString());

function calc() {
  return this.w * this.h;
}

var x3 = {w: 10, h: 20, calc: calc};
var x4 = {w: 20, h: 30, calc: calc};
console.log('x3.calc():', x3.calc());
console.log('x4.calc():', x4.calc());
console.log('x3.calc === x4.calc:', x3.calc === x4.calc);

var x5 = {w: 10, h: 20, get area() {return this.w * this.h}};
var x6 = {w: 20, h: 30, get area() {return this.w * this.h}};
console.log('x5.area:', x5.area);
console.log('x6.area:', x6.area);

function Animal(name) {
  this.name = name;
}

Animal.prototype.introduce = function introduce() {
  console.log('私は ' + this.constructor.name + ' の ' + this.name + ' です。');
}

var a1 = new Animal('Annie');
a1.introduce();

var CSI = '\u001b['; // ANSI Control Sequence Introducer
var NORMAL = typeof window !== 'undefined' ? '' : CSI + 'm';
var GREEN = typeof window !== 'undefined' ? '' : CSI + '32m';
var RED = typeof window !== 'undefined' ? '' : CSI + '31m';
var YELLOW = typeof window !== 'undefined' ? '' : CSI + '33m';

function assertTrue(bool, msg) {
  if (!bool) console.error(RED + 'Error: ' + msg + NORMAL);
}

function verifyClassObject(obj, expected, keysExpected) {
  var name = expected[0];
  var Class = expected[1];
  var SuperClass = expected[2];

  var keys = [];
  for (var i in obj) {
    keys.push(i);
  }
  var keysActual = keys.join(',');
  if (keysActual === keysExpected) {
    console.info(GREEN + 'Success: keys = ' + keysActual + NORMAL);
  } else {
    console.error(RED + 'Error: keys = ' + keysActual + ', ' + NORMAL +
        YELLOW + 'Expected: keys = ' + keysExpected + NORMAL);
  }
  assertTrue(obj instanceof Class,
      name + 'は' + Class.name + 'のインスタンスではない。');
  if (SuperClass) {
    assertTrue(obj instanceof SuperClass,
        name + 'は' + SuperClass.name + 'のインスタンスではない。');
  }
  assertTrue(obj.constructor === Class,
      name + 'のコンストラクタは' + obj.constructor.name + 'で、' +
      Class.name + 'ではない。');
  assertTrue(Class.prototype.constructor === Class,
      Class.name + 'のプロトタイプは' + Class.prototype.constructor.name +
      'で、' + Class.name + 'ではない。');
  assertTrue(obj.__proto__.constructor === Class,
      name + 'の__proto__は' + obj.__proto__.constructor.name + 'で、' +
      Class.name + 'ではない。');
  if (SuperClass) {
    assertTrue(
        obj.__proto__.__proto__ === SuperClass.prototype &&
        obj.__proto__.__proto__.constructor === SuperClass &&
        Class.prototype.__proto__.constructor === SuperClass,
        name + 'の__proto__の__proto__は' +
        obj.__proto__.__proto__.constructor.name + 'で、' +
        SuperClass.name + 'ではない。');
  }

  var expectedString = expected.map(function (fn) {
    return typeof fn === 'function' ? fn.name : fn;
  }).join(' >> ');

  var ancestors = [name];
  for (var obj = obj.__proto__; obj; obj = obj.__proto__) {
    ancestors.push(obj.constructor.name);
  }

  var actualString = ancestors.join(' >> ');
  if (actualString === expectedString) {
    console.info(GREEN + 'Success: ' + actualString + NORMAL);
  } else {
    console.error(RED + 'Error: ' + actualString + ', ' + NORMAL +
        YELLOW + 'Expected: ' + expectedString + NORMAL);
  }
}

if (!('info' in console)) { console.info = console.log; }
if (!('error' in console)) { console.error = console.log; }

console.log('# a1');
verifyClassObject(a1, ['a1', Animal, Object], 'name,introduce');
console.log('# obj1');
verifyClassObject(obj1, ['obj1', Object], 'x,y');
console.log('# obj2');
verifyClassObject(obj2, ['obj2', Object], 'x,y');
console.log('# obj3');
verifyClassObject(obj3, ['obj3', Array, Object], '0,1');
console.log('# obj4');
verifyClassObject(obj4, ['obj4', Array, Object], '0,1');
console.log('# x1');
verifyClassObject(x1, ['x1', Object], 'w,h,calc');
console.log('# x2');
verifyClassObject(x2, ['x2', Object], 'w,h,calc');
console.log('# x3');
verifyClassObject(x3, ['x3', Object], 'w,h,calc');
console.log('# x4');
verifyClassObject(x4, ['x4', Object], 'w,h,calc');
console.log('# x5');
verifyClassObject(x5, ['x5', Object], 'w,h,area');
console.log('# x6');
verifyClassObject(x6, ['x6', Object], 'w,h,area');

console.log('# No good example #1');
function Bear(name) {
  Animal.call(this, name);
}
Bear.prototype = Animal.prototype;
var b1 = new Bear('Pooh');
b1.introduce();
verifyClassObject(b1, ['b1', Bear, Animal, Object], 'name,introduce');

console.log('# No good example #2');
function Cat(name) {
  Animal.call(this, name);
}
Cat.prototype = new Animal;
var c1 = new Cat('Kitty');
c1.introduce();
verifyClassObject(c1, ['c1', Cat, Animal, Object], 'name,introduce');

console.log('# Non-standard-compliant #1');
function Dog(name) {
  this.name = name;
}
Dog.prototype = {
  constructor: Dog,
  __proto__: Animal.prototype
};
var d1 = new Dog('Hachi');
d1.introduce();
verifyClassObject(d1, ['d1', Dog, Animal, Object], 'name,introduce');

console.log('# Non-standard-compliant #2');
function Elephant(name) {
  Animal.call(this, name);
}
Elephant.prototype.__proto__ = Animal.prototype;
var e1 = new Elephant('Dumbo');
e1.introduce();
verifyClassObject(e1, ['e1', Elephant, Animal, Object], 'name,introduce');

console.log('# No good example #3');
function Fox(name) {
  Animal.call(this, name);
}
Fox.prototype = Object.create(Animal.prototype);
Fox.prototype.constructor = Fox;
var f1 = new Fox('Gon');
f1.introduce();
verifyClassObject(f1, ['f1', Fox, Animal, Object], 'name,introduce');

console.log('# Correct example');
function Gorilla(name) {
  Animal.call(this, name);
}
//console.log(require('util').inherits.toString());
function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}
inherits(Gorilla, Animal);
var g1 = new Gorilla('Gon');
g1.introduce();
verifyClassObject(g1, ['g1', Gorilla, Animal, Object], 'name,introduce');


console.log('# Forgotten new trouble');
try {
  var badA2 = Animal('Annie');
  badA2.introduce();
} catch (err) {
  console.log(RED + err + NORMAL);
}

console.log('# Guard for forgotten new');
function Animal2(name) {
  if (!(this instanceof Animal2)) {
    return new Animal2(name);
  }
  this.name = name;
}

Animal2.prototype.introduce = function introduce() {
  console.log('私は ' + this.constructor.name + ' の ' + this.name + ' です。');
}

try {
  var a2 = Animal2('Annie');
  a2.introduce();
} catch (err) {
  console.log(RED + err + NORMAL);
}
