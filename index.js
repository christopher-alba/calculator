//user input translates into a string 

let power = false
let display = "";

// memory variables
let memory = [];
let memoryIndex = 0;
currentlyAccessingLocation = 0;
let firstPrev = true;
let justAnswered = false;

function getIndicatorIndex(){
    var index;
    for(let i = 0; i < display.length; i++){
        if(display[i] == "|"){
            index = i;
        }
    }
    return index;

}

function finalizeString(string){
    
    //convert all arithmetic operators to javascript equivalent
    string = string.replace(/x/g, "*");

    string = string.replace(/÷/g, "/");

    string = string.replace(/π/g, Math.PI);
    
    return string;

}
function square(number){
    return number*number;
}
function sqrt(number){
    return Math.sqrt(number);
}
function clickFunction(inputButton){

    let buttonPressed = inputButton;

    if(power == true){

        if(justAnswered == true){

            if(buttonPressed != "+" && buttonPressed != "-"&& buttonPressed != "x" && buttonPressed != "÷"){
                display = "";
            }



            justAnswered = false;
        }
       
        if( $(".calc-display h4").text() == "SYNTAX ERROR" || $(".calc-display h4").text() == "MATH ERROR"){
        
            $(".calc-display h4").text(display);
        }
    
        if(buttonPressed == "DEL"){
            //delete character behind indicator
            
            //get location of indicator

            var location = getIndicatorIndex();
            if(location == undefined){
                display += "|";
                location = getIndicatorIndex();

            }
            
            
            
            if(location > 0){
                
    
                
                let firstHalf = display.slice(0,location - 1);
                let secondHalf = display.slice(location);
                
    
                display = firstHalf + secondHalf;
                
                $(".calc-display h4").text(display);
            }
            
    
        }
        else if(buttonPressed == "AC"){
            //clear all input and output
            display = "|";
            $(".calc-display h4").text(display);
    
        }
        else if(buttonPressed == "NEXT"){            
            
            console.log("NEXT: ");
            
            if(memory.length > 0 && currentlyAccessingLocation < memory.length - 1){

            console.log(currentlyAccessingLocation);
            

                currentlyAccessingLocation++;
                display = memory[currentlyAccessingLocation];
                $(".calc-display h4").text(display);
                if(currentlyAccessingLocation == memory.length - 1){
                    firstPrev = true;
                    currentlyAccessingLocation--;
                    
                }

            }

    
        }
        else if(buttonPressed == "PREV"){

            
            //if this was the first time previous was
            
            
            if(firstPrev == true){
                memory[memoryIndex] = display;
                currentlyAccessingLocation++;
                
                
                firstPrev = false;
            }

                
            
            
            
            if(memory.length > 0 && currentlyAccessingLocation > 0){

                currentlyAccessingLocation--;
                
                
                
                display = memory[currentlyAccessingLocation];
                
                
                $(".calc-display h4").text(display);
                
            }
        }      
        else if(buttonPressed == "ON/OFF"){
            //turn off calculator
            power = false;
            display = "";
            $(".calc-display h4").text(display);
            $(".powerLight h4").text("OFF");
            $(".powerLight").removeClass("on");
        }
        else if(buttonPressed == "←"){
            //move indicator left
            //get location of indicator
            var location = getIndicatorIndex();
            
            
            if(location > 0){
                //remove indicator from display
                let firstHalf = display.slice(0,location);
                let secondHalf = display.slice(location+1);
    
                let newArray = firstHalf + secondHalf;
    
                //add indicator to new position
                firstHalf = newArray.slice(0,location - 1);
                secondHalf = newArray.slice(location - 1);
                firstHalf += "|";
    
                newArray = firstHalf + secondHalf;
                display = newArray;
                $(".calc-display h4").text(display);
            }
            if(location == undefined){
                //place location at end of display
                display += "|"
                $(".calc-display h4").text(display);
            }
            $('.calc-display').animate({scrollLeft:'-=20'},1);
            
    
        }
        else if(buttonPressed == "→"){
            //move indicator right
            var location = getIndicatorIndex();
            
            if(location == undefined){
                //place indicator at end of display
                display += "|"
                $(".calc-display h4").text(display);
            }
            else{
                
                    //remove indicator from display
                    let firstHalf = display.slice(0,location);
                    let secondHalf = display.slice(location+1);
        
                    let newArray = firstHalf + secondHalf;
        
                    //add indicator to new position
                    firstHalf = newArray.slice(0,location + 1);
                    secondHalf = newArray.slice(location + 1);
                    firstHalf += "|";
        
                    newArray = firstHalf + secondHalf;
                    display = newArray;
                    $(".calc-display h4").text(display);
    
            }
            $('.calc-display').animate({scrollLeft:'+=20'},1);
            
            
    
        }
        else if(buttonPressed == "="){
            //evaluate display using eval()
    
            //remove the indicator from display string
            var location = getIndicatorIndex();
    
            if(location != undefined){
                let firstHalf = display.slice(0,location);
                let secondHalf = display.slice(location+1);
        
                display = firstHalf + secondHalf;
            }
            
            let saveString = display;
            


            //add a '*' to any brackets used for multiplication
            let indexesOpen = [];
            
            
            
            //locate brackets
            for(let i = 0; i < display.length; i++){
                if(i > 0){
                    if(display[i] == "(" || display[i] == "s" || display[i] == "π"){
                    
                        if( isNaN(display[i-1]) == false){
                            
                            let character = display[i-1];
                            if( character != "+" &&  character != "-" &&  character != "/" &&  character != "*" && character != "(" ){
                                indexesOpen.push(i);
                            }
                                
                        }
                        else if(display[i - 1] == ")"){
    
                            indexesOpen.push(i);
    
                        }
                    }
        
                }
    
                
    
            }
            
            //perform insertions of '*'
    
            for(let i = 0; i < indexesOpen.length ; i++){
    
                //string into two
                let firstHalf = display.slice(0,indexesOpen[i]);
                let secondHalf = display.slice(indexesOpen[i]);
    
                //add * to 1st string
    
                firstHalf += "*";
    
                    //join strings back together 
                display = firstHalf + secondHalf;
    
                    //increase other indexes by 1
                for(let j = i; j < indexesOpen.length; j++){
    
                    indexesOpen[j]++;
    
                }
    
                
                
                
    
            }
            
            //process display to make javascript understand it
            display = finalizeString(display);
            
            
            var ans;
            let trigger = true;
            //catch the syntax errors
            if(display != ""){
                try {
                    ans = eval(display);
                    
                    }
                    catch(err) {
                    
                    console.log(err);
                    
                    trigger = false;
                    
                
                    $(".calc-display h4").text("SYNTAX ERROR");
                    }
            }
            if(trigger == true){

                if(ans == Infinity){
                    $(".calc-display h4").text("MATH ERROR");
                }
                else{
                    memory[memoryIndex] = saveString;
                    currentlyAccessingLocation = memoryIndex;
                    memoryIndex++;
                    display = ans.toString();
                    justAnswered = true;
                    $(".calc-display h4").text(display);
                }                
            }
            
            
    
            
            
    
        }
        else{
    
            if(buttonPressed == "x^2"){
                
                buttonPressed = "square()";
            }
            if(buttonPressed == "2√"){
                buttonPressed = "sqrt()";
            }
            var location = getIndicatorIndex();
            
            if(location >= 0){
                
    
                //remove indicator
                let firstHalf = display.slice(0,location);
                let secondHalf = display.slice(location + 1);
    
                display = firstHalf + secondHalf;
                //insert new item
                firstHalf = display.slice(0,location);
                secondHalf = display.slice(location);
    
                firstHalf += buttonPressed;
                
                display = firstHalf + secondHalf;
                //place indicator
                if(buttonPressed == "square()"){

                    firstHalf = display.slice(0,location + 7);
                    secondHalf = display.slice(location + 7);
                    
                    firstHalf += "|";
                    display = firstHalf + secondHalf;
                }
                else if(buttonPressed == "sqrt()"){
                    firstHalf = display.slice(0,location + 5);
                    secondHalf = display.slice(location + 5);
                    
                    firstHalf += "|";
                    display = firstHalf + secondHalf;
                }
                else{
                    firstHalf = display.slice(0,location + 1);
                    secondHalf = display.slice(location + 1);
                    
                    firstHalf += "|";
                    display = firstHalf + secondHalf;
                }
    
                
    
                
            }
            else{
        
                
                display += buttonPressed;
    
                if(location == undefined){
                    display += "|";
                }
                
                
            }
            $(".calc-display h4").text(display);

            
            $('.calc-display').animate({scrollLeft:'+=20'},1);
            
            
            
            
        }
        if(power == false){
            memory = [];
            memoryIndex = 0;
            currentlyAccessingLocation = 0;
            firstPrev = true;
        }
         
        
        
           
    }
    else{
        if(buttonPressed == "ON/OFF"){
            power = true;
            display = "|";
            $(".calc-display h4").text(display);

            $(".powerLight h4").text("ON");
            $(".powerLight").addClass("on");
        }
    }
    
}
document.getElementsByTagName("button")[0].addEventListener("touchStart",function(){
    let buttonPressed = this.textContent;
    clickFunction(buttonPressed);
} );
$("button").click(function(){
    let buttonPressed = this.textContent;
    clickFunction(buttonPressed);
});




