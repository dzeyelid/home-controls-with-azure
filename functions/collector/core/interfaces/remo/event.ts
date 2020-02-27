import HumidityData from "./HumidityData"
import IlluminationData from "./IlluminationData"
import MovementData from "./MovementData"
import TemperatureData from "./TemperatureData"

export default interface Event {
  hu: HumidityData
  il: IlluminationData
  mo: MovementData
  te: TemperatureData
}