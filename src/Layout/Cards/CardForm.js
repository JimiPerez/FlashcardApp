import React from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

const CardForm = ({ formData, handleChange, handleSubmit }) => {

    const {deckId} = useParams();

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="front" class="form-label">
                    Front
                    <textarea
                        required
                        class="form-control"
                        id="front"
                        name="front"
                        value={formData.front}
                        placeholder="Question"
                        onChange={handleChange}
                    />
                </label>
                </div>
                <div>
                <label htmlFor="back" class="form-label">
                    Back
                    <textarea
                        required
                        class="form-control"
                        id="back"
                        name="back"
                        value={formData.back}
                        placeholder="Answer"
                        onChange={handleChange}
                    />
                </label>
                </div>
                <Link to={`/decks/${deckId}`} class="btn btn-secondary">Cancel</Link>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default CardForm;
