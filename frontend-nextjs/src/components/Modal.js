import { useState } from 'react'
const Modal = ({ children, title, isOpen, closeHandler, subtitle = null }) => {
    return (
        <>
            {isOpen && (
                <div className="l-modal__wrapper">
                    <div className="l-modal__bg" onClick={closeHandler}></div>
                    <div className="l-modal">
                        <div className="c-box">
                            <div className="c-box__title__wrapper">
                                <p className="c-box__title">{title}</p>
                                {subtitle && (
                                    <p className="c-box__subtitle">{subtitle}</p>
                                )}
                            </div>
                            <div className="c-box__inner">{children}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Modal
