import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { listDecks } from "../utils/api";
import DeckList from "./Decks/DeckList";

const Home = () => {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
      const abortController = new AbortController();
  
      async function loadDecks() {
        try {
          const loadedDecks = await listDecks();
          setDecks(loadedDecks);
        } catch (error) {
          if (error.name !== "AbortError") {
            throw error;
          }
        }
      }
  
      loadDecks();
      return () => abortController.abort();
    }, []);



    return (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            </ol>
          </nav>
          <Link to="/decks/new" className="btn btn-secondary">
              Create Deck
          </Link>
          <DeckList decks={decks}/>
        </>
    )
}

export default Home;