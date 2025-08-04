import React, { useContext, useEffect, useState } from 'react'
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
import statminus from '../../assets/icons/statminus.png'
import cancel from '../../assets/icons/cancel.png'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import ViewBookDetails from '../../Components/Admin/ViewBookDetails'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { AppContext } from '../Context/Context'

const LibraryManagement = () => {
    const {publicationLocation} = useContext(AppContext)
    const [pageTitle, setPageTitle] = useState('Publication Management')
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

    const bookSubject = [
        {subject: 'Psychology, Economics, Commerce, Finance, Management'},
        {subject: 'Statistics, Research Methods'},
        {subject: 'Sociology, Gender Inequality'},
        {subject: 'Sociology, Gender Inequality'},
        {subject: 'Rural and Urban Planning'},
        {subject: 'Political Theory'},
        {subject: 'Political Sciences'},
        {subject: 'Public Institutions, Public Administrations'},
        {subject: 'International Migration'},
        {subject: 'International Relations, Peace and Conflict Management'},
        {subject: 'Religion'},
        {subject: 'Economy'},
        {subject: 'Religion, Philosophy'},
        {subject: 'African History'},
        {subject: 'American History'},
        {subject: 'Geography, Anthropology, Architecture'},
        {subject: 'Education'},
        {subject: 'Medical Sciences'},
        {subject: 'Engineering Sciences'},
        {subject: 'Law'},
        {subject: 'Agricultural Sciences'},
        {subject: 'Natural Science, Maths, Statistics'},
    ]

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

        const handleScroll = () => {
            console.log(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll)

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

        <div  className='librarymanagement'>
            <div className='fixed'>
            <div id='scroll-bg-screen' className='title-add-book'>
                <div className='PageTitle'><PageTitle pageTitle = {pageTitle} /></div>
                {settingsTogglefetch.toggleAddBookSettings &&
                <div className='add'><Link className='add-link' to='/add-new-book'><span>+</span>Publication</Link></div>}
            </div>

            <div className='search-filter'>
                <div className='search'>
                    <img src={searchGreen} alt="icon" />
                    <input onChange={(e) => setSearch(e.target.value)} type="text" name="" id="" placeholder='Search by Publication Title,Sub Title, Author/Editor, Type of Publication, Bucket Number, Publication by Subject, Publisher, location, Year of Publication, volume, edition, tag' />
                </div>

                <div className='filter'>
                    <img src={filterGreen} alt="icon" />
                    <div className='filter-select'>
                        <div className='label'>Filter</div>
                        <select onChange={(e) => setSearch(e.target.value)} name="" id="">
                            <option value="">All</option>
                            <option value="adetula">Victor Adetula</option>
                            {publicationLocation.locations.map((location, idx) => (
                                <>{location.location && <option key={idx} value={location.location}>{location.location}</option>}</>
                            ))}
                            <option value="book">Book</option>
                            <option value="journal">Journal</option>
                            <option value="panflet">Pan-flet</option>
                            <option value="newspaper">Newspaper</option>
                            <option value="magazine">Magazine</option>
                            <option value="report">Report</option>
                            <option value="document">Document</option>
                            <option value="monograph">Monograph</option>
                            {bookSubject.map((subject, idx) => (
                                <option key={idx} value={subject.subject}>{subject.subject}</option>
                            ))}
                            
                        </select>
                    </div>
                </div>
            </div>
            </div>
            <div id='scroll'></div>
            <div className='books-cont'>
                <table>
                    <tr>
                        <th style={{width: '1rem'}}>ID</th>
                        <th style={{width: '51%'}}>Publication Title</th>
                        <th>Author/Editor</th>
                        <th style={{width: '2rem'}}>Action</th>
                    </tr>
                </table><br />
                {books.filter((data) => {
                    const input = search?.trim()?.toLowerCase()
                    return input === '' ||
                    (data?.title + '')?.toLowerCase()?.includes(input) ||
                    (data?.author + '')?.toLowerCase()?.includes(input) ||
                    (data?.typeOfPublication + '')?.toLowerCase()?.includes(input) ||
                    (data?.publisher + '')?.toLowerCase()?.includes(input) ||
                    (data?.yearOfPublication + '')?.toLowerCase()?.includes(input) ||
                    (data?.publicationBySubject + '')?.toLowerCase()?.includes(input) ||
                    (data?.volume + '')?.toLowerCase()?.includes(input) ||
                    (data?.location + '')?.toLowerCase()?.includes(input) ||
                    (data?.tag + '')?.toLowerCase()?.includes(input) ||
                    (data?.bucketNumber + '')?.toLowerCase()?.includes(input)
                }).map((book, idx) => (
                <table className='publication-table' key={idx} style={{color: appearancesettingData.primaryColor}}>
                    <tr className={book?.documentID === getBookID? 'tr': idx % 2 === 0? 'even': 'odd'}>
                        <td style={{width: '1rem'}}>{idx}</td>
                        <td style={{width: '50%', textTransform: 'capitalize'}}>{book?.title}</td>
                        <td>{book?.author}</td>
                        <td style={{width: '2rem', cursor: 'pointer'}} >
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
                        </td>
                    </tr>
                </table>
                ))}
            </div>
            <a className='bg-screen'  href='#scroll-bg-screen'><img src={statminus} alt="up" /></a>
            <a className='scroll'  href='#scroll'><img src={statminus} alt="up" /></a>
            {moreComponent &&
            <ViewBookDetails getBookID = {getBookID} handleCloseViewBookDetails = {handleCloseViewBookDetails} />}
        </div>
  </div>
  :
  <Login />}
  
</>}

export default LibraryManagement