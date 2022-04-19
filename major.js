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

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE


};

const account2 = {
  owner: 'Jessica Davis',
  movements: [-5000, 3400, -150, 790, -3210, 1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',


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
const inputTransferTo = document.querySelector('.form__input--to'); //
const inputTransferAmount = document.querySelector('.form__input--amount'); //
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//function

let displayMovements = function(movement , sort = false){

  containerMovements.innerHTML= ""

const movs = sort ? movement.slice().sort((a,b)=> a - b ) : movement


 movs.forEach(function(mov,index){
     
   
     //withdrawal
     let type = mov>0 ?"deposit":"withdrawal"

     let html = `<div class="movements__row">
                  <div class="movements__type movements__type--${type} ">${index+1} ${type}</div>
                 
                  <div class="movements__value">${mov.toFixed(2)} € </div>
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



const displayTotalPrice =function(acc){
   acc.balance=acc.movements.reduce((acc,tot)=>{
    return acc+=tot
  },0)
  labelBalance.textContent=`${acc.balance.toFixed(2)} €`
}






const displayOveralls = function(acc){
 const income =acc.movements.filter(mov=>mov>0).reduce((acc,tot)=>acc+tot)

 labelSumIn.textContent=`${income}€`


 const outcome = acc.movements.filter(mov=>mov<0).reduce((acc,tot)=>acc+tot)
 labelSumOut.textContent=`${Math.abs(outcome)}€`


 const interest =acc.movements.filter(mov=>mov>0).map(dep=>Math.ceil((dep*acc.interestRate)/100)).reduce((acc,tot)=>acc+tot)
 labelSumInterest.textContent=`${interest}€`
}


const updateUI =function(acc){
    //show blank
    displayMovements(acc.movements)
  
    //total price
    displayTotalPrice(acc)
  
    //overal summary
    displayOveralls(acc)
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

  
  updateUI(currentAccount)

 }

})



btnLoan.addEventListener("click",function(e){
  e.preventDefault()

  
  const amount = Math.floor(Number(inputLoanAmount.value))

  if(amount>0 && currentAccount.movements.some(mov =>mov >= amount*0.1)){
    currentAccount.movements.push(amount)

    updateUI(currentAccount)
  }

})



btnTransfer.addEventListener("click",function(e){

  e.preventDefault()


  
  const amount = Number(inputTransferAmount.value)
  
  const recivedAcc = accounts.find(acc => acc.username === inputTransferTo.value)
  
  
  inputTransferAmount.value = inputTransferTo.value ='';

  if(amount > 0 && recivedAcc && currentAccount.balance > amount && recivedAcc.username !== currentAccount.username){
    

    currentAccount.movements.push(-amount)
    recivedAcc.movements.push(amount)

    updateUI(currentAccount)

  
  }

})



btnClose.addEventListener("click",function(e){

  e.preventDefault()


  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value)=== currentAccount.pin){

    const index = accounts.findIndex(acc => acc.username === currentAccount.username)


    accounts.splice(index,1)

    containerApp.style.opacity = 0

  }

  inputCloseUsername.value =inputClosePin.value = ''



})

let sorted = false

btnSort.addEventListener("click",function(e){
  e.preventDefault()

  displayMovements(currentAccount.movements,!sorted)

  sorted =!sorted

})

//const summaryValue = accounts.map(acc=>acc.movements).flat()

// const summaryValue = accounts.flatMap(acc=>acc.movements).filter(data=>data>0).reduce((acc,tot)=>acc+tot, 0)

// console.log(summaryValue)


// const {deposits , witdrawals} = accounts.flatMap(acc=>acc.movements).reduce((sums,cur)=>{

//    cur>0 ? sums.deposits+=cur :sums.witdrawals+=cur

//    return sums 

// },{deposits:0,witdrawals:0})



// console.log(deposits , witdrawals)

// const array = [15, 16, 17, 18, 19];



// const main= array.reduce((acc,cur,index,arr)=>{
//   const data =acc+cur


//   // return data
// })

// console.log(`Accomiliator: ${acc}, Current:${cur}, Index : ${index}, Array:${arr} `)


//this a nice title

// console.log( 0.1 + 0.3 === 0.4)



// const a = +('25')

// console.log( a+5)



// const a =Number.parseInt('25px')

// console.log(Number.parseInt('2.5rem'))


// console.log(Number.parseFloat('2.5em'))


// console.log(Number.isNaN(20))
// console.log(Number.isFinite(+'25'))
// console.log(Number.isNaN(+parseInt('2rem'))


// console.log(Math.trunc(10.4))
// console.log(Math.trunc(10.5))



// console.log(Math.floor(20.3))
// console.log(Math.floor(20.7))



// console.log(Math.ceil(30.3))
// console.log(Math.ceil(30.6))



// console.log(Math.round(40.2))
// console.log(Math.round(40.4))


// const data = document.querySelectorAll('.movements__row')


// labelBalance.addEventListener('click' , function(){
//   // const data = document.querySelectorAll('.movements__row')
//  [...document.querySelectorAll('.movements__row')].forEach((ro,i)=>{
//    if( i % 2 === 1){
//      ro.style.backgroundColor = "red"
//    }if( i % 3 ===0){
//     ro.style.backgroundColor = "pink"
//    }
//  })
// })
























