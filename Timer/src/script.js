var interval;
var StartMM = 10;
var StartSS = 00;
//Gets current time and counts down until 0
function start() {
    var time = $("#disp-time").text();
    var minutes = time.substr(0,time.indexOf(':'));
    var seconds = time.substr(time.indexOf(':') + 1,time.length);
    //(!interval) protects against repeated clicks on start
    if(!interval) {
        interval = setInterval(function() {
            if(minutes == 0 && seconds == 1) {
                $("body").css("background-color","red");
                seconds--;
                stop();
            } else if(minutes > 0 && seconds == 0) {
                minutes--;
                seconds = 59;
            } else if(seconds > 0){
                seconds--;
            }
            $("#disp-time").text(minutes + ":" + (seconds < 10 ? '0' + seconds : seconds));
        },1000);
    }
}
//Stops countdown and resets time
function refresh() {
    stop();
    $("body").css("background-color","#003366");
    $("#disp-time").text(StartMM + ":" + (StartSS < 10 ? '0' + StartSS : StartSS));
}
//Stops countdown
function stop() {
    clearInterval(interval);
    interval = null; //So (!interval) returns true if there is no interval running
}
function enterTime() {
  var minutes = parseInt($("#inputMM").val()) ;
  var seconds = parseInt($("#inputSS").val());
  if((minutes <= 60 && minutes >=0) && (seconds <= 59 && seconds >=0)) {
    StartMM = minutes;
    StartSS = seconds;
    refresh();
  }
}
$(document).ready(function() {
    refresh();
    $("#btn-start").on("click",function() {
        start();
    });
    $("#btn-stop").on("click",function() {
        stop();
    });
    $("#btn-refresh").on("click",function() {
        refresh();
    });
    $("#btn-enter-time").on("click",function() {
        enterTime();
    });
});
