import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { deleteDeck } from "../../utils/api";

const DeckList = ({ decks }) => {
    const handleDelete = async (deckId) => {
        if (window.confirm("Do you really want to delete this deck?")) {
        await deleteDeck(deckId);
        window.location.reload(false);
        }
    };

    return (
        <>
            <div>
                {decks.map((deck, index) => (
                    <div className="card container shadow-lg my-2 bg-light" key={deck.id}>
                        <h3 className="card-title">{deck.name}</h3>
                        <p className="card-text">{deck.description}</p>
                        <div class="row justify-content-between">
                            <div>
                                <Link to={`/decks/${deck.id}`} class="btn btn-secondary">View</Link>
                                <Link to={`/decks/${deck.id}/study`} class="btn btn-primary mx-1">Study</Link>
                            </div>
                            <div>
                                <h5>{deck.cards.length} cards</h5>
                            </div>
                            <div>
                            <button onClick={() => handleDelete(deck.id)} class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default DeckList;
