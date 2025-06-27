import React, { useEffect, useState } from 'react'
import cancel from '../../assets/icons/piarrowfoward.png'
import './ViewBookDetails.css'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

const ViewBookDetails = ({getBookID, handleCloseViewBookDetails}) => {
    const[bookData, setBookData] = useState([])
    useEffect(() => {
        const fetchBookData = async() => {
            try{
                const book =  await getDoc(doc(db, 'books', getBookID))
                if(book.exists()){
                setBookData(book.data())
            }
            }catch(error){
                console.log(error)
            }
        }
        fetchBookData()
    }, [getBookID])
  return <div className='book-detail-container'>
    <div className='book-container'>
        <img onClick={handleCloseViewBookDetails} src={cancel} alt="Back" />

        <div className='book-title-author'>
            <div className='title'>{bookData.title}</div>
            <div className='by'>
                <div className='line'></div>
                <div className='by-x'>BY</div>
                <div className='line'></div>
            </div>
            <div className='author'>{bookData.author}</div>
        </div>

        <div className='details'>
            <div className='book-details'>
                <label>Book publisher</label>
                <div className='tag'>{bookData?.publisher}</div>
            </div>
            <div className='book-details'>
                <label>Volume/Edition</label>
                <div className='tag'>{bookData?.volume? bookData?.volume : 'NAN'}</div>
            </div>
            <div className='book-details'>
                <label>Book Tag</label>
                <div style={{textTransform: 'uppercase'}} className='tag'>{bookData?.tag}</div>
            </div>
            <div className='book-details'>
                <label>Book Category</label>
                <div className='tag'>{bookData?.journalBook}</div>
            </div>
            <div className='book-details'>
                <label>Book Location</label>
                <div className='tag'>{bookData?.location}</div>
            </div>
            <div className='book-details'>
                <label>Bucket</label>
                <div className='tag'>{bookData?.bucketNumber}</div>
            </div>
            <div className='book-details'>
                <label>Added on the database on</label>
                <div className='tag'>{bookData?.cretedAt?.toDate()?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</div>
            </div>
        </div>
        
    </div>
    
  </div>
}

export default ViewBookDetails