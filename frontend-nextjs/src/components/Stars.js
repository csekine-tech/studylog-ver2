import React from 'react'
import ReactStars from 'react-stars'

const Stars = ({ rate, color1, color2, edit, onChange, name }) => {
    return (
        <span className="c-star">
            <ReactStars
                count={4}
                name={name}
                onChange={onChange}
                size={24}
                color1={color1}
                color2={color2}
                edit={edit}
                half={false}
                value={rate ? Number(rate) : 0}
            />
        </span>
    )
}
export default Stars
