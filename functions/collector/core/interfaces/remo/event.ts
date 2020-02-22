import HumidityData from "./humidityData"
import IlluminationData from "./illuminationData"
import MovementData from "./movementData"
import TemperatureData from "./temperatureData"

export default interface Event {
  hu: HumidityData
  il: IlluminationData
  mo: MovementData
  te: TemperatureData
}