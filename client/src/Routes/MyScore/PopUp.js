import React from 'react';
import Popup from 'reactjs-popup';
import Result from './Result'

const PopUp = () => {
   
    return (
        <Popup trigger={<button className="button">결과보기</button>}
            modal
            closeOnDocumentClick>
            {close => <Result close={close} />}
        </Popup>
    );
};

export default PopUp;