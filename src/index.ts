import BrowserController from './Controllers/BrowserController'

import 'dotenv/config'

const link: string = process.env.TOURNAMENT_LINK || 'https://start.gg'

async function main (): Promise<void> {
  try {
    const controller = new BrowserController(link)
    await controller.launch()
  } catch (error) {
    console.log('erro:', error)
  }
}

main()
