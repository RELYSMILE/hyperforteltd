import React, { useEffect, useState } from 'react'
import './LibraryManagement.css'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar'
import { useNavigate } from 'react-router-dom'
import {auth, db}  from '../../firebase/config'
import ButtonAdd from '../../Components/Admin/ButtonAdd'
import PageTitle from '../../Components/Admin/PageTitle'
import searchGreen from '../../assets/icons/searchGreen.png'
import filterGreen from '../../assets/icons/filterGreen.png'
import more from '../../assets/icons/more.png'
import Login from '../../Public/Login/Login'
import visibilityIcon from '../../assets/icons/visibility1.png'
import deleteIcon from '../../assets/icons/delete.png'
import updateIcon from '../../assets/icons/update.png'
import cancel from '../../assets/icons/cancel.png'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import ViewBookDetails from '../../Components/Admin/ViewBookDetails'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'

const LibraryManagement = () => {
    const [pageTitle, setPageTitle] = useState('Books Management')
    const [books, setBooks] = useState([])
    const [getBookID, setGetBookID] = useState('')
    const [search, setSearch] = useState('')
    const [moreComponent, setMoreComponent] = useState(false)
    const [morePanelClassName, setMorePanelClassName] = useState('')
    const [appearancesettingData, setAppearancesettingsData] = useState([])
    const [settingsTogglefetch, setSettingsToggleFetch] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [isPageDimmed, setIsPageDimmed] = useState(false)
    const navigate = useNavigate()

    const handleMorePanel = (bookID) => {
        setGetBookID(bookID)
        setMoreComponent(false)
    }
    const handleViewBookDetails = () => {
        setMoreComponent(true)

    }
    const handleCloseViewBookDetails = () => {
        setMoreComponent(false)
        setGetBookID('')
    }
    const handleCloseMorePanel = () => {
        setGetBookID('')
    }
    const handleBookUpdate = (bookID) => {
        navigate(`/update-book/${bookID}`)
    }

    const handleDeleteBook = async(bookID)=> {
        try{
            const confirmDelete = window.confirm('Are you sure you want to delete this Book?')
            if(confirmDelete){
                await deleteDoc(doc(db, 'books', bookID))
                toast.success('Book deleted successfully', {
                toastId: 1
                })
            }
        }catch(error){
            console.log(error)
            toast.error('Error delecting Book', {
                toastId: 1
            })
        }
    }
     useEffect(() =>{
        const fetchBooks = async () => {
          try {
            const databaseRef = collection(db, 'books');
            const booksRef = await getDocs(databaseRef);
            const filteredBooksData = booksRef.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setBooks(filteredBooksData);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
        fetchBooks()
    }, [])

     useEffect(() => {
            const fetchSettings = async() => {
                try{
                    const appearanceSettingsData = await getDoc(doc(db, 'settings', '4hmGZ3GjgfK7bDbyC14g'))
                    if(appearanceSettingsData.exists()){
                        setAppearancesettingsData(appearanceSettingsData.data())
                    }
                }catch(error){
                    console.log(error)
                }
            }
            fetchSettings()
        }, [])
    
     useEffect(() => {
            const fetchSettings = async() => {
                try{
                    const SettingsData = await getDoc(doc(db, 'settings', 'QnD2IfVSNvBI7kY4xEtI'))
                    if(SettingsData.exists()){
                        setSettingsToggleFetch(SettingsData.data())
                    }
                }catch(error){
                    console.log(error)
                }
            }
            fetchSettings()
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
  {currentUser? <div className={isPageDimmed? 'librarymanagement-container page-dimmed' : 'librarymanagement-container'}>
        <NavBar setPageTitle = {setPageTitle} setIsPageDimmed = {setIsPageDimmed} />

        <div className='librarymanagement'>
            <div className='title-add-book'>
                <PageTitle pageTitle = {pageTitle} />
                {settingsTogglefetch.toggleAddBookSettings &&
                <div className='add'><Link to='/add-new-book'><ButtonAdd  pageTitle = {pageTitle}  /></Link></div>}
            </div>

            <div className='search-filter'>
                <div className='search'>
                    <img src={searchGreen} alt="icon" />
                    <input onChange={(e) => setSearch(e.target.value)} type="text" name="" id="" placeholder='Search by book Title or Author' />
                </div>

                <div className='filter'>
                    <img src={filterGreen} alt="icon" />
                    <div className='filter-select'>
                        <div className='label'>Filter</div>
                        <select onChange={(e) => setSearch(e.target.value)} name="" id="">
                            <option value="">All</option>
                            <option value="adetula">Victor Adetula</option>
                            <option value="book">Book</option>
                            <option value="journal">Journal</option>
                            <option value="panflet">Pan-flet</option>
                            <option value="newspaper">Newspaper</option>
                            <option value="upstairs">Upstairs</option>
                            <option value="downstairs">Downstairs</option>
                            <option value="director">Director's Office</option>
                            <option value="manager">Manager's Office</option>
                        </select>
                    </div>
                </div>
            </div>


            <div className='books-cont'>
                <table>
                    <tr>
                        <th>Books Title</th>
                        <th>Author</th>
                        <th style={{width: '2rem'}}>Action</th>
                    </tr>
                </table><br />
                {books.filter((data) => {
                    const input = search?.trim()?.toLowerCase()
                    return input === '' ||
                    data?.title?.toLowerCase()?.includes(input) ||
                    data?.author?.toLowerCase()?.includes(input) ||
                    data?.volume?.toLowerCase()?.includes(input) ||
                    data?.journalBook?.toLowerCase()?.includes(input) ||
                    data?.location?.toLowerCase()?.includes(input) ||
                    data?.tag?.toLowerCase()?.includes(input)
                }).map((book, idx) => (
                <table key={idx} style={{border: '1px solid #e8ebeb', fontSize: '14px', color: appearancesettingData.primaryColor}}>
                    <tr className={book?.documentID === getBookID? 'tr': ''}>
                        <th style={{width: '57%'}}>{book?.title}</th>
                        <th>{book?.author}</th>
                        <th style={{width: '2rem', cursor: 'pointer'}} >
                            {book?.documentID === getBookID?

                            <div className={morePanelClassName}>
                                <img onClick={handleCloseMorePanel} style={{width: '1.2rem', height: '1.2rem'}} src={cancel} alt="Close" />
                                <div className='more-panel'>
                                    <div onClick={handleViewBookDetails} className='item'>
                                        <img src={visibilityIcon} alt="icon" />
                                        <div className='label'>View Details</div>
                                    </div>
                                    {!settingsTogglefetch.toggleSettings &&
                                    <div onClick={(e)=>handleBookUpdate(book?.documentID)} className='item'>
                                        <img src={updateIcon} alt="icon" />
                                        <div className='label'>Update Book</div>
                                    </div>}
                                    {settingsTogglefetch.toggleDeleteSettings &&
                                    <div onClick={(e) => handleDeleteBook(book?.documentID)} className='item'>
                                        <img src={deleteIcon} alt="icon" />
                                        <div className='label'>Delete Book</div>
                                    </div>}
                                </div>
                            </div>
                                :
                                <img onClick={(e) => handleMorePanel(book?.documentID)} src={more} alt="More" />
                            }
                        </th>
                    </tr>
                </table>
                ))}
            </div>
            {moreComponent &&
            <ViewBookDetails getBookID = {getBookID} handleCloseViewBookDetails = {handleCloseViewBookDetails} />}
        </div>
  </div>
  :
  <Login />}
  
</>}

export default LibraryManagement