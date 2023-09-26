import puppeteer, { Page } from "puppeteer-core"
import { PlayerInfo } from "../types/playerInfo";

import 'dotenv/config'

export default class BrowserController {
  private tournamentLink: string;
  private viewPort = {width: 1920, height: 1080}
  private adminEmail: string = process.env.ADMIN_EMAIL || 'admin_email'
  private adminPassword: string = process.env.ADMIN_PASSWORD || 'password';  

  public constructor(link: string) {
    this.tournamentLink = link;
  }

  public async launch(): Promise<void> {
    console.log("init system")

    const Browser = await puppeteer.launch({
      headless: false,
      executablePath: "/usr/bin/google-chrome-stable"
    })

    const page = await Browser.newPage();
    await page.goto(this.tournamentLink)
    await page.setViewport(this.viewPort)

    setTimeout(async () => {
      try{
        await page.click('#onetrust-accept-btn-handler') 
      }catch{
        console.log('no cookies needed')
      }

      await this.startLogin(page)
    }, 3000)
    
    setTimeout(async () => {
      await this.findPlayerInTable(page, {nick: 'Ryoran', seed: 10})
      await page.screenshot({path: 'screenshots/screenshot.png'})
      await console.log('complete')
    }, 10000)
  }

  private async startLogin(page: Page): Promise<void>{
    try{
      console.log("init login")
      await page.type('[name = loginEmail]', this.adminEmail)
      await page.type('[name = loginPassword]', this.adminPassword)
      await page.click('[name = loginSubmit]')
      await console.log("login complete")
    }catch{
      console.log("Login Fail")
    }
  }

  private async findPlayerInTable(page: Page, player: PlayerInfo){
    try{
      console.log("finding player")
      const playerName = await page.$x(`//table//tr//td[contains(text(), ${player.nick})]`)
      const value = await playerName[4].$$('div input')
      await value[1].type(player.seed.toString())
    }catch(error){
      console.log(error)
    }
  }

  get Link(): string {
    return this.tournamentLink
  }

  set Link(newLink: string) {
    this.tournamentLink = newLink;
  }

  
}