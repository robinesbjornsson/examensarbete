import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import {  } from '@heroicons/react/solid' 

const containerStyle = {
  width: '100%',
  height: '100%',
}

const Map = ({ location }) => {
  const center = {
    lat: location.lat,
    lng: location.lng,
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.googlePlacesAPI,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
 const image = 'https://www.freeiconspng.com/thumbs/restaurant-icon-png/restaurant-icon-png-plate-1.png'
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker 
          position={{lat: location.lat, lng: location.lng }}
          icon={{
              url: image,
              anchor: new google.maps.Point(5, 58),
          }}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(Map)
