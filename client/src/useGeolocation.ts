import { useState, useEffect } from 'react'

interface GeolocationCoordinates {
    latitude: number,
    longitude: number,
}

interface GeolocationError {
    code: number,
    message: string,
}
export const useGeolocation = () => {
    const [location, setLocation] = useState<GeolocationCoordinates>()
    const [error, setError] = useState<GeolocationError>()

    const onChange = ({ coords }: GeolocationPosition) => {
        setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    }

    const onError = (error: GeolocationError) => {
        setError(error)
    }

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            setError({
                code: 0,
                message: 'Geolocation is not supported'
            })
        }

        navigator.geolocation.getCurrentPosition(onChange, onError)

        const watchId = navigator.geolocation.watchPosition(onChange, onError)

        return () => {
            navigator.geolocation.clearWatch(watchId)
        }
    }, [])

    return { ...location, error }
}