import { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Loading } from './loading'
import { Api } from '../api'
import useGeolocation from 'react-hook-geolocation';


function Display() {

    let geolocation = useGeolocation()

    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(false)
    let [data, setData] = useState()
    let [refresh, setRefresh] = useState()

    useEffect(() => {

        let latitude = geolocation.latitude
        let longitude = geolocation.longitude
        let isValidToRequest = latitude && longitude
        if (isValidToRequest) {
            Api.get(`/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt_br&appid=84f37cbcb91106c87e5ac88e9d2e94cc&units=metric`)
                .then(response => {
                    setData(response.data)
                    setLoading(false)
                })
                .catch(err => setError(true))
        }

        return () => { }
    }, [geolocation, refresh])

    let handleRefresh = useCallback(()=>{
        setLoading(true)
        setRefresh((old) => !old)
    })

    let handleAddress = useCallback(() => {
        let { name, sys } = data
        return (
            <div className='CardLocalization'>
                <p>{name} - {sys.country} </p>
                <p>{ new Date().toLocaleString() }</p>
            </div>
        )
    })

    let handleWeather = useCallback(() => {
        let { weather, main, wind } = data
        let { humidity, pressure, sea_level, temp, temp_max, temp_min } = main
        let { description } = weather[0]

        return (
            <div className='CardWeather'>
                <p>Temperatura: {temp} ℃ </p>
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
        toast.error('Ocorreu um erro ao consumir a Api')
        return <p>No momento não há nada para exibir :/</p>
    }

    if (data) {
        return (
            <>
                {handleAddress()}

                {handleWeather()}

                <div>
                    <button className='Btn' onClick={()=> handleRefresh() }>Atualizar Dados</button>
                </div>

                <ToastContainer autoClose={5000} />
            </>
        )
    }
}

export { Display } 