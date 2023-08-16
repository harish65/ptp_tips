import React, { useState, useEffect } from "react";
import "./StripePayment.scss";
import { connect } from "react-redux";
import actions from "../../redux/actions/stripepricedata";
import { toast } from "react-toastify";

const StripePayment = (props) => {
  const [productdata, setproductsdata] = useState([]);
  const [price_id, setprice_id] = useState("");
  const [customer_id, setCustomerid] = useState("");
  const [mode, setMode] = useState("");
  const [client_id, setclientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [product_id, setProductId] = useState("");

  useEffect(() => {
    props.dispatch(actions.getProductslist()).then((res) => {
      res.data.sort(
        (a, b) => a.default_price.unit_amount - b.default_price.unit_amount
      );

      setproductsdata(res?.data);
    });
  }, []);

  useEffect(() => {
    if (props.currentUser) {
      setCustomerid(props.currentUser.customer_id);
      setclientId(props.currentUser.id);
    }
  }, [props.currentUser]);

  const obj = {
    tips: {
      nonRecurring: [],
      recurring: [],
    },
    tipsplus: {
      nonRecurring: [],
      recurring: [],
    },
    tipsplusplus: {
      nonRecurring: [],
      recurring: [],
    },
  };

  let arr = productdata.filter((val) => val.name.split(" ")[0] === "Tips");
  arr.forEach((key) => {
    if (key.default_price.type == "recurring") {
      obj["tips"].recurring.push(key);
    } else {
      obj["tips"].nonRecurring.push(key);
    }
  });

  arr = productdata.filter((val) => val.name.split(" ")[0] === "Tips+");
  arr.forEach((key) => {
    if (key.default_price.type == "recurring") {
      obj["tipsplus"].recurring.push(key);
    } else {
      obj["tipsplus"].nonRecurring.push(key);
    }
  });

  arr = productdata.filter((val) => val.name.split(" ")[0] === "Tips++");
  arr.forEach((key) => {
    if (key.default_price.type == "recurring") {
      obj["tipsplusplus"].recurring.push(key);
    } else {
      obj["tipsplusplus"].nonRecurring.push(key);
    }
  });

  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });

  const [tips, setTips] = useState({
    value: "10",
    day: "Weekday",
  });

  const [tips2, setTips2] = useState({
    value: "15",
    day: "Weekday",
  });

  const [tips3, setTips3] = useState({
    value: "20",
    day: "Weekday",
  });

  const handlechangedata = (event) => {
    setTips({
      value: event.target.value,
      day: event.target.getAttribute("day"),
    });
    setprice_id(event.target.getAttribute("price_id"));
    setMode(event.target.getAttribute("mode"));

    setSelectedOption({
      value: event.target.value,
      label: event.target.nextSibling.textContent,
    });

    setProductId(event.target.getAttribute("productid"));
  };

  const handlechangedata2 = (event) => {
    setTips2({
      value: event.target.value,
      day: event.target.getAttribute("day"),
    });
    setprice_id(event.target.getAttribute("price_id"));
    setMode(event.target.getAttribute("mode"));

    setSelectedOption({
      value: event.target.value,
      label: event.target.nextSibling.textContent,
    });
    setProductId(event.target.getAttribute("productid"));
  };

  const handlechangedata3 = (event) => {
    setTips3({
      value: event.target.value,
      day: event.target.getAttribute("day"),
    });
    setprice_id(event.target.getAttribute("price_id"));
    setMode(event.target.getAttribute("mode"));

    setSelectedOption({
      value: event.target.value,
      label: event.target.nextSibling.textContent,
    });
    setProductId(event.target.getAttribute("productid"));
  };

  const handlePay = () => {
    if (props.currentUser) {
      if (price_id) {
        setLoading(true);
        props
          .dispatch(
            actions.SubscriptionData({
              price_id: price_id,
              customer_id: customer_id,
              mode: mode,
              client_id: client_id,
              pricename: selectedOption.label,
              product_id: product_id,
            })
          )
          .then((res) => {
            setLoading(false);
            window.location.href = res.url;
          });
      } else {
        toast.error("Please select plan first");
      }
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <>

    
       { !productdata.length > 0 ? (
        <div
          class="d-flex justify-content-center"
          style={{ height: "100vh", alignItems: "center" }}
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
      <section className="appie-pricing-area">
      <div className="container">
        <div className="tabed-content">
          <div id="month">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-sm-6 wow animated fadeInLeft">
                <div className="pricing-one__single">
                  <div className="pricig-heading">
                    <h6>
                      Tips
                      <span
                        style={{
                          fontSize: "14px",
                          display: "block",
                          color: "#fff",
                          marginTop: "6px",
                        }}
                      >
                        (Best Tips)
                      </span>
                    </h6>
                    <div className="price-range">
                      <sup>$</sup> <span>{tips.value}</span>
                      <p>/{tips.day}</p>
                    </div>
                    <p>Get your 14 day free trial</p>
                  </div>
                  <div className="pricig-body">
                    <ul className="nonRecurring">
                      {obj.tips.nonRecurring &&
                        obj.tips.nonRecurring.map((ele) => {
                          console.log("ele",ele)
                          return (
                            <>
                              <li className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  id="flexCheck1"
                                  name="selectpack"
                                  value={ele.default_price.unit_amount / 100}
                                  day={ele.name}
                                  mode="payment"
                                  price_id={ele.default_price.id}
                                  productid={ele.default_price.product}
                                  onChange={handlechangedata}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheck1"
                                >
                                  {ele.name}
                                  <sup>$</sup>{" "}
                                  {ele.default_price.unit_amount / 100}
                                </label>
                              </li>{" "}
                            </>
                          );
                        })}
                    </ul>

                    <ul className="recurring">
                      {obj.tips.recurring &&
                        obj.tips.recurring.map((ele) => {
                          return (
                            <>
                              <li className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  id="flexCheck3"
                                  name="selectpack"
                                  value={ele.default_price.unit_amount / 100}
                                  day={ele.name}
                                  price_id={ele.default_price.id}
                                  productid={ele.default_price.product}
                                  onChange={handlechangedata}
                                  mode="subscription"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheck3"
                                >
                                  {ele.name}
                                  <sup>$</sup>{" "}
                                  {ele.default_price.unit_amount / 100}
                                  <span className="discountText">
                                    $90- $40 :-{" "}
                                    <span className="discountHiLight">
                                      44%discount
                                    </span>
                                  </span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6 wow animated fadeInLeft">
                <div className="pricing-one__single">
                  <div className="pricig-heading">
                    <h6>
                      {" "}
                      Tips<sup>+ </sup>
                      <span
                        style={{
                          fontSize: "14px",
                          display: "block",
                          color: "#fff",
                          marginTop: "6px",
                        }}
                      >
                        ( Best Tips + Recommended Track Condition)
                      </span>{" "}
                    </h6>

                    <div className="price-range">
                      <sup>$</sup> <span>{tips2.value}</span>
                      <p>/{tips2.day}</p>
                    </div>
                    <p>Get your 14 day free trial</p>
                  </div>
                  <div className="pricig-body">
                    <ul className="nonRecurring">
                      {obj.tipsplus.nonRecurring &&
                        obj.tipsplus.nonRecurring.map((ele) => {
                          return (
                            <li className="form-check">
                              <input
                                type="radio"
                                className="form-check-input"
                                id="flexCheck1"
                                name="selectpack"
                                value={ele.default_price.unit_amount / 100}
                                day={ele.name}
                                price_id={ele.default_price.id}
                                productid={ele.default_price.product}
                                onChange={handlechangedata2}
                                mode="payment"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheck1"
                              >
                                {ele.name}
                                <sup>$</sup>{" "}
                                {ele.default_price.unit_amount / 100}
                              </label>
                            </li>
                          );
                        })}
                    </ul>
                    <ul className="recurring">
                      {obj.tipsplus.recurring &&
                        obj.tipsplus.recurring.map((ele) => {
                          return (
                            <li className="form-check">
                              <input
                                type="radio"
                                className="form-check-input"
                                id="flexCheck3"
                                name="selectpack"
                                value={ele.default_price.unit_amount / 100}
                                day={ele.name}
                                price_id={ele.default_price.id}
                                productid={ele.default_price.product}
                                onChange={handlechangedata2}
                                mode="subscription"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheck3"
                              >
                                {ele.name}
                                <sup>$</sup>{" "}
                                {ele.default_price.unit_amount / 100}
                                <span className="discountText">
                                  $135- $60 :-{" "}
                                  <span className="discountHiLight">
                                    44%discount
                                  </span>
                                </span>
                              </label>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6 wow animated fadeInLeft">
                <div className="pricing-one__single">
                  <div className="pricig-heading">
                    <h6>
                      <h6>
                        Tips<sup>++ </sup>
                        <span
                          style={{
                            fontSize: "14px",
                            display: "block",
                            color: "#fff",
                            marginTop: "6px",
                          }}
                        >
                          (Best Tips + Recommended Track Condition + Maximum
                          Odds)
                        </span>{" "}
                      </h6>
                    </h6>
                    <div className="price-range">
                      <sup>$</sup> <span>{tips3.value}</span>
                      <p>/{tips3.day}</p>
                    </div>
                    <p>Get your 14 day free trial</p>
                  </div>
                  <div className="pricig-body">
                    <ul className="nonRecurring">
                      {obj.tipsplusplus.nonRecurring &&
                        obj.tipsplusplus.nonRecurring.map((ele) => {
                          return (
                            <li className="form-check">
                              <input
                                type="radio"
                                className="form-check-input"
                                id="flexCheck1"
                                name="selectpack"
                                value={ele.default_price.unit_amount / 100}
                                day={ele.name}
                                price_id={ele.default_price.id}
                                productid={ele.default_price.product}
                                onChange={handlechangedata3}
                                mode="payment"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheck1"
                              >
                                {ele.name}
                                <sup>$</sup>{" "}
                                {ele.default_price.unit_amount / 100}
                              </label>
                            </li>
                          );
                        })}
                    </ul>
                    <ul className="recurring">
                      {obj.tipsplusplus.recurring &&
                        obj.tipsplusplus.recurring.map((ele) => {
                          return (
                            <li className="form-check">
                              <input
                                type="radio"
                                className="form-check-input"
                                id="flexCheck3"
                                name="selectpack"
                                value={ele.default_price.unit_amount / 100}
                                day={ele.name}
                                price_id={ele.default_price.id}
                                productid={ele.default_price.product}
                                onChange={handlechangedata3}
                                mode="subscription"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheck3"
                              >
                                {ele.name}
                                <sup>$</sup>{" "}
                                {ele.default_price.unit_amount / 100}
                                <span className="discountText">
                                  $160- $60 :-{" "}
                                  <span className="discountHiLight">
                                    37%discount
                                  </span>
                                </span>
                              </label>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-warning w-25 text-dark"
              onClick={handlePay}
              disabled={selectedOption.value ? false : true}
            >
              <strong>
                {loading ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <p>pay $ {selectedOption.value} </p>
                )}
              </strong>
            </button>
          </div>
        </div>
      </div>
    </section> )
    }
    
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  loggedIn: state.auth.isLoggedIn,
  stripepricedata: state.stripepricedata.Productslist,
});

export default connect(mapStateToProps)(StripePayment);
