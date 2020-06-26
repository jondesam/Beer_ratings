require('dotenv').config()
const axios = require('axios')

const fetch = require('node-fetch')

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat,
} = require('graphql')

//Beer Type
const BeerType = new GraphQLObjectType({
  name: 'Beer',
  fields: () => ({
    abv: { type: GraphQLFloat },
    available: { type: GraphQLBoolean },
    brewery: { type: GraphQLString },
    ibu: { type: GraphQLInt },
    link: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    ratings: { type: GraphQLList(RatingType) },
    style: { type: GraphQLString },
  }),
})

//Rating Type
const RatingType = new GraphQLObjectType({
  name: 'Rating',
  fields: () => ({
    name: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
})

const beerData = {
  query: `
  query beers {
    name
    price
}
`,
}

const headers = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

const url = process.env.API_URL

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    beers: {
      type: new GraphQLList(BeerType),
      resolve(parent, args) {
        return fetch(url, {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
          body:
            '{"query":"query {\\n  beers {\\n    style\\n   abv\\n available\\n    brewery\\n    ibu\\n    name\\n    link\\n   price\\n     ratings { \\n      name\\n      value\\n    }\\n  }\\n}","variables":{}}',

          method: 'POST',
        })
          .then((response) => response.json())
          .then((res) => {
            return res.data.beers
          })
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
