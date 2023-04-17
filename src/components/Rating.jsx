



import React from 'react'

export default function Rating({rating}) {
  const stars = Array.from({length: rating}, (_, i) =>(<i className='fas fa-star' key={i}/>))
  
  return (
    <div className="rating-container" id="rating-container">
     {stars}
    </div>
  )
}
