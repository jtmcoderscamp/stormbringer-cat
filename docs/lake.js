const appkey = "c1ea699f2c137c3121712ac090907294";

class Lake {
  constructor(lon, lat, name) {
    this.lon = lon;
    this.lat = lat;
    this.name = name;
  }
}

const lakes = {
  Kisajno: new Lake(21.701493, 54.06592, "Kisajno"),
  Warnolty: new Lake(21.633747, 53.712741, "Warnołty"),
  Jeziorak: new Lake(19.5753, 53.649835, "Jeziorak"),
  Pilakno: new Lake(21.161813, 53.787905, "Piłakno"),
  Krutynskie: new Lake(21.432507, 53.704958, "Krutyńskie")
};

class DataWeather {
  constructor(json_data) {
    this.temp = json_data["main"]["temp"].toString().concat("°C");
    this.wind_speed = "Wind " + json_data["wind"]["speed"].toString() + "km/h";
    this.sunrise = "Sunrise " + convertToTime(json_data["sys"]["sunrise"]);
    this.sunset = "Sunset " + convertToTime(json_data["sys"]["sunset"]);
    this.icon = json_data["weather"][0]["icon"];
    this.icon = "http://openweathermap.org/img/wn/" + this.icon + "@2x.png";
    this.icon = '<img src="' + this.icon + '"></img>';
  }
}

class DataFutureWeather {
  constructor(json_data) {
    this.temp = json_data["main"]["temp"].toString().concat("°C");
    this.icon = json_data["weather"][0]["icon"];
    this.icon = "http://openweathermap.org/img/wn/" + this.icon + "@2x.png";
    this.icon = '<img src="' + this.icon + '"></img>';
    this.hour = convertToTime(json_data["dt"]);
    this.date = convertToDate(json_data["dt"]);
    this.dt = json_data["dt_txt"];
  }
}

function convertToTime(unixtime) {
  let date = new Date(unixtime * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
}

function convertToDate(unixtime) {
  let date = new Date(unixtime * 1000);
  let formattedMonth = date.getMonth() + 1;
  let formattedDate = date.getDate();
  let dateString = formattedDate.toString() + "." + formattedMonth.toString();
  return dateString;
}

class OpenWeather {
  constructor(appid) {
    this.basic_url = "https://api.openweathermap.org/data/2.5";
    this.future_endpoint = "/forecast?";
    this.current_endpoint = "/weather?";
    this.key = appid;
  }

  async getLocationWeatherNow(lon, lat) {
    let url_request = this.basic_url.concat(
      this.current_endpoint,
      "lat=",
      lat,
      "&",
      "lon=",
      lon,
      "&APPID=",
      appkey,
      "&units=metric"
    );
    let data = await fetch(url_request)
      .then(response => response.json())
      .then(data => {
        let locationObject = new DataWeather(data);
        return locationObject;
      })
      .catch(error => {// error tu wyłapuje odrzuconego promise, popraw bo ten error moze ptraktowac 404 jako odpowiedź 
        console.log(error);
      });
    return data;
  }

  async getLocationWeatherFuture(lon, lat) {
    let url_request = this.basic_url.concat(
      this.future_endpoint,
      "lat=",
      lat,
      "&",
      "lon=",
      lon,
      "&APPID=",
      appkey,
      "&units=metric"
    );
    let data = await fetch(url_request)
      .then(response => response.json())
      .then(data => {
        let weatherpoints = data.list;
        let output = [];
        for (let i = 0; i < 5; i++) {
          output.push(new DataFutureWeather(weatherpoints[i]));
        }

        return output;
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  }

  async getNextDayWeather(lon, lat) {
    let url_request = this.basic_url.concat(
      this.future_endpoint,
      "lat=",
      lat,
      "&",
      "lon=",
      lon,
      "&APPID=",
      appkey,
      "&units=metric"
    );
    let data = await fetch(url_request)
      .then(response => response.json())
      .then(data => {
        let weatherpoints = data.list;
        let output = [];

        for (let i = 0; i < weatherpoints.length; i++) {
          let datapoint = new DataFutureWeather(weatherpoints[i]);

          if (datapoint.hour === "13:00") {
            output.push(datapoint);
          }
        }

        return output;
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  }
}
