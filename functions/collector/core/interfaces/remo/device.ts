import User from "./user"
import Event from "./event"

export default interface Device {
  name: string
  id: string
  created_at: string
  updated_at: string
  mac_address: string
  serial_number: string
  firmware_version: string
  temperature_offset: number
  humidity_offset: number
  users: User[]
  newest_events: Event
}