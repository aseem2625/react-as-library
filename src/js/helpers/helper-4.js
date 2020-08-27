const unusedVar = 'Unused variabled is removed from iife';
const usedVar = 'Used variable is kept in iife';


function funnyBear() {
  console.log('Seriously! I\'m a Bear. I\'m not funny at all!');
  console.log('This fn. is included in iife when used "import from \'helper-4.js\'"', usedVar);
}

funnyBear(); // Any unused fn would be removed from generated iife

export function bla() {
  console.log('...This function is not included in iife by just used "import from \'helper-4.js\'"');
}


