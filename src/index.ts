import BrowserController from "./Controllers/BrowserController";

import "dotenv/config"


const link = process.env.TOURNAMENT_LINK || 'https://start.gg';

async function main() {
  try{
    const controller = new BrowserController(link)
    await controller.launch();
  
  } catch(error) {
    console.log("erro:", error)
  }
}

main();