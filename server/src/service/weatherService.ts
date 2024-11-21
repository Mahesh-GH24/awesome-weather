import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
  name?: string
}

// TODO: Define a class for the Weather object
class Weather {
  //api's 
  //Properties based off main.ts - renderCurrentWeather and Requirements image
  
  private city: string;
  private date: string;
  private icon: string;
  private tempF: string;
  private windspeed: string;
  private humidity: string;

  //constructor
  constructor(city:string,date:string,icon:string,tempF:string,windspeed:string,humidity:string) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.tempF = tempF;
    this.windspeed = windspeed;
    this.humidity = humidity;
  }
}



// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  city='';
  

  //Define Constructor
  constructor(){
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    //2
    //buildGeocodeQuery() 
    //4
    //fetchAndDestructureLocationData() -- using cityname
    //store in coords member
    let response = await fetch(query);
   // console.log(response);
    let data:Coordinates[] = await response.json();
   // console.log(data);
    return data[0];
}

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
   // console.log(locationData);
    // takes the location data and returns more different location data
    // strip the stuff we don't need and return only the coords we do
    const coords:Coordinates ={
      lat: locationData.lat,
      lon: locationData.lon
    }
    return coords;

  }
  
  // TODO: Create buildGeocodeQuery method
   private buildGeocodeQuery(): string {
    //3
    //create a query for the geocode api using the cityname class member
    // when the req is returned, return that URL
    return `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;

   }
  //gives lon and lat
  

  
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    //return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
    //onecall api
    return `${this.baseURL}/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely,alerts&appid=${this.apiKey}`;
  }
  
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    /// make the API calls using the baseURL and GeoLoc API information
    //destructureLocationData(data)
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    return this.destructureLocationData(locationData);
  }
  
 // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    // buildWeatherQuery
    const weatherQuery = this.buildWeatherQuery(coordinates);

    //make weather api call
    let response = await fetch(weatherQuery);
    console.log(response);

    let data:Weather[] = await response.json();
    console.log(data);
    //return data[0];

    //call parseCurrentWeather to fetch the Current day Weather
    const currentweather: Weather = this.parseCurrentWeather(data);

    //call buildForecastArray to fetch the ForecastWeather for 5 days
    const forecastArray =  this.buildForecastArray(currentweather,data);
  }
  
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
  //   //take the response object from the API call and return a weather object of some sort
  //   //const {weather[0]:{icon:fetchedIcon,description}} = response;
  //   const fetchedicon = response.weather[0].icon;
  //   const description = response.weather[0].description;
  //   //weather = ""id:31,"main":"clouds",
  //   const currentweather: Weather = {
  //     icon:icon

  }

  // }
  
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    // take five-day forecast weather object and return just the forecast obj we care

  }
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    //start here
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    //console.log(coordinates);

    //fetchWeatherData
    const weatherdata = await this.fetchWeatherData(coordinates);
   
  }
      
}

export default new WeatherService();
