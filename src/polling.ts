export const minutesToMs = (minutes: number) => minutes * 60 * 1000

export const poll = (intervalMs: number, fn: () => Promise<void>) => {
  const run = async () => {
    await fn()
    setTimeout(run, intervalMs)
  }

  run()
}
