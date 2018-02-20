$(document).ready(function () {

  if (navigator.geolocation) {

    if (!navigator.geolocation.getCurrentPosition) {}

    navigator.geolocation.getCurrentPosition(function (position) {
      var request = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=dc9382b3e30cf004cda143a69ae560a4";

      $.getJSON(request, function (json) {

        // get city, temp, and description from JSON
        var city = json.name + ", " + json.sys.country;

        var kelvin = json.main.temp;

        var fahrenheit = Math.floor(kelvin * 9 / 5 - 459.67);

        var celsius = Math.floor(kelvin - 273.15);

        var desc = json.weather[0]["main"];

        // get display icon from
        // https://erikflowers.github.io/weather-icons/
        // using icon-id from
        // https://openweathermap.org/weather-conditions
        var x = "";

        switch (json.weather[0]["icon"]) {
          case "01d":
            x = "wi-day-sunny";
            break;

          case "02d":
            x = "wi-day-cloudy";
            break;

          case "03d":
            x = "wi-cloud";
            break;

          case "04d":
            x = "wi-cloudy";
            break;

          case "09d":
            x = "wi-day-rain";
            break;

          case "10d":
            x = "wi-day-sprinkle";
            break;

          case "11d":
            x = "wi-day-thunderstorm";
            break;

          case "13d":
            x = "wi-day-snow";
            break;

          case "01n":
            x = "wi-night-clear";
            break;

          case "02n":
            x = "wi-night-partly-cloudy";
            break;

          case "03n":
            x = "wi-cloud";
            break;

          case "04n":
            x = "wi-cloudy";
            break;

          case "09n":
            x = "wi-night-alt-showers";
            break;

          case "10n":
            x = "wi-night-rain";
            break;

          case "11n":
            x = "wi-night-alt-thunderstorm";
            break;

          case "13n":
            x = "wi-night-alt-snow";
            break;
        }

        var icon = '<i class="wi ' + x + '"></i>';

        // update HTML elements for geolocation information
        $(".location").html(city);

        $("#temp").html(fahrenheit);

        $(".desc").html(desc);

        $(".pic").html(icon);

        // toggle between fahrenheit and celsius
        $("#switch").on("click", function () {

          var toggle = document.getElementById("temp").innerHTML;

          // compare the innerHTML against values to know
          // which value to toggle back to
          if (toggle == Math.floor(kelvin * 9 / 5 - 459.67)) {
            $("#temp").html(celsius);
            $("#switch").html(' <span id="switch"><a href="#"> C</a></span>');
          } else {
            $("#temp").html(fahrenheit);
            $("#switch").html(' <span id="switch"><a href="#"> F</a></span>');
          }
        });
      });
    }, function () {
      alert('You have geolocation services turned off.' + ' Please, turn geolocation services on to access app');
    });
  };
});
// that's all folks