import fetch from 'node-fetch'
import axios from 'axios'

export const GetChannel = async(channel_id) => {
	console.log(channel_id)
	let part = 'snippet,contentDetails,statistics,brandingSettings'
    let api_key = process.env.API_KEY
    let youtube_url = `https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${channel_id}&key=${api_key}`

    // return channel_id
    try{
    	const data = await fetch(youtube_url)
    	return data.json()
    }catch(err){
    	return err
    }

}

export const LatestVideo = async(channel_id, max_result, order) => {
	let part = 'snippet'
	let api_key = process.env.API_KEY
	let latest_vid = `https://www.googleapis.com/youtube/v3/search?key=${api_key}&channelId=${channel_id}&maxResult=${max_result}&order=${order}&part=${part}`

	try{
		const res = await fetch(latest_vid)
		return res.json()
	}catch(err){
		return err
	}
}

export const SearchVideo = async(keyword) => {
	let part = 'snippet'
	let result = 50
	let api_key = process.env.API_KEY
	let video_yt = `https://www.googleapis.com/youtube/v3/search?key=${api_key}&part=${part}&q=${keyword}&maxResults=${result}`
	try{
		const res = await fetch(video_yt)
		return res.json()
	}catch(err){
		return err
	}
}


export const PlaylistVideo = async(channel_id,max_result,playlist_id) => {
	let part = 'snippet,contentDetails'
	let api_key = process.env.API_KEY
	let playlist_url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&channelId=${channel_id}&maxResult=${max_result}&part=${part}&playlistId=${playlist_id}`

	try{
		const res = await fetch(playlist_url)
		return res.json()
	}catch(err){
		return err
	}
}

export const GetAllProduct = async(apiKey, endpoint) => {
	try{
		const res = await fetch(endpoint, {
			headers: {
				'X-Authorization': apiKey
			}
		})
		// console.log(res)
		return res.json()
	}catch(err){
		return err
	}
}

export const DetailProduct = async(apiKey, endpoint, permalink) => {
	try{
		const res = await fetch(`${endpoint}/${permalink}?type=permalink`, {
			headers: {
				'X-Authorization': apiKey
			}
		})
		return res.json()
	}catch(err){
		return err
	}
}


export const CheckWeatherByCity = async(apiKey, city) => {
	// console.log(`${city}, ${apiKey}`)
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
	try{
		const res = await fetch(url)
		// console.log(res)
		return res.json()
	}catch(err){
		return err
	}
}


