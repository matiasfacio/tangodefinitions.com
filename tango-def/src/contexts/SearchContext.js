import React, { createContext } from "react";

export const SearchContext = createContext()

const SearchContextProvider = (props) => {

    const searchEntry = (entry) => {
        fetch(`http://localhost:5000/search/${entry}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

    }
   

    return ( <SearchContext.Provider value = {searchEntry}>
        {props.children}
    </SearchContext.Provider> );
}
 
export default SearchContextProvider;