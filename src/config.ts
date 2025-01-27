import z from 'zod'

export const Config = z.object({
  TUYA_API_URL: z.string(),
  TUYA_ACCESS_KEY: z.string(),
  TUYA_SECRET_KEY: z.string(),
  TUYA_DEVICE_ID: z.string(),

  BREWFATHER_API_URL: z.string(),
  BREWFATHER_STREAM_ID: z.string(),
  BREWFATHER_NAME: z.string(),
  BREWFATHER_DRYRUN: z.coerce.boolean(),

  DEVICE_POLLING_INTERVAL_MIN: z.coerce.number(),
})
