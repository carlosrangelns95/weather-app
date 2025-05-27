// Variáveis e seleção de elementos
const apikey = '44d2abbbae92b00abb0903a3079179eb';
const apiCountryURL = 'https://countryflagsapi.netlify.app/flag/'
const apiIconURL = ' https://openweathermap.org/img/wn/'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')

const weatherData = document.querySelector('#weather-data')

// Funções
const getWeatherData = async (city) =>{
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${ city }&units=metric&appid=${ apikey }&lang=pt_br`
  const res = await fetch(apiWeatherURL)
  const data = await res.json()
  console.log(data)
  return data
}

const showWeatherData = async (city) =>{
  const data = await getWeatherData(city)
  cityElement.innerText = data.name
  tempElement.innerText = parseInt(data.main.temp)
  descElement.innerText = data.weather[0].description
  weatherIconElement.setAttribute('src', `${apiIconURL}${data.weather[0].icon}.png`)
  countryElement.setAttribute('src',`${apiCountryURL}${data.sys.country}.svg `)
  umidityElement.innerText = data.main.humidity
  windElement.innerText = `${String(data.wind.speed).replace('.',',')} Km/h`
  weatherData.classList.remove('hide')
}


// Eventos
searchBtn.addEventListener("click", (e) =>{
  e.preventDefault()
  const city = cityInput.value
  showWeatherData(city)
})

cityInput.addEventListener("keyup", (e)=>{
  if(e.code === 'Enter'){
    const city = e.target.value
    showWeatherData(city)
  }
})