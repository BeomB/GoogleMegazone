import React from 'react'
import "../App.css"

const Locate = ({ panTo, place, getPlace }) => {

    function myLocate() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const myLat = position.coords.latitude
                const myLng = position.coords.longitude
                getPlace({ myLat, myLng })
                console.log(place)
                console.log({ myLat, myLng })
                panTo({ lat: myLat, lng: myLng })
            }
        )
    }
    return (
        <div className='resultListForm'>
            <button className="locate" onClick={myLocate}>
                {/* <img src="./compass.svg" alt="" /> */}
            </button>
        </div>
    )
}

export default Locate