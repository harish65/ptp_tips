import React, { useState } from "react";
import "./StripePayment.scss";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { CardElement } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { AddressElement } from "@stripe/react-stripe-js";

import axios from "axios";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: "auto",
    // margin: "35vh auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
});

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const Checkout = (props) => {
  const classes = useStyles();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [line1, setLine1] = useState("");
  const [postal_code, setpostal_code] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [priceid, setPriceid] = useState(location.state.priceid);
  const [AddressValidate, setAddressValidate] = useState(false);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      return;
    }
    if (AddressValidate) {
      setLoading(true);
      const result = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        const res = await axios.post(
          "http://localhost:3051/api/create-subsciption",
          {
            payment_method: result.paymentMethod.id,
            email,
            country,
            name,
            postal_code,
            line1,
            city,
            state,
            priceid,
          }
        );
        // eslint-disable-next-line camelcase
        const { client_secret, status } = res.data;
        setLoading(false);

        if (status === "requires_action") {
          stripe.confirmCardPayment(client_secret).then(function (result) {
            if (result.error) {
              console.log("There was an issue!");
              toast("There was an issue! Please try Again");
              console.log(result.error);
            } else {
              console.log("You got the money!");
              toast.success("Congratulation You are now Subscrible");
            }
          });
        } else {
          console.log("You got the money!");
          toast.success("Congratulation You are now Subscrible");
        }
      }
    } else {
      toast.error("all address fields are mandatory");
    }
  };

  const handlechangeAddress = async (e) => {
    setAddressValidate(e.complete);

    setCity(e.value.address.city);
    setName(e.name);
    setCountry(e.value.address.country);
    setLine1(e.value.address.line1);
    setpostal_code(e.value.address.postal_code);
    setState(e.value.address.state);
  };

  const handlepayment = (e) => {
    console.log("card", e);
    console.log(elements.getElement(CardElement));
  };

  return (
    <>
      <section className="paymentSection">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <Card className={classes.root}>
                <CardContent className={classes.content}>
                  {/* <form class="form-inline ">
                    <div className="col-sm-4 mb-2">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="line1"
                        value={line1}
                        onChange={(e) => setLine1(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                    
                    <div className="col-sm-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="country"
                        value={postal_code}
                        onChange={(e) => setpostal_code(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-8">
                    
                    </div>
                  
                  </form> */}
                  <TextField
                    label="Email"
                    id="outlined-email-input"
                    helperText={`Email you'll recive updates and receipts on`}
                    margin="normal"
                    variant="outlined"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                  <CardElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={handlepayment}
                  />
                  <AddressElement
                    options={{ mode: "billing" }}
                    onChange={handlechangeAddress}
                  />

                  <div className={classes.div}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleSubmitSub}
                    >
                      {loading ? (
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Subscription"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-md-5">
              <div className="cardPanel">
                <h4>Your Order</h4>
                <div className="Orderitem">
                  <div className="OrderitemImg">
                    <img
                      src="https://www.shutterstock.com/image-vector/two-racing-horses-competing-each-260nw-1549927643.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="Orderiteminfo">
                    <h5 className="planName">{props.planDetails.plan}</h5>
                    <p>Text</p>
                  </div>
                  <ul className="planDetaleList">
                    <li>{props.planDetails.plan}</li>
                    <li>Plan List 2</li>
                    <li>Plan List 3</li>
                  </ul>
                </div>

                <div className="pricNameNumber">
                  <span>Discount</span>
                  <span className="pricPay">$200</span>
                </div>
                <div className="pricNameNumber">
                  <span>Discount</span>
                  <span className="pricPay">$200</span>
                </div>
                <div className="pricNameNumber totalPric">
                  <span>Discount</span>
                  <span className="pricName">$200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  planDetails: state.stripepricedata.planDetails,
});

export default connect(mapStateToProps)(Checkout);
