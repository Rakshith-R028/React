import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet"
import styles from "./Map.module.css"
import { useCities } from "../contexts/CitiesContext"
import { useGeolocation } from "../hooks/useGeolocation"
import Button from "../components/Button"
import useGeoPosition from "../hooks/useGeoPosition"

export default function Map() {
  const { cities } = useCities()
  const [mapLat, mapLng] = useGeoPosition()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation()

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },
    [mapLat, mapLng],
  )

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    },
    [geolocationPosition],
  )

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your Position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter positions={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ positions }) {
  const map = useMap()
  map.setView(positions)
  return null
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  })
}
