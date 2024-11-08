import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const cityname = req.body.cityname;
  const weatherdata = await WeatherService.getWeatherForCity(cityname);
  res.json(weatherdata);

  // TODO: save city to search history
  await HistoryService.addCity(cityname);

  return res.json({
    message: 'City added to Search History',
    currentWeather: weatherdata.currentWeather,
    forecastArray: weatherdata.forecastArray
  })
  //
});

// TODO: GET search history - DONE
router.get('/history', async (req: Request, res: Response) => {
  try {
    const savedCities = await historyService.getCities();
    res.json(savedCities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history - DONE
router.delete('/history/:id', async (req: Request, res: Response) => {
  try{
    if (!req.params.id){
      res.status(400).json({msg: 'City id is required'});
    }
    await historyService.removeCity(req.params.id);
    res.json({ success: 'City successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
