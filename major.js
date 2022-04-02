'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,


};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,


};

// const accounts = [account1, account2];

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
                 
                  <div class="movements__value">${mov}</div>
                 </div>`

    containerMovements.insertAdjacentHTML("afterbegin",html)           

})


}



displayMovements(account1.movements)







const showFunc = function(ayaz,asef){
  
  const major = ayaz.concat(asef)
 
  let num1 =0

  let num2 = 0

   major.forEach(function(e){
     if(e>0){
       
       num1++
     }else{
       
       num2++
     }
   })

   console.log( `meni ededlerin sayi :${num2} -denedir`)
   console.log(` musbet ededlerin sayi :${num1} -denedir `)

}


showFunc([1,-5,-2,12,7],[11,-12,13,-45])









