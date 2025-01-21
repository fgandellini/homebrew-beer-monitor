import { logger } from './logger.ts'
const log = logger('brewfather')

export type BrewfatherConfig = {
  apiUrl: string
  streamId: string
  name: string
}

export type BrewfatherData = {
  // Unique name for your device. Used to identify the device. Required field.
  // name: string

  // Temperature
  temp: number

  // Appears as Fridge Temp
  aux_temp?: number

  // Appears as Room Temp
  ext_temp?: number

  // Temperature units "C" for celcius,
  // "F" for fahrenheit, "K" for kelvin.
  // Default value is "C"
  temp_unit?: 'C' | 'F' | 'K'

  // Gravity
  gravity: number

  // Gravity units "G" for SG (1.XXX) and "P" for Plato (X.XX).
  // Default value is "G".
  gravity_unit?: 'G' | 'P'

  // Pressure
  pressure?: number

  // Pressure units "PSI", "BAR", "KPA". Default is "PSI".
  pressure_unit?: 'PSI' | 'BAR' | 'KPA'

  // pH
  ph: number

  // Bubbles Per Minute
  bpm?: number

  // Free Text
  comment?: string

  // Beer Style Text
  beer?: string

  // Battery level as volts (decimal number)
  battery?: number

  // Type of device integration. Only value "default" is possible now.
  // Default value is "default".
  // More values can be added in the future to support different kinds of integrations.
  // device_integration: 'default'

  // Device that is source for the logged values,
  // for example "Tilt", "iSpindel", "X Sensor".
  device_source?: string

  // Device that is used to report the values to the service,
  // for example "MyBrewbot", "MyCustomBuild", "HomeAutomation".
  report_source?: string

  // State of device, example: "heating", "cooling", "on", "off"
  device_state?: string

  // Target Temperature. Uses unit from "temp_unit"
  temp_target?: number

  // Target Gravity. Uses unit from "gravity_unit"
  gravity_target?: number

  hysteresis?: number

  // Angle on a floating hydrometer
  angle?: number

  // Received Signal Strength Indicator
  rssi?: number

  // Counter value, for example total amount of bubbles, or number of pours
  count?: number

  // Volume left in container
  volume?: number

  // Volume units "L", "GAL", "OZ". Default is "L".
  volume_unit?: 'L' | 'GAL' | 'OZ'

  // Last pour volume
  pour_volume?: number

  // Max total volume in container
  max_volume?: number

  // Value that will be displayed as a percentage
  percentage?: number
}

const write = (config: BrewfatherConfig) => async (data: BrewfatherData) => {
  log('Writing data to Brewfather', data)

  const brewfatherApi = `${config.apiUrl}/stream?id=${config.streamId}`
  fetch(brewfatherApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: config.name, ...data }),
  })
}

export const connectBrewfather = (config: BrewfatherConfig) => ({
  write: write(config),
})
