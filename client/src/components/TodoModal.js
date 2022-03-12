import Modal from 'react-modal'
import React from 'react'
import Qlogo from '../image/Qlogo.png'

Modal.setAppElement("#root")

const TodoModal = (props) => {
    return (
        <div className='modal'>
            <Modal
            isOpen={props.openModal}
            onRequestClose={props.closeModal}
            >
                <div className='modalItem'>
                <h3>브랜드를 찾아줘란?</h3><br/>
                <a style={{fontSize : "18px"}}> 머신러닝을 이용하여 스포츠 브랜드를 찾아주는 서비스! </a><br/><br/>

                나이키, 아디다스 오리지널, 아디다스 스포츠, 내셔널지오그래픽, 노스페이스, 뉴발란스,<br/> 다이나핏, 데상트 디스커버리, 르꼬끄, 르카프, 리복, 미즈노, 스파이더, 언더아머,<br/> 에베레스트, 엘레쎄, 카파, 케이스위스, 푸마, 휠라
                와 같은 우리나라 상위 20개의 브랜드를<br/> 머신러닝으로 측정하여, 결과를 도출하는 서비스입니다. <span style={{color:"blue"}}>( 네이버 쇼핑 검색어 순위 기준 )</span>
                <br/><br/><a>
                1. 이름이 기억나지 않는 브랜드 사진을 업로드 해주세요!<br/>
                2. 머신러닝을 활용하여 사진 속 브랜드를 예측합니다.<br/>
                3.  예측을 끝낸 '브랜드를 찾아줘!' 는 사용자의 위치 주변에 있는 브랜드 상점을 추천해줍니다.<br/>
                4. ' <img style={{width:"17px", height:"17px", marginRight:"4px",marginTop : "-4px" }} src={Qlogo}/> ' 마커를 클릭하여 정보를 확인하세요! <br/>
                5. 구글 맵을 활용해 해당 상점의 정보를 확인 할 수 있습니다.<br/>
                6. DB 를 통해 최근 핫 한 브랜드를 확인할 수 있습니다!<br/>
                </a><br/>

                <button onClick={props.closeModal}>닫기</button>
                </div>
            </Modal>
        </div>
    )
}

export default TodoModal