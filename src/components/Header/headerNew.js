import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { search } from "../../config/config";
import {
  faWindowClose,
  faStar,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
// import { socket } from "../../config/config";
// import sps from '../image/sps.jpg';

import "./header.scoped.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  // ModalHeader,
  ModalBody,
  // ModalFooter,
} from "reactstrap";

import Sidebar from "react-sidebar";

import Close from "react-ionicons/lib/MdClose";
// import { DropdownHeader } from 'semantic-ui-react';
import Auth from "./components/auth";
import User from "./components/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHorseHead, faPoll } from "@fortawesome/free-solid-svg-icons";
// import ReactSearchBox from 'react-search-box'
import { Search } from "semantic-ui-react";
import _ from "lodash";
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from "reactjs-bottom-navigation";
import "reactjs-bottom-navigation/dist/index.css";

import HomeIcon from "react-ionicons/lib/IosHome";
import SearchIcon from "react-ionicons/lib/IosSearch";
// import Bell from 'react-ionicons/lib/IosNotifications'
import CloseIcon from "react-ionicons/lib/IosClose";

const categoryLayoutRenderer = ({ categoryContent, resultsContent }) =>
  resultsContent && (
    <div style={{ display: "flex", padding: 0 }}>
      <div className="name" style={{ padding: 10, width: "20%" }}>
        {categoryContent}
      </div>
      <div className="results" style={{ padding: "0 !important", margin: 0 }}>
        {resultsContent?.map((zone) => {
          return (
            <Link key={`${zone.key}`} to={zone.key}>
              {zone}
            </Link>
          );
        })}
      </div>
    </div>
  );

const authActions = require("../../redux/actions/auth");

const Header = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDrop, setUserDrop] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [value, setValue] = useState("Search Horses, Jockeys, Venues or Races");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [notificationOpen, setNotificationOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  // const [gotowebsitePopup, setgotowebsitePopup] = useState(false);
  // const idleTimer = null;

  const closeModal = () => {
    setRegisterPopup(false);
  };

  // const closeModal1 = () => {
  //   setgotowebsitePopup(false);
  // };

  const onSetSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  // const handleOnIdle = (event) => {
  // console.log(event)
  // console.log('user is idle or no action detected after timeout')
  // if (document.hidden) {
  //   socket.emit('userInactive', event)
  // }
  // };

  // const handleOnActive = (event) => {
  //   // console.log(event)
  //   const { dispatch } = props;
  //   // console.log(dispatch)
  //   //socket.emit('userBackActive', event.type)
  //   dispatch(selectionsAction.getLastTenNoReload(props.showLastNR));
  //   dispatch(selectionsAction.getNextTenNoReload(props.showNextNR));
  //   // console.log(props.showLastNR)
  //   // console.log(props.showNextNR)
  // };

  // const handleOnAction = (event) => {
  //   const { dispatch } = props;
  //   // console.log(event);
  //   // if (event.type === "visibilitychange") {
  //   //   if (!document.hidden) {
  //   //     // console.log("tessst")
  //   //     // console.log("Welcommmmmme backkkkkkkk");
  //   //     socket.emit("userBackActive", event);
  //   //   } else {
  //   //     socket.emit("userInactive", event);
  //   //   }
  //   // }
  //   dispatch(selectionsAction.getLastTenNoReload(props.showLastNR));
  //   dispatch(selectionsAction.getNextTenNoReload(props.showNextNR));
  // };

  const handleNavTabChyange = (val) => {
    const { dispatch } = props;
    dispatch(authActions.changeNavTab(val));

    if (val === 0) {
      props.history.push("/");
    } else if (val === 1) {
      props.history.push("/horse-racing-tips/today");
    } else if (val === 2) {
      props.history.push("/horse-racing-tips/results/today");
    } else if (val === 3) {
      onSetSidebarOpen();
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log(props.rOpen);
      if (!props.isLoggedIn) {
        if (props.history.location.pathname !== "/register") {
          setRegisterPopup(true);
        }
      }
    }, 30 * 2 * 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isLoggedIn]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log(props.history.location.pathname);
  //     if (!props.isLoggedIn) {
  //       if (props.history.location.pathname !== "/register") {
  //         setgotowebsitePopup(true);
  //       }
  //     }
  //   }, 60 * 2 * 1000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [props.isLoggedIn]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleLoadedTab();

    // socket.on("WELCOME", function (id) {

    //   try {
    //     let ClId = props.currentUser.id

    //     let token = localStorage.getItem("PTPToken");
    //     if (token) {
    //       let ClId = props.currentUser.id
    //       let tok = JSON.parse(token);
    //       let data = { user: tok.id, tabHidden: document.hidden, ClId: ClId };
    //       console.log(data)

    //       socket.emit("connected", data);
    //     } else {
    //       let visitor = localStorage.getItem("PTPVisitor");
    //       if (visitor) {
    //         let ClId = props.currentUser.id

    //         let dataV = { user: visitor, tabHidden: document.hidden, ClId: ClId };
    //         console.log(dataV)
    //         socket.emit("connected", dataV);
    //       } else {
    //         console.log("visitor+id")
    //         let ClId = props.currentUser.id

    //         localStorage.setItem("PTPVisitor", id);
    //         let dataI = { user: id, tabHidden: document.hidden, ClId: ClId };
    //         socket.emit("connected", dataI);
    //       }
    //     }
    //   } catch (error) {
    //     console.log("sckt err " + error);
    //   }
    // });
    // youssef
    // socket.on("WELCOME", function (id) {
    //   // console.log(id)
    //   let isLoggedIn = props.isLoggedIn;
    //   // console.log(isLoggedIn)

    //   try {
    //     if (isLoggedIn) {

    //       let ClId = props.currentUser.id
    //       let data = {
    //         user: ClId,
    //         tabHidden: document.hidden
    //       }
    //       // console.log("client", data)
    //       socket.emit("connected", data)

    //     } else {
    //       var visitor = localStorage.getItem("PTPVisitor");
    //       if (visitor) {
    //         let data = {
    //           user: visitor,
    //           tabHidden: document.hidden

    //         }
    //         // console.log("visitor", data)

    //         socket.emit("connected", data)
    //       } else {
    //         // console.log("New visitor")

    //         localStorage.setItem("PTPVisitor", id);
    //         let data = { user: id, tabHidden: document.hidden };
    //         socket.emit("connected", data);
    //       }
    //     }

    //   } catch (error) {

    //     console.log("sckt err " + error);
    //   }
    // })

    //   try {
    //     let token = localStorage.getItem("PTPToken");
    //     // console.log(token)
    //     if (token) {

    //       let tok = JSON.parse(token);
    //       // console.log(tok)
    //       let data = { user: tok.id, tabHidden: document.hidden };
    //       // console.log(data)

    //       socket.emit("connected", data);
    //       // console.log(data)
    //     } else {
    //       let visitor = localStorage.getItem("PTPVisitor");
    //       if (visitor) {
    //         let dataV = { user: visitor, tabHidden: document.hidden };
    //         // console.log(dataV)
    //         socket.emit("connected", dataV);
    //       } else {
    //         // console.log("visitor+id")
    //         localStorage.setItem("PTPVisitor", id);
    //         let dataI = { user: id, tabHidden: document.hidden };
    //         // console.log("V+id " + dataI)
    //         socket.emit("connected", dataI);
    //       }
    //     }
    //   } catch (error) {
    //     // console.log("sckt err " + error);
    //   }
    // });

    // }
    // else {
    //   console.log("not visitor")
    //   localStorage.setItem("PTPVisitor", id)
    //   let dataNv = { user: id, tabHidden: document.hidden, ClId: ClId };
    //   console.lof(dataNv)
    //   socket.emit("connected", dataNv);
    // }

    // youssef
    return () => {
      setSidebarOpen(false);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // async pay(stripe, elements){
  //   setState({loadingPayment: true})

  //   if (!stripe || !elements) {
  //     setState({loadingPayment : false})
  //     return;
  //   }

  //   const cardElement = elements.getElement(CardCvcElement)
  //   const result = await stripe.createToken(cardElement)
  //   if (result.error) {
  //     return setState({cardMessage: result.error.message, loadingPayment: false})
  //   }else{
  //     console.log(result.token)
  //     setState({cardMessage: '', loadingPayment: false})
  //       //let userDetails = {
  //       //    userId: props.currentUser.client_id,
  //       //    plan: plan,
  //       //    card: result.token,
  //       //}
  //       //await registerStep3(userDetails).then((response)=>{
  //       //    if(response.status === 200){
  //       //        setState({loading: false})
  //       //        if(response.subscription){
  //       //            console.log(response.subscription)
  //       //        }
  //       //        dispatch(updateActiveStep())
  //       //        dispatch(signInAfterRegistration(response.response))
  //       //        props.history.push('/')
  //       //    }else{
  //       //        setState({loading: false, message: response.message})
  //       //    }
  //       //}).catch(err =>{
  //       //    setState({notice: true, noticeMessage: 'Error please try again or contact customer support.', loading: false})
  //       //    setState({loading: false})
  //       //})
  //   }
  // }

  const toggleUser = () => {
    setUserDrop(!userDrop);
  };

  // const toggleNotification = () => {
  //     setNotificationOpen(!notificationOpen)
  // }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const logout = () => {
    const { dispatch, currentUser } = props;
    dispatch(authActions.logoutUser(currentUser.email));
    // localStorage.removeItem{""};
    // setState({ isOpen: false })
    props.history.push("/horse-racing-tips/today");
  };

  const handleSearchChange = async (e, { value }) => {
    setValue(value);
    let length = value.length;
    // setState({ isLoading: true, value })
    if (length > 1) {
      setIsLoading(true);
      await search(value).then((res) => {
        setSearchResult(res);
        setIsLoading(false);
      });
    }
  };

  const goRegister = () => {
    setRegisterPopup(false);
    props.history.push("/register");
  };

  // const goToSPS = () => {
  //   setgotowebsitePopup(false);
  //   // window.location.href = "//spstips.com.au/contactUs";
  //   window.open("https://spstips.com.au/contactUs", "_blank");
  // };

  const renderNav = () => {
    return (
      <Navbar
        color="red"
        dark
        expand="md"
        style={{
          zIndex: 999,
          height: 50,
          backgroundColor: "#142841",
          Color: "white",
          paddingLeft: "11%",
          paddingRight: "11%",
        }}
      >
        <NavbarBrand href="/">
          <img
            alt="Logo"
            src="../../favicon.png"
            width="40px"
            className="logo-default max-h-40px"
          />
        </NavbarBrand>
        <NavbarToggler />
        <Collapse isOpen={false} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem style={{ fontWeight: "600" }}>
              <Link to={`/horse-racing-tips/today`} className="linknav">
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Selections{" "}
                  <FontAwesomeIcon
                    style={{ fontSize: "14px", marginBottom: "1px" }}
                    icon={faHorseHead}
                    size="1x"
                  />
                </span>
              </Link>
            </NavItem>

            <NavItem style={{ marginLeft: 12, fontWeight: "600" }}>
              <Link to={`/horse-racing-tips/results/today`} className="linknav">
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Results{" "}
                  <FontAwesomeIcon
                    style={{ fontSize: "16px" }}
                    icon={faPoll}
                    size="1x"
                  />
                  {/* <ImStatsBars size={19} style={{ marginBottom: "6px" }} /> */}
                </span>
              </Link>
            </NavItem>

            <NavItem style={{ marginLeft: 12, fontWeight: "600" }}>
              <Link to={`/pro-tips`} className="linknav">
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Pro Tips{" "}
                  <FontAwesomeIcon
                    style={{ fontSize: "16px" }}
                    icon={faStar}
                    size="1x"
                  />
                </span>
              </Link>
            </NavItem>

            <NavItem style={{ marginLeft: 12, fontWeight: "600" }}>
              <Link to={`/bookmakers`} className="linknav">
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Bookmakers{" "}
                  <FontAwesomeIcon
                    style={{ fontSize: "16px" }}
                    icon={faBookmark}
                    size="1x"
                  />
                </span>
              </Link>
            </NavItem>

            {/* <NavItem style={{ marginLeft: 12, fontWeight: "600" }}>
              <Link to={`/horse-racing-tips/01-11-2022/Flemington/R7/50886`} className="linknav">
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  {" "}Melbourne Cup{" "}
                  <FontAwesomeIcon
                  style={{ fontSize: "16px", color: "gold" }}
                  icon={faTrophy}
                  size="1x"
                />
                </span>
              </Link>
            </NavItem> */}

            {/* {props.currentUser ? <NavItem style={{ marginLeft: 32, fontWeight: '600' }}>
                            <Link to={`/horse-racing-tips/now`}>
                                <span style={{ fontFamily: 'Poppins', fontSize: 16, color: 'white' }}>On Now</span>
                            </Link>
                        </NavItem> : null} */}

            {/* <NavItem style={{ marginLeft: 32, fontWeight: '600' }}>
                            <Link to={`/mapcomp`}>
                                <span style={{ fontFamily: 'Poppins', fontSize: 16, color: 'white' }}>Maps Comp.</span>
                            </Link>
                        </NavItem> */}

            {/* <NavItem style={{ marginLeft: 32, fontWeight: '600' }}>
                            <Link to={`/faq`}>
                                <span style={{ fontFamily: 'Poppins', fontSize: 16, color: 'white' }}>FAQ</span>
                            </Link>
                        </NavItem>

                        <NavItem style={{ marginLeft: 32, fontWeight: '600' }}>
                            <Link to={`/contact`}>
                                <span style={{ fontFamily: 'Poppins', fontSize: 16, color: 'white' }}>Contact</span>
                            </Link>
                        </NavItem> */}
          </Nav>

          <Search
            className="trial"
            category
            categoryLayoutRenderer={categoryLayoutRenderer}
            loading={isLoading}
            onResultSelect={(e, data) => {
              props.history.push(data.result.route);
              setValue("");
            }}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true,
            })}
            results={searchResult}
            value={value}
            onFocus={() => {
              setValue("");
            }}
            onBlur={() => {
              setValue("Search Horses, Jockeys, Venues or Races");
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.currentUser ? <User /> : <Auth />}
          </div>
          <button
            class="btn btn-danger    
    "
            onClick={() => props.history.push("/stripe-payment")}
          >
            Subscription
          </button>
        </Collapse>
      </Navbar>
    );
  };

  const renderTablet = () => {
    return (
      <>
        <Navbar
          color="red"
          dark
          expand="md"
          style={{
            zIndex: 999,
            height: 60,
            backgroundColor: "#142841",
            Color: "white",
            paddingLeft: "4%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to={"/"}>
            {/* {props.headerLogo ?
                            <div className="logo-default max-h-40px" style={{ color: 'white', maxWidth: 21, fontSize: 16, }}>{props.headerLogo}</div>
                            : */}
            <img
              alt="Logo"
              src="../../favicon.png"
              width="40px"
              className="logo-default max-h-80px"
              style={{ position: "fixed", top: "10px", left: "3px" }}
            />
          </Link>

          {props.currentUser ? (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  height: 40,
                  marginRight: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {!searchOpen ? (
                  <SearchIcon
                    onClick={toggleSearch}
                    style={{ marginRight: 8 }}
                    color="white"
                    fontSize="24"
                  />
                ) : (
                  <div
                    style={{
                      backgroundColor: "#142841",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <Search
                      category
                      categoryLayoutRenderer={categoryLayoutRenderer}
                      loading={isLoading}
                      onResultSelect={(e, data) => {
                        e.preventDefault();
                        props.history.push(data.result.route);
                        setValue(data.result.title);
                      }}
                      onSearchChange={_.debounce(handleSearchChange, 500, {
                        leading: true,
                      })}
                      results={searchResult}
                      value={value}
                      onFocus={() => {
                        setValue("");
                      }}
                      onBlur={() => {
                        setValue("Search Horses, Jockeys, Venues or Races");
                      }}
                    />
                    <CloseIcon
                      onClick={toggleSearch}
                      color="white"
                      fontSize="28"
                    />
                  </div>
                )}

                {/* <Dropdown isOpen={notificationOpen} style={{ backgroundColor: 'transparent', zIndex: 1 }} toggle={toggleNotification}>
                                        <DropdownToggle>
                                            <Bell color="white" fontSize='24' />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div style={{ backgroundColor: 'white', width: '100%', height: 300 }}>
                                                <strong>Hello World</strong>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown> */}
              </div>

              <Dropdown
                isOpen={userDrop}
                style={{ backgroundColor: "transparent" }}
                toggle={toggleUser}
              >
                <DropdownToggle>
                  <div
                    style={{
                      backgroundColor: "#334157",
                      padding: 6,
                      paddingRight: 12,
                      paddingLeft: 12,
                      borderRadius: 4,
                    }}
                  >
                    <strong
                      style={{ fontSize: 16, color: "white", fontWeight: 300 }}
                    >
                      {props.currentUser?.firstName.charAt(0)}
                    </strong>
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                  <div style={{ padding: 16 }}>
                    <h3>
                      {props.currentUser?.firstName +
                        " " +
                        props.currentUser?.lastName}
                    </h3>
                  </div>
                  <DropdownItem>
                    <Link to={"/account"}>My Profile</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={"/blackbook"}>My Blackbook</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={"/pro-tips"}>Pro Tips</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={"/bookmakers"}>Bookmakers</Link>
                  </DropdownItem>
                  <DropdownItem onClick={logout}>Log Out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                padding: 0,
                margin: 0,
              }}
            >
              {!searchOpen ? (
                <SearchIcon
                  onClick={toggleSearch}
                  style={{ marginRight: 8 }}
                  color="white"
                  fontSize="24"
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <Search
                    category
                    categoryLayoutRenderer={categoryLayoutRenderer}
                    loading={isLoading}
                    onResultSelect={(e, data) => {
                      e.preventDefault();
                      props.history.push(data.result.route);
                      setValue(data.result.title);
                    }}
                    onSearchChange={_.debounce(handleSearchChange, 500, {
                      leading: true,
                    })}
                    results={searchResult}
                    value={value}
                    onFocus={() => {
                      setValue("");
                    }}
                    onBlur={() => {
                      setValue("Search Horses, Jockeys, Venues or Races");
                    }}
                  />
                  <CloseIcon
                    onClick={toggleSearch}
                    color="white"
                    fontSize="28"
                  />
                </div>
              )}
              <Button
                color="primary"
                style={{
                  height: 30,
                  width: "auto",
                  justifyContent: "center",
                  paddingTop: 3,
                  paddinBottom: 3,
                  paddingLeft: 8,
                  paddingRight: 8,
                }}
                onClick={() => props.history.push("/register")}
              >
                Register
              </Button>
              <span
                style={{
                  height: 25,
                  color: "white",
                  marginLeft: 8,
                  marginRight: 8,
                  opacity: "70%",
                }}
              >
                {" "}
                |{" "}
              </span>
              <Button
                color="light"
                style={{
                  height: 30,
                  justifyContent: "center",
                  paddingTop: 3,
                  paddinBottom: 3,
                  paddingLeft: 8,
                  paddingRight: 8,
                  color: "#142841",
                }}
                onClick={() => props.history.push("/login")}
              >
                Log In
              </Button>
            </div>
          )}
        </Navbar>
      </>
    );
  };

  const renderHeader = () => {
    if (innerWidth >= 1200) {
      return renderNav();
    } else {
      return renderTablet();
    }
  };

  const renderSideBar = () => {
    return (
      <div style={{ width: innerWidth * 0.4, padding: 10 }}>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col>
            <NavbarBrand
              href="/"
              style={{
                marginLeft: 8,
              }}
            >
              <img
                alt="Logo"
                src="../../favicon.png"
                width="40px"
                className="logo-default max-h-40px"
              />
            </NavbarBrand>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: 16,
            }}
          >
            <Close
              fontSize={"30"}
              color="white"
              style={{ cursor: "pointer", opacity: "50%" }}
              onClick={() => onSetSidebarOpen(false)}
            />
          </Col>
        </Row>
        <div style={{ padding: 16, color: "white" }}>
          <Link to={"/"} onClick={() => onSetSidebarOpen(false)}>
            <h1
              style={{
                fontSize: 16,
                marginTop: 20,
                color: "white",
                fontWeight: 400,
              }}
            >
              Home
            </h1>
          </Link>

          <Link
            to={"/horse-racing-tips/today"}
            onClick={() => onSetSidebarOpen(false)}
          >
            <h1
              style={{
                fontSize: 16,
                marginTop: 20,
                color: "white",
                fontWeight: 400,
              }}
            >
              Selection
            </h1>
          </Link>

          <Link
            to={"/horse-racing-tips/results/today"}
            onClick={() => onSetSidebarOpen(false)}
          >
            <h1
              style={{
                fontSize: 16,
                marginTop: 20,
                color: "white",
                fontWeight: 400,
              }}
            >
              Results
            </h1>
          </Link>

          <Link to={"/pro-tips"} onClick={() => onSetSidebarOpen(false)}>
            <h1
              style={{
                fontSize: 16,
                marginTop: 20,
                color: "white",
                fontWeight: 400,
              }}
            >
              Pro Tips
            </h1>
          </Link>

          <Link to={"/bookmakers"} onClick={() => onSetSidebarOpen(false)}>
            <h1
              style={{
                fontSize: 16,
                marginTop: 20,
                color: "white",
                fontWeight: 400,
              }}
            >
              Bookmakers
            </h1>
          </Link>
          {/* <Link
            to={"/horse-racing-tips/01-11-2022/Flemington/R7/50886"}
            onClick={() => onSetSidebarOpen(false)}
          >
            <h1
              style={{
                fontSize: 16,
                marginTop: 20,
                color: "white",
                fontWeight: 400,
              }}
            >
              Melbourne Cup
            </h1>
          </Link> */}

          {/* {props.currentUser ? <Link to={'/horse-racing-tips/now'} onClick={() => onSetSidebarOpen(false)}>
                        <h1 style={{ fontSize: 16, marginTop: 20, color: 'white', fontWeight: 400 }}>On Now</h1>
                    </Link> : null} */}
          {/* <Link to={'/mapcomp'} onClick={() => onSetSidebarOpen(false)}>
                        <h1 style={{ fontSize: 16, marginTop: 20, color: 'white', fontWeight: 400 }}>Map Comp.</h1>
                    </Link> */}

          {props.currentUser ? (
            <Link to={"/account"} onClick={() => onSetSidebarOpen(false)}>
              <h1
                style={{
                  fontSize: 16,
                  marginTop: 20,
                  color: "white",
                  fontWeight: 400,
                }}
              >
                Profile
              </h1>
            </Link>
          ) : null}
          {props.currentUser ? (
            <Link to={"/blackbook"} onClick={() => onSetSidebarOpen(false)}>
              <h1
                style={{
                  fontSize: 16,
                  marginTop: 20,
                  color: "white",
                  fontWeight: 400,
                }}
              >
                My Blackbook
              </h1>
            </Link>
          ) : null}

          <Link to={"/faq"} onClick={() => onSetSidebarOpen(false)}>
            <h1
              style={{
                fontSize: 16,
                marginTop: 20,
                color: "white",
                fontWeight: 400,
              }}
            >
              FAQ
            </h1>
          </Link>
          <Link to={"/contact"} onClick={() => onSetSidebarOpen(false)}>
            <h1
              style={{
                fontSize: 16,
                marginTop: 20,
                color: "white",
                fontWeight: 400,
              }}
            >
              Contact
            </h1>
          </Link>
        </div>
      </div>
    );
  };

  const handleLoadedTab = () => {
    if (
      props.history?.location?.pathname?.split("/").length > 0 &&
      props.history?.location?.pathname?.split("/")[1] === ""
    ) {
      // set default value to 0
      props.dispatch(authActions.changeNavTab(0));
    } else if (
      props.history?.location?.pathname?.split("/").length > 0 &&
      props.history?.location?.pathname?.split("/")[2] === "results"
    ) {
      // set value to 2
      props.dispatch(authActions.changeNavTab(2));
    } else if (
      props.history?.location?.pathname?.split("/").length > 0 &&
      props.history?.location?.pathname?.split("/")[1] === "tips"
    ) {
      // set value to 1
      props.dispatch(authActions.changeNavTab(1));
    } else {
      // set value to 3
      props.dispatch(authActions.changeNavTab(3));
    }
  };

  const bottomNavItems = [
    {
      title: "Home",
      icon: <HomeIcon fontSize="24" color="grey" />,
      activeIcon: <HomeIcon color="white" fontSize="24" />,
    },

    {
      title: "Tips",
      icon: (
        <FontAwesomeIcon
          icon={faHorseHead}
          size="2x"
          style={{ width: 14 }}
          color="grey"
        />
      ),
      activeIcon: (
        <FontAwesomeIcon
          icon={faHorseHead}
          size="2x"
          style={{ width: 14 }}
          color="white"
        />
      ),
    },
    // {
    //   title: "Melbourne Cup",
    //   icon: (
    //     <FontAwesomeIcon
    //       icon={faTrophy}
    //       size="2x"
    //       style={{ width: 14 }}
    //       color="gold"
    //     />
    //   ),
    //   activeIcon: (
    //     <FontAwesomeIcon
    //       icon={faTrophy}
    //       size="2x"
    //       style={{ width: 14 }}
    //       color="gold"
    //     />
    //   ),
    // },
    {
      title: "Results",
      icon: (
        <FontAwesomeIcon
          icon={faPoll}
          size="2x"
          style={{ width: 14 }}
          color="grey"
        />
      ),
      activeIcon: (
        <FontAwesomeIcon
          icon={faPoll}
          size="2x"
          style={{ width: 14 }}
          color="white"
        />
      ),
    },

    {
      title: "Menu",
      icon: (
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          style={{ width: 14 }}
          color="grey"
        />
      ),
      activeIcon: (
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          style={{ width: 14 }}
          color="white"
        />
      ),
    },
  ];

  return (
    <div style={{ height: sidebarOpen ? "100vh" : "auto" }}>
      {/* <IdleTimer
        // ref={ref => { idleTimer = ref }}
        timeout={1000 * 60 * 10}
        onActive={handleOnActive}
        onIdle={handleOnIdle}
        onAction={handleOnAction}
        debounce={250}
      /> */}
      <Sidebar
        children={""}
        sidebar={renderSideBar()}
        open={sidebarOpen}
        onSetOpen={onSetSidebarOpen}
        styles={{
          sidebar: {
            borderRadius: "20px",
            background: "#142841",
            height: "50%",
            marginTop: "auto",
            marginBottom: "auto",
            overflowY: "hidden",
            overflowX: "hidden",
          },
        }}
        pullRight
      ></Sidebar>
      {renderHeader()}
      {/* {window.innerWidth < 700 ? <BottomNavigation
                    value={props.navTab}
                    style={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 1, fontFamily: 'Poppins', backgroundColor: '#142841' }}
                    onChange={(event, newValue) => {
                        handleNavTabChyange(newValue)
                    }}
                    showLabels
                >
                    <BottomNavigationAction style={{ color: 'white', fontSize: 32 }} label="Home" icon={<HomeIcon color="white" fontSize='24' />} />
                    <BottomNavigationAction style={{ color: 'white', fontSize: 32 }} label="Tips" icon={<FontAwesomeIcon icon={faHorseHead} size="2x" style={{ width: 14 }} />} />
                    <BottomNavigationAction style={{ color: 'white', fontSize: 32 }} label="Results" icon={<FontAwesomeIcon icon={faPoll} size="2x" style={{ width: 14 }} />} />
                    <BottomNavigationAction style={{ color: 'white', fontSize: 32 }} label="Menu" icon={<FontAwesomeIcon icon={faBars} size="2x" style={{ width: 14 }} />} />
                </BottomNavigation> : null} */}

      {window.innerWidth < 1200 ? (
        <BottomNavigation
          items={bottomNavItems}
          // defaultSelected={props.navTab}
          onItemClick={(item) => handleNavTabChyange(item.id)}
        />
      ) : null}
      {}
      <Modal
        size="m"
        centered
        isOpen={registerPopup}
        toggle={() => closeModal()}
      >
        <ModalBody style={{ padding: 0 }}>
          <div
            className="signup_box"
            style={{
              overflowY: "hidden",
              height: "180px",
              borderRadius: 4,
              backgroundSize: "cover",
              position: "relative",
            }}
          >
            <div
              style={{ position: "absolute", right: 4, top: 2 }}
              onClick={() => closeModal()}
            >
              <FontAwesomeIcon icon={faWindowClose} size="1x" color={"white"} />
            </div>
            <div>
              <img
                src="https://www.ptptips.com.au/favicon.png"
                alt=""
                width="48px"
                height="48px"
              />
            </div>
            <div>
              {" "}
              <p
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins",
                  color: "white",
                  marginBottom: 8,
                  lineHeight: 1.4,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Join PTP TIPS Now and Receive
                <br /> a {props.subscription} FREE trial.
              </p>
            </div>
            <Button
              size="sm"
              color="primary"
              onClick={() => {
                goRegister();
              }}
              style={{ display: "flex", alignSelf: "center", marginTop: 16 }}
            >
              <strong>Get Started</strong>
            </Button>
          </div>
        </ModalBody>
      </Modal>
      {/* <Modal

        size="m"
        centered
        isOpen={gotowebsitePopup}
        toggle={() => closeModal1()}
      >
        <ModalBody style={{ padding: 0 }}>
          <div

            className="sps_box"
            style={{
              backgroundImage:`url(${sps})`,
              overflowY: "hidden",
              height: "250px",
              borderRadius: 4,
              backgroundSize: "cover",
              position: "relative",
            }}
          >
            <div
              style={{ position: "absolute", right: 4, top: 2 }}
              onClick={() => closeModal1()}
            >
              <FontAwesomeIcon icon={faWindowClose} size="1x" color={"white"} />
            </div>
            <Button
              size="sm"
              color="primary"
              onClick={() => {
                goToSPS();
              }}
              style={{
                position: "absolute",
                marginLeft: "-50px",
                left: "70%",
                width: "100px",
                bottom: "1px",
              }}
            >
              <strong>Learn more</strong>
            </Button>
          </div>
        </ModalBody>
      </Modal> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  isLoggedIn: state.auth.isLoggedIn,
  clientSession: state.auth.clientSession,
  errorStatus: state.auth.errorStatus,
  navTab: state.auth.navTab,
  headerLogo: state.auth.headerLogo,
  showLastNR: state.selectionReducer.showLastNR,
  showNextNR: state.selectionReducer.showNextNR,
  rOpen: state.auth.rOpen,
});

export default withRouter(connect(mapStateToProps)(Header));
