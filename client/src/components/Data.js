import React, { useEffect } from 'react'
import Geocode from "react-geocode";

const Data = (props) => {
    useEffect(() => {
        
    }, []);
    function goLocate() {
        props.setResultData(props.value)
        Geocode.fromAddress(props.value)
        .then((res)=>{        
                    console.log(res.results[0].geometry.location)
                    const {lat,lng} = res.results[0].geometry.location;
                    props.getPlace({lat, lng})
                    props.panTo({lat,lng})    
        })
    }
    return (
        <>
            {/* <div onClick={goLoate}>{props.value}</div> */}<br/>
            <button className="resultList" onClick={goLocate}>{props.value}</button>
        </>

    )
}

export default Data