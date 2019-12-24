import React from 'react';
import Deck from './Deck';
import renderer from 'react-test-renderer';

describe('The deck of cards',()=>{
    it('display list of cards',()=>{
        const cards =  [{"value": "6",
        "code": "6C", "images": {"svg": "https://deckofcardsapi.com/static/img/6C.svg", "png": "https://deckofcardsapi.com/static/img/6C.png"}, "suit": "CLUBS", "image": "https://deckofcardsapi.com/static/img/6C.png"}, {"value": "9", "code": "9D", "images": {"svg": "https://deckofcardsapi.com/static/img/9D.svg", "png": "https://deckofcardsapi.com/static/img/9D.png"}, "suit": "DIAMONDS", "image": "https://deckofcardsapi.com/static/img/9D.png"}, {"value": "10", "code": "0S", "images": {"svg": "https://deckofcardsapi.com/static/img/0S.svg", "png": "https://deckofcardsapi.com/static/img/0S.png"}, "suit": "SPADES", "image": "https://deckofcardsapi.com/static/img/0S.png"}, {"value": "2", "code": "2C", "images": {"svg": "https://deckofcardsapi.com/static/img/2C.svg", "png":
        "https://deckofcardsapi.com/static/img/2C.png"}, "suit": "CLUBS", "image": "https://deckofcardsapi.com/static/img/2C.png"}, {"value": "7", "code": "7H", "images": {"svg": "https://deckofcardsapi.com/static/img/7H.svg", "png": "https://deckofcardsapi.com/static/img/7H.png"}, "suit": "HEARTS", "image": "https://deckofcardsapi.com/static/img/7H.png"}, {"value": "QUEEN", "code": "QH", "images": {"svg": "https://deckofcardsapi.com/static/img/QH.svg", "png": "https://deckofcardsapi.com/static/img/QH.png"}, "suit": "HEARTS", "image": "https://deckofcardsapi.com/static/img/QH.png"}, {"value": "ACE", "code": "AS", "images": {"svg": "https://deckofcardsapi.com/static/img/AS.svg", "png": "https://deckofcardsapi.com/static/img/AS.png"}, "suit": "SPADES", "image": "https://deckofcardsapi.com/static/img/AS.png"}, {"value": "JACK", "code": "JD", "images": {"svg": "https://deckofcardsapi.com/static/img/JD.svg", "png": "https://deckofcardsapi.com/static/img/JD.png"}, "suit": "DIAMONDS", "image": "https://deckofcardsapi.com/static/img/JD.png"}, {"value": "7", "code": "7D", "images": {"svg": "https://deckofcardsapi.com/static/img/7D.svg", "png": "https://deckofcardsapi.com/static/img/7D.png"}, "suit": "DIAMONDS", "image": "https://deckofcardsapi.com/static/img/7D.png"}]
        const tree = renderer
                        .create(<Deck cards = {cards} />)
                        .toJSON();
         console.log(tree);      
         expect(tree).toMatchSnapshot();         
    })
})