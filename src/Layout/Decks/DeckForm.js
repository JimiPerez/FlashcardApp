import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const DeckForm = ({ formData, handleChange, handleSubmit }) => {

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="name" class="form-label">
                    Name:
                    <input
                        required
                        class="form-control"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        placeholder="Deck Name"
                        onChange={handleChange}
                    />
                </label>
                </div>
                <div>
                <label htmlFor="description" class="form-label">
                    Description:
                    <textarea
                        required
                        class="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        placeholder="Deck Description"
                        onChange={handleChange}
                    />
                </label>
                </div>
                <Link to="/" class="btn btn-secondary">Cancel</Link>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default DeckForm;
