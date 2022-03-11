import React, { useState, useEffect } from 'react'
import * as tmImage from '@teachablemachine/image'
import "../App.css"

export default function Teachable_img(props) {
  const URL = "https://teachablemachine.withgoogle.com/models/_SOVOi3Dr/" 
  let model;
  let labelContainer;
  let maxPredictions;

  const [result, setResult] = useState(1)
  const [imageSrc, setImageSrc] = useState('');
  
  useEffect(() => {
    props.setCount()
    props.setResultValue(result)
  }, [result]);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
  //Teachable Machine을 통해 실행
  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }
    window.requestAnimationFrame(loop);
    console.log("Teachable Machine 클라우드에서 모델 불러오기 성공")
  }

  function loop() {
    predict();
  }

  const ChangeResultto0 = (e) => {
    document.getElementById("label-container").style.display = "none";
    setResult(0)
  }
  //Teachable Machine에서 predict를 통해서 분류 진행
  async function predict() {
    var image = document.getElementById("preview_img")
    const prediction = await model.predict(image, false);
    var max = prediction[0].probability;
    var maxIndex = 0;
    for (let i = 0; i < maxPredictions; i++) {
      if (prediction[i].probability > max) {
        max = prediction[i].probability
        maxIndex = i
      }
    }

    var classPrediction = "사진 속 브랜드는 " + prediction[maxIndex].className + " 입니다!"
    labelContainer.innerHTML = classPrediction;

    const ChangeResult = (e) => {
      setResult(prediction[maxIndex].className)
    document.getElementById("label-container").style.display = "block";
    }
    ChangeResult()
    
  }

  const start = () => {
    props.setIsShow(false)
    document.getElementById("label-container").style.display = "none";
  }



  return (
    <div>
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
      {/*------------------------------------------------------------------------------------------------------------------------------*/}
      <main className="container">
        <div className="preview">
          {imageSrc && <img id="preview_img" src={imageSrc} alt="preview-img" style={{ marginBottom: "20px", width: "180px", height: "180px", textAlign: "center" }} />}
        </div>
        <div>{result === 0 ? <h6>이미지를 측정하고 있어요..</h6> : <h6></h6>}</div>
        <div id="label-container"></div><br />
        <div className="filebox"> <label onClick={start} htmlFor="ex_file" >브랜드 찾기</label> <input type="file" id="ex_file"
          onChange={(e) => { encodeFileToBase64(e.target.files[0]); ChangeResultto0(); init(); }} /> </div>
      </main>
    </div>

  )
}