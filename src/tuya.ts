import { TuyaContext } from '@tuya/tuya-connector-nodejs'
import { logger } from './logger.ts'

const log = logger('tuya')

export type TuyaConfig = {
  apiUrl: string
  accessKey: string
  secretKey: string
  deviceId: string
}

// Data from "WiFi smart online 5 in 1 tester" device
// https://it.aliexpress.com/item/1005007894059613.html
export type TuyaDeviceData = [
  { code: 'temp_current'; value: number },
  { code: 'sensor_list'; value: string },
  { code: 'ph_current'; value: number },
  { code: 'ph_warn_max'; value: number },
  { code: 'ph_warn_min'; value: number },
  { code: 'temp_warn_max'; value: number },
  { code: 'temp_warn_min'; value: number },
  { code: 'tds_current'; value: number },
  { code: 'tds_warn_max'; value: number },
  { code: 'tds_warn_min'; value: number },
  { code: 'ec_current'; value: number },
  { code: 'ec_warn_max'; value: number },
  { code: 'ec_warn_min'; value: number },
  { code: 'salinity_current'; value: number },
  { code: 'salinity_warn_max'; value: number },
  { code: 'salinity_warn_min'; value: number },
  { code: 'pro_current'; value: number },
  { code: 'pro_warn_max'; value: number },
  { code: 'pro_warn_min'; value: number },
  { code: 'orp_current'; value: number },
  { code: 'orp_warn_max'; value: number },
  { code: 'orp_warn_min'; value: number },
  { code: 'cf_current'; value: number },
  { code: 'cf_warn_max'; value: number },
  { code: 'cf_warn_min'; value: number },
  { code: 'rh_current'; value: number },
  { code: 'rh_warn_max'; value: number },
  { code: 'rh_warn_min'; value: number },
]

export type DeviceData = {
  temp_current: number
  sensor_list: string
  ph_current: number
  ph_warn_max: number
  ph_warn_min: number
  temp_warn_max: number
  temp_warn_min: number
  tds_current: number
  tds_warn_max: number
  tds_warn_min: number
  ec_current: number
  ec_warn_max: number
  ec_warn_min: number
  salinity_current: number
  salinity_warn_max: number
  salinity_warn_min: number
  pro_current: number
  pro_warn_max: number
  pro_warn_min: number
  orp_current: number
  orp_warn_max: number
  orp_warn_min: number
  cf_current: number
  cf_warn_max: number
  cf_warn_min: number
  rh_current: number
  rh_warn_max: number
  rh_warn_min: number
}

const toDeviceData = (data: TuyaDeviceData): DeviceData => ({
  temp_current: data[0].value,
  sensor_list: data[1].value,
  ph_current: data[2].value,
  ph_warn_max: data[3].value,
  ph_warn_min: data[4].value,
  temp_warn_max: data[5].value,
  temp_warn_min: data[6].value,
  tds_current: data[7].value,
  tds_warn_max: data[8].value,
  tds_warn_min: data[9].value,
  ec_current: data[10].value,
  ec_warn_max: data[11].value,
  ec_warn_min: data[12].value,
  salinity_current: data[13].value,
  salinity_warn_max: data[14].value,
  salinity_warn_min: data[15].value,
  pro_current: data[16].value,
  pro_warn_max: data[17].value,
  pro_warn_min: data[18].value,
  orp_current: data[19].value,
  orp_warn_max: data[20].value,
  orp_warn_min: data[21].value,
  cf_current: data[22].value,
  cf_warn_max: data[23].value,
  cf_warn_min: data[24].value,
  rh_current: data[25].value,
  rh_warn_max: data[26].value,
  rh_warn_min: data[27].value,
})

const read =
  (deviceId: string, context: TuyaContext) => async (): Promise<DeviceData> => {
    log(`Reading device (id: ${deviceId}) data`)

    const res = await context.request<TuyaDeviceData>({
      method: 'GET',
      path: `/v1.0/iot-03/devices/${deviceId}/status`,
    })

    log(`Device data`, res.result)
    return toDeviceData(res.result)
  }

export const connectTuyaDevice = (config: TuyaConfig) => {
  const context = new TuyaContext({
    baseUrl: config.apiUrl,
    accessKey: config.accessKey,
    secretKey: config.secretKey,
  })

  return {
    read: read(config.deviceId, context),
  }
}
