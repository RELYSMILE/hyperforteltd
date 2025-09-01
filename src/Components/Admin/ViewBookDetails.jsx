import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify';
import cancel from '../../assets/icons/piarrowfoward.png'
import './ViewBookDetails.css'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { AppContext } from '../../Admin/Context/Context';

const ViewBookDetails = ({getBookID, handleCloseViewBookDetails}) => {
    const {currentLightDarkMode} = useContext(AppContext)
    const [bookCredentials, setBookCredentials] = useState([])
    const[bookData, setBookData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdateBookButtonClicked, setIsUpdateBookButtonClicked] = useState(false)

    const HandleBookCredentials = (e) => {
        setBookCredentials({...bookCredentials, [e.target.name]: e.target.value})
    }
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
    })

    const HandleUpdateBookButton = () => {
        setIsUpdateBookButtonClicked(true)
    }
    const HandleCloseBookButton = () => {
        setIsUpdateBookButtonClicked(false)
    }

        const HandleUpdateBook = async() => {
            setIsLoading(true)
           try {
                await updateDoc(doc(db, 'books', getBookID), {
                    collectorName: bookCredentials.collectorName,
                    isBookLoan: true,
                    collectorPhone: bookCredentials.collectorPhone,
                    collectedDate: bookCredentials.collectedDate,
                    returnDate: bookCredentials.returnDate,
                })
                toast.success('Book has been loaned successfully', {
                    toastId: 'book'
                })
                setIsUpdateBookButtonClicked(false)
            }catch(error){
               toast.error('Failed to mark book as loaned. Please try again', {
                    toastId: 'book'
                })
            }finally{
                setIsLoading(false)
            }
        }
    
  return <div className='book-detail-container'>
    <div className={currentLightDarkMode.lightMode === false? 'book-container book-container-dark-mode' : 'book-container'}>
        <img onClick={handleCloseViewBookDetails} src={cancel} alt="Back" />

        <div className='book-title-author'>
            <div className={currentLightDarkMode.lightMode === false? 'title title-dark-mode' : 'title'}>{bookData?.bookNormalize || bookData.title}</div>
            <div className='by'>
                <div className='line'></div>
                <div className= {currentLightDarkMode.lightMode === false? 'by-x by-x-dark-mode' : 'by-x'}>BY</div>
                <div className='line'></div>
            </div>
            <div className={currentLightDarkMode.lightMode === false? 'author author-dark-mode' : 'author'}>{bookData.author}</div>
        </div>

        <div className='details'>
            {bookData?.publisher &&
            <div className='book-details'>
                <label>Book Publisher</label>
                <div className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.publisher}</div>
            </div>}
            {bookData?.publisherLocation &&
            <div className='book-details'>
                <label>Publisher Location</label>
                <div className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.publisherLocation}</div>
            </div>}
            {bookData?.publicationBySubject &&
            <div className='book-details'>
                <label>Publication by Subject</label>
                <div className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.publicationBySubject}</div>
            </div>}
            <div className='book-details'>
                <label>Type of Publication</label>
                <div className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.typeOfPublication}</div>
            </div>
            {bookData?.yearOfPublication &&
            <div className='book-details'>
                <label>Year Of Publication</label>
                <div className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.yearOfPublication}</div>
            </div>}
            {bookData?.volume && 
            <div className='book-details'>
                <label>Volume/Edition</label>
                <div className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.volume}</div>
            </div>}
            {bookData?.tag &&
            <div className='book-details'>
                <label>Book Tag/Call mark/Call tag</label>
                <div style={{textTransform: 'uppercase'}} className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.tag}</div>
            </div>}
            {bookData?.bookCopy &&
            <div className='book-details'>
                <label>Copy</label>
                <div style={{textTransform: 'uppercase'}} className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.bookCopy}</div>
            </div>}
            <div className='book-details'>
                <label>Book Location</label>
                <div className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.location}</div>
            </div>
            <div className='book-details'>
                <label>Bucket</label>
                <div className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.bucketNumber}</div>
            </div>
            <div className='book-details'>
                <label>Book Status</label>
                <div className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.isBookLoan? 'On Loan' : 'Present'}</div>
            </div>
            <div className='book-details'>
                <label>Added on the database</label>
                <div className={currentLightDarkMode.lightMode === false? 'tag tag-dark-mode' : 'tag'}>{bookData?.cretedAt?.toDate()?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })} <span style={{color: 'tomato'}}>{bookData?.addedBy && `by ${bookData?.addedBy === 'ometere'? 'Ometere Favour Ajayi' : bookData?.addedBy === 'Godwin'? 'Daberechi Godwin': bookData?.addedBy === 'Dotun'? 'Adedotun Adetula': bookData?.addedBy === 'vadetula@gmail.com'? 'Victor Adetula': bookData?.addedBy === 'Theprophet'? 'Promise Oba' :  bookData?.addedBy }`}</span></div>
            </div>
        </div>
        {!bookData?.isBookLoan &&
        <>
        {isUpdateBookButtonClicked?
        <div onClick={HandleUpdateBook} className='btn btn-x'>{isLoading? 'Save...' : 'Save'}</div>
        :
        <div onClick={HandleUpdateBookButton} className='btn btn-x'>Mark publication as loaned</div>}
        </>}
        {isUpdateBookButtonClicked &&
        <div className='form-field form-book-status'>
            <div className='label'>Enter the details of the person who collected or borrowed the Publication</div>
            <label htmlFor="">Full Name</label>
            <input onChange={(e) => HandleBookCredentials(e)} type="text" name='collectorName' placeholder='Enter full name here' /> <br />
            <label htmlFor="">Phone Number</label>
            <input onChange={(e) => HandleBookCredentials(e)} type="number" name='collectorPhone' placeholder='07012345678' /> <br />
            <label htmlFor="">Date of collection</label>
            <input onChange={(e) => HandleBookCredentials(e)} type="date" name='collectedDate' /> <br />
            <label htmlFor="">Date of return</label>
            <input onChange={(e) => HandleBookCredentials(e)} type="date" name='returnDate' /> <br />
            <div className='button-close'>
                <button  onClick={HandleCloseBookButton} >Close</button>
            </div>
        </div>}

    </div>
    
  </div>
}

export default ViewBookDetails