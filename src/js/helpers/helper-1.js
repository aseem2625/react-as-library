import 'helper-4'; // Base directory resolution to '.helpers/'
import { someFunction as someFun } from 'helper-3';

var unused = 1,
  indirectly_unused = 2,
  used = 3;


function grizzlyBear() {
  someFun('Sending a parcel. Print me plzzz.', indirectly_unused);
  console.log('I\'m Grrrizzly Bear!');
}

function grilledSandwich() {
  console.log('I\'m Grilled Sandwich!', used);
}

grilledSandwich();

export function honeySyrup() {
  console.log('I\'m Honey syrup!');
}

/*
* 1. Simple Fns. which are not used in this file will be removed from final iife.
*
* 2. Exported fns. must be used here or in file where they are imported, otherwise they'll also be removed.
*
* 3. Eg: Fn. honeySyrup is imported and used in other file.
* 4. Eg: Fn. grilledSandwich is used in this file.
*
* */
