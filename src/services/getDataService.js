const URL = "https://api.openweathermap.org/data/2.5/weather";
const APIKey = '8bb6d100086c829397846cea6c9c8004'

class DataService {
    constructor() {
        const Instance = DataService.instance;
        if (Instance) return Instance;
        DataService.instance = this;
    }

    async getData(searchString = 'London') {
        try {
            let response = await fetch(`${URL}?q=${searchString}&appid=${APIKey}`);
            if (response.ok === false) {
                throw response.statusText;
            }
            let result = await response.json();
            return {
                "feels_like": result.main.feels_like,
                "humidity": result.main.humidity,
                "pressure": result.main.pressure,
                "temp": result.main.temp,
                "temp_max": result.main.temp_max,
                "temp_min": result.main.ftemp_min,
                "icon": result.weather[0].icon,
                "wind_deg": result.wind.deg,
                "wind_gust": result.wind.gust,
                "wind_speed": result.wind.speed,
                "error": ''
            }
        } catch (err) {
            switch (err) {
                case 'Not Found':
                    return { "error": "For this city no result was found!"};
                default:
                    return { "error":`Something went wrong: ${err}`}
            }
        }
    }
}

let dataService = new DataService();

export default dataService;