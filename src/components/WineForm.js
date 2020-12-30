import React from 'react'

const WineForm = () => {
    return (
        <div>
            <form >
                <input
                    placeholder="brand"
                    type="text"
                    name="brand"
                    // value={brand}
                    
                />
                <input
                    placeholder="nose"
                    type="text"
                    name="nose"
                    // value={nose}
                    
                />
                <input
                    placeholder="taste"
                    type="text"
                    name="taste"
                    // value={taste}
                    
                />
                <button placeholder="submit" type="submit">
                    Add Wine
                </button>
            
                </form>
        </div>
    )
}

export default WineForm
