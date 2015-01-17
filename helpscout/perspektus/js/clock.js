
function perspektusClock() {
  var perspektusToday = new Date();

  var perspektusDay = perspektusLeadingZero(perspektusToday.getDate());
  var perspektusDayName = getDayName(perspektusToday.getDay());
  var perspektusYear = perspektusToday.getFullYear();

  var perspektusHours = perspektusLeadingZero(perspektusToday.getHours());
  var perspektusMinutes = perspektusToday.getMinutes();
  var perspektusSeconds = perspektusToday.getSeconds();


    perspektusMinutes = perspektusLeadingZero(perspektusMinutes);
  perspektusSeconds = perspektusLeadingZero(perspektusSeconds);

  document.getElementById('perspektusHours').innerHTML = perspektusHours + ":";
  document.getElementById('perspektusMinutes').innerHTML = perspektusMinutes;
  document.getElementById('perspektusSeconds').innerHTML = perspektusSeconds;
  document.getElementById('perspektusDate').innerHTML = perspektusDayName + " " + perspektusDay + ", " + perspektusYear;

  var t = setTimeout(function() {
  perspektusClock()
  }, 500);
}

function perspektusLeadingZero(i) {
  if (i < 10) {
  i = "0" + i
  }
  if(i==0)
    return 12;
  // add zero in front of numbers < 10
  return i;
}

function getDayName(perspektusDay) {
  var weekday = new Array(7);
  weekday[0] = "SUN";
  weekday[1] = "MON";
  weekday[2] = "TUE";
  weekday[3] = "WED";
  weekday[4] = "THU";
  weekday[5] = "FRI";
  weekday[6] = "SAT";

  var setDayName = weekday[perspektusDay];
  return setDayName;
}
t
