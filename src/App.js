import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Predict_img from './components/Predict_img';


const App = () => {
  return (
    <>
      <hr />
      <br />
      <h2 className='title'>사진으로 위치찾기</h2>
      <Predict_img></Predict_img>

    </>

  )
}
export default App





