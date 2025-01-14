import { z } from 'zod'

export default eventHandler(async (event) => {
  // Get the URL and theme from the query parameters
  const { url, theme } = await getValidatedQuery(event, z.object({
    url: z.string().url(),
    theme: z.enum(['light', 'dark']).optional().default('light')
  }).parse)

  // Get a browser session and open a new page
  const { page } = await hubBrowser()

  // Set the viewport to full HD & set the color-scheme
  await page.setViewport({ width: 1920, height: 1080 })
  await page.emulateMediaFeatures([{
    name: 'prefers-color-scheme',
    value: theme
  }])

  // Go to the URL and wait for the page to load
  await page.goto(url, { waitUntil: 'domcontentloaded' })

  // Return the screenshot as response
  setHeader(event, 'content-type', 'image/jpeg')
  return page.screenshot()
})
