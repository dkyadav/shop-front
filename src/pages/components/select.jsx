import React from 'react'

export default function Select({ quantity, OnChange }) {
    return (
        <div>
            <select name='prodQuantity' id='prodQuantity' onChange={OnChange}>{
                Array.from({ length: quantity }).map((it, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)
            }
            </select>
        </div>
    )
}
