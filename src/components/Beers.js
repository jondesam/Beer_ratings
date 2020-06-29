import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import BeerItem from './BeerItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import uniqBy from 'lodash.uniqby'
import chunk from 'lodash.chunk'

const BEERS_QUERY = gql`
  query BeersQuery {
    beers {
      abv
      available
      brewery
      ibu
      link
      name
      price
      ratings {
        name
        value
      }
      style
    }
  }
`

export const Beers = () => {
  const { loading, error, data } = useQuery(BEERS_QUERY)

  const [allBeers, setAllBeers] = useState([])
  const [beers, setBeers] = useState([])
  const [beersChunk, setbeersChunk] = useState([])
  const [filteredBy, setFilter] = useState('UNTAPPD')
  const [avg, setAvg] = useState({ price: 0, untappd: 0, rateBeer: 0 })

  const [hasMore, SetHasMore] = useState(true)

  //For AVG
  useEffect(() => {
    if (loading === false && data) {
      setAllBeers(uniqBy(data.beers, 'name'))
    }
    switch (filteredBy) {
      case 'PRICE':
        allBeers.sort(sortByPrice)
        break
      case 'UNTAPPD':
        allBeers.sort(sortByUntappd)
        break
      case 'RATE_BEER':
        allBeers.filter(
          (beer) =>
            beer.ratings.value !== '0' && beer.ratings.value !== undefined
        )
        allBeers.sort(sortByRatebeer)
        break
      default:
        break
    }
  }, [loading, data])

  useEffect(() => {
    setbeersChunk(chunk(uniqBy(allBeers, 'name'), 20))
  }, [allBeers, filteredBy])

  useEffect(() => {
    if (loading === false && data) {
      setBeers(beersChunk[0])
    }
  }, [loading, beersChunk, filteredBy])

  // Calculate AVG
  let len = allBeers.length

  let sumPrice = 0
  let sumRateBeer = 0
  let sumUntappd = 0
  let lenPrice = 0
  let lenUntapppd = 0
  let lenRateBeer = 0

  for (var i = 0; i < len; i++) {
    if (allBeers[i].price && allBeers[i].price !== '0') {
      sumPrice += parseFloat(allBeers[i].price)
      lenPrice += 1
    }

    if (allBeers[i].ratings[0] && allBeers[i].ratings[0].value !== '0') {
      sumUntappd += parseFloat(allBeers[i].ratings[0].value)
      lenUntapppd += 1
    }
    if (allBeers[i].ratings[1] && allBeers[i].ratings[1].value !== '0') {
      sumRateBeer += parseFloat(allBeers[i].ratings[1].value)
      lenRateBeer += 1
    }
  }

  useEffect(() => {
    if (sumUntappd !== 0 && sumPrice !== 0 && sumRateBeer !== 0) {
      setAvg({
        // ...avg,
        price: (sumPrice / lenPrice).toFixed(2),
        untappd: (sumUntappd / lenUntapppd).toFixed(2),
        rateBeer: (sumRateBeer / lenRateBeer).toFixed(2),
      })
    }
  }, [allBeers])

  const sortByPrice = (a, b) => {
    let priceA = parseInt(a.price)
    let priceB = parseInt(b.price)

    if (priceA < priceB) {
      return -1
    }
    if (priceA > priceB) {
      return 1
    }
    return 0
  }

  const sortByUntappd = (a, b) => {
    let ratingA = parseFloat(a.ratings[0].value)
    let ratingB = parseFloat(b.ratings[0].value)

    return ratingB - ratingA
  }

  const sortByRatebeer = (a, b) => {
    let ratingA = 0
    let ratingB = 0
    if (a.ratings[1] && b.ratings[1]) {
      ratingA = parseFloat(a.ratings[1].value)
      ratingB = parseFloat(b.ratings[1].value)
    }

    return ratingB - ratingA
  }

  if (beers) {
    switch (filteredBy) {
      case 'PRICE':
        beers.sort(sortByPrice)
        break
      case 'UNTAPPD':
        beers.sort(sortByUntappd)
        break
      case 'RATE_BEER':
        beers.sort(sortByRatebeer)
        break
      default:
        break
    }
  }

  if (allBeers) {
    switch (filteredBy) {
      case 'PRICE':
        allBeers.sort(sortByPrice)
        break
      case 'UNTAPPD':
        allBeers.sort(sortByUntappd)
        break
      case 'RATE_BEER':
        allBeers.sort(sortByRatebeer)
        break
      default:
        break
    }
  }

  // Pagination
  let pn = 1
  const fetchMoreData = () => {
    if (pn >= beersChunk.length) {
      SetHasMore(false)
    }

    if (beersChunk[pn]) {
      setBeers(beers.concat(beersChunk[pn]))
    }
  }

  if (loading) return <h4>Loading...</h4>
  if (error) console.log(error)

  return (
    <div className='container'>
      <div className='cardy text-white   sticky-top '>
        <div className='nav'>
          <div className='ml-2 mr-2 pb-2'>
            <form className='form-inline ml-4'>
              <button
                className={
                  filteredBy === 'UNTAPPD'
                    ? 'btn btn-primary '
                    : 'btn btn-secondary'
                }
                type='button'
                onClick={() => {
                  SetHasMore(true)

                  setFilter('UNTAPPD')
                  window.scrollTo(0, 0)
                }}
              >
                Untappd
              </button>
              <button
                className={
                  filteredBy === 'RATE_BEER'
                    ? 'btn btn-primary ml-1'
                    : 'btn btn-secondary ml-1'
                }
                type='button'
                onClick={() => {
                  SetHasMore(true)

                  setFilter('RATE_BEER')
                  window.scrollTo(0, 0)
                }}
              >
                Ratebeer{' '}
              </button>
            </form>

            <div className='sticky-top col-sm-4 mt-3 ml-2'>
              <h5 className='avg  '>Avg. Price : $ {avg.price}</h5>
              {filteredBy === 'UNTAPPD' ? (
                <h5 className='avg '> Avg. Rate : {avg.untappd} / 5</h5>
              ) : filteredBy === 'RATE_BEER' ? (
                <h5 className='avg  '> Avg. Rate : {avg.rateBeer} / 5</h5>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {beers ? (
        <InfiniteScroll
          dataLength={beers.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {beers.map((beer, index) => {
            pn = parseInt(Math.ceil(beers.length / 20))

            return <BeerItem key={beer.name} beer={beer} />
          })}
        </InfiniteScroll>
      ) : null}
    </div>
  )
}
