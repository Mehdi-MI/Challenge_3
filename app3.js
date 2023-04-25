const dayEl = document.querySelector("#day-output");
const monthEl = document.querySelector("#month-output");
const yearEl = document.querySelector("#year-output");

const dayLabel = document.querySelector(".for-day");
const monthLabel = document.querySelector(".for-month");
const yearLabel = document.querySelector(".for-year");

const requiredField = "This field is required";
const invalidDay = "Must be a valid day";
const invalidMonth = "Must be a valid month";
const invalidYear = "Must be in the past";
const invalidDate = "Must be a valid date"

const day = document.querySelector("#day-input");
const month = document.querySelector("#month-input");
const year = document.querySelector("#year-input");

//today's date
const todayDate = new Date();

//get last day based on month and year
const lastday = function(y,m){
    return  new Date(y, m, 0).getDate();
}

function dateInputOnSubmit(){
    if (day.value == ""){
        console.log("Empty Day")
        invalid(dayLabel, day, requiredField)
    }
    if (month.value == ""){
        console.log("Empty month")
        invalid(monthLabel, month, requiredField)
    }
    if (year.value == ""){
        console.log("Empty year")
        invalid(yearLabel, year, requiredField)
    }
    if (day.value != "" && month.value != "" && year.value != ""){
        const date = new Date(year.value, month.value - 1, day.value);

        checkIfDateValid(day.value, month.value, year.value, date);
    }   
}

function checkIfDateValid(dayV, monthV, yearV, inputDate){
    const currentYear = todayDate.getFullYear();
    
    if (parseInt(yearV) <= currentYear && parseInt(yearV) > 0){
        
        if (parseInt(monthV) <= 12 && parseInt(monthV) > 0){  

            if (lastday(yearV, monthV) >= parseInt(dayV) && parseInt(dayV) > 0){
                if(todayDate < inputDate){
                    console.log("Invalid Date")
                    invalid(dayLabel, day, invalidYear)
                    invalid(monthLabel, month, "")
                    invalid(yearLabel, year, "")
                } else 
                    calculateAge(inputDate, yearV, monthV) 
            } else {
                console.log("Invalid day")
                invalid(dayLabel, day, invalidDate)
                invalid(monthLabel, month, "")
                invalid(yearLabel, year, "")
            } 
        }
    }  
}

//calculate age
function calculateAge(inputDate, yearValue, monthValue){
    let yearAge, monthAge, dayAge;
    if (todayDate.getMonth() > inputDate.getMonth() || (todayDate.getMonth() == inputDate.getMonth() && todayDate.getDate() >= inputDate.getDate())) {
        yearAge = todayDate.getFullYear() - yearValue;
    }
    else {
        yearAge = todayDate.getFullYear() - yearValue - 1;
    }
    if (todayDate.getDate() >= inputDate.getDate()) {
        monthAge = todayDate.getMonth() - inputDate.getMonth();
    }
    else if (todayDate.getDate() < inputDate.getDate()) {
        monthAge = todayDate.getMonth() - inputDate.getMonth() - 1;
    }
    monthAge = monthAge < 0 ? monthAge + 12 : monthAge;
    if (todayDate.getDate() >= inputDate.getDate()) {
        dayAge = todayDate.getDate() - inputDate.getDate();
    } else {
        dayAge = todayDate.getDate() - inputDate.getDate() + lastday(yearValue, monthValue);
    }
    renderAge(dayAge, monthAge, yearAge);
}

// shows the calculated age
function renderAge(dayAge, monthAge, yearAge){
    valid(dayLabel, day)
    valid(monthLabel, month)
    valid(yearLabel, year)
    
    if(dayAge > 1)
        dayEl.innerHTML = `<span>${dayAge.toString()}</span> days`
    else
        dayEl.innerHTML = `<span>${dayAge.toString()}</span> day`

    if(monthAge > 1)
        monthEl.innerHTML = `<span>${monthAge.toString()}</span> months`
    else
        monthEl.innerHTML = `<span>${monthAge.toString()}</span> month`

    if(yearAge > 1)
        yearEl.innerHTML = `<span>${yearAge.toString()}</span> years`
    else
        yearEl.innerHTML = `<span>${yearAge.toString()}</span> year`
}

//check input day everytime the keys are click
function dayInput(){
    if (parseInt(day.value) > 31 || parseInt(day.value) <= 0){
        invalid(dayLabel, day, invalidDay)
    } else
        valid(dayLabel, day)
}

//check input month everytime the keys are click
function monthInput(){
    if (parseInt(month.value) > 12 || parseInt(month.value) <= 0){
        invalid(monthLabel, month, invalidMonth)
    } else
        valid(monthLabel, month)
}

//check input year everytime the keys are click
function yearInput(){
    const currentYear = todayDate.getFullYear();
    if (parseInt(year.value) > currentYear){
        invalid(yearLabel, year, invalidYear)
    } else if (parseInt(year.value) <= 0)
        invalid(yearLabel, year, "Must be a valid year")
    else
        valid(yearLabel, year)
}

// add errors design if date is invalid
function invalid(label, el, text){
    label.style.color = "red"
    el.style.border = "1px solid red"
    el.style.outlineColor = "red"
    label.setAttribute('text-content', text)
}

// change back to normal if date is valid
function valid(label, el){
    label.style.color = "#747474"
    el.style.border = "1px solid #74747460"
    el.style.outlineColor = "#874bfc"
    label.setAttribute('text-content', "")
}