import { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { VscRefresh } from 'react-icons/vsc'
import { Loading } from './loading'
import { Api } from '../api'
import useGeolocation from 'react-hook-geolocation';


function Display() {

    let geolocation = useGeolocation()

    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(false)
    let [dataWeather, setDataWeather] = useState()
    let [refresh, setRefresh] = useState()

    useEffect(() => {

        let requestWeather = async () => {
            let weatherServiceEndpoint = `/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt_br&appid=84f37cbcb91106c87e5ac88e9d2e94cc&units=metric`
            let response = await Api.get(weatherServiceEndpoint)
            setDataWeather(response.data)
            setLoading(false)
        }

        let { latitude, longitude } = geolocation
        let isValidToRequest = latitude && longitude
        if (isValidToRequest) {
            try {
                requestWeather()
            } catch (error) {
                setError(true)
            }
        }

    }, [geolocation, refresh])

    let handleRefresh = useCallback(() => {
        setLoading(true)
        setRefresh((old) => !old)
    })

    let handleAddress = useCallback(() => {
        let cityName = dataWeather.name
        let country = dataWeather.sys?.country

        let dateAndHour = new Date().toLocaleString()
        return (
            <div className='CardLocalization'>
                <p>{cityName} - {country} </p>
                <p>{dateAndHour}</p>
            </div>
        )
    })

    let handleWeather = useCallback(() => {
        let { weather, main, wind } = dataWeather
        let { humidity, temp, temp_max, temp_min } = main
        let { description } = weather[0]

        return (
            <div className='CardWeather'>
                <p>Temperatura: {temp} ℃ </p>
                <p>Temperatura Máx: {temp_max} ℃ </p>
                <p>Temperatura Min: {temp_min} ℃ </p>
                <p>Tempo: {description} </p>
                <p>Vento: {wind.speed} km/h </p>
                <p>Umidade: {humidity} % </p>
            </div>
        )
    })

    if (loading) {
        return <Loading />
    }

    if (error) {
        toast.error('Ocorreu um erro ao tentar buscar os dados do Tempo')
        return <p>No momento não é possivel exibir as informações do Tempo</p>
    }

    if (dataWeather) {
        return (
            <div className="Display">

                {handleAddress()}

                {handleWeather()}

                <div>
                    <button className='Btn' onClick={() => handleRefresh()}>
                        <VscRefresh />
                    </button>
                </div>

                <ToastContainer autoClose={5000} />
            </div>
        )
    }
}

export { Display } 