import React from 'react'

const BeerItem = (beer) => {
  const link = beer.beer.link

  return (
    <div className='album'>
      <div className='card card-body col-sm-6 '>
        <div className='beernameDiv'>
          <h2 className='beername'>{beer.beer.name}</h2>
          <h5 className='bre'>By {beer.beer.brewery}</h5>
        </div>
        <hr className='hr' />
        {beer.beer.style ? (
          <h4 className='liner'>{beer.beer.style}</h4>
        ) : (
          <h4>N/A</h4>
        )}
        <h5 className='liner'> {beer.beer.abv.toFixed(1)}% ABV </h5>
        {beer.beer.ibu ? (
          <h5 className='liner'> {beer.beer.ibu} IBU</h5>
        ) : (
          <h5>N/A IBU</h5>
        )}
        <h5 className='liner'>$ {beer.beer.price} </h5>
        <hr className='hr'></hr>
        <h4>Ratings</h4>
        {beer.beer.ratings.map((rating, index, arr) => {
          if (arr.length === 2) {
            return (
              <h5 className='liner' key={rating.name}>
                {rating.value} from {rating.name}
              </h5>
            )
          }
          if (arr.length === 1 && rating.name === 'RateBeer') {
            return (
              <div>
                <h5 className='liner' key={rating.name}>
                  {rating.value} from {rating.name}
                </h5>
                <h5 className='liner' key={index}>
                  N/A from untappd
                </h5>
              </div>
            )
          }
          if (arr.length === 1 && rating.name === 'untappd') {
            return (
              <div>
                <h5 className='liner' key={rating.name}>
                  {rating.value} from {rating.name}
                </h5>
                <h5 className='liner' key={index}>
                  N/A from untappd
                </h5>
              </div>
            )
          }
          return true
        })}{' '}
        <hr className='hr'></hr>
        <a href={link} target='_blank' rel='noopener noreferrer'>
          <button className='btn btn-link btn-sm ' type='submit'>
            <h5 className='wantit'> WANT IT!</h5>
          </button>
        </a>
      </div>
      <div />
    </div>
  )
}

export default BeerItem
