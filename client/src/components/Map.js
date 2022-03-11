import React, { useState, useCallback, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Predict_img from './Predict_img';
import Search from "./Search";
import Locate from "./Locate";
import "@reach/combobox/styles.css";
import "../App.css"
import title_logo from '../image/title_logo.png'
import { GoogleMap, useLoadScript, Marker, InfoWindow, } from "@react-google-maps/api";

const Map = () => {
  const libraries = ["places, drawing,geometry, localContext , visualization "];
  const options = {
    // style: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  }
  const center = {
    lat: 37.380826639239,
    lng: 126.93074727847419
  }
  const [place, setPlace] = useState({})
  const getPlace = (place) => {
    setPlace(place)
  }
  const getSearchPlace = (value) => {
    setSearchPlace(value)
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchPlace, setSearchPlace] = useState([]);
  const [resultValue, setResultValue] = useState({});
  

  const showMarker = useCallback(() => {
    setMarkers(current => [
      ...current, {
        lat: place.lat, lng: place.lng,
        time: new Date(),
      }]
    )
  }, [])

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  useEffect(() => {
    showMarker()
  }, [])

  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
    <div>
      <br />
      <h3 className='title'><img src={title_logo} style={{width:"30px", height:"30px", marginRight:"10px",marginTop : "-10px" }}/>사진으로 위치찾기</h3>

      <div className='btn_group'>
      <Predict_img setResultValue={setResultValue}></Predict_img>
      <Search panTo={panTo} place={place} getPlace={getPlace} getSearchPlace={getSearchPlace} resultValue={resultValue} />
      </div>
      
      
      <div className='mapView'>
        <Locate panTo={panTo} place={place} getPlace={getPlace} />
        <div className="googleMap">
          <GoogleMap
            id="googlemap-streetview"
            // mapContainerStyle={mapContainerStyle}
            zoom={17}
            center={center}
            options={options}
            onLoad={onMapLoad}
          >
            {markers.map((marker) => (

              <Marker key={marker.time.toISOString()}
                position={{ lat: place.lat, lng: place.lng }}
                icon={{
                  url: "/marker.svg",
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15)
                }}
                onClick={() => {
                  setSelected(place)
                  panTo(place)
                }}
              />
            ))}
            {selected ? (<InfoWindow position={{ lat: place.lat, lng: place.lng }}
              onCloseClick={() => {
                setSelected(null);
                panTo(place)
              }}
            >
              <div>
                <h2>정보</h2>

                <p>위치: {resultValue}</p>
                
                

                <p>위치: {searchPlace}</p>
              </div>
            </InfoWindow>) : null}
          </GoogleMap>
        </div>
      </div>
    </div>
</>
  )
}
export default Map





