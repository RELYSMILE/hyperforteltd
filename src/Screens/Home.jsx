import React, { useState } from 'react'
import Moves from '../Components/Moves'

const Home = () => {
    const [search, setSearch] = useState('')
    const Movies = [
        {id: 1, title: 'Prison break', release_date: '2009', producer: 'Wentworth Miller'},
        {id: 2, title: 'Money Heist', release_date: '2023', producer: 'Professor Miller'},
        {id: 3, title: 'Ant Man', release_date: '2020', producer: 'Lincon Miller'},
    ]

const pageStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#fff',
    gap: '2rem',
    color: '#000',
    height: '100vh'
}

  return <div style={pageStyle}>
    <div style={{width: '100%', padding: '.5rem 1rem'}}>
        <input style={{width: '100%', padding: '.3rem 1rem', background: 'transparent', border: '1px solid #808080', outline: 'none'}} onChange={(e) => setSearch(e.target.value)} type="text" />
    </div>
    {Movies.filter((movie) => {
        const input = search.trim().toLowerCase()
        return input === ''||
        movie.title.toLowerCase().includes(input) ||
        movie.release_date.toLowerCase().includes(input) ||
        movie.producer.toLowerCase().includes(input)

    }).map((movies, idx) => (
        <>
            <Moves movies={movies} key={idx} />
        </>
    ))}
  </div>
}

export default Home