var counter = (function(){
    /*
    on(event_string, callback) -- register handler for an event
    trigger(event_string,data) -- call all callbacks for event_string
    */
    function EventHandler(){
        var handlers = {};
        function on(event_string, callback){
            var cblist = handlers[event_string];
            
            if(cblist === undefined){
                cblist = [];       
                handlers[event_string] = cblist;
            }
            
            cblist.push(callback);
        }
        
        function trigger(event_string, data){
            var cblist = handlers[event_string];
            
            if(cblist !== undefined){
                for(var i = 0; i < cblist.length; i +=1)
                    cblist[i](data);
            }
        }
        
        return{on:on, trigger:trigger};
    }
    
    /*  Model() functions:
        add_one_to_counter() -- increment counter
        reset() -- set count to 0
        getCount() -- get counter value
        on(event_string,callback) --"update", the data will new update new value of counter
    */
    function Model(){
        var event_handlers = EventHandler();
        var count = 0;
        function add_one_to_counter(){
            count+=1;
            event_handlers.trigger("update",count);
        }
        
        function reset(){
            count = 0;
        }
        
        function getValue(){
            return count;
        }
        return {add_one_to_counter:add_one_to_counter, 
                reset:reset, 
                getValue: getValue,
                on: event_handlers.on}; //allows functions to be accessible
        
    }
    
    //increment() -- cause the value of the counter to increment
    function Controller(model){
        function increment(){
            model.add_one_to_counter();
        }
        
        return{increment: increment};
    }
    
    function View(div, model, controller){
        var display = $('<div class = "view">The current value of the counter is <span>0<span>.</div>');
        var counter_value = display.find('span');
        $(div).append(display);
        
        function update(){
            counter_value.text(model.getValue);
        }
        model.on("update", update);
        
        return {};
    }
    
    function setup(div){
        var model = Model();
        var controller = Controller(model);
        var view = View(div, model, controller);
        var view2 = View(div, model, controller);
        
        var button = $("<button>Increment</button>");
        button.on("click", controller.increment);
        div.append(button);
    }
    //items accessible to outsiders
    return {setup: setup};
    
}());

$(document).ready(function(){
    $('.counter').each(function(){
        counter.setup($(this));
    });
});