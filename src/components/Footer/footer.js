import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
// import {FiFacebook,FiInstagram,FiTwitter} from "react-icons/fi"
// import {FaSitemap,FaQuestion} from "react-icons/fa"
// import {HiOutlineMail} from "react-icons/hi"
// import {RiContactsFill} from "react-icons/ri"

class Footer extends React.Component {
  navigator() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="Page">
        <div
          className="footer kt-grid__item bgi-position-center-center bgi-size-cover bgi-no-cover"
          id="kt_footer"
          style={{ backgroundColor: "#142841" }}
        >
          <div className="container py-8">
            <div className="row">
              <div className="col-lg-12 my-lg-0 my-5">
                <h3 className="text-white pb-3">About Us</h3>
                <p
                  className="m- text-white opacity-45"
                  style={{ textAlign: "justify", fontSize: "13px" }}
                >
                  Making Money On Horse Races Is Something That Everyone Would
                  Love To Do, But Few People Have The Knowledge Or The Time To
                  Devote To Doing It Properly. At Past The Post We Provide You
                  With Ratings On Every Horse With Racing Form In Australia On A
                  Daily Basis.
                </p>
                <ul></ul>
              </div>

              <div className="col-lg-6 my-lg-0 my-10">
                <h3 className="text-white pb-1">Quick Links</h3>
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column mr-18">
                    <Link
                      to="/faq"
                      className="text-white opacity-55 text-hover-primary"
                      onClick={() => {
                        this.navigator();
                      }}
                    >
                      FAQ
                      {/* <FaQuestion  style={{fontSize:"20px"}}/> */}
                    </Link>
                    <ul></ul>
                    {/* <a href="/definition" className="py-2 text-white opacity-55 text-hover-primary" onClick={() => { this.navigator() }}>Definitions</a> */}
                    <Link
                      to="/contactus"
                      className="text-white opacity-50 text-hover-primary"
                      onClick={() => {
                        this.navigator();
                      }}
                    >
                      Contact Us
                      {/* <RiContactsFill  style={{fontSize:"20px"}}/> */}
                    </Link>
                    <ul></ul>
                    <Link
                      to="/sitemap"
                      className="text-white opacity-50 text-hover-primary"
                      onClick={() => {
                        this.navigator();
                      }}
                    >
                      SiteMap
                      {/* <FaSitemap style={{fontSize:"18px"}}/> */}
                    </Link>
                  </div>
                  <div className="d-flex flex-column">
                    <a
                      href="https://www.facebook.com/PTPTIPSAU/"
                      className="text-white opacity-55 text-hover-primary"
                      target="blank"
                    >
                      Facebook
                      {/* <FiFacebook style={{fontSize:"18px", marginTop:"9px"}}/> */}
                    </a>
                    <ul></ul>
                    <a
                      href="https://www.instagram.com/ptptips/"
                      className="py-2 text-white opacity-55 text-hover-primary"
                      target="blank"
                    >
                      Instagram
                      {/* <FiInstagram  style={{fontSize:"18px",marginBottom:"10px"}}/> */}
                    </a>
                    <ul></ul>
                    <a
                      href="https://twitter.com/PTPTIPS"
                      className="text-white opacity-55 text-hover-primary"
                      target="blank"
                    >
                      Twitter
                      {/* <FiTwitter  style={{fontSize:"18px", marginTop:"-25px"}}/> */}
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 my-lg-0 my-10">
                <h3 className="text-white pb-1">Horse Racing Tips</h3>
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column mr-18">
                    <a
                      href="https://www.ptptips.com.au/horse-racing-tips/today"
                      className="text-white opacity-55 text-hover-primary"
                    >
                      Today's Tips
                    </a>

                    <a
                      href="https://www.ptptips.com.au/horse-racing-tips/tomorrow"
                      className="text-white opacity-50 text-hover-primary"
                    >
                      Tomorrow's Tips
                    </a>

                    <a
                      href="https://www.ptptips.com.au/horse-racing-tips/yesterday"
                      className="text-white opacity-50 text-hover-primary"
                    >
                      Yesterday's Tips
                    </a>
                  </div>
                </div>
                <h3 className="text-white pb-1" style={{ marginTop: 5 }}>
                  Horse Racing Results{" "}
                </h3>
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column mr-18">
                    <a
                      href="https://www.ptptips.com.au/horse-racing-tips/results/today"
                      className="text-white opacity-55 text-hover-primary"
                    >
                      Today's Results
                    </a>

                    <a
                      href="https://www.ptptips.com.au/horse-racing-tips/results/yesterday"
                      className="text-white opacity-50 text-hover-primary"
                    >
                      Yesterday's Results
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 my-lg-0 my-5">
                <h3 className="text-white pb-3">Get In Touch </h3>
                <div className="d-flex flex-column">
                  {/* <p className="py-2 text-white opacity-55 text-hover-primary">2417 QLD AUSTRALIA</p> */}
                  <p className="text-white opacity-55 text-hover-primary">
                    <strong>E-mail: </strong>
                    <a
                      style={{ color: "#44bd32" }}
                      href="mailto:support@ptptips.com.au"
                    >
                      support@ptptips.com.au
                    </a>
                  </p>
                </div>
                {/*<form className="rounded" style={{backgroundColor: 'rgba(0,0,0,.2)',marginTop:16}}>
                    <div className="input-group p-2 align-items-center">
                      <input type="text" className="form-control rounded-right border-0 bg-transparent text-white opacity-80" placeholder="Enter Your Email" />
                      <div className="input-group-append p-0 mr-1">
                        <button className="btn btn-primary btn-fh btn-sm px-6 rounded-left" type="button"><strong>Join</strong></button>
                      </div>
                    </div>
                  </form>*/}
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <p
                  className="m- text-white opacity-45"
                  style={{ textAlign: "justify" }}
                >
                  <strong>
                    <br />
                    18+ Know When To Stop. Don’t Go Over The Top. Gamble
                    Responsibly. Think! About Your Choices. Call Gambling Help
                    On 1800 858 858 Or Visit{" "}
                    <a
                      style={{ color: "#44bd32" }}
                      href="https://www.gamblinghelponline.org.au/"
                      target="blank"
                    >
                      www.gamblinghelponline.org.au{" "}
                    </a>
                    <a
                      style={{ color: "#44bd32" }}
                      href="http://www.gamblinghelp.nsw.gov.au/"
                      target="blank"
                    >
                      {" "}
                      www.gambleaware.nsw.gov.au
                    </a>
                    {/* Or <a href="https://www.gamblinghelponline.org.au/" target="blank" >www.gamblinghelponline.org.au</a> */}
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="separator separator-solid opacity-7" />
          <div className="container py-8">
            <div className="gcse-search"></div>
            <div className="d-flex align-items-center justify-content-between flex-lg-row flex-column">
              {/*begin::Copyright*/}

              <div className="d-flex align-items-center order-lg-1 order-2">
                {/* <img alt="Logo" src="/metronic/theme/html/demo2/dist/assets/media/logos/logo-letter-1.png" className="logo-sticky max-h-35px" /> */}
                <span className="text-muted font-weight-bold mx-2">
                  {new Date().getFullYear()} ©
                </span>
                {/* <strong style={{fontColor:"#44bd32"}}>
                <a
                  href="https://www.ptptips.com.au"
                  // className="text-primary text-hover-primary"
                  style={{fontColor:"#44bd32"}}
                >
                  PAST THE POST TECHNOLOGIES PTY LTD ACN 637 874 992
                </a>
                </strong> */}
                <span>
                  <a
                    href="https://www.ptptips.com.au/"
                    style={{ color: "#44bd32" }}
                  >
                    PAST THE POST TECHNOLOGIES PTY LTD ACN 637 874 992
                  </a>
                </span>
              </div>
              <div className="d-flex align-items-center order-lg-2 order-1 mb-lg-0 mb-5">
                <a
                  href="/policy"
                  className="text-white opacity-55 pl-0 text-hover-primary"
                  onClick={() => {
                    this.navigator();
                  }}
                >
                  Terms of use & Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
