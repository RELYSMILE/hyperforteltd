import React, {useContext} from 'react'
import { AppContext } from '../../Admin/Context/Context'
import notificationGray from '../../assets/icons/notificationGray.png'
import notificationRed from '../../assets/icons/notificationRed.png'
import './PageTitle.css'


const PageTitle = ({pageTitle}) => {
  const {overDueBooksLen} = useContext(AppContext)
  return (
    <div className='pageTitle-notification'>
      <div className='pageTitle'>{pageTitle}</div>
      <div className='notification'>
        {overDueBooksLen > 0?
        <>
          <span style={{color: '#808080'}}>Notification:</span> <img src={notificationRed} alt="" />
          <div style={{color: 'red'}}>{overDueBooksLen}</div>
        </>
        :
        <>
          <span style={{color: '#808080'}}>Notification:</span><img src={notificationGray} alt="" />
          <div>0</div>
        </>}
      </div>
    </div>
  )
}

export default PageTitle