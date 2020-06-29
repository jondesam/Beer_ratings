import React from 'react'

const BeerItem = (beer) => {
  const link = beer.beer.link

  return (
    <div className='album'>
      <div className='card card-body col-sm-6 '>
        <div>
          <a href={link} target='_blank' rel='noopener noreferrer'>
            <h2 className='beername'>{beer.beer.name}</h2>
          </a>

          {beer.beer.brewery ? (
            <h5 className='brewery'> {beer.beer.brewery}</h5>
          ) : (
            <h5 className='brewery'>n/a</h5>
          )}
        </div>
        <hr className='hr' />
        {beer.beer.style ? (
          <h5 className='beer-style'>{beer.beer.style}</h5>
        ) : (
          <h5>n/a</h5>
        )}
        <h5 className='liner'> {beer.beer.abv.toFixed(1)}% ABV </h5>
        {beer.beer.ibu ? (
          <h5 className='liner'> {beer.beer.ibu} IBU</h5>
        ) : (
          <h5>n/a IBU</h5>
        )}
        <h5 className='liner'>$ {beer.beer.price} </h5>
        <hr className='hr'></hr>
        {beer.beer.ratings.map((rating, index, arr) => {
          if (arr.length === 2) {
            return (
              <h5 className='liner' key={rating.name}>
                {rating.value} on {rating.name}
              </h5>
            )
          }
          if (arr.length === 1 && rating.name === 'RateBeer') {
            return (
              <div>
                <h5 className='liner' key={rating.name}>
                  {rating.value} on {rating.name}
                </h5>
                <h5 className='liner' key={index}>
                  n/a on untappd
                </h5>
              </div>
            )
          }
          if (arr.length === 1 && rating.name === 'untappd') {
            return (
              <div>
                <h5 className='liner' key={rating.name}>
                  {rating.value} on {rating.name}
                </h5>
                <h5 className='liner' key={index}>
                  n/a on untappd
                </h5>
              </div>
            )
          }
          return true
        })}{' '}
        {/* <hr className='hr'></hr>
        <a href={link} target='_blank' rel='noopener noreferrer'>
          <button className='btn btn-link btn-sm ' type='submit'>
            <h5 className='wantit'> WANT IT!</h5>
          </button>
        </a> */}
      </div>
      <div />
    </div>
  )
}

export default BeerItem
