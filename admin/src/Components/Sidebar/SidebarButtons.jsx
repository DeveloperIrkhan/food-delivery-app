import React from 'react'
import './Sidebar.css'

const SidebarButtons = ({ img, alt, text, onclickFun}) => {
    return (
        <div className=''>
            <div className='sidebar-options' onClick={onclickFun}>
                <div className='sidebar-option d-flex flex-row justify-content-center align-items-center'>
                    <img src={img} alt={alt} />
                    <p>{text} </p>
                </div>
            </div>
        </div>
    )
}

export default SidebarButtons