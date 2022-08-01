'reach 0.1';

const stopwatch=30;

const sharedTimer= {
 Timer: Fun([UInt], Null)
}

export const main = Reach.App(() => {
  //Alice is the owner of the fund (5000 native token)
  const A = Participant('Alice', {
    ...sharedTimer,
    vaultFund: UInt,
    getChoice: Fun([],Bool)
    
  });
  //Bob is the attacher
  const B = Participant('Bob', {
    ...sharedTimer,
    acceptTerm: Fun([UInt], Bool),
   
    
  });
  init();
  A.only(()=>{
    const fund= declassify(interact.vaultFund);
    
  });
  A.publish(fund)
   .pay(fund);
  commit();
  B.only(()=>{
    const Term= declassify(interact.acceptTerm(fund));
    
  });
  B.publish(Term)
 
  commit();
  each([A,B],()=>{
    interact.Timer(stopwatch);
  })
  A.only(()=>{
    const choice=declassify(interact.getChoice());
  })
  A.publish(choice)
  if(choice){
    transfer(fund).to(A);
  } else{
    transfer(fund).to(B);
  }
  commit();
  // write your program here
  exit();
});
