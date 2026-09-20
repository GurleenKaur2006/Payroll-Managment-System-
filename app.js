

function addEmployee(){


    let id=document.getElementById("empId").value;

    let name=document.getElementById("empName").value;

    let dept=document.getElementById("empDept").value;

    let salary=Number(document.getElementById("empSalary").value);

    let allowance=Number(document.getElementById("empAllowance").value);

    let deduction=Number(document.getElementById("empDeduction").value);



    if(!id || !name || !salary){

        alert("Please enter required details");

        return;

    }



    let grossSalary =
        salary + allowance;



    let netSalary =
        grossSalary - deduction;



    let employee={

        id:Number(id),

        name:name,

        dept:dept,

        salary:salary,

        allowance:allowance,

        deduction:deduction,

        grossSalary:grossSalary,

        netSalary:netSalary

    };



    employees.push(employee);



    employeeLinkedList.insert(employee);



    undoStack.push({

        action:"ADD",

        data:employee

    });



    saveEmployees();



    displayEmployees();


    clearForm();


    alert("Employee Added Successfully");


}







function displayEmployees(){


    let table=document.getElementById("employeeTable");


    if(!table)

        return;



    table.innerHTML="";



    employees.forEach((emp,index)=>{


        table.innerHTML += `

        <tr>

        <td>${emp.id}</td>

        <td>${emp.name}</td>

        <td>${emp.dept}</td>

        <td>₹${emp.salary}</td>

        <td>₹${emp.allowance}</td>

        <td>₹${emp.deduction}</td>

        <td>₹${emp.grossSalary}</td>

        <td>₹${emp.netSalary}</td>


        <td>

        <button class="edit-btn"
        onclick="editEmployee(${index})">

        Edit

        </button>


        <button class="delete-btn"
        onclick="deleteEmployee(${index})">

        Delete

        </button>


        </td>


        </tr>

        `;


    });


}






function clearForm(){


    let fields=[

        "empId",
        "empName",
        "empDept",
        "empSalary",
        "empAllowance",
        "empDeduction"

    ];



    fields.forEach(id=>{


        let element=document.getElementById(id);


        if(element)

            element.value="";


    });


}







function deleteEmployee(index){


    let removed=employees[index];



    undoStack.push({

        action:"DELETE",

        data:removed

    });



    employees.splice(index,1);



    saveEmployees();


    displayEmployees();


}








let editIndex=-1;



function editEmployee(index){


    let emp=employees[index];


    editIndex=index;



    document.getElementById("empId").value=emp.id;

    document.getElementById("empName").value=emp.name;

    document.getElementById("empDept").value=emp.dept;

    document.getElementById("empSalary").value=emp.salary;

    document.getElementById("empAllowance").value=emp.allowance;

    document.getElementById("empDeduction").value=emp.deduction;


}




function updateEmployee(){


    if(editIndex==-1){

        alert("Select employee first");

        return;

    }



    let emp=employees[editIndex];



    undoStack.push({

        action:"UPDATE",

        data:{...emp}

    });



    emp.name=document.getElementById("empName").value;

    emp.dept=document.getElementById("empDept").value;

    emp.salary=
    Number(document.getElementById("empSalary").value);



    emp.allowance=
    Number(document.getElementById("empAllowance").value);



    emp.deduction=
    Number(document.getElementById("empDeduction").value);



    emp.grossSalary =
    emp.salary + emp.allowance;



    emp.netSalary =
    emp.grossSalary - emp.deduction;



    saveEmployees();


    displayEmployees();



    editIndex=-1;


}





function searchEmployee(){


    let value=
    document.getElementById("searchEmployee")
    .value
    .toLowerCase();



    let rows=
    document.querySelectorAll("#employeeTable tr");



    rows.forEach(row=>{


        row.style.display =
        row.innerText
        .toLowerCase()
        .includes(value)
        ?
        ""
        :
        "none";


    });


}







