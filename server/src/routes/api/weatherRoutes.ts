import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService_Post from '../../service/historyService.js';
import HistoryService_Get from '../../service/historyService.js';
import HistoryService_Delete from '../../service/historyService.js'; 
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
//localhost:3001/weather/api

router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const cityname = req.body.cityName;
  const weatherdata:any = await WeatherService.getWeatherForCity(cityname);
  //res.json(weatherdata);

  // TODO: save city to search history
  await HistoryService_Post.addCity(cityname);
  //console.log(weatherdata);
  return res.json({
    currentWeather: weatherdata[0],
    forecastArray: weatherdata[1]
  })
  //
});

// TODO: GET search history - DONE
//localhost:3001/weather/api/history

router.get('/history', async (_req: Request, res: Response) => {
  try {
    const savedCities = await HistoryService_Get.getCities();
    res.json(savedCities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history - DONE
//localhost:3001/weather/api/history/<city id>
router.delete('/history/:id', async (req: Request, res: Response) => {
  try{
    if (!req.params.id){
      res.status(400).json({msg: 'City id is required'});
    }
    await HistoryService_Delete.removeCity(req.params.id);
    res.json({ success: 'City successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
