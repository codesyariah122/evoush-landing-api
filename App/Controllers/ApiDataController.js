import {GetChannel, LatestVideo, PlaylistVideo, SearchVideo, GetAllProduct, DetailProduct, CheckWeatherByCity} from '../Configs/index.js'
import {firsts, seconds, thirds, fourths, fifths, sixths, sevenths, eights} from '../data/GalleryTestimony.js'
import {materials, boxes} from '../data/HeroData.js'
import {coordinates} from '../data/Coordinate.js'

export const HomePageWebsite = (req, res) => {
	const context = {
		title: 'Evoush::Landing | Official',
		description: 'Your Eternal Future',
		author: "Evoush::Official",
		og: {
			canonical: 'https://evoush-landing-api.herokuapp.com',
			meta_desc: 'Evoush | Your Eternal Future',
			meta_key: 'Evoush | Nutrition Product | Cosmetics product',
			title: "Evoush::Landing | Official::Product",
			desc: "Your Eternal Future",
			url: "https://evoush.com",
			image: "https://raw.githubusercontent.com/codesyariah122/bahan-evoush/main/images/banner/stories/1.jpg",
		},
		heros: [
		{name: 'light', url: '/images/products/klev/klevv.png'},
		{name: 'dark', url: '/images/products/klev/klevv.png'}
		],
		base_url: process.env.BASE_URL
	}
	res.render('pages/home', context)
}

export const YoutubeChannel = async(req, res) => {
	let channel_id = req.params.channel_id
	try {
		res.json({
			message: 'Youtube profile channel',
			data: await GetChannel(channel_id)
		})
	}catch(err){
		res.json({
			message: 'Error fetch',
			data: err.message
		})
	}
}


export const LatestVideoYoutube = async(req, res) => {
	let channel_id = req.params.channel_id
	let max_result = req.params.max_result
	let order = req.params.order

	try{
		res.json({
			message: 'Youtube Latest Video Channel',
			data: await LatestVideo(channel_id, max_result, order)
		})
	}catch(err){
		res.json({
			message: 'Error fetch',
			data: err.message
		})
	}
}

export const PlaylistVideoYoutube = async(req, res) => {
	let channel_id = req.params.channel_id
	let max_result = req.params.max_result
	let playlist_id = req.params.playlist_id

	try{
		res.json({
			message: 'Youtube playlist data fetch',
			data: await PlaylistVideo(channel_id, max_result, playlist_id)
		})
	}catch(err){
		res.json({
			message: 'Error fetch playlist youtube data',
			data: err.message
		})
	}
}


export const SearchYoutubeVideo = async(req, res) => {
	let q = req.params.keyword
	try{
		res.json({
			message: 'Success fetch youtube video',
			data: await SearchVideo(q)
		})
	}catch(err){
		res.json({
			message: 'Error fetch youtube video',
			data: err.message
		})
	}
}

export const DataGalleryTestimony = async(req, res) => {

	let params = req.params.list
	// console.log(params)
	if(params === "first"){
		await GetData(res, "First data gallery testimony", firsts, 'Error fetch gallery testimony data')
	}else if(params === "second"){
		await GetData(res, "Second data gallery testimony", seconds, 'Error fetch gallery testimony data')
	}else if(params === "third"){
		await GetData(res, "Third data gallery testimony", thirds, 'Error fetch gallery testimony data')
	}else if(params === "fourth"){
		await GetData(res, "Fourth data gallery testimony", fourths, 'Error fetch gallery testimony data')
	}else if(params === "fifth"){
		await GetData(res, "Fifth data gallery testimony", fifths, 'Error fetch gallery testimony data')
	}else if(params === "sixth"){
		await GetData(res, "Sixt data gallery testimony", sixths, 'Error fetch gallery testimony data')
	}else if(params === "seventh"){
		await GetData(res, "Sevents data gallery testimony", sevenths, 'Error fetch gallery testimony data')
	}else if(params === "eight"){
		await GetData(res, "Eight data gallery testimony", eights, 'Error fetch gallery testimony data')
	}else {
		res.json({message: 'No parameter in your request'})
	}
}

export const HeroDataImage = async(req, res) => {
	const type = req.params.type

	switch(type){
		case "materials":
		await GetData(res, "Fetch data material hero", materials, 'Error fetch data hero image')
		break;

		case "boxes":
		await GetData(res, "Fetch data boxes hero", boxes, "error fetch data hero image")
		break;

		default:
		res.json({message: 'No data type'})
	}
}

export const CoordinateData = async(req, res) => {
	await GetData(res, "Fetch coordinate data", coordinates, "Error fetch coordinate data")
}


export const ProductListController = async(req, res) => {
	const keyAccess = 'EVOUSH.COM'
	const key = req.params.keyAccess

	// console.log(key)

	const apiKey = process.env.COMMERCE_KEY
	const endPoint = process.env.ENDPOINT
	try{
		if(key === keyAccess){
			res.json({
				message: 'Success fetch product lists',
				data: await GetAllProduct(apiKey, endPoint)
			})
		}else{
			res.json({
				message: 'Failed key access'
			})
		}
	}catch(err){
		res.json({
			message: 'Error fetch all product data',
			data: err.message
		})
	}

}

export const DetailProductController = async(req, res) => {
	const keyAccess = 'EVOUSH.COM'
	const key = req.params.keyAccess
	const permalink = req.params.permalink

	const apiKey = process.env.COMMERCE_KEY
	const endPoint = process.env.ENDPOINT

	try{
		if(key === keyAccess){
			res.json({
				message: `Success fetch detail product ${permalink}`,
				data: await DetailProduct(apiKey, endPoint, permalink)
			})
		}
	}catch(err){
		res.json({
			message: 'Error fetch product data',
			data: err.message
		})
	}
}


export const CheckWeather = async(req, res) => {
	const apiKey = req.params.apiKey
	const city = req.params.city
	const keyValidation = req.params.keyValid
	const keySource = "EVOUSH.COM"

	console.log(`${apiKey}, ${city}, ${keyValidation}
		`)

	try{
		if(keyValidation === keySource){
			res.json({
				message: 'Success fetch weather data',
				data: await CheckWeatherByCity(apiKey, city)
			})
		}else{
			res.json({
				message: 'Failed to fetch weather data'
			})
		}
	}catch(err){
		res.json({
			message: 'Error fetch weather data by a city',
			data: err.message
		})
	}
}

function GetData(res, message, data, err){
	try{
		res.json({
			message: message,
			data: data
		})
	}catch(err){
		res.json({
			message: err,
			data: err.message
		})
	}
}


