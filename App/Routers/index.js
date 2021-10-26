import Router from 'express'
import {HomePageWebsite, YoutubeChannel, LatestVideoYoutube, PlaylistVideoYoutube, SearchYoutubeVideo, DataGalleryTestimony, HeroDataImage, CoordinateData, ProductListController, DetailProductController, CheckWeather } from '../Controllers/ApiDataController.js'

const ApiRouter = Router()
const WebRouter = Router()

ApiRouter.get('/youtube/channel/:channel_id', YoutubeChannel)
ApiRouter.get('/youtube/latest/:channel_id/:max_result/:order', LatestVideoYoutube)
ApiRouter.get('/youtube/playlist/:channel_id/:max_result/:playlist_id', PlaylistVideoYoutube)
ApiRouter.get('/youtube/search/:keyword', SearchYoutubeVideo)

ApiRouter.get('/gallery/testimony/:list', DataGalleryTestimony)
ApiRouter.get('/hero/images/:type', HeroDataImage)
ApiRouter.get('/coordinate/data', CoordinateData)
ApiRouter.get('/evoush/products/:keyAccess', ProductListController)
ApiRouter.get('/evoush/products/:keyAccess/:permalink', DetailProductController)
ApiRouter.get('/check/weather/:apiKey/:city/:keyValid', CheckWeather)

// WebRouter.get('*',function(req,res,next){
// 	if(req.headers['x-forwarded-proto']!='https')
// 		res.redirect('https://evoush-landing.herokuapp.com/'+req.url)
// 	else
// 		next() /* Continue to other routes if we're not redirecting */
// })

WebRouter.get('/', HomePageWebsite)

export {ApiRouter, WebRouter}