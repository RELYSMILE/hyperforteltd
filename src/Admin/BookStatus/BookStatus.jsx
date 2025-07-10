import React, { useEffect, useState } from 'react'
import {auth, db}  from '../../firebase/config'
import { toast } from 'react-toastify';
import NavBar from '../NavBar'
import Login from '../../Public/Login/Login';
import call from '../../assets/icons/call.png'
import save from '../../assets/icons/save.png'
import clock from '../../assets/icons/clock.png'
import piarrowfoward from '../../assets/icons/piarrowfoward.png'
import user from '../../assets/icons/user.png'
import PageTitle from '../../Components/Admin/PageTitle'
import '../ManageAdmin/ManageAdmin.css'
import './BookStatus.css'
import {onAuthStateChanged} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

const BookStatus = () => {
    const[bookCredentials, setBookCredentials] = useState({})
    const [pageTitle, setPageTitle] = useState('Loaned Publication')
    const [isLoading, setIsLoading] = useState(false)

    const [bookDetail, setBookDetail] = useState([])
    const [adminsUpdateComponent, setAdminsUpdateComponent] = useState(false)
    const [appearancesettingData, setAppearancesettingsData] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [isPageDimmed, setIsPageDimmed] = useState(false)

    const [loanedBooks, setLoanedBooks] = useState([])
    const [isBookPresent, setIsBookPresent] = useState(false)
    const [isBookLoan, setIsBookLoan] = useState(true)

    const [loanBookUpdateDropDown, setLoanBookUpdateDropDown] = useState(false)

    const handlePresent = () => {
        setIsBookPresent(true)
        setLoanBookUpdateDropDown(false)
        setIsBookLoan(false)
    }
    const handleLoan = () => {
        setIsBookLoan(true)
        setIsBookPresent(false)
        setLoanBookUpdateDropDown(true)
    }

    const handleBookCredentials = (e) => {
        setBookCredentials({...bookCredentials, [e.target.name] : e.target.value})
    }

    const handleUpdateAdmin = async(bookID) => {
      const book_ID = bookID
      if(book_ID === bookID) {
        setAdminsUpdateComponent(true)
            try{
                const book =  await getDoc(doc(db, 'books', bookID))
                if(book.exists()){
                setBookDetail(book.data())
            }
            }catch(error){
                console.log(error)
            }
      }else{
        setAdminsUpdateComponent(false)
      }
    }


    const updateBook = async() => {
      setIsLoading(true)

      try{
        await updateDoc(doc(db, 'books', bookDetail.documentID), {
            isBookLoan: isBookPresent? false : true,
            collectorName: bookCredentials.collectorName || bookDetail.collectorName,
            collectorPhone: bookCredentials.collectorPhone || bookDetail.collectorPhone,
            collectedDate: bookCredentials.collectedDate || bookDetail.collectedDate,
            returnDate: isBookPresent? '' : bookCredentials.returnDate || bookDetail.returnDate,
        })
        toast.success('Book has been updated successfully.', {
          toastId: 1,
        })
      }catch(error){
        toast.error('Something went wrong. Please try again later.', {
          toastId: 2,
        })
      }finally{
        setIsLoading(false)
      }
    }

    const handleCloseAdminsUpdateComponent = ()=> {
      setAdminsUpdateComponent(false)
    }
    useEffect(() => {
        const fetchAllLoanedBooks = async() =>{
        try {
            const databaseRef = collection(db, 'books');
            const Query = query(databaseRef, where('isBookLoan', '==', true))
            const result = await getDocs(Query)

            const books = result.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setLoanedBooks(books);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
        fetchAllLoanedBooks()
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,async (user) => {
          if (user) {
            const userDoc = await getDoc(doc(db, 'admin', user.uid));
            if (userDoc.exists()) {
              setCurrentUser(userDoc.data());
            } else {
              console.log('No such user data!');
            }
          } else {
            setCurrentUser(null); // user signed out
          }
        });
    
        return () => unsubscribe();
      }, []);

  return <>
  {currentUser? <div className={isPageDimmed? 'admin-management-container page-dimmed' : 'admin-management-container'}>
        <NavBar setPageTitle = {setPageTitle} setIsPageDimmed = {setIsPageDimmed} />

        <div className='admin-management'>
            <PageTitle pageTitle = {pageTitle} />

    {adminsUpdateComponent &&
    <div className='form-container'>
                    <div className='nav'>
                        <img onClick={handleCloseAdminsUpdateComponent} src={piarrowfoward} alt="" />
                    </div>
                <div className='book-status'>
                    <div className='query query-x'>Please confirm if this book has been returned.</div>
                    <div className='radio-selector'>
                        <div onClick={handlePresent} className={isBookPresent? 'radio radio-active': 'radio'}>Yes</div>
                        <div onClick={handleLoan} className={isBookLoan? 'radio radio-active': 'radio'}>No</div>
                    </div>
                </div>
                {loanBookUpdateDropDown &&
                <>
                    <div className='form-field'>
                        <label htmlFor="">Full Name</label>
                        <div className='form-input'>
                            <img src={user} alt="" />
                            <input onChange={handleBookCredentials} type="text" name="collectorName" id="" placeholder={bookDetail.collectorName} />
                        </div>
                    </div>
                    <div className='form-field'>
                        <label htmlFor="">Phone</label>
                        <div className='form-input'>
                            <img src={call} alt="" />
                            <input onChange={handleBookCredentials} type="number" name="collectorPhone" id="" placeholder={bookDetail.collectorPhone} />
                        </div>
                    </div>
                    <div className='form-field'>
                        <label htmlFor="">Date of Collection</label>
                        <div className='form-input'>
                            <img src={clock} alt="" />
                            <input onChange={handleBookCredentials} type="date" name="collectedDate" id="" placeholder={bookDetail.collectedDate} />
                        </div>
                    </div>
                    <div className='form-field'>
                        <label htmlFor="">Date of return</label>
                        <div className='form-input'>
                            <img src={clock} alt="" />
                            <input onChange={handleBookCredentials} type="date" name="returnDate" id="" placeholder={bookDetail.returnDate} />
                        </div>
                    </div>
                </>}
                    <div onClick={updateBook} className='btn-add-admin btn-save-status'>
                      <div className='btn-save'>
                        <img src={save} alt="icon" />
                        <div div className=''>{isLoading? 'Processing...' : 'Save'}</div>
                        </div>
                    </div>
    </div>}
    {!adminsUpdateComponent &&
    <div className='admin'>
    <table className="admin-table">
        <thead>
        <tr>
            <th>ID</th>
            <th>Publication</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Date of collection</th>
            <th>Date of return</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody style={{color: appearancesettingData.primaryColor}}>
        {loanedBooks.map((loan, idx) => (
            <tr key={idx} className={new Date(loan.returnDate) <= new Date() ? 'overdue-book' : ''}>
                <td>{idx}</td>
            <td style={{textTransform: 'capitalize'}}>{loan.title}</td>
            <td style={{textTransform: 'capitalize'}}>{loan.collectorName}</td>
            <td>{loan.collectorPhone}</td>
            <td>{loan.collectedDate}</td>
            <td>{loan.returnDate}</td>
            <td>
                <button onClick={(e) => handleUpdateAdmin(loan.documentID)} className="action-btn update">Update</button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>}

    </div>
</div>

:
  <Login />}

</>
}

export default BookStatus