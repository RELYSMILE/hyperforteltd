import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import cancel from '../../assets/icons/piarrowfoward.png'
import './ViewBookDetails.css'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

const ViewBookDetails = ({getBookID, handleCloseViewBookDetails}) => {
    const[bookData, setBookData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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

        const HandleUpdateBook = async() => {
            setIsLoading(true)
           try {
                await updateDoc(doc(db, 'books', getBookID), {
                    isBookLoan: true,
                })
                toast.success('Book has been loaned successfully', {
                    toastId: 'book'
                })
            }catch(error){
               toast.error('Failed to mark book as loaned. Please try again', {
                    toastId: 'book'
                })
            }finally{
                setIsLoading(false)
            }
        }
    
  return <div className='book-detail-container'>
    <div className='book-container'>
        <img onClick={handleCloseViewBookDetails} src={cancel} alt="Back" />

        <div className='book-title-author'>
            <div className='title'>{bookData.title}</div>
            <div className='sub-title'>{bookData?.bookSubTitle}</div>
            <div className='by'>
                <div className='line'></div>
                <div className='by-x'>BY</div>
                <div className='line'></div>
            </div>
            <div className='author'>{bookData.author}</div>
        </div>

        <div className='details'>
            {bookData?.publisher &&
            <div className='book-details'>
                <label>Book publisher</label>
                <div className='tag'>{bookData?.publisher}</div>
            </div>}
            {bookData?.publisherLocation &&
            <div className='book-details'>
                <label>Publisher Location</label>
                <div className='tag'>{bookData?.publisherLocation}</div>
            </div>}
            {bookData?.publicationBySubject &&
            <div className='book-details'>
                <label>Publication by Subject</label>
                <div className='tag'>{bookData?.publicationBySubject}</div>
            </div>}
            <div className='book-details'>
                <label>Type of Publication</label>
                <div className='tag'>{bookData?.typeOfPublication}</div>
            </div>
            {bookData?.yearOfPublication &&
            <div className='book-details'>
                <label>Year Of Publication</label>
                <div className='tag'>{bookData?.yearOfPublication}</div>
            </div>}
            {bookData?.volume && 
            <div className='book-details'>
                <label>Volume/Edition</label>
                <div className='tag'>{bookData?.volume}</div>
            </div>}
            {bookData?.tag &&
            <div className='book-details'>
                <label>Book Tag</label>
                <div style={{textTransform: 'uppercase'}} className='tag'>{bookData?.tag}</div>
            </div>}
            {bookData?.bookCopy &&
            <div className='book-details'>
                <label>Copy</label>
                <div style={{textTransform: 'uppercase'}} className='tag'>{bookData?.bookCopy}</div>
            </div>}
            <div className='book-details'>
                <label>Book Location</label>
                <div className='tag'>{bookData?.location}</div>
            </div>
            <div className='book-details'>
                <label>Bucket</label>
                <div className='tag'>{bookData?.bucketNumber}</div>
            </div>
            <div className='book-details'>
                <label>Book Status</label>
                <div className='tag'>{bookData?.isBookLoan? 'On Loan' : 'Present'}</div>
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
        {!bookData?.isBookLoan &&
        <div onClick={HandleUpdateBook} className='btn btn-x'>{isLoading? 'Marking book...' : 'Mark book as loaned'}</div>}
    </div>
    
  </div>
}

export default ViewBookDetails