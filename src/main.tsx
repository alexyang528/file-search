import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'

import {
  SearchHeadlessProvider,
  HeadlessConfig,
  provideHeadless
} from '@yext/search-headless-react';

const config: HeadlessConfig = {
  apiKey: "5472b483d43f25c6dd83c68bb313900f",
  experienceKey: "file-search",
  locale: "en",
  verticalKey: "files"
}

const searcher = provideHeadless(config);



ReactDOM.render(
  <SearchHeadlessProvider searcher={searcher}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SearchHeadlessProvider>,
  document.getElementById('root')
)


