import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Deck from "./Decks/Deck";
import Header from "./Header";
import CreateDeck from "./Decks/DeckCreate";
import NotFound from "./NotFound";
import DeckEdit from "./Decks/DeckEdit";
import CardAdd from "./Cards/CardAdd";
import CardEdit from "./Cards/CardEdit";
import StudyDeck from "./Decks/StudyDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <CardAdd />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
