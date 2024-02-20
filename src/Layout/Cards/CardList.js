import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api/index";

const CardList = ({ deck }) => {
    const history = useHistory();

    const handleCardDelete = async (cardId) => {
        if (window.confirm("Delete this card?")) {
            await deleteCard(cardId);
            window.location.reload();
        }
    };
    // Check if 'deck' and 'cards' exist before mapping
if (!deck || !deck.cards || deck.cards.length === 0) {
    return <p>No cards available.</p>;
}

return (
    <>
        <h2 className="mt-3">Cards :</h2>
        <div className="card-list">
            {deck.cards.map((card) => (
                <div className="card shadow-lg my-2 bg-light" key={card.id}>
                    <div className="card-body">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-6">{card.front}</div>
                                <div className="col-6">{card.back}</div>
                            </div>
                            <div className="row justify-content-end">
                                <Link
                                    to={`/decks/${deck.id}/cards/${card.id}/edit`}
                                    className="btn btn-secondary mr-1"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleCardDelete(card.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
);

};

export default CardList;
