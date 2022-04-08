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
  movements: [-5000, 3400, -150, 790, -3210, 1000, 8500, -30],
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






const displayOveralls = function(acc){
 const income =acc.movements.filter(mov=>mov>0).reduce((acc,tot)=>acc+tot)

 labelSumIn.textContent=`${income}€`


 const outcome = acc.movements.filter(mov=>mov<0).reduce((acc,tot)=>acc+tot)
 labelSumOut.textContent=`${Math.abs(outcome)}€`


 const interest =acc.movements.filter(mov=>mov>0).map(dep=>Math.ceil((dep*acc.interestRate)/100)).reduce((acc,tot)=>acc+tot)
 labelSumInterest.textContent=`${interest}€`
}





let currentAccount;


btnLogin.addEventListener("click",function(e){
  e.preventDefault()

  
 currentAccount=accounts.find(acc =>acc.username ===inputLoginUsername.value)
   


 if( currentAccount?.pin === Number(inputLoginPin.value)){
    
  //heading
  labelWelcome.textContent = `Welcome back ${ currentAccount.owner.split(' ')[0]}`

  //container visiblity
  containerApp.style.opacity=1

  //clear input files
  inputLoginUsername.value = inputLoginPin.value=""
  
  
  //blur to pin
  inputLoginPin.blur()  


  //show blank
  displayMovements(currentAccount.movements)
  
  //total price
  displayTotalPrice(currentAccount.movements)

  //overal summary
  displayOveralls(currentAccount)

 }

})













