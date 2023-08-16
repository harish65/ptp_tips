import React from 'react';
import { Grid } from "@material-ui/core";
import { CardElement } from "@stripe/react-stripe-js";

//import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Badge } from 'reactstrap';

import tick from '../../../styles/assets/tick.svg';

// images
//import amex from '../../../styles/assets/amex.png';
//import cirrus from '../../../styles/assets/cirrus.png';
//import diners from '../../../styles/assets/diners.png';
//import dankort from '../../../styles/assets/dankort.png';
//import discover from '../../../styles/assets/discover.png';
//import jcb from '../../../styles/assets/jcb.png';
//import maestro from '../../../styles/assets/maestro.png';
//import mastercard from '../../../styles/assets/mastercard.png';
//import visa from '../../../styles/assets/visa.png';
//import visaelectron from '../../../styles/assets/visaelectron.png';

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgba(75, 72, 72, 0.5)",
      backgroundColor: "#fff",
      color: "#222",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#888"
      }
    },
    invalid: {
      color: "red",
      ":focus": {
        color: "#303238"
      },
      iconColor: "red"
    },
    complete: {
      color: "green",
    }
  }
};

class PaymentForm extends React.Component {

  //const [{ formValues }, dispatch] = useStateValue();
  render() {
    //const cardsLogo = [
    //  amex,
    //  cirrus,
    //  diners,
    //  dankort,
    //  discover,
    //  jcb,
    //  maestro,
    //  mastercard,
    //  visa,
    //  visaelectron,
    //];
    const { plan, message } = this.props

    return (<>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h3 style={{ textAlign: 'center' }}>Subscription Package</h3>
      </Grid>

      {/*<Grid item xs={12} sm={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card onClick={() => this.props.setPlan('test')}>
          <CardBody style={{ textAlign: 'center' }}>
            <p>test</p>
            <FontAwesomeIcon color="#142841" icon={faTicketAlt} size="3x" />
            <CardTitle><strong style={{ fontSize: 18 }}>$1</strong></CardTitle>
            <CardSubtitle style={{ marginTop: -24 }}>per day</CardSubtitle>
            {this.props.plan === 'test' ? <img src={tick} alt="tick Logo" style={{ width: 30, height: 30 }} /> : null}
          </CardBody>
        </Card>
      </Grid>*/}

      <Grid xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ backgroundColor: 'white', padding: 16, paddingBottom: -16, borderRadius: 8, borderWidth: 1, borderColor: 'black' }}>
          <Badge color="primary">14 Days Free Trial</Badge>
          {/*<p style={{textAlign: 'left'}}><FontAwesomeIcon color="#142841" icon={faCheck} size="x" /> 14 days free Trial</p>*/}
          <p style={{ textAlign: 'left', marginTop: 8 }}><FontAwesomeIcon color="#142841" icon={faCheck} size="x" /> All tips included</p>
          {/*<FontAwesomeIcon color="#142841" icon={faTicketAlt} size="x" />*/}
          <h5><strong style={{ fontSize: 16, marginTop: -16 }}>$49.95 / month after trial</strong></h5>
        </div>
      </Grid>


      {/*<Grid item xs={6} sm={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card onClick={() => this.props.setPlan('3months')}>
          <CardBody style={{ textAlign: 'center', height: '180px', padding: 10}}>
            <p style={{fontWeight: 'bold', fontSize: 18 }}>3 Months</p>
            <p style={{textAlign: 'left'}}><FontAwesomeIcon color="#142841" icon={faCheck} size="x" /> Special Offers in</p>
            <p style={{textAlign: 'left'}}><FontAwesomeIcon color="#142841" icon={faCheck} size="x" /> All tips included</p>
            <CardTitle><strong style={{ fontSize: 18 }}>$149 /3m</strong></CardTitle>
            {this.props.plan === '3months' ? <img src={tick} alt="tick Logo" style={{ width: 30, height: 30 }} /> : null}
          </CardBody>
        </Card>
      </Grid>*/}

      {/*<Grid item xs={6} sm={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card onClick={() => this.props.setPlan('6months')}>
        <CardBody style={{ textAlign: 'center', height: '180px', padding: 10}}>
            <p style={{fontWeight: 'bold', fontSize: 18 }}>6 Months</p>
            <p style={{textAlign: 'left'}}><FontAwesomeIcon color="#142841" icon={faPlus} size="x" /> Discount 20%</p>
            <p style={{textAlign: 'left'}}><FontAwesomeIcon color="#142841" icon={faCheck} size="x" /> All tips included</p>
            <CardTitle><strong style={{ fontSize: 18 }}>$239 /6m</strong></CardTitle>
            {this.props.plan === '6months' ? <img src={tick} alt="tick Logo" style={{ width: 30, height: 30 }} /> : null}
          </CardBody>
        </Card>
      </Grid>*/}

      {/*<Grid item xs={6} sm={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card onClick={() => this.props.setPlan('year')}>
        <CardBody style={{ textAlign: 'center', height: '180px', padding: 10}}>
            <p style={{fontWeight: 'bold', fontSize: 18 }}>1 Year</p>
            <p style={{textAlign: 'left'}}><FontAwesomeIcon color="#142841" icon={faPlus} size="x" /> Discount 40%</p>
            <p style={{textAlign: 'left'}}><FontAwesomeIcon color="#142841" icon={faCheck} size="x" /> All tips included</p>
            <CardTitle><strong style={{ fontSize: 18 }}>$339 /y</strong></CardTitle>
            {this.props.plan === 'year' ? <img src={tick} alt="tick Logo" style={{ width: 30, height: 30 }} /> : null}
          </CardBody>
        </Card>
      </Grid>*/}

      {/*<Grid container item item xs={12}>
        <Grid item xs={12} sm={3}>
          <h3>Payment</h3>
        </Grid>
        <Grid container item xs={12} sm={9} justify="space-between">
          {cardsLogo.map(e => <img key={e} src={e} alt={e} width="50px" align="bottom" style={{ padding: "0 5px" }} />)}
        </Grid>
      </Grid>*/}
      <Grid item xs={12} style={{ marginBottom: 0, paddingBottom: 0 }}>
        <h3>Payment</h3>
        <h5 style={{ color: 'red' }}>{message}</h5>
      </Grid>

      <Grid container item xs={12} style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15, padding: 10 }}>
        <Grid item xs={12} sm={3}>
          <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 20 }}>
            <p style={{ fontSize: 30 }}>
              {plan === 'test' ? '$1' :
                plan === 'month' ? '$49.95' :
                  plan === '3months' ? '$149' :
                    plan === '6months' ? '$239' : '$339'}
            </p>
            <p style={{ fontSize: 14, color: 'black', paddingLeft: 5 }}>
              {plan === 'test' ? <>per <br /> day</> :
                plan === 'month' ? <>per <br /> month</> :
                  plan === '3months' ? <>every <br /> 3 months</> :
                    plan === '6months' ? <>every <br /> 6 months</> : <> per <br /> year </>}
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={9} className="registerStripe">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Grid>
      </Grid>

    </>
    )
  }
}

export default PaymentForm;