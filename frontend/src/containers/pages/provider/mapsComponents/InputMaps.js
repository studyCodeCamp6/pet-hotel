import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import Map from './Map';

function InputMaps(props) {

    const setCoords = props.setCoords

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, handleError);
        } else {
            console.log("Geolocation not support this browser.")
        }
    }

    useEffect(() => {
        getLocation()
    }, [])

    const getCoordinates = (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
        console.log(position)
    }

    const handleError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.")
                break;
            default:
                console.log("An unknown error occurred.")
        }
    }

    return (
        <>
            {
                (latitude && longitude) ?
                    <Map
                        google={props.google}
                        center={{ lat: latitude, lng: longitude }}
                        height='300px'
                        zoom={15}
                        setCoords={props.setCoords}
                    />
                    : null
            }
        </>
    );
}

export default InputMaps;
