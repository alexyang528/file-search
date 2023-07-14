import './App.css'
import ChatResponse from './components/ChatResponse'

import {
  SearchBar,
  VerticalResults,
  StandardCard
} from '@yext/search-ui-react';

function App() {
  return (
    <>
      <SearchBar />
      <ChatResponse />
      <VerticalResults CardComponent={StandardCard} />
    </>
  )
}

export default App
