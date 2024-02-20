import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const StudyCard = ({ cards }) => {

    const initialState = {
        onFront: true,
        currentCard: 0,
    };
    
    const { deckId } = useParams();
    const history = useHistory();
    const [card, setCard] = useState({ ...initialState });

    const handleFlip = () => {
        setCard({
            ...card,
            onFront: !card.onFront,
        });
    };

    const handleNext = () => {
        if(card.currentCard < cards.length - 1){
            setCard({
                onFront: true,
                currentCard: card.currentCard + 1
            })
        }else{
            if (window.confirm("Restart cards? Click `cancel` to return to home page")) {
                setCard(initialState);
            }else{
                history.push("/")
            }
        }
    }

    return (
        <div className="card container p-3 shadow-lg bg-light">
            {card.onFront
                ?
                <div>
                    <h2>{cards[card.currentCard].front}</h2>
                    <button onClick={handleFlip} className="btn btn-secondary">Flip</button>
                    <p className="row justify-content-end mr-2">Card {card.currentCard + 1} of {cards.length}</p>
                </div>
                :
                <div>
                    <h2>{cards[card.currentCard].back}</h2>
                    <button onClick={handleFlip} className="btn btn-secondary mr-1">Flip</button>
                    <button onClick={handleNext} className="btn btn-primary">Next</button>
                    <p className="row justify-content-end mr-2">Card {card.currentCard + 1} of {cards.length}</p>
                </div>
            }
        </div>
    )
}

export default StudyCard;
