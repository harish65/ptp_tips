import React from "react";
import { FaBook } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import "../styles.scss";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
const authActions = require("../../../redux/actions/auth");

class User extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    const currentState = this.state.isOpen;
    this.setState({ isOpen: !currentState });
  }

  async logout() {
    const { dispatch, currentUser } = this.props;
    dispatch(authActions.logoutUser(currentUser.email));
    this.setState({ isOpen: false });
  }

  render() {
    const { currentUser } = this.props;
    const firstName = currentUser?.firstName;
    const lastName = currentUser?.lastName;
    const fullName = firstName + " " + lastName;
    return (
      <div className="topbar">
        {/*begin::User*/}
        <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          {/*begin::Toggle*/}

          <DropdownToggle
            className="topbar-item"
            style={{ backgroundColor: "transparent", borderWidth: 0 }}
          >
            <div className="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto">
              <span className="text-white opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1">
                Hi,
              </span>
              <span className="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4">
                {firstName}
              </span>
              <span className="symbol symbol-35">
                <span className="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30">
                  {firstName?.charAt(0)}
                </span>
              </span>
            </div>
          </DropdownToggle>
          {/*end::Toggle*/}

          {/*begin::Dropdown*/}
          <DropdownMenu right className="dropdown-menu-lg p-0">
            {/*begin::Header*/}
            <div className="d-flex align-items-center p-8 rounded-top">
              {/*begin::Symbol*/}

              {/*end::Symbol*/}
              {/*begin::Text*/}
              <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">
                {fullName}
              </div>
              {/*end::Text*/}
            </div>
            <div
              style={{ marginTop: -16 }}
              className="separator separator-solid"
            />
            {/*end::Header*/}
            {/*begin::Nav*/}
            <div className="navi navi-spacer-x-0 pt-5">
              {/*begin::Item*/}
              <DropdownItem className="navi-item px-8">
                <div className="navi-link">
                  <div className="navi-icon mr-2">
                    <i className="flaticon2-calendar-3 text-success" />
                  </div>
                  <Link to="/account">
                    <div className="navi-text">
                      <div className="font-weight-bold">
                        {" "}
                        <MdManageAccounts style={{ fontSize: "25" }} />
                        My Profile
                      </div>
                      <div className="text-muted">
                        Account settings and more...
                      </div>
                    </div>
                  </Link>
                </div>
              </DropdownItem>
              {/*end::Item*/}
              {/*begin::Item*/}

              <DropdownItem className="navi-item px-8">
                <div className="navi-link">
                  <div className="navi-icon mr-2">
                    <i className="flaticon2-calendar-3 text-success" />
                  </div>
                  <Link to="/blackbook">
                    <div className="navi-text">
                      <div className="font-weight-bold">
                        <FaBook style={{ fontSize: 20 }} /> My Blackbook
                      </div>
                    </div>
                  </Link>
                </div>
              </DropdownItem>

              <DropdownItem
                onClick={() => this.logout()}
                className="navi-item px-8"
              >
                <div onClick={() => this.logout()} className="navi-link">
                  <div className="navi-icon mr-2">
                    <i className="flaticon2-hourglass text-primary" />
                  </div>
                  <div className="navi-text" style={{ marginRight: 20 }}>
                    <div className="font-weight-bold">
                      <BiLogOut style={{ fontSize: 20 }} /> Log Out
                    </div>
                  </div>
                </div>
              </DropdownItem>
              {/*end::Item*/}
            </div>
            {/*end::Nav*/}
          </DropdownMenu>
          {/*end::Dropdown*/}
        </Dropdown>
        {/*end::User*/}
        {/*end::Topbar*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

export default withRouter(connect(mapStateToProps)(User));
