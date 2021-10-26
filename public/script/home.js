new Vue({
	el:'#home',
	data(){
		return {
			logo: '/images/logos/logo.svg',
			heros:[],
			products: [],
			loading: null,
			ip: '',
			city: '',
			temp:'',
			weathers: [],
			theme: []
		}
	},


	created(){
		this.getHeroData(),
		this.ProductLists(),
		this.getIP(),
		this.getLocation(this.ip)
	},

	methods: {
		getHeroData(){
			const hero = {
				'title': 'Evoush Starter Official',
				'desc': 'Evoush by PT. Pineleng Indah Cemerlang yang merupakan sebuah merk dagang yang fokus pada distribusi product Nutrisi dan Kosmetik, melalui system penjualan langsungnya, evoush siap menjadi ruang yang luas untuk semangat bisnis anda.',
				imgHero: '/images/products/klev/klevv.png'
			}

			this.heros.push(hero)
		},

		GoLink(url){
			window.open(url)
		},

		ProductLists(){
			this.loading = true
			const keyAccess = 'EVOUSH.COM'
			const url = `https://evoush-landing-api.herokuapp.com/api/data/evoush/products/${keyAccess}`
			const new_url = 'https://evoush-mock-api.herokuapp.com/products'
			axios.get(new_url)
			.then(res => {
				// console.log(res)
				this.loading = false
				this.products = res.data
			})
			.catch(err => {
				console.log(err)
			})
		},

		getIP(){
			axios.get('https://api.ipify.org/?format=json')
			.then(res => {
				this.ip = res.data.ip
			})
			.catch(err => {
				console.log(err.message)
			})
		},

		getLocation(ip){
			axios.get(`https://ipapi.co/${ip}/json/`)
			.then(res => {
				// console.log(res.data.city)
				this.city = res.data.city
				this.getWeather(this.city)
			})
			.catch(err => {
				console.log(err.message)
			})
		},

		getWeather(city){
			const apiKey = '172033330b26104e83475e409303f1d7'
			const keyValid = 'EVOUSH.COM'
			// console.log(city)
			axios.get(`/api/data/check/weather/${apiKey}/${city}/${keyValid}`)
			.then(res => {
				// console.log(res.data.data)
				this.weathers = res.data.data.weather[0]
				this.temp = this.getCelcius(res.data.data.main.temp)
			})
			.catch(err => {
				console.log(err.message)
			})
		},

		getCelcius(num){
			num = parseFloat(num)
			return Math.ceil((num - 32) / 1.8)
		},

		setTheme(e){
			const theme = e.target.value
			if(theme === "dark"){
				// alert('This is dark theme')
				document.body.classList.add(theme)
			}else{
				document.body.classList.remove(theme)
			}
		},


	}
})


new Vue({
	el: '#footer',
	data(){
		return {
			year: ''
		}
	},

	created(){
		this.GetYear()
	},

	methods: {
		GetYear(){
			const date = new Date()
			this.year = date.getFullYear()
			// console.log(this.year)
		}
	}
})