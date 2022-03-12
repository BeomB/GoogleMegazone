import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import prize from '../image/prize.png'

const SearchResult = () => {
    const [bestBrand, setBestBrand] = useState()
    const [bestCount, setBestCount] = useState(0)
    useEffect(()=>{
        fetch("http://localhost:3001/database")
        .then((res)=>(res.json()))
        .then(data => {
            var bestNum= 0
            for(var i=0; i < data.length; i++){
                if(bestNum<data[i].count){
                    bestNum = data[i].count
                    setBestCount(bestNum)
                    setBestBrand(data[i].name)
                }
                
            }
            }
        )
        
    },[])
  return (
    <div className='searchResult'>
        <a> <img style={{width:"17px", height:"17px", marginRight:"4px",marginTop : "-4px" }} src={prize}/> 가장 핫한 브랜드 : <span style={{color:"red"}}>" {bestBrand} " </span>ㅤ검색 횟수: {bestCount}</a>
    </div>
  )
}

export default SearchResult