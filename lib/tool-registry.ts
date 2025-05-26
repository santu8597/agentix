import { getWeather } from "@/lib/tools/weather"
import { webSearch } from "@/lib/tools/web-search"
import {executeShell} from "@/lib/tools/shell"
import { generateImage } from "@/lib/tools/image"
import {fetchFlightDetails} from "@/lib/tools/flight"
import {sendEmail} from "@/lib/tools/auth-mail"
import {readEmail} from "@/lib/tools/get-mail"
import {fetchYouTubeVideo} from "@/lib/tools/youtube"
import {scrapeDocsTool} from "@/lib/tools/web-scrap"
import {analyzeSrcStructureTool} from "@/lib/tools/folder-structure"
import { musicMood } from "@/lib/tools/music"
import { googleCalendarManager } from "@/lib/tools/calender"
import { fetchDoctors } from "@/lib/tools/health"
import { fetchHotelDetails } from "@/lib/tools/hotel"
import {nftTool} from "@/lib/tools/nft-mint"
import {MoneySendTool} from "@/lib/tools/send-money"
import {distributePaymentTool} from "@/lib/tools/distribute-money"

export const toolRegistry = {
  getWeather,
  webSearch,
  executeShell,
  generateImage,
  fetchFlightDetails,
  sendEmail,
  readEmail,
  fetchYouTubeVideo,
  scrapeDocsTool,
  analyzeSrcStructureTool,
  musicMood,
  googleCalendarManager,
  fetchDoctors,
  fetchHotelDetails,
  nftTool,
  MoneySendTool,
  distributePaymentTool
}