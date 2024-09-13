import React from 'react'

const Roundedbtn = ({
    text = 'Order',
    cssClass = 'btn btn-rounded',
    onclickFun = () => console.log('No function provided!')
}) => {
    return (
        <button className={cssClass} onClick={onclickFun} >
            {text}
        </button >
    )
}
export default Roundedbtn