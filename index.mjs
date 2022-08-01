import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);


const startingBalance = stdlib.parseCurrency(100);

const  accBob  =
  await stdlib.newTestAccount( startingBalance);
console.log('Hello, Alice and Bob!');
const accAlice= await stdlib.newTestAccount(stdlib.parseCurrency(3000))
console.log('Launching the vault...');
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());
const getBalance = async (x)=> await stdlib.formatCurrency(await stdlib.balanceOf(x))

const choiceArray= ["I am not here", "I am still here"]
const AliceBalanceB4= await getBalance(accAlice)
const BobBalanceB4= await getBalance(accBob)

console.log(`Alice balance is ${AliceBalanceB4}Algos`)
console.log(`Bob balance is ${BobBalanceB4}Algos`)
const sharedTimer= ()=>({
  Timer:(time)=>{
    console.log("The WATCH:")
    console.log(parseInt(time))
  }
})

console.log('Starting backends...');
await Promise.all([
  backend.Alice(ctcAlice, {
     ...sharedTimer(),
     vaultFund: stdlib.parseCurrency(1000),
     getChoice: ()=>{
      const choice=Math.floor(Math.random()*2)
      console.log(`Alice's choice : ${choiceArray[choice]}`)
      return (choice==0? false: true)
     }
    
    
  }),
 

  
  backend.Bob(ctcBob, {
    ...sharedTimer(),
    acceptTerm: (amt)=>{
      console.log(`Bob accepted ${stdlib.formatCurrency(amt)}`)
      return true
    },
  
 
  
  }),
]);
const after= await getBalance(accAlice)
console.log(`Alice's balance, from ${AliceBalanceB4} to: ${after}Algos`)
const afters=  await getBalance(accBob)
console.log(`Bob's balance, from ${BobBalanceB4} to : ${afters}Algos`)


console.log('Goodbye, Alice and Bob!');
