import React from 'react'
import "@reach/combobox/styles.css";
import Geocode from "react-geocode";
import usePlacesAutocomplete from "use-places-autocomplete";
import "../App.css"
import Data from './Data';

const Search = ({ panTo, place, getPlace, getSearchPlace, resultValue }) => {

    const { ready, value, suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.653225, lng: () => -79.383186 },
            radius: 400 * 1000,
        },
    });
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    Geocode.setLanguage('en')
    Geocode.setRegion('es')
    Geocode.enableDebug()

    function showData() {
        if (resultValue === 0) {
            alert("사진을 로딩중입니다.")
        }
        else if (resultValue === 1) {
            alert("사진을 업로드 해야합니다.")
        }
        else{
            setValue(resultValue)
            console.log(data[0])
        }

    }
    function handleLocate(e) {
        setValue(e.target.value)
    }

    return (
        <>
            <div className="search">
                <br />
                
                {/* <input className="inputBox1"
                    type="text" placeholder="Enter an address" onChange={handleLocate} value={value}
                ></input> */}
                 <input className="inputBox1"
                    type="text" placeholder="Enter an address" onChange={handleLocate} value={value}
                ></input>
                <br />
                {/* <div className='view'>
                    <button className="btn btn-primary" id="btn_location" onClick={searchMap} >위치보기</button>
                </div> */}
                {/* <input className="inputBox"
                    type="text" placeholder="Enter an address" onChange={handleLocate} value={text}
                ></input><br/>
                <button onClick={showLocate}>위치보기</button> */}
            </div>
            <button className='btn2' onClick={showData}>관련 데이터 보기</button>
                    {status === "OK" &&
                    data.map(({ description }) => {
                        return(<Data key={description} value={description} panTo={panTo} getPlace={getPlace} getSearchPlace={getSearchPlace}/>)
                    }    
                )}
        </>
    )
}
export default Search


    // function searchMap() {
    //     if (resultValue === 0) {
    //         alert("사진을 로딩중입니다.")
    //     }
    //     else if (resultValue === 1) {
    //         alert("사진을 업로드 해야합니다.")
    //     }
    //     else {
    //         getSearchPlace(resultValue)
    //         try {
    //             clearSuggestions();
    //             Geocode.fromAddress(resultValue)
    //                 .then((res) => {
    //                     navigator.geolocation.getCurrentPosition(
    //                         (position) => {
    //                             const { lat, lng } = res.results[0].geometry.location;
    //                             getPlace({ lat, lng })
    //                             panTo({ lat, lng })
    //                         }
    //                     )
    //                 }
    //                 )
    //         } catch (error) {
    //             alert("정확하지 않은 주소입니다.")
    //         }
    //     }
    // }

//     < Combobox
// onSelect = { async(address) => {
//     setValue(address, false);
//     clearSuggestions();
//     try {
//         const results = await getGeocode({ address });
//         const { lat, lng } = await getLatLng(results[0])
//         getPlace({ lat, lng })
//         panTo({ lat, lng })
//     } catch (error) {
//         console.log("error!")
//     }
// }}
// onChange = {(e) => {
//     setValue(e.target.value)
// }
//                 }
//             >
//     <ComboboxInput
//         value={value}
//         onChange={(e) => {
//             setValue(e.target.value);
//         }}
//         disabled={!ready}
//         placeholder="Enter an address"

//     ></ComboboxInput>
// {/* <ComboboxPopover> */ }
// {/* <ComboboxList> */ }
// {
//     status === "OK" &&
//     data.map(({ description }) => (
//         <ComboboxOption key={description} value={description} />
//     ))
// }
// {/* </ComboboxList> */ }
// {/* </ComboboxPopover> */ }
//             </Combobox >