import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api/index";
import CardList from "../Cards/CardList";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      if (deckId) {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      }
    }
    loadDeck();
  }, [deckId]);

  const handleDeckDelete = async () => {
    if (window.confirm("Do you really want to delete this deck?")) {
        await deleteDeck(deckId);
        history.push("/");
    }
  };

    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">{deck.name}</li>
          </ol>
        </nav>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="container row justify-content-between">
          <div>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
                Edit
            </Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary mx-1">
                Study
            </Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                Add Card
            </Link>
          </div>
          <div>
            <button className="btn btn-danger" onClick={handleDeckDelete}>
              Delete
            </button>
          </div>
        </div>
        <CardList deck={deck} />
      </>
    );

}

export default Deck;