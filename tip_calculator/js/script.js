let bill = document.getElementById('bill-input')
let numberPeople = document.getElementById('people-input')

let valueTotal = document.getElementById('total')
let valueAmount = document.getElementById('amount')

let alert = document.getElementById('alert')
let alert_2 = document.getElementById('alert-2')

function changeInput() {
    if(bill.value == 0){
        alert.style.display = 'block'
        bill.style.border = '1px solid rgb(221, 61, 71)'
    }

    if(numberPeople.value == 0){
        alert_2.style.display = 'block'
        numberPeople.style.border = '1px solid rgb(221, 61, 71)'
    }
}

bill.addEventListener('input', ()=>{
    if(bill.value == 0){
        alert.style.display = 'block'
        bill.style.border = '1px solid rgb(221, 61, 71)'
    }else{
        alert.style.display = 'none'
        bill.style.border = 'none'
    }
})

numberPeople.addEventListener('input', ()=>{
    if(numberPeople.value == 0){
        alert_2.style.display = 'block'
        numberPeople.style.border = '1px solid rgb(221, 61, 71)'
    }else{
        alert_2.style.display = 'none'
        numberPeople.style.border = 'none'
    }
})

// Buttons
const container_btn = document.getElementById('container-btn')
container_btn.addEventListener('click', event => {
    let value = event.target.id
    
    if (bill.value != 0 && numberPeople.value != 0) {
        let totalByPerson = bill.value / numberPeople.value
        valueTotal.innerHTML = "$" + totalByPerson.toFixed(2)

        let amountByPerson = totalByPerson * (value / 100)
        valueAmount.innerHTML = "$" + amountByPerson.toFixed(2)
    } else {
        changeInput()
    }
})

//Input Custom
let customValue = document.getElementById('0')
customValue.addEventListener('input', () => {
    if (bill.value != 0 && numberPeople.value != 0){
        let totalByPerson = bill.value / numberPeople.value
        valueTotal.innerHTML = "$" + totalByPerson.toFixed(2)

        let amountByPerson = totalByPerson * (customValue.value / 100)
        valueAmount.innerHTML = "$" + amountByPerson.toFixed(2)
    }
})

//Button RESET
let reset = document.getElementById('reset')
reset.addEventListener('click', () => {
    valueTotal.innerHTML = "$0.00"
    valueAmount.innerHTML = "$0.00"
    bill.value = ''
    numberPeople.value = ''
    customValue.value = ''
    
})
