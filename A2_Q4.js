function calculateOrder(){
    let quantityBWP = Math.floor(document.getElementById("BWP").value);
    let quantityPHP = Math.floor(document.getElementById("PHP").value);
    let quantityJQ = Math.floor(document.getElementById("JQ").value);
    let total = 0;
    let BWPCost = 19.99;
    let PHPCost = 86.00;
    let JQCost = 55.00;

    if (quantityBWP < 0 || quantityPHP < 0 || quantityJQ < 0){
        alert("Please enter a valid quantity");
    }
    else{
        BWPCost = BWPCost * quantityBWP;
        PHPCost = PHPCost * quantityPHP;
        JQCost = JQCost * quantityJQ;

        total = quantityBWP * BWPCost + quantityPHP * PHPCost + quantityJQ * JQCost;
        total = total.toFixed(2);
        document.getElementById("PHPPrice").innerHTML = "<b>PHP Programming </b>" +"<b>(Quantity = " +quantityPHP +"): </b>"+ "$" + PHPCost;
        document.getElementById("JQPrice").innerHTML = "<b>JQuery Programming </b>" +"<b>(Quantity = " +quantityJQ +"): </b>"+ "$" + JQCost;
        document.getElementById("BWPPrice").innerHTML = "<b>Basic Web Programming </b>" +"<b>(Quantity = " +quantityBWP +"): </b>"+ "$" + BWPCost;
        document.getElementById("TotalPrice").innerHTML = "<b>Final Total: </b>" +"$"+total ;
        
    }
}