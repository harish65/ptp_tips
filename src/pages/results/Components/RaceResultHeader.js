import React from 'react'
import { CardBody, Row, Col, Collapse , Badge} from 'reactstrap';
import "../results.scss"

function RaceResultHeader({ cardname, selec, win, second, third, lost, ID,open, Table,venue_history }) {

  const styles = {
    selectionRateCol: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderTop:"2px solid",
      // borderStyle:"outset"




    },
    selectionRateValueContainer: {
      display: "flex",
      flexDirection: "column",
      padding: 0,
      alignItems: "center",
      justifyContent: "center",


    },
  };
  return (
    <div className="pointer" >
    <div className='row' key={ID} >

      <Col

      xs={12}
      sm={12}
      md={12}
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        marginRight: 16,
        padding: 0,
        paddingTop: 4,
        paddingBottom: 18,
        marginTop:18,
        marginBottom:12,
        fontSize:18,



      }}
    >
      <Col
        xs={12}
        md={12}
        lg={12}
        style={{ display: "flex", flexDirection: "row", width: "100%" , marginTop:8, marginBottom:8,fontSize:18}}
      >
        <Col
          lg={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
            padding: 0,
            fontSize:18,

          }}
        >
          <span >
            <strong style={{fontSize:20}}>{cardname}   <Badge style={{ backgroundColor: "#379239" }}>
            <span style={{ color: "white" ,alignItems: "flex-start"}}>
              {selec} Selections
            </span>
          </Badge></strong>
            <br/>

          </span>
        </Col>
        <Col
          lg={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
            padding: 0,
            fontSize:18
          }}
        >
          <span>
            <strong style={{fontSize:20}}>* History *  <Badge style={{ backgroundColor: "#379239" }}>
            <span style={{ color: "white" }}>
              {venue_history?.runs} Runs
            </span>
          </Badge> </strong>
            <br/>

          </span>
        </Col>


      </Col>



      <Col
        xs={12}
        md={12}
        lg={12}
        style={{
          width: "100%",
          marginTop: 12,
          alignItems: "center",
          justifyContent: "center",
          fontSize:18,


        }}
      >

        <Row>
          <Col style={styles.selectionRateCol}>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>{win ? win :'-'}</strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>WIN</span>
            </div>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>{win+second+third ? win+second+third : '-' }</strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>PLACE</span>
            </div>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>{ selec ? ((selec) - ( win+second+third)) : '-'}</strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>LOST</span>
            </div>
          </Col>

          <Col style={styles.selectionRateCol}>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>
              {selec ? ((win / selec) * 100).toFixed(2) + "%" : '--'}
              </strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>WIN%</span>
            </div>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>
               {selec ? (((win+second+third) / selec) *100).toFixed(2) + "%" : '--'}
              </strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>PLACE%</span>
            </div>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>
              {selec ?(((( selec - (win+second+third))) / selec) *100).toFixed(2) + "%" : '--'}
              </strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>LOST%</span>
            </div>
          </Col>



          <Col style={styles.selectionRateCol}>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>
              {venue_history?.won}
              </strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>WIN</span>
            </div>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>
              {venue_history?.place}
              </strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>PLACE</span>
            </div>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>
              {(venue_history?.place) ? ((venue_history?.runs) - (venue_history?.place)) : "-"}
              </strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>LOST</span>
            </div>
          </Col>

          <Col style={styles.selectionRateCol}>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>
              {((venue_history?.won/venue_history?.runs)*100)?.toFixed(2)}%
              </strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>WIN%</span>
            </div>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>
              {((venue_history?.place/venue_history?.runs)*100)?.toFixed(2)}%
              </strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>PLACE%</span>
            </div>
            <div style={styles.selectionRateValueContainer}>
              <strong style={{ fontSize: 16 }}>
              {(venue_history?.place) ? ((((venue_history?.runs) - (venue_history?.place)))/(venue_history?.runs)*100).toFixed(2)+ "%" : "-"}
              </strong>
              <span style={{ marginTop: -4, fontSize: 11 }}>LOST%</span>
            </div>
          </Col>


        </Row>


      </Col>







    </Col>




    </div>

    <Collapse isOpen={open} id={ID}>

    <CardBody style={{ padding: 1 }}>

      <div style={{opacity:0.85}}>
        {Table}
      </div>
    </CardBody>
  </Collapse>
   </div>
  )
}

export default RaceResultHeader
