function getUserInfo(){
    let name = prompt("What is your full name?");
    let age = prompt("how old are you?");

    let output = "Hi, my name is " + name + " and i'm " + age + " years old";

    document.getElementById("content").innerHTML = output;

    

}
window.onload = getUserInfo; //dont use getUserInfo() because it will call the function immediately