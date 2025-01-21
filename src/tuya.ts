import { TuyaContext } from '@tuya/tuya-connector-nodejs'
import { logger } from './logger.ts'

const log = logger('tuya')

export type TuyaConfig = {
  apiUrl: string
  accessKey: string
  secretKey: string
  deviceId: string
}

export type DeviceData = [
  { code: 'water_use_data'; value: number },
  { code: 'report_period_set'; value: string },
  { code: 'fault'; value: number },
  { code: 'switch_code'; value: boolean },
  { code: 'auto_clean'; value: boolean },
  { code: 'meter_id'; value: string },
  { code: 'voltage_current'; value: number },
]

const read =
  (deviceId: string, context: TuyaContext) => async (): Promise<DeviceData> => {
    log(`Reading device (id: ${deviceId}) data`)

    const res = await context.request<DeviceData>({
      method: 'GET',
      path: `/v1.0/iot-03/devices/${deviceId}/status`,
    })

    log(`Device data`, res.result)
    return res.result
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
