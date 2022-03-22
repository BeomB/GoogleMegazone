import React, { useState, useCallback, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Predict_img from './Predict_img';
import Search from "./Search";
import Locate from "./Locate";
import "@reach/combobox/styles.css";
import "../App.css"
import title_logo from '../image/title_logo.png'
import light from '../image/light.png'
import { GoogleMap, useLoadScript, Marker, InfoWindow, } from "@react-google-maps/api";
import TodoModal from './TodoModal';
import SearchResult from './SearchResult';
import Chart from './Chart';

const Map = () => {

  const libraries = ["places, drawing,geometry, localContext , visualization "];
  const [showModal, setShowModal] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchPlace, setSearchPlace] = useState([]);
  const [resultValue, setResultValue] = useState({});
  const [resultData, setResultData] = useState("");
  const [count, setCount] = useState()
  const [isShow, setIsShow] = useState(false);
  const [place, setPlace] = useState({})

  const options = {
    // style: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  }
  const center = {
    lat: 37.498222,
    lng: 127.0341627
  }

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

  useEffect(() => {

  }, [count])
  function openModal() {
    console.log("모달표시")
    setShowModal(true)
    console.log(showModal)
  }
  function closeModal() {
    console.log("모달끄기")
    setShowModal(false)
  }


  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "페이지를 로딩중입니다.";

  return (
    <>
      <div>

        <br />
        <h3 className='title'>ㅤ<img onClick={openModal} src={title_logo} style={{ width: "30px", height: "30px", marginRight: "10px", marginTop: "-10px" }} />브랜드를 찾아줘</h3>
        {showModal ? <TodoModal openModal={openModal} closeModal={closeModal}></TodoModal> : null}<br />
        <p className='how'>ㅤㅤㅤㅤㅤㅤ돋보기를 누르면 사용법이 나와요!</p>
        <br />
        <SearchResult></SearchResult>
        {/* <Chart></Chart>
       */}

        <div className='btn_group'>
          <Predict_img setResultValue={setResultValue} setCount={setCount} setIsShow={setIsShow}></Predict_img>
          <Search panTo={panTo} place={place} getPlace={getPlace} getSearchPlace={getSearchPlace} resultValue={resultValue} setResultData={setResultData} isShow={isShow} setIsShow={setIsShow} />
        </div>


        <div className='mapView'>
          <Locate panTo={panTo} place={place} getPlace={getPlace} />
          <div className="googleMap">
            <GoogleMap
              id="googlemap-streetview"
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
                    scaledSize: new window.google.maps.Size(40, 40),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15)
                  }}
                  onClick={() => {
                    setSelected(place)
                    panTo(place)
                    fetch("http://localhost:8080/database")
                      .then((res) => res.json())
                      .then(data => {
                        for (var i = 0; i < data.length; i++) {
                          if (resultValue === data[i].name) {
                            console.log(data[i].count)
                            setCount(data[i].count)
                            console.log(count)
                          }
                        }
                      })
                  }}
                />
              ))}
              {selected ? (<InfoWindow position={{ lat: place.lat, lng: place.lng }}
                onCloseClick={() => {
                  setSelected(null);
                  panTo(place)

                }}
              >
                <div className='inforWindow'>
                  <h6><img style={{ width: "17px", height: "17px", marginRight: "4px", marginTop: "-4px" }} src={light} />알림</h6>
                  <p>"<span style={{ color: "red" }}>{resultValue}</span>" 브랜드를<br /> 검색한 횟수는 <span style={{ color: "red" }}>{count}</span> 입니다!</p>
                  <a href={"https://www.google.com/maps/search/" + resultData}>
                    <button className='btnShow'>정보 보기</button>
                  </a>

                  {/* <button onClick={findStreet}>길찾기</button> */}

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