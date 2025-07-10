import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../Admin/Context/Context'
import notificationGray from '../../assets/icons/notificationGray.png'
import notificationRed from '../../assets/gif/bell2.gif'
import './PageTitle.css'


const PageTitle = ({pageTitle}) => {
  const {overDueBooksLen} = useContext(AppContext)
  return (
    <div className='pageTitle-notification'>
      <div className='pageTitle'>{pageTitle}</div>
      <div className='notification'>
        {overDueBooksLen > 0?
        <Link className='Link' to={'/book-status'}>
          <div className='img-container'><span style={{color: '#808080'}}>Notification:</span> <img src={notificationRed} alt="" /></div>
          <div style={{color: 'red'}}>{overDueBooksLen}</div>
        </Link>
        :
        <Link className='Link' to={'/book-status'}>
          <div className='img-container'><span style={{color: '#808080'}}>Notification:</span><img className='not-gray' src={notificationGray} alt="" /></div>
          <div>0</div>
        </Link>}
      </div>
    </div>
  )
}

export default PageTitle