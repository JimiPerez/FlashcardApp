import React, { useState}from "react";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import DeckForm from "./DeckForm";
import { createDeck } from "../../utils/api";

const CreateDeck = () => {

    const initialFormState = {
        name: "",
        description: ""
    };

    const [formData, setFormData] = useState({...initialFormState})

    const history = useHistory();

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        async function deckCreate() {
            try {
                const newDeck = await createDeck(formData);
                history.push(`/decks/${newDeck.id}`);
            } catch (error) {
                if (error !=="AbortError") {
                    throw error;
                }
            }
        }
        deckCreate();
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Create Deck</li>
                </ol>
            </nav>
            <h3>DeckCreate</h3>
            <DeckForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </>
    )
}

export default CreateDeck;
