var express = require("express");
var pug = require("pug");




var months = {
    0: "January",
    1: "Febuary",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
     6: "July",
    7: "August",
    8: "September",
     9: "October",
    10: "November",
    11: "December"
};

var app = express();
app.set("view engine", "pug");


app.get("/", function(req, res){
    res.render("index");
})

app.get("/*", function(req, res){
    
    var unixTime = {};
    var arr = [];
    
    arr = isItADate(req.params["0"]);
   
    //var unixStamp = parseInt(req.params["0"] * 1000);
    var natural = uniToNat(arr[0]);
   
  
   // var date = new Date(unixStamp);
   // var month = months[date.getMonth()];
    //var year = date.getFullYear();
    //var day = date.getDate();
    
    unixTime = {
        unix : arr[1],
        natural : natural
     
    }
    
   
        
    
    
    
      res.write(JSON.stringify(unixTime));
    
     
    
   
 
    res.end();
})






app.listen(process.env.PORT || 8080, function(){
    console.log("I'm listening...");
    
});


function isItADate(urlDate){
    
    var array = [];
    var isUnix = new Date(parseInt(urlDate) * 1000);
    var natural = Date.parse(urlDate);
    
    
    if(isUnix == "Invalid Date" && !natural){
        array[0] = null;
        array[1] = null;
        return array;
    }
    else{
    
        if (isUnix == "Invalid Date"){
            array[0] = null;    
        }
        else{
            array[0] = isUnix;
            array[1] = parseInt(urlDate);
            return array;
        }
        
        if (!natural){
            array[1] = null;
        }
        else{
            array[1] = natural/1000;
            array[0] = new Date(urlDate);
            return array;
        }
    }
    
        
    

    
}


function uniToNat(date){
   
   
    if (date == null){
        return null;
    }
    else {
        var month = months[date.getMonth()];
        var day = date.getDate();
        var year = date.getFullYear();
        return month + " " + day + ", " + year;
    }
    
}