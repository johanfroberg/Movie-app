import React from "react";
import "./SearchBar.css"

const SearchBar = (props) => {
    return (
        <div>
            <input className="form-control search-bar" value={props.value} onChange={(event)=> props.setSearchValue(event.target.value)} placeholder="search movie titles">
            </input>
        </div>
    )
}

export default SearchBar;