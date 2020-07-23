'use strict';

function main1() {
  console.log(i);
  if (true) {
    var i = 42;
  }
  console.log(i)
}

/*
function main1() {
  var i;
  console.log(i);
  if (true) {
      i = 42;
  }
  console.log(i)
}
*/

//main1();


function main2() {
  //console.log(i); // ReferenceError not defined
  if (true) {
    //console.log(i); // ReferenceError cannot access before initialization
    const i = 42;
    i = 33; // TypeError assignment to constant variable
    console.log(o); // TypeError assignment to constant
  }
  //console.log(i); // ReferenceError not defined
}

main2();