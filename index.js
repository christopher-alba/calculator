//user input translates into a string 

let power = false
let display = "";

function getIndicatorIndex(){
    var index;
    for(let i = 0; i < display.length; i++){
        if(display[i] == "|"){
            index = i;
        }
    }
    return index;

}

function clickFunction(inputButton){

    let buttonPressed = inputButton;

    if(power == true){
        
        if( $(".calc-display h4").text() == "SYNTAX ERROR"){
          
            $(".calc-display h4").text(display);
        }
    
        if(buttonPressed == "DEL"){
            //delete character behind indicator
            
            //get location of indicator

            var location = getIndicatorIndex();
           
           
            if(location > 0){
              
    
                //add indicator to new position
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
            
            //add a '*' to any brackets used for multiplication
            let indexesOpen = [];
           
            
            //locate brackets
            for(let i = 0; i < display.length; i++){
    
                if(display[i] == "("){
                    if(typeof parseInt(display[i - 1],10) == "number" && i > 0){
                        let character = display[i-1];
                        if( character != "+" &&  character != "-" &&  character != "/" &&  character != "*" && character != "("){
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
          
    
            var ans;
            let trigger = true;
            //catch the syntax errors
            if(display != ""){
                try {
                    ans = eval(display);
                   
                  }
                  catch(err) {
                    
                    trigger = false;
                   
                
                    $(".calc-display h4").text("SYNTAX ERROR");
                  }
            }
            if(trigger == true){
                display = ans.toString();
               
                
                $(".calc-display h4").text(display);
            }
            
            
    
            
           
    
        }
        else{
    
            if(buttonPressed == "÷"){
                buttonPressed = "/";
                
            }
            if(buttonPressed == "X"){
                buttonPressed = "*"
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
    
                firstHalf = display.slice(0,location + 1);
                secondHalf = display.slice(location + 1);
                
                firstHalf += "|";
                display = firstHalf + secondHalf
    
               
            }
            else{
        
                
                display += buttonPressed;
    
                if(location == undefined){
                    display += "|";
                }
               
                
            }
            $(".calc-display h4").text(display);
            $('.calc-display').animate({scrollLeft:'+=1500'},500);
            
          
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




