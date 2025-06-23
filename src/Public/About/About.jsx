import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import spinner from '../../assets/spinner/spinner.gif'
import './About.css'
const About = () => {
    const [state, setState] = useState(false)
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
  <div className='app-about-container'>
    <div className='nav'><Navbar /></div>
    
    <div className='about-container'>
        <div className='title'>📘 Company Profile: Eur-Africa Research Associates Ltd</div>
        <div>EUR-Research Associates Limited provides quality and insightful research and consultancy service in social-economic development, development practices, governance, oganizational development, and project management (including project design, monitoring & evaluation).As a full-fledged policy and social research company that service the needs of private organization, government agencies, non-profit organizations, international NGOs, and inter-governmental organization to enable them to make informed knowledge-driven decision about their product and services.</div>
        <div>🏢 Basic Information</div>
        <ul>
            <li>Full Name: Eur‑Africa Research Associates Limited</li>
            <li>RC Number: 354224</li>
            <li>Date of Incorporation: March 31, 1999</li>
            <li>Company Type: Private Unlimited Company</li>
            <li>Location: Jos, Plateau State, Nigeria</li>
        </ul>

        <div>🧑‍💼 Board of Directors / Key Individuals</div>
        <ul>
            <li>Victor Adebola O.</li>
            <li>Olubukola O. Adetula</li>
            <li>Olugbemi Jaiyebo</li>
            <li>Emmanuel Egbunu</li>
            <li>Muyiwa Adetula</li>
        </ul>

        <div>Several of these names (like Olubukola Adetula) are recognized in academic and policy circles, particularly in African-European research and diplomatic contexts. Eur-Africa Research Associates have links to higher education, foreign affairs, or regional development think tanks.</div>

        <div>Contact us for:</div>
        <ul>
            <li>Trade and Investments Advice</li>
            <li>Political Risk Analyses and Business Advice</li>
            <li>Negotiations and Barganing</li>
            <li>Market surveys</li>
            <li>Organisational Capacity Assessments</li>
            <li>Project Management (Program Design, Implementation, Monitoring & Evaluation)</li>
            <li>Program Support & Management Services </li>
        </ul>
        <a href="tel:09061465412">+234(0)9061465412</a><br />
        <a href="mailto:eurafricaresearchassociates@gmail.com">eurafricaresearchassociates@gmail.com</a><br /><br />
        <div>We shall feel highly obliged for granting our requests for the deployment of NYSC members to our organization.</div>
    </div>
  </div>
  :
    <div className='spinner'>
        <img src={spinner} />
        <div className='name'>EUR-AFRICA</div>
    </div>}
</>)
}

export default About