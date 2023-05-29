





import React from 'react'
import rectangle1 from '../images/rectangle.svg'
import rectangle2 from '../images/rectangle2.svg'
export default function CardsSwitch({oneCard, switchCard, switchMultiCard}) {
  return (
    <div className="switch-container">
    <div className={"multicard-switch" + (!oneCard && " switch-selected")} id="multi-card-switch"  onClick={switchMultiCard}>
        <img src={rectangle1} className={"multicard-card-icon"} />
        <img src={rectangle1} className={"multicard-card-icon"} />
        <img src={rectangle1} className={"multicard-card-icon"} />
    </div>
    <img src={rectangle2} className={"one-card-icon" + (oneCard && " switch-selected")} id="one-card-switch"  onClick={switchCard} />
</div>
  )
}
