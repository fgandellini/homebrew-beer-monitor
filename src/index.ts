import { logger } from './logger.ts'
import { Config } from './config.ts'
import { connectTuyaDevice } from './tuya.ts'
import { connectBrewfather } from './brewfather.ts'
import { minutesToMs, poll } from './polling.ts'
import { toBrewfatherData } from './mapper.ts'

const config = Config.parse(process.env)
const log = logger(config.BREWFATHER_NAME)

log(`Starting ${config.BREWFATHER_NAME}...`)
log(`Config`, config)

const device = connectTuyaDevice({
  apiUrl: config.TUYA_API_URL,
  accessKey: config.TUYA_ACCESS_KEY,
  secretKey: config.TUYA_SECRET_KEY,
  deviceId: config.TUYA_DEVICE_ID,
})

const brewfather = connectBrewfather({
  apiUrl: config.BREWFATHER_API_URL,
  streamId: config.BREWFATHER_STREAM_ID,
  name: config.BREWFATHER_NAME,
  dryRunMode: config.BREWFATHER_DRYRUN,
})

poll(minutesToMs(config.DEVICE_POLLING_INTERVAL_MIN), async () => {
  const startTime = new Date()
  log('Polling device data...')

  const deviceData = await device.read()
  const brewfatherData = toBrewfatherData(deviceData)
  await brewfather.write(brewfatherData)

  const endTime = new Date()
  const elapsedTime = endTime.getTime() - startTime.getTime()
  log(`Polling done (took ${elapsedTime}ms)`)
  log(`Scheduling next poll in ${config.DEVICE_POLLING_INTERVAL_MIN} minutes`)
})
