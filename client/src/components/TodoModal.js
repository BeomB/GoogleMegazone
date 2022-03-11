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
                <h3>사용법</h3>
                <button onClick={props.closeModal}>닫기</button>
            </Modal>
        </div>
    )
}

export default TodoModal