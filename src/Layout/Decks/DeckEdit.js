import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

const DeckEdit = () => {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({})
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
        const abortController = new AbortController();
        const loadDeck = async () => {
            try {
                const loadedDeck = await readDeck(deckId, abortController.signal);
                setFormData({
                    name: loadedDeck.name,
                    description: loadedDeck.description,
                });
                setDeck(loadedDeck);
            } catch (error) {
                if (error.name !== "AbortError") {
                    throw error;
                }
            }
        };
        loadDeck();

        return () => abortController.abort();
    }, [deckId]);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateDeck({
                id: deckId,
                ...formData,
            });
            history.push(`/decks/${deckId}`);
        } catch (error) {
            console.error("Error updating deck: ", error);
        }
    };

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Edit Deck</li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <DeckForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </>
    );
};

export default DeckEdit;
