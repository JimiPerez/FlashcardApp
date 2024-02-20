import React, {useState,useEffect} from "react";
import { useHistory, useParams, Link } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "./CardForm";
import { createCard, readDeck } from "../../utils/api";

const CardAdd = () => {

    const {deckId} = useParams();

    const initialFormState = {
        front: "",
        back: ""
    };

    const [formData, setFormData] = useState({...initialFormState})
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

    const history = useHistory();

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createCard(deckId, formData);
            history.push(`/decks/${deckId}`);
        } catch (error) {
            console.error("Error creating card:", error);
        }
    };

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Add Card</li>
                </ol>
            </nav>
            <h3>Add Card</h3>
            <CardForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </>
    )
}

export default CardAdd;
