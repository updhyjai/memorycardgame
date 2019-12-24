import React from 'react';
import './Game.css';

function Deck(props) {
    
    const handleCardClick= (e, code, deck)=>{
        props.onCardClick(e,code,deck);
    }
    let deck = props.cards.map((card,index) => {
        return (
          <div
            className="cards"
            onClick={(e) => handleCardClick(e, card.code, props.deckId)}
            key={index + card.code}
          >
            <img alt = {card.code} src={card.image} style = {{visibility:"hidden"}}></img>
          </div>
        );
      });
  return (
   deck
  );
}

export default Deck;
