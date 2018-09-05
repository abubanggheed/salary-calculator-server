
$(document).ready(onReady);

//global variables
let monthlyPayout;
let employees = [];

function onReady() {
    //set up events
    $('#addEmployeeButton').on('click', handleAddEmployee);
    $('#employeeList').on('click', '.removeEmployeeButton', handleRemoveEmployee);
    //finish dom
    updateMonthlyPayout();
}//end onReady

function handleAddEmployee() {//- Submit Button
    //get values from inputs
    let fName = $('#firstNameIn').val();
    let lName = $('#lastNameIn').val();
    let ID = $('#employeeIDIn').val();
    let title = $('#titleIn').val();
    let salary = $('#salaryIn').val();
    if (fName && lName && ID && title && salary) {
        //build a new table entry string
        $('#employeeList').append(`
            <tr>
                <td>${fName}</td>
                <td>${lName}</td>
                <td class="findID">${ID}</td>
                <td>${title}</td>
                <td class="findSalary">${salary}</td>
                <td><button class="removeEmployeeButton">Remove</button></td>
            </tr>
        `);
        //clear inputs
        $('#inputDiv').children('input').val('');
        //add new employee to array
        employees.push(new Employee(fName, lName, ID, title, salary));
        updateMonthlyPayout();
    } else{
        alert('All fields are required')
    }

}//end handleAddEmployee

function updateMonthlyPayout() {
    monthlyPayout = 0;
    //obtain array of salaries as strings
    let salaries = $('.findSalary');
    //sum salaries
    for (salary of salaries) {
        monthlyPayout += parseInt(salary.textContent);
    }
    //do some uninspiring work
    monthlyPayout = (monthlyPayout / 12);
    if (monthlyPayout > 20000) {
        $('#totalMonthlyLine').css('background-color', 'lightcoral');
    }
    monthlyPayout = monthlyPayout.toFixed(2);
    //put total on dom
    $('#totalMonthly').text(monthlyPayout);
}//end updateMonthlyPayout

function handleRemoveEmployee() {//-Remove Button
    //get row
    let row = $(this).closest('tr');
    //remove employee from array
    removeFromArray(row.children('.findID').text());
    //remove row that contains button
    row.remove();
    updateMonthlyPayout();
    //let monthly salary return to being black
    if (monthlyPayout <= 20000) {
        $('#totalMonthlyLine').css('background-color', 'white');
    }
}// end handleRemoveEmployee

function removeFromArray(ID) {
    for (let i in employees) {
        if (employees[i].ID === ID) {
            employees.splice(i, 1);
            return;
        }
    }
}//end removeFromArray


class Employee {
    constructor(fName, lName, ID, Title, Salary) {
        this.firstName = fName;
        this.lastName = lName;
        this.ID = ID;
        this.title = Title;
        this.salary = Salary;
    }
}// end Employee class