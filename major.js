'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30 ],
  interestRate: 1.2, // %
  pin: 1111,


};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,


};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//function

let displayMovements = function(movement){

  containerMovements.innerHTML= ""

 movement.forEach(function(mov,index){
     
   
     //withdrawal
     let type = mov>0 ?"deposit":"withdrawal"

     let html = `<div class="movements__row">
                  <div class="movements__type movements__type--${type} ">${index+1} ${type}</div>
                 
                  <div class="movements__value">${mov} € </div>
                 </div>`

    containerMovements.insertAdjacentHTML("afterbegin",html)           

})


}

displayMovements(account1.movements)



const createUsernames = function(accs){
   accs.forEach(function(acc){
     acc.username = acc.owner.toLowerCase().split(" ").map((name)=>name[0]).join("")
   })
}




createUsernames(accounts)

const displayTotalPrice =function(total){
   const main=total.reduce((acc,tot)=>{
    return acc+=tot
  },0)
  labelBalance.textContent=`${main} €`
}



displayTotalPrice(account1.movements)





const displayOveralls = function(movements){
 const income = movements.filter(mov=>mov>0).reduce((acc,tot)=>acc+tot)

 labelSumIn.textContent=`${income}€`


 const outcome = movements.filter(mov=>mov<0).reduce((acc,tot)=>acc+tot)
 labelSumOut.textContent=`${Math.abs(outcome)}€`


 const interest = movements.filter(mov=>mov>0).map(dep=>Math.ceil((dep*1.2)/100)).reduce((acc,tot)=>acc+tot)
 labelSumInterest.textContent=`${interest}€`
}


displayOveralls(account1.movements)







// const main =[-20,-10,-8,-6,-4,-2,0,1,2,4,6,18,20,40]

// // const main = arr.filter(data =>data>18)
// // const mained=main.length

// // const data =main.map( arr=>arr).filter(age=>age>=18).reduce((acc,tot,i, arr)=>  arr)




// const data =main.find((mov)=>mov>0)

// console.log(data)



const users = [
  {name:'Ayaz',age:23},
  {name:'Asef',age:20},
  {name:'Akber',age:25},
  {name:'Cavad',age:23}
]





const data =users.find(user =>{
  return user.name ==="Ayaz" &&user.age===23
})

console.log(data)

// const empty =[]

//  users.forEach(function(e){
//    if(e.age===23 && e.name==="Ayaz"){
//      empty.push(e)
//    }
//  })

//  console.log(empty)













