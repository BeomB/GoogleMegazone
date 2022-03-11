import React,{useState} from 'react'
import PlacesAutocomplete,{geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Data from './Data';

const Auto = () => {
    const [address,setAddress] = useState("");
    const [coordinates, setCoorinates] = useState({lat: null, lng: null})
    const [isShow, setIsShow] = useState(false)
    const [data, setData] = useState([])
    const handleSelect = async value =>{
        const results = await geocodeByAddress(value);
        const latlng = await getLatLng(results[0])
        setCoorinates(latlng);
    };
    function showLocate(){
        console.log("버튼")
        setIsShow(true)
        console.log(data)
        
    }
  return (
    <div>
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >{({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
        <div>
            <p>위도: {coordinates.lat}</p>
            <p>경도: {coordinates.lng}</p>
            <input {...getInputProps({placeholder:"Type address"})}/>

            <div>
                {loading ? <div>...loading</div>: null}
                    
                {suggestions.map((suggestions)=>{
                    
                    const style={
                        backgroundColor: suggestions.active ? "#41b6e6": "#fff"
                    }
                    return <div {...getSuggestionItemProps(suggestions, {style})}>
                        {suggestions.description}</div>;
                    
                })}
            </div>
            <button onClick={()=>{
                console.log(suggestions)
            }}>
            보기
            </button><br/>
            
        </div>
        )}
        </PlacesAutocomplete>
    </div>
  )
}

export default Auto