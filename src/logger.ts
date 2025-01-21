import debug from 'debug'

export const logger = (context: string) => {
  const debugLog = debug(context)

  const log = (message: string, ...args: any[]) => {
    const timestamp = new Date().toISOString()
    debugLog(`[${timestamp}] ${message}`, ...args)
  }

  return log
}
