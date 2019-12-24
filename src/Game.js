import React, { Component } from 'react';
import './Game.css';
import ScoreTable from './ScoreTable';
import Deck from './Deck';

class Game extends Component {
  constructor(props) {
    super(props);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.initialize = this.initialize.bind(this);
    this.handleResetScore = this.handleResetScore.bind(this);

    this.initialize();
    
    this.getScore();
  }

  handleResetScore(){
    fetch('http://localhost:8000/resetscore')
    .then(res=>{
      this.getScore();
    })
  }
  getScore(){
    fetch('http://localhost:8000/getscore')
    .then(res=>res.json())
    .then(scores=>{
      console.log(scores);
      this.setState({
        result: scores
      })
    })
  }

  saveScore(currScore){
    
    fetch('http://localhost:8000/savescore',{
      method: 'POST',
      body : JSON.stringify(currScore),
      headers:{
        'Content-Type' : 'application/json'
      }
    }).then(res=>{
      console.log(res);
      this.getScore();
      this.initialize();
    })
  }

  initialize() {
    fetch('http://localhost:8000/draw')
      .then((response) => response.json())
      .then((deck) => {
        console.log(deck);
        let cards = deck.cards;
        this.setState({
          deck1: cards,
          deck2: this.shuffleArray(cards),
          turns: 0,
          setCount: 9,
          totalMatch: 0,         
          lastCard: null,
        });
      });
  }

  componentDidMount() {
    this.DECK1 = document.getElementsByClassName('d1')[0];
    this.DECK2 = document.getElementsByClassName('d2')[0];
    console.log(this.DECK2)
    if(this.DECK2){
      this.DECK2.style.pointerEvents = 'none';
    }else{
      console.log('this.deck2', this.DECK2);
    }
    
  }

  shuffleArray(arr) {
    let tempArr = [...arr];
    for (let i = tempArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
    }
    return tempArr;
  }

  handleShuffle(e) {
    e.preventDefault();
    this.initialize();
  }

  handleCardClick(e, cardValue, deck) {
    let element = e.currentTarget,isMatch = 0;
    element.childNodes[0].style.visibility = 'visible';
    if (deck === 'D1') {
      this.DECK2.style.pointerEvents = 'auto';
      this.DECK1.style.pointerEvents = 'none';

      this.setState({
        lastCard: cardValue,
        lastElement: element,
      });
    } else {
      let lastCard = this.state.lastElement;
      this.DECK2.style.pointerEvents = 'none';
     

      if (cardValue === this.state.lastCard) {
        element.style.pointerEvents = 'none';
        lastCard.style.pointerEvents = 'none';
        isMatch++;
      } else {
        setTimeout(() => {
          element.childNodes[0].style.visibility = 'hidden';
          lastCard.childNodes[0].style.visibility = 'hidden';
        }, 500);
      }
      this.setState(
        (state) => ({
          turns: state.turns + 1,
          totalMatch: state.totalMatch + isMatch,
        }),
        () => {
          this.DECK1.style.pointerEvents = 'auto';
          if (this.state.totalMatch === this.state.setCount) {
            this.handleGameOver();
          }
        }
      );
    }
  }

  handleGameOver(){
      let playerName = window.prompt(`Game Over! Your score is : ${this.state.turns} \n Enter your name :`);
      this.saveScore({
        name: playerName,
        turns: this.state.turns,
      });
      
  }

  render() {
//console.log(this.state)
    let deck1,
      deck2,     
      turns = 0,
      scoreBoard,
      resetScoreButton = <></>;
    if (this.state && this.state.deck1 && this.state.deck2) {
      turns = this.state.turns;
       
      deck1 = (
        <Deck
          cards={this.state.deck1}
          deckId="D1"
          onCardClick={this.handleCardClick}
        />
      );
      deck2 = (
        <Deck
          cards={this.state.deck2}
          deckId="D2"
          onCardClick={this.handleCardClick}
        />
      );
    }
    if (this.state && this.state.result && this.state.result.length !== 0) {
      scoreBoard = <ScoreTable scores={this.state.result} />;
      resetScoreButton = <button className="buttons resetButton" onClick={this.handleResetScore}>Reset High Score</button>
      
    }

    return (
      <div className="App">
        <div className="App-header">
          <button className="buttons playButton" onClick={this.handleShuffle}>
            Play / Shuffle
          </button>
        {resetScoreButton}
          <span id="turns"> Turn So far: {turns}</span>
        </div>
        <main>
          <div className="container">
            <div className="deck">
              <h3>Deck1</h3>
              <div className="d1">{deck1}</div>
            </div>
            <div className="deck">
              <h3>Deck2</h3>
              <div className="d2">{deck2}</div>
            </div>
          </div>
        </main>
        <footer>{scoreBoard}</footer>
      </div>
    );
  }
}

export default Game;
