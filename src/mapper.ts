import type { DeviceData } from './tuya'
import type { BrewfatherData } from './brewfather'

const toBrewfatherGravity = (pro: number): number => pro / 1000.0
const toBrewfatherTemp = (temp: number): number => temp / 10.0
const toBrewfatherPh = (ph: number): number => ph / 100.0

/**
 * Data mappers and converters between DeviceData and BrewfatherData
 */
export const toBrewfatherData = (data: DeviceData): BrewfatherData => ({
  gravity: toBrewfatherGravity(data.pro_current),
  temp: toBrewfatherTemp(data.temp_current),
  ph: toBrewfatherPh(data.ph_current),
  device_source: 'WiFi smart online 5 in 1 tester',
  report_source: 'homebrew-beer-monitor',
})
