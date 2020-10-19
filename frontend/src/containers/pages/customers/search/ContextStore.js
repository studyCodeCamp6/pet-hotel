import React, { useState, createContext } from 'react'

export const SearchStore = createContext(null);

export const SearchStoreProvider = ({ children }) => {
    const [searchResult, setSearchResult] = useState(null)

    const store = {
        searchResult,
        setSearchResult
    }

    return <SearchStore.Provider value={store}>{children}</SearchStore.Provider>
}