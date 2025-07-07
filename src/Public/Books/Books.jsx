import React, { useEffect, useState } from 'react'
import searchGreen from '../../assets/icons/searchGreen.png'
import spinner from '../../assets/spinner/spinner.gif'
import Navbar from '../Navbar/Navbar'
import { auth, db } from '../../firebase/config'
import './Books.css'
import { collection, getDocs } from 'firebase/firestore'

const Books = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [state, setState] = useState(false)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const databaseRef = collection(db, 'books')
        const booksRef = await getDocs(databaseRef)
        const filteredBooksData = booksRef.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setBooks(filteredBooksData)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchBooks()
  }, [])

  useEffect(() => {
          const timeOut =  setTimeout(() => {
              setState(true)
      }, 2000)
  
      return ()=>{
          clearTimeout(timeOut)
      }
    }, [])

  return (<>
  {state?
    <div className='app-books-container'>
        <div className='nav-Bar'><Navbar /></div><br /><br /><br /><br />

        <div className='search'>
            <img src={searchGreen} alt="icon" />
            <input style={{fontSize: '16px'}} onChange={(e) => setSearch(e.target.value)} type="text" name="" id="" placeholder='Search by Book Title,Sub Title, Author/Editor, Type of Publication, Publisher, Year of Publication, Location of Publisher, volume, edition' />
        </div>
      <div className='books-container'>
        {books.filter((data) => {
            const input = search?.trim()?.toLowerCase()
                    return input === '' ||
                    data?.title?.toLowerCase()?.includes(input) ||
                    data?.author?.toLowerCase()?.includes(input) ||
                    data?.volume?.toLowerCase()?.includes(input) ||
                    data?.bookSubTitle?.toLowerCase()?.includes(input) ||
                    data?.publisher?.toLowerCase()?.includes(input) ||
                    data?.yearOfPublication?.toLowerCase()?.includes(input) ||
                    data?.publisherLocation?.toLowerCase()?.includes(input) ||
                    data?.typeOfPublication?.toLowerCase()?.includes(input) ||
                    data?.yearOfPublication?.toLowerCase()?.includes(input) ||
                    data?.yearOfPublication?.toLowerCase()?.includes(input) ||
                    data?.volume?.toLowerCase()?.includes(input)
        }).map((book, idx) => (
          <div className='book-card' key={idx}>
            <div className='book-cover'>
              <h3 className='book-title'>{book.title}</h3>
              <div className='sub-title'>{book.bookSubTitle}</div>
              <p className='book-author'>By <span>{book.author}</span></p>
              <div className='book-footer'>
                {book.typeOfPublication &&
                <span className='book-journal'>Type of Publication: <span>{book.typeOfPublication}</span></span>}
                {book.publisher &&
                <span className='book-publisher'>Publisher: <span>{book.publisher}</span></span>}
                {book.yearOfPublication &&
                <span className='book-publisher'>Year of Publication: <span>{book.yearOfPublication}</span></span>}
                {book.publisherLocation &&
                <span className='book-publisher'>Publisher Location: <span>{book.publisherLocation}</span></span>}
                {book.volume &&
                <span className='book-volume'>Volume. <span>{book.volume}</span></span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    :
        <div className='spinner'>
          <img src={spinner} />
          <div className='name'>ECOGOV/EUR-AFRICA</div>
        </div>}
      </>)
}

export default Books
