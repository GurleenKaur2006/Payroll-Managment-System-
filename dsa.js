

let employees = JSON.parse(localStorage.getItem("employees")) || [];





class Node{

    constructor(data){

        this.data = data;
        this.next = null;

    }

}


class LinkedList{


    constructor(){

        this.head = null;

    }


    insert(data){

        let node = new Node(data);


        if(this.head === null){

            this.head = node;

        }

        else{

            let current = this.head;


            while(current.next){

                current = current.next;

            }


            current.next = node;

        }

    }



    display(){

        let result = [];

        let current = this.head;


        while(current){

            result.push(current.data);

            current=current.next;

        }


        return result;

    }


}



let employeeLinkedList = new LinkedList();



/* =========================================
             Stack
          Undo Operations
========================================= */


class Stack{


    constructor(){

        this.items=[];

    }



    push(data){

        this.items.push(data);

    }



    pop(){

        return this.items.pop();

    }



    display(){

        return this.items;

    }


}



let undoStack = new Stack();



/* =========================================
             Queue
        Payroll Processing
========================================= */


class Queue{


    constructor(){

        this.items=[];

    }



    enqueue(data){

        this.items.push(data);

    }



    dequeue(){

        return this.items.shift();

    }



    display(){

        return this.items;

    }


}



let payrollQueue = new Queue();



/* =========================================
          Merge Sort Algorithm

          Used for Salary Sorting
========================================= */


function mergeSort(array, key){


    if(array.length <=1){

        return array;

    }



    let middle=Math.floor(array.length/2);



    let left=mergeSort(
        array.slice(0,middle),
        key
    );


    let right=mergeSort(
        array.slice(middle),
        key
    );


    return merge(left,right,key);


}



function merge(left,right,key){


    let result=[];


    while(left.length && right.length){


        if(left[0][key] <= right[0][key]){


            result.push(left.shift());


        }


        else{


            result.push(right.shift());


        }


    }



    return result.concat(left,right);


}



/* =========================================
          Recursion

       Total Payroll Calculation
========================================= */


function calculateTotalSalary(index=0){


    if(index >= employees.length){

        return 0;

    }


    return Number(employees[index].netSalary)
    +
    calculateTotalSalary(index+1);


}



/* =========================================
       Highest Salary
========================================= */


function getHighestSalary(){


    if(employees.length===0)

        return 0;



    let highest=employees[0].netSalary;



    employees.forEach(emp=>{


        if(emp.netSalary > highest){

            highest=emp.netSalary;

        }


    });


    return highest;

}



/* =========================================
       Lowest Salary
========================================= */


function getLowestSalary(){


    if(employees.length===0)

        return 0;



    let lowest=employees[0].netSalary;



    employees.forEach(emp=>{


        if(emp.netSalary < lowest){

            lowest=emp.netSalary;

        }


    });



    return lowest;


}


/* =========================================
       Local Storage Save
========================================= */


function saveEmployees(){


    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );


}
