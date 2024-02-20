import React, { useState, useEffect } from "react";
import StudyCard from "../Cards/StudyCard";
import { useParams, Link } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";

const StudyDeck = () => {
    
  const [deck, setDeck] = useState({});
  const {deckId} = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }

    loadDeck();
    return () => abortController.abort();
    }, [deckId]);

    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active">Study</li>
          </ol>
        </nav>
        {deck.cards && deck.cards.length >= 3 ? (
          <>
            <h1 className="mb-4">Study : {deck.name}</h1>
            <StudyCard cards={deck.cards} />
          </>
        ) : (
          <>
            <h1>Not enough cards.</h1>
            <p>You need at least 3 cards to study. There are {deck.cards ? deck.cards.length : 0} cards in this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                Add Card
            </Link>
          </>
        )}
      </>
  );
    
}

export default StudyDeck;
