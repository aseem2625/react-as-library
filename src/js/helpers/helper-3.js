export function someFunction(msg) {
  console.log('Bring me a message: ', msg);
}

export default function() {
  console.log('A default function');
}

function fnUsedInSameFile() {
  console.log('Random fn.');
}

fnUsedInSameFile();