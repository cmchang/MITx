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
    var totalPrice = 0;
    var imageList = $(".itemContainer2").find("img");
    var totalHunger = 0;
    var hungerList = $(".itemContainer2").find("img");
    var currentImg = "";
    for(var x = 0; x < imageList.length ; x++){
        currentImg = imageList[x];
        totalPrice += parseInt($(currentImg).attr("data-price"));
        totalHunger += parseInt($(currentImg).attr("data-hunger"));
    }
    
    $(".price").text("$"+totalPrice);
    $(".hunger").text(totalHunger + "%");
    
    $(".bar").attr("style", "width: "+totalHunger+"%")
    
    
}