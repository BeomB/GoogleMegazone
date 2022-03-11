import React from 'react'
import "@reach/combobox/styles.css";
import Geocode from "react-geocode";
import usePlacesAutocomplete from "use-places-autocomplete";
import "../App.css"
import Data from './Data';
import { useState } from 'react';
import { useEffect } from 'react';

const Search = ({ panTo, place, getPlace, getSearchPlace, resultValue, setResultData, isShow, setIsShow}) => {
    const [myLat, setMyLat] = useState("");
    const [myLng, setMyLng] = useState("");
    
    useEffect(()=>{
       showData(); 
    },[])

    const { ready, value, suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => myLat, lng: () => myLng },
            radius: 0.01* 0.01,
        },
    });
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    Geocode.setLanguage('kor')
    // Geocode.setRegion('es')
    Geocode.setRegion('kor')
    Geocode.enableDebug()

    function showData() {
        if (resultValue === 0) {
            alert("사진을 로딩중입니다.")
        }
        else if (resultValue === 1) {
            alert("사진을 업로드 해야합니다.")
        }
        else{
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    const myLat = position.coords.latitude
                    const myLng = position.coords.longitude
                    setMyLat(myLat)
                    setMyLng(myLng)
                    
                }
            )
            setValue(resultValue)
            setIsShow(true)

            
            const url=`http://localhost:5001/database${resultValue}`
            const data = {
                data: resultValue
            }
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}

            })
            
        }

    }
    function handleLocate(e) {
        setValue(e.target.value)
    }

    return (
        <>
            <div className="search">
                <br />
                 <input className="resultInputBox"
                    type="text" placeholder="Enter an address" onChange={handleLocate} value={value}
                ></input>
                <br />
            </div>

            {resultValue===0 || resultValue===1 ? null : <><button className='showDataBtn' onClick={showData}>관련 데이터 보기</button>
                    
                    {isShow && status === "OK" &&
                    data.map(({ description }) => {
                        return(<Data key={description} value={description} panTo={panTo} getPlace={getPlace} getSearchPlace={getSearchPlace} setResultData={setResultData}/>)
                    }    
                )}<br/></>}
            
        </>
    )
}
export default Search
