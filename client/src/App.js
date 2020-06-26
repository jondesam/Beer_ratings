import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'

import { Beers } from './components/Beers'

const client = new ApolloClient({
  uri: '/graphql',
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Router>
            <div className='-fluid'>
              <Route exact path='/' component={Beers} />
            </div>
          </Router>
        </ApolloHooksProvider>
      </ApolloProvider>
    )
  }
}

export default App