function loadDashboard(){


    let total=
    document.getElementById("totalEmployees");


    let payroll=
    document.getElementById("totalPayroll");


    let high=
    document.getElementById("highestSalary");


    let low=
    document.getElementById("lowestSalary");



    if(total){

        total.innerHTML=employees.length;

    }


    if(payroll){

        payroll.innerHTML=
        "₹"+calculateTotalSalary();

    }


    if(high){

        high.innerHTML=
        "₹"+getHighestSalary();

    }



    if(low){

        low.innerHTML=
        "₹"+getLowestSalary();

    }


}







function processPayroll(){


    let table=
    document.getElementById("payrollTable");



    if(!table)

        return;



    table.innerHTML="";



    employees.forEach(emp=>{


        payrollQueue.enqueue(emp);



    });



    let totalGross=0;

    let totalNet=0;



    while(payrollQueue.items.length){


        let emp=
        payrollQueue.dequeue();



        totalGross+=emp.grossSalary;

        totalNet+=emp.netSalary;



        table.innerHTML += `

        <tr>

        <td>${emp.id}</td>

        <td>${emp.name}</td>

        <td>₹${emp.grossSalary}</td>

        <td>₹${emp.netSalary}</td>

        <td class="status-success">
        Completed
        </td>

        </tr>

        `;


    }



    document.getElementById("payrollEmployees").innerHTML=
    employees.length;



    document.getElementById("grossTotal").innerHTML=
    totalGross;



    document.getElementById("netTotal").innerHTML=
    totalNet;


}




/* =========================================
        Reports
========================================= */


function displayReports(list=employees){


    let table=
    document.getElementById("reportTable");



    if(!table)

        return;



    table.innerHTML="";



    list.forEach(emp=>{


        table.innerHTML +=`

        <tr>

        <td>${emp.id}</td>

        <td>${emp.name}</td>

        <td>${emp.dept}</td>

        <td>₹${emp.netSalary}</td>

        </tr>

        `;


    });


}



function sortSalary(){


    let sorted=
    mergeSort([...employees],"netSalary");


    displayReports(sorted);


}



function sortName(){


    let sorted=
    mergeSort([...employees],"name");


    displayReports(sorted);


}



function sortId(){


    let sorted=
    mergeSort([...employees],"id");


    displayReports(sorted);


}




function loadReports(){


    displayReports();



    let avg=0;


    if(employees.length){

        avg=
        calculateTotalSalary()
        /
        employees.length;

    }



    let ids=[

        "reportHighest",

        "reportLowest",

        "reportAverage",

        "reportTotal"

    ];



    if(document.getElementById(ids[0])){

        document.getElementById(ids[0]).innerHTML=
        "₹"+getHighestSalary();

        document.getElementById(ids[1]).innerHTML=
        "₹"+getLowestSalary();

        document.getElementById(ids[2]).innerHTML=
        "₹"+Math.floor(avg);

        document.getElementById(ids[3]).innerHTML=
        "₹"+calculateTotalSalary();

    }


}





/* =========================================
        Undo Stack
========================================= */


function undoLastAction(){


    let action=
    undoStack.pop();



    if(!action){

        alert("Nothing to undo");

        return;

    }



    if(action.action=="ADD"){


        employees.pop();


    }


    else if(action.action=="DELETE"){


        employees.push(action.data);


    }


    else if(action.action=="UPDATE"){


        let index=
        employees.findIndex(
        e=>e.id==action.data.id
        );


        if(index!=-1)

            employees[index]=action.data;


    }



    saveEmployees();


    displayEmployees();


}





function clearHistory(){


    undoStack.items=[];

    alert("History Cleared");


}




/* =========================================
        Linked List Display
========================================= */


function displayLinkedList(){


    let box=
    document.getElementById("linkedListDisplay");



    if(!box)

        return;



    let data=
    employeeLinkedList.display();



    box.innerHTML=
    data.map(emp=>
    emp.name
    )
    .join(" ➜ ");


}





/* =========================================
        Page Load
========================================= */


window.onload=function(){


    employees.forEach(emp=>{

        employeeLinkedList.insert(emp);

    });


    displayEmployees();

    loadDashboard();

    loadReports();


};
