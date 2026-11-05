//do-while loop
// let i=10;
// do{
//     console.log(i);
//     i++;
// }while(i<=5);




// let i=5;
// do{
//     i++;
//     if(i==8){
//         continue;
//     }
//     console.log(i);
    
// }while(i<=10);


//Function 
// user defiend  funchion 

// function  addition (a ,b){
//    return (a+b);
// }
// console.log(addition(5,3));



// function add (p,q){
//     r=p+q;
//     console.log(r);
// }
// add(7, 9);


// function add (p,q){
//     r=p*q;
//     console.log(r);
// }
// add(7, 9);


// function mult(a,b){//mult -function  name (a and b) -parameters
//    let  c= a*b;  //c -new variable 
//    return  c; // returning value of c 
// }
// let res = mult(7,9);// mult - function call ,( 7 and 9 )- Arguments               // res -new varible for result for result of a func 
// console.log(res); // printing result








// function income(_salary) {
//     return 'My salary  is ${_salary} '

// }
// let line =income (1000000);
// console.log(line);

// impure func 
// let incentive =Number(prompt('Enter incentive for this mouth:'));
// function income (salary){
//     let total= salary +incentive ;
//     return 'my salary is ${toatl}.'
// }
// let result= income (100000);
// console.log(result);

// first  class function

// let add =function (x,y){

//     let z = x+y;
//     return z;
// }
// let result =add(10,23);
// console.log(result);







//higer order

// function hello(){
//     console.log('Hello+1');

// }
// function higherOrder(hello){
//     for(let i=1; i<=3; i++){
//         hello() ;
//     }
// }
// higherOrder(hello);





// arrow function

// const welcome = (name) => `hello all this is ${name}`;

//  console.log (welcome('samarth'));



// const welcome = (name) => {
//     return `hello all this is ${name}`;
// }

// console.log(welcome('samarth'));





//Anonymous function

// ( function(){
//     console.log('Hello this is anonymous function');
// })
// ();



//nmber formtting  methods



// let num =123.4567;
// console.log(num.toFixed(2));


// let num =123.4567;
// console.log(num.toPrecision(4));


// let num =123.4567;
// console.log(Math.round(num));


// let num =123.4567;
// console.log(Math.floor(num));


// let num =123.4567;
// console.log(Math.ceil(num));