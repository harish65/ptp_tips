import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  Form,
  Label,
  Input,
  Button,
  FormGroup,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "../account.scss";
import PhoneInput from "react-phone-input-2";
import moment from "moment-timezone";
import { updateMailingDates } from "../../../config/config";
import { updateMailPause } from "../../../redux/actions/auth";
import { Helmet } from "react-helmet";


class AccountForm extends React.Component {
  constructor(props) {
    console.log(props.history.push());
    super(props);
    this.state = {
      email: this.props.currentUser?.email,
      firstName: this.props.currentUser?.firstName,
      lastName: this.props.currentUser?.lastName,
      country: this.props.currentUser?.country,
      dob: this.props.currentUser?.dob,
      region: this.props.currentUser?.region,
      phone: this.props.currentUser?.phone,
      expiryDate: moment(this.props.currentUser?.exp).format("DD-MM-YYYY"),
      popup: false,
      message: "",
      notice: false,
      unsub: false,
      targetId: "",
      targetChecked: false,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
      all: true,
      emailRec: true,
    };
  }

  componentDidMount() {
    this.daysChecker();
  }

  handlePhone = (phone) => {
    this.setState({ phone: phone });
  };

  handleCountry = (country) => {
    this.setState({ country: country });
  };

  handleRegion = (region) => {
    this.setState({ region: region });
  };

  //handleSubmit = (e) => {
  //  e.preventDefault()
  //  if (this.state.phone === '' || this.state.phone === null || this.state.country === '' || this.state.region === '') {
  //    this.setState({ notice: true, message: 'Country, Region and Phone number are required' })
  //  } else {
  //    this.setState({ popup: true })
  //  }
  //}

  closeModal = () => {
    this.setState({ popup: false });
  };

  //openUnsub(){
  //  this.setState({ unsub : true})
  //  const { dispatch } = this.props
  //  dispatch(cleanMessages())
  //}

  //closeUnsub = () => {
  //  this.setState({ unsub: false })
  //}

  closeNotice = () => {
    this.setState({ notice: false });
    let now = moment().tz("Australia/Sydney").format("DD-MM-YYYY");
    this.props.history.push(`/horse-racing-tips/${now}`);
  };

  //handleUnsub = () => {
  //  const { dispatch } = this.props
  //  dispatch(unsubscribe({ email: this.props.currentUser?.email }));
  //}

  handleEmailReceive = () => {
    this.setState((prevState) => ({
      emailRec: !prevState.emailRec,
    }));
  };

  handleUpdatePauseEmail = async () => {
    const { dispatch } = this.props;

    if (this.state.emailRec === false) {
      await updateMailingDates({
        mailer: [0, 1, 2, 3, 4, 5, 6],
        clientId: this.props.currentUser.id,
      }).then((res) => {
        if (res.status === 200) {
          this.setState({
            notice: true,
            message: "Your settings have been successfully saved.",
          });
          dispatch(updateMailPause(res.response));
        } else {
          this.setState({ notice: true, message: res.message });
        }
      });
    } else {
      if (this.state.all === true) {
        await updateMailingDates({
          mailer: [],
          clientId: this.props.currentUser.id,
        }).then((res) => {
          if (res.status === 200) {
            this.setState({
              notice: true,
              message: "Your settings have been successfully saved.",
            });
            dispatch(updateMailPause(res.response));
          } else {
            this.setState({ notice: true, message: res.message });
          }
        });
      } else {
        let mailer = [];
        if (this.state.sunday === false) {
          mailer.push(0);
        }
        if (this.state.monday === false) {
          mailer.push(1);
        }
        if (this.state.tuesday === false) {
          mailer.push(2);
        }
        if (this.state.wednesday === false) {
          mailer.push(3);
        }
        if (this.state.thursday === false) {
          mailer.push(4);
        }
        if (this.state.friday === false) {
          mailer.push(5);
        }
        if (this.state.saturday === false) {
          mailer.push(6);
        }
        await updateMailingDates({
          mailer: mailer,
          clientId: this.props.currentUser.id,
        }).then((res) => {
          if (res.status === 200) {
            this.setState({
              notice: true,
              message: "Your settings have been successfully saved.",
            });
            dispatch(updateMailPause(res.response));
          } else {
            this.setState({ notice: true, message: res.message });
          }
        });
      }
    }
  };

  onDaySelection = (e) => {
    if (e.target.id === "all" && e.target.checked === true) {
      this.setState({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
        all: true,
      });
    } else if (e.target.id === "all" && e.target.checked === false) {
      this.setState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        all: false,
      });
    } else {
      if (e.target.id === "monday" && e.target.checked === false) {
        this.setState({ monday: false, all: false });
      }
      if (e.target.id === "tuesday" && e.target.checked === false) {
        this.setState({ tuesday: false, all: false });
      }
      if (e.target.id === "wednesday" && e.target.checked === false) {
        this.setState({ wednesday: false, all: false });
      }
      if (e.target.id === "thursday" && e.target.checked === false) {
        this.setState({ thursday: false, all: false });
      }
      if (e.target.id === "friday" && e.target.checked === false) {
        this.setState({ friday: false, all: false });
      }
      if (e.target.id === "saturday" && e.target.checked === false) {
        this.setState({ saturday: false, all: false });
      }
      if (e.target.id === "sunday" && e.target.checked === false) {
        this.setState({ sunday: false, all: false });
      }
      ////
      if (e.target.id === "monday" && e.target.checked === true) {
        this.setState({ monday: true });
      }
      if (e.target.id === "tuesday" && e.target.checked === true) {
        this.setState({ tuesday: true });
      }
      if (e.target.id === "wednesday" && e.target.checked === true) {
        this.setState({ wednesday: true });
      }
      if (e.target.id === "thursday" && e.target.checked === true) {
        this.setState({ thursday: true });
      }
      if (e.target.id === "friday" && e.target.checked === true) {
        this.setState({ friday: true });
      }
      if (e.target.id === "saturday" && e.target.checked === true) {
        this.setState({ saturday: true });
      }
      if (e.target.id === "sunday" && e.target.checked === true) {
        this.setState({ sunday: true });
      }
    }
  };

  daysChecker = () => {
    if (this.props.currentUser?.email_pause) {
      var days = this.props.currentUser.email_pause;
      if (days.length === 0) {
        this.setState({ all: true });
      } else if (days.length > 0) {
        this.setState({ all: false });
        // eslint-disable-next-line array-callback-return
        days.map((zone) => {
          if (zone === 0) {
            this.setState({ sunday: false });
          }
          if (zone === 1) {
            this.setState({ monday: false });
          }
          if (zone === 2) {
            this.setState({ tuesday: false });
          }
          if (zone === 3) {
            this.setState({ wednesday: false });
          }
          if (zone === 4) {
            this.setState({ thursday: false });
          }
          if (zone === 5) {
            this.setState({ friday: false });
          }
          if (zone === 6) {
            this.setState({ saturday: false });
          }
        });
      }
    }
    if (this.props.currentUser?.email_pause.length === 7) {
      this.setState({ emailRec: false });
    }
  };

  //renderUnsubMessage = () => {
  //  if (this.props.unsubscribeMessage) {
  //    return <p style={{ color: 'green' }}>{this.props.unsubscribeMessage}</p>
  //  } else if (this.props.unsubscribeMessageError) {
  //    return <p style={{ color: 'red' }}>{this.props.unsubscribeMessageError}</p>
  //  } else {
  //    return (
  //      <div>
  //        <p><strong>Are you sure you want to unsubscribe from PTP TIPS?</strong></p>
  //        <p style={{ fontSize: 12 }}>If you Unsubscribe, you'll be Logged Out and would not be able to Log In again.</p>
  //        <p style={{ fontSize: 12 }}>If you subscribe again youll not be able to take advantage of the 14 days free trial.</p>
  //      </div>
  //    )
  //  }
  //}

  //renderUnsubButton = () => {
  //  if (this.props.unsubscribeMessage) {
  //    return <Button color="primary" onClick={() => this.closeUnsub()}>Done</Button>
  //  } else if (this.props.unsubscribeMessageError) {
  //    return <Button color="danger" onClick={() => this.handleUnsub()}>Try Again</Button>
  //  } else {
  //    return <Button color="danger" onClick={() => this.handleUnsub()}>Confirm</Button>
  //  }
  //}

  //handleConfirm = async () => {
  //  const { currentUser } = this.props;
  //  let data = {
  //    firstName: this.state.firstName,
  //    lastName: this.state.lastName,
  //    email: this.state.email,
  //    country: this.state.country,
  //    region: this.state.region,
  //    phone: this.state.phone,
  //    dob: this.state.dob,
  //    email_pause: this.state.alldays
  //  }
  //  await updateProfile(data).then((response) => {
  //    if (response.status === 200) {
  //      const { dispatch } = this.props;
  //      this.sendSelectedDays()
  //      console.log(data)
  //      dispatch(updateRedProfile(data, currentUser))
  //      this.props.history.push('/')
  //      this.setState({ popup: false })
  //    } else {
  //      alert('Error Occured, please contact customer support.')
  //      this.setState({ popup: false })
  //    }
  //  })
  //}

  subscriptionhistory = () => {
    this.props.history.push("/subscription-history");
  };

  trasactionhistory = () => {
    this.props.history.push("/transaction-history");
  };

  render() {
    return (
      <>
        <Helmet>
          <meta name="author" content="PTP TIPS"></meta>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="keywords"
            content="PTP TIPS ptptips, registration, my name, first name, last name, email, your email, address,
          region, country, phone number, free trial 6 months, Phone ,bets, australia"
          ></meta>
          <meta
            name="description"
            content="registration page log in get started 6 months free trial "
          ></meta>
        </Helmet>
        <div
          className="col-md-12"
          style={{
            marginTop: 32,
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: 32,
          }}
        >
          <h1>My Account</h1>

          <Form
            style={{ marginTop: 24 }}
            //onSubmit={(e) => this.handleSubmit(e)}
          >
            <Row>
              <Col sm={6} xs={12}>
                <FormGroup>
                  <Label
                    style={{ display: "flex", alignItems: "flex-start" }}
                    for="email"
                  >
                    First Name
                  </Label>
                  <Input
                    disabled
                    className="form-control h-auto form-control-solid py-4 px-8"
                    onChange={(val) => this.setState({ firstName: val })}
                    style={{ textAlign: "left" }}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    required
                    defaultValue={this.state.firstName}
                  />
                </FormGroup>
              </Col>

              <Col sm={6} xs={12}>
                <FormGroup>
                  <Label
                    style={{ display: "flex", alignItems: "flex-start" }}
                    for="email"
                  >
                    Last Name
                  </Label>
                  <Input
                    disabled
                    className="form-control h-auto form-control-solid py-4 px-8"
                    onChange={(val) => this.setState({ lastName: val })}
                    style={{ textAlign: "left" }}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    defaultValue={this.state.lastName}
                  />
                </FormGroup>
              </Col>

              <Col sm={6} xs={12}>
                <FormGroup>
                  <Label
                    style={{ display: "flex", alignItems: "flex-start" }}
                    for="email"
                  >
                    Email
                  </Label>
                  <Input
                    disabled
                    className="form-control h-auto form-control-solid py-4 px-8"
                    style={{ textAlign: "left" }}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    defaultValue={this.state.email}
                  />
                </FormGroup>
              </Col>

              {/* <Col sm={4} xs={12}>
              <FormGroup>
                <Label style={{ display: 'flex', alignItems: 'flex-start' }} for="dob">Year of Birth</Label>
                <Input
                  disabled
                  className="form-control h-auto form-control-solid py-4 px-8"
                  style={{ textAlign: 'left' }}
                  onChange={(val) => this.setState({ dob: val })}
                  type="number"
                  name="dob"
                  id="dob"
                  required
                  min={1900}
                  max={2005}
                  placeholder="Year of Birth"
                  defaultValue={this.state.dob} />
              </FormGroup>
            </Col> */}

              <Col sm={6} xs={12}>
                <FormGroup>
                  <Label
                    style={{ display: "flex", alignItems: "flex-start" }}
                    for="dob"
                  >
                    Auto Renewal Subscription date
                  </Label>
                  <Input
                    className="form-control h-auto form-control-solid py-4 px-8"
                    style={{ textAlign: "left", color: "red" }}
                    name="exp"
                    id="exp"
                    disabled
                    placeholder="Expiry date"
                    defaultValue={this.state.expiryDate}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label
                    style={{ display: "flex", alignItems: "flex-start" }}
                    for="email"
                  >
                    Country
                  </Label>
                  <Input
                    className="form-control h-auto form-control-solid py-4 px-8"
                    style={{ textAlign: "left" }}
                    disabled
                    placeholder="Country"
                    defaultValue={this.state.country}
                  />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label
                    style={{ display: "flex", alignItems: "flex-start" }}
                    for="email"
                  >
                    Region
                  </Label>
                  <Input
                    className="form-control h-auto form-control-solid py-4 px-8"
                    style={{ textAlign: "left" }}
                    disabled
                    placeholder="Region"
                    defaultValue={this.state.region}
                  />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <PhoneInput
                    country={"au"}
                    onChange={(phone) => this.handlePhone(phone)}
                    inputStyle={{
                      height: "40px",
                      width: "100%",
                      borderColor: "#d2d8dd",
                      textAlign: "left",
                      marginLeft: 24,
                    }}
                    inputClass="form-control h-auto form-control-solid py-4 px-8"
                    style={{ marginTop: 20, width: "100%", textAlign: "left" }}
                    value={this.state.phone}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <p className="mt-3">Click here for Subscription history:</p>
              <Col sm={2} xs={4}>
                <Button onClick={this.subscriptionhistory} color="warning" style={{minWidth: "157px"}}>
                  Subscription History
                </Button>
              </Col>

              <p className="mt-3" style={{marginLeft: "18px"}}>Click here for Trasaction history:</p>

              <Col sm={2} xs={4}>
                <Button onClick={this.trasactionhistory} color="info" style={{minWidth: "157px"}}>
                  Transaction History
                </Button>
              </Col>
            </Row>
            <p className="mt-20">
              Please <Link to={"/contactus"}>Contact Us</Link> if you wish to
              change any information
            </p>
            {/*<Col>
            <Button color="primary">Change Info</Button>
            </Col>*/}
          </Form>
          {/*<div style={{marginTop:32}}>Unsubscribe from PTP monthly Subscription Plan ? <Button onClick={() => this.openUnsub()}  color="default" style={{backgroundColor:'transparent', borderColor:'transparent',color:'red'}}>Unsubscribe</Button></div>*/}

          {/* Hadyy---------------------- */}
          <div className="row" style={{ marginTop: 30 }}>
            <div className="col-md-12">
              <div className="profileCheckBox">
                <label style={{ marginRight: 10 }}>
                  Would you like to receive email notifications when the
                  selections are generated ?{" "}
                </label>
                <input
                  id="s1"
                  type="checkbox"
                  className="switch"
                  checked={this.state.emailRec}
                  onChange={() => {
                    this.handleEmailReceive();
                  }}
                />
              </div>
            </div>
          </div>

          {this.state.emailRec === true ? (
            <div>
              <Row style={{ padding: 10 }}>
                <div className="profileCheckBox">
                  <label style={{ marginRight: 10 }}>Select the days </label>
                  <input
                    id="all"
                    type="checkbox"
                    className="switch"
                    onChange={this.onDaySelection}
                    checked={this.state.all}
                  />
                  <label style={{ marginLeft: 10 }}>All</label>
                </div>
              </Row>
              <Row>
                <Col>
                  <label>Sunday</label>
                  <div className="profileCheckBox">
                    <input
                      id="sunday"
                      type="checkbox"
                      className="switch"
                      checked={this.state.sunday}
                      onChange={this.onDaySelection}
                    />
                  </div>
                </Col>
                <Col>
                  <label>Monday</label>
                  <div className="profileCheckBox">
                    <input
                      id="monday"
                      type="checkbox"
                      className="switch"
                      checked={this.state.monday}
                      onChange={this.onDaySelection}
                    />
                  </div>
                </Col>
                <Col>
                  <label>Tuesday</label>
                  <div className="profileCheckBox">
                    <input
                      id="tuesday"
                      type="checkbox"
                      className="switch"
                      checked={this.state.tuesday}
                      onChange={this.onDaySelection}
                    />
                  </div>
                </Col>
                <Col>
                  <label>Wednesday</label>
                  <div className="profileCheckBox">
                    <input
                      id="wednesday"
                      type="checkbox"
                      className="switch"
                      checked={this.state.wednesday}
                      onChange={this.onDaySelection}
                    />
                  </div>
                </Col>
                <Col>
                  <label>Thursday</label>
                  <div className="profileCheckBox">
                    <input
                      id="thursday"
                      type="checkbox"
                      className="switch"
                      checked={this.state.thursday}
                      onChange={this.onDaySelection}
                    />
                  </div>
                </Col>
                <Col>
                  <label>Friday</label>
                  <div className="profileCheckBox">
                    <input
                      id="friday"
                      type="checkbox"
                      className="switch"
                      checked={this.state.friday}
                      onChange={this.onDaySelection}
                    />
                  </div>
                </Col>
                <Col>
                  <label>Saturday</label>
                  <div className="profileCheckBox">
                    <input
                      id="saturday"
                      type="checkbox"
                      className="switch"
                      checked={this.state.saturday}
                      onChange={this.onDaySelection}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            ""
          )}

          <Row>
            <Col>
              <Button onClick={this.handleUpdatePauseEmail} color="primary">
                Confirm Change
              </Button>
            </Col>
          </Row>

          {/* END Hady -------------- */}

          {/*<Modal size="sm" isOpen={this.state.popup} toggle={this.closeModal}>
          <ModalHeader toggle={this.closeModal}>Confirm Update</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to update your profile</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.closeModal()}>Cancel</Button>
            <Button color="primary" onClick={() => this.handleConfirm()}>Confirm</Button>
          </ModalFooter>
        </Modal>*/}

          <Modal size="sm" isOpen={this.state.notice} toggle={this.closeNotice}>
            <ModalHeader toggle={this.closeNotice}>Notice</ModalHeader>
            <ModalBody>
              <p style={{ fontSize: 14 }}>{this.state.message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.closeNotice}>
                Ok
              </Button>
            </ModalFooter>
          </Modal>

          {/*<Modal size="sm" isOpen={this.state.unsub} toggle={this.closeUnsub}>
          <ModalHeader toggle={this.closeModal}>Confirm Unsubscribe</ModalHeader>
          <ModalBody>
            {this.renderUnsubMessage()}
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={() => this.closeUnsub()}>Cancel</Button>
            {this.renderUnsubButton()}
          </ModalFooter>
        </Modal>*/}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  unsubscribeMessageError: state.auth.unsubscribeMessageError,
  unsubscribeMessage: state.auth.unsubscribeMessage,
});

export default withRouter(connect(mapStateToProps)(AccountForm));
