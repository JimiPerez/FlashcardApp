import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, updateCard, deleteCard, readDeck } from "../../utils/api/index";
import CardForm from "./CardForm";

const CardEdit = () => {
    const { cardId, deckId } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({
        front: "",
        back: "",
    });
    const [deck, setDeck] = useState({})

    useEffect(() => {
        async function loadDeck() {
          if (deckId) {
            const loadedDeck = await readDeck(deckId);
            setDeck(loadedDeck);
          }
        }
        loadDeck();
    }, [deckId]);

    useEffect(() => {
        const abortController = new AbortController();
        const loadCard = async () => {
            try {
                const loadedCard = await readCard(cardId, abortController.signal);
                setFormData({
                    front: loadedCard.front,
                    back: loadedCard.back,
                });
            } catch (error) {
                if (error.name !== "AbortError") {
                    throw error;
                }
            }
        };
        loadCard();

        return () => abortController.abort();
    }, [cardId]);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            await updateCard({
                id: cardId,
                deckId: Number(deckId),
                ...formData,
            }, abortController.signal);
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
                    <li className="breadcrumb-item active">Edit Card</li>
                </ol>
            </nav>
            <h3>Edit Card</h3>
            <CardForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </>
    )
}

export default CardEdit;
