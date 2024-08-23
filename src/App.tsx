// src/App.tsx
import React from 'react'
import SearchBar from './components/SearchBar'
import AddressSearch from './components/AddressSearch'
import FreightCalculator from './components/FreightCalculator'
import GlobalStyle from './globalStyles'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <div className="container">
        <SearchBar />
        <AddressSearch />
        <FreightCalculator />
      </div>
    </>
  )
}

export default App
