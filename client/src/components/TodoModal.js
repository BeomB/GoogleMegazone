import Modal from 'react-modal'
import React from 'react'

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
                <a>
                1. 이름이 기억나지 않는 브랜드 사진을 업로드 해주세요!<br/>
                2. 머신러닝을 활용하여 사진 속 브랜드를 예측합니다.<br/>
                3.  예측을 끝낸 '브랜드를 찾아줘!' 는 사용자의 위치 주변에 있는 브랜드 상점을 추천해줍니다.<br/>
                4. 구글 맵을 활용해 해당 상점의 정보를 확인 할 수 있습니다.<br/>
                6. DB 를 통해 최근 핫 한 브랜드를 확인할 수 있습니다!<br/>
                </a><br/>
                <button onClick={props.closeModal}>닫기</button>
                </div>
            </Modal>
        </div>
    )
}

export default TodoModal