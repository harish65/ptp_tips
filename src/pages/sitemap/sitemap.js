import React, { Component } from 'react'
import {Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import moment from 'moment-timezone';
import { Helmet } from "react-helmet";


import './sitemap.scss'

export default class sitemap extends Component {
    lscmp() {
        var s = null
        var tdf = moment().tz('Australia/Sydney').format("dddd")
        if (tdf === "Sunday") {
          s = moment().tz('Australia/Sydney').subtract(1, 'day')
        } else
          if (tdf === "Saturday") {
            s = moment().tz('Australia/Sydney').subtract(7, 'day')
          } else
            if (tdf === "Friday") {
              s = moment().tz('Australia/Sydney').subtract(6, 'day')
            } else
              if (tdf === "Thursday") {
                s = moment().tz('Australia/Sydney').subtract(5, 'day')
              } else
                if (tdf === "Wednesday") {
                  s = moment().tz('Australia/Sydney').subtract(4, 'day')
                } else
                  if (tdf === "Tuesday") {
                    s = moment().tz('Australia/Sydney').subtract(3, 'day')
                  } else
                    if (tdf === "Monday") {
                      s = moment().tz('Australia/Sydney').subtract(2, 'day')
                    }
        return s
      }

      lwcmp() {
        var lw
        var td = moment().tz('Australia/Sydney')
        var s = null
        var tdf = moment(td).format("dddd")
        if (tdf === "Sunday") {
          s = moment(td).subtract(4, 'day')
        } else
          if (tdf === "Saturday") {
            s = moment(td).subtract(3, 'day')
          } else
            if (tdf === "Friday") {
              s = moment(td).subtract(2, 'day')
            } else
              if (tdf === "Thursday") {
                s = moment(td).subtract(1, 'day')
              } else
                if (tdf === "Wednesday") {
                  s = moment(td).subtract(7, 'day')
                } else
                  if (tdf === "Tuesday") {
                    s = moment(td).subtract(6, 'day')
                  } else
                    if (tdf === "Monday") {
                      s = moment(td).subtract(5, 'day')
                    }
        lw = moment(s).format("YYYYMMDD")
        return (lw)
      }
    render() {
        var s = moment(this.lscmp())
        var w = moment(this.lwcmp())

        return (
            <Container style={{marginTop:48}}>
              <div style={{marginLeft:64, fontSize:18}}>
              <Helmet>
          <title>PTP Tips Site Map</title>
          <meta name="author" content="PTP TIPS"></meta>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="keywords"
            content="PTP TIPS, contact us ,email ,facebook ,instagram, google ,FAQ, Send Now, Please enter your message, Notice, name ,first name ,last name ,australia ,ptp, ptptips "
          ></meta>
          <meta
            name="description"
            content="Contact PTP tips support team for more offers and customized tips for special users."
          />
          <link rel="canonical" href="https://www.ptptips.com.au/contactus" />
        </Helmet>
              <h1 style={{fontSize:24}}>Site Map</h1>
              <div style={{marginTop:32}}>

               <li className="single"><Link style={{color:'#142841'}} to={'/'}>Home</Link></li><br/>
               <li className="single"><Link style={{color:'#142841'}} to={'/selections'}>Selections</Link></li>
               <ul>
                <li className="single"><Link style={{color:'#142841'}} to={`/horse-racing-tips/${moment().tz('Australia/Sydney').subtract(1, 'day').format("DD-MM-YYYY")}`}>Yesterday's Selection</Link></li>
                <li className="single"><Link style={{color:'#142841'}} to={'/horse-racing-tips/today'}>Today's Selection</Link></li>
                <li className="single"><Link style={{color:'#142841'}} to={'/horse-racing-tips/next-to-jump'}>Next To Jump</Link></li>
                <li className="single"><Link style={{color:'#142841'}} to={'/horse-racing-tips/tomorrow'}>Tomorrow's Selection</Link></li>
                <li className="single"><Link style={{color:'#142841'}} to={`/horse-racing-tips/${moment().tz('Australia/Sydney').add(2, 'day').format("DD-MM-YYYY")}`}>{ moment().tz('Australia/Sydney').add(2, 'day').format("dddd")}'s Selection</Link></li>
               </ul><br/>
               <li className="single"><Link style={{color:'#142841'}} to={'/horse-racing-tips/results/today'}>Results</Link></li>
               <ul>
               <li className="single"><Link to={`horse-racing-tips/results/${moment().tz('Australia/Sydney').subtract(1, 'day').format("DD-MM-YYYY")}`} style={{color:'#142841'}}>Yesterday's Results</Link></li>
                <li className="single"><Link to={`horse-racing-tips/results/${moment().tz('Australia/Sydney').format('DD-MM-YYYY')}`} style={{color:'#142841'}}>Today's Results</Link></li>
                <li className="single"><Link to={`horse-racing-tips/results/${moment(w).tz('Australia/Sydney').format('DD-MM-YYYY')}`} style={{color:'#142841'}}>Last Wednesday's Results</Link></li>
                <li className="single"><Link to={`horse-racing-tips/results/${moment(s).tz('Australia/Sydney').format('DD-MM-YYYY')}`} style={{color:'#142841'}}>Last Saturday's Results</Link></li>
               </ul>
               <br/>
               <li className="single"><Link style={{color:'#142841'}} to={'/results'}>Top Venue's Profiles</Link></li>
               <ul>
                <li className="single"><Link to={`profile/venue/flem`} style={{color:'#142841'}}>Flemington's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/r'wick`} style={{color:'#142841'}}>Randwick's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/m.v.`} style={{color:'#142841'}}>Moonee's valley Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/suncst`} style={{color:'#142841'}}>Sunshine Coast's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/sapph`} style={{color:'#142841'}}>Sapphire Coast's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/g%20cst`} style={{color:'#142841'}}>Gold Coast's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/t'vill`} style={{color:'#142841'}}>Townsville's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/twba`} style={{color:'#142841'}}>Toowoomba's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/racing`} style={{color:'#142841'}}>Pakenham's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/r'hill`} style={{color:'#142841'}}>Rosehill's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/pt%20mac`} style={{color:'#142841'}}>Port Macquarie's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/ball't`} style={{color:'#142841'}}>Ballarat's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/albany`} style={{color:'#142841'}}>Albany's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/albury`} style={{color:'#142841'}}>Albury's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/pion%20p`} style={{color:'#142841'}}>Alice Springs's Racecourse</Link></li>
                <li className="single"><Link to={`profile/venue/e.farm`} style={{color:'#142841'}}>Eagle Farm's Racecourse</Link></li>

               </ul>

               <br/>
               <li className="single"><Link style={{color:'#142841'}} to={'/results'}>Top Horse's Profiles</Link></li>
               <ul>
                <li className="single"><Link to={`profile/horse/2500/Redzel`} style={{color:'#142841'}}>Redzel's Profile</Link></li>
                <li className="single"><Link to={`profile/horse/2497/Nature-Strip`} style={{color:'#142841'}}>Nature Strip's Profile</Link></li>
                <li className="single"><Link to={`profile/horse/4009/Verry-Elleegant`} style={{color:'#142841'}}>Verry Elleegant's Profile</Link></li>
                <li className="single"><Link to={`profile/horse/10859/Classique-Legend`} style={{color:'#142841'}}>Classique Legend's Profile</Link></li>
                <li className="single"><Link to={`profile/horse/4003/Happy-Clapper`} style={{color:'#142841'}}>Happy Clapper's Profile</Link></li>
                <li className="single"><Link to={`profile/horse/1093/Peggy-Rose`} style={{color:'#142841'}}>Peggy Rose's Profile</Link></li>


               </ul>
               <br/>
               <li className="single"><Link style={{color:'#142841'}} to={'/results'}>Top Jockey's Profiles</Link></li>
               <ul>
                <li className="single"><Link to={`profile/jockey/132/Chris-Parnham`} style={{color:'#142841'}}>Chris Parhnham's Profile</Link></li>
                <li className="single"><Link to={`profile/jockey/156/Clint-Johnston-Porter`} style={{color:'#142841'}}>Clint Johnston-Porter's Profile</Link></li>
                <li className="single"><Link to={`profile/jockey/158/William-Pike`} style={{color:'#142841'}}>William Pike's Profile</Link></li>
                <li className="single"><Link to={`profile/jockey/269/Hugh-Bowman`} style={{color:'#142841'}}>Hugh Bowman's Profile</Link></li>
                <li className="single"><Link to={`profile/jockey/303/Glen-Boss`} style={{color:'#142841'}}>Glen Boss's Profile</Link></li>
                <li className="single"><Link to={`profile/jockey/270/Kerrin-Mcevoy`} style={{color:'#142841'}}>Kerrin Mcevoy's Profile</Link></li>
                <li className="single"><Link to={`profile/jockey/1487/Damien-Oliver`} style={{color:'#142841'}}>Damien Oliver's Profile</Link></li>
                <li className="single"><Link to={`profile/jockey/252/James-Mcdonalds`} style={{color:'#142841'}}>James Mcdonald's Profile</Link></li>


               </ul>
               <br/>
               <li className="single"><Link style={{color:'#142841'}} to={'/faq'}>FAQ</Link></li>
               <li className="single"><Link style={{color:'#142841'}} to={'/contactus'}>Contact Us</Link></li>
               <li className="single"><Link style={{color:'#142841'}} to={'/policy'}>Privacy & Policy</Link></li>

              </div>
              </div>
            </Container>
        )
    }
}
