    var totalPrice = 0;
    var totalHunger = 0;
    var goalPrice = 30;

$(function() {
        var thing = $( "#sortable" ).sortable();
        $( "#sortable" ).on( "sortchange", function(){console.log("HIII")} );
        
        $( "#sortable" ).disableSelection();
    
        $( "#sortable1, #sortable2" ).sortable({
          connectWith: ".connectedSortable", update: updateStatus
        }).disableSelection();
        
      });

function updateStatus(){
    //Calculates the total price and hunger
    totalPrice = 0;
    var imageList = $(".itemContainer2").find("img");
    totalHunger = 0;
    var hungerList = $(".itemContainer2").find("img");
    var currentImg = "";
    for(var x = 0; x < imageList.length ; x++){
        currentImg = imageList[x];
        totalPrice += parseInt($(currentImg).attr("data-price"));
        totalHunger += parseInt($(currentImg).attr("data-hunger"));
    }
    
    if(totalHunger>100)
        totalHunger = 100;
    $(".price").text("$"+totalPrice+ "/$30");
    $(".hunger").text(totalHunger + "%");
    
    $(".bar").attr("style", "width: "+totalHunger+"%") //progress bar
    
    priceStatusLabel(totalPrice);
    DONEbuttonUpdate();
    
}

function priceStatusLabel(price){
    if(price < goalPrice){
        $(".priceStatusLabel").attr("class", "label label-success priceStatusLabel")
        $(".priceStatusLabel").text("Affordable")
    }else if(price == goalPrice){
        $(".priceStatusLabel").attr("class", "label label-success priceStatusLabel")
        $(".priceStatusLabel").text("Exactly $30!")

    }else{
        $(".priceStatusLabel").attr("class", "label label-important priceStatusLabel")
        $(".priceStatusLabel").text("I'm too poor :(")

    }
     
}


function DONEbuttonUpdate(){
//    goalPrice = parseInt(goalPrice);
//    totalPrice = parseInt(totalPrice);
    $('#elem').popover('hide')
    //console.log("hunger: " + totalHunger + ", goal: " + goalPrice +", Total$: " + totalPrice);
    
    if(totalHunger < 60){
        $(".btn").attr("data-original-title", "I'm still hungry!");
        if(totalPrice < goalPrice){   
            $(".btn").attr("data-content", "I still have some money left so can you help me find more food?");
        }else if(totalPrice == goalPrice){
            $(".btn").attr("data-content", "Wow! You used up my money exactly!");
        }else{
            $(".btn").attr("data-content", "I don't have the money to afford it all :(");
        }
    }else{//hunger >= 60
         $(".btn").attr("data-original-title", "I'm feeling pretty good!");
        if(totalPrice == goalPrice){   
            $(".btn").attr("data-content", "WOW! Thank you!  I'm not hungry and you used my money up exactly!");
        }else if(totalPrice < goalPrice){
            $(".btn").attr("data-content", "Wow! Thank you! I'm not hungry and you managed to save me some of my money! ");
        }else{
            $(".btn").attr("data-content", "...but I don't have the money to afford it all :( Help me and try again please?");
        }
    }
    
}