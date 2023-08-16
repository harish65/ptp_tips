import React, { Component } from 'react';
import actions from '../../redux/actions/venue';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import MapRailPos from "./MapRailPos";
import ComList from "./comments/ComList";
// import resolve from "jest-pnp-resolver";


class MapComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapPath: "",
            modalOpen: false,
            modalComOpen: false,
            venue_id: 0,
        };
    }

    componentDidMount = () => {
        const {dispatch} = this.props;
        dispatch(actions.loadVenues());
        window.scrollTo(0,0)
    }

    map1HandleChange = (event) => {
        const select = event.target;
        const id = select.children[select.selectedIndex].id;
        let trackCode = event.target.value;
        let url = `maps/${trackCode}.png`;
        this.setState({ mapPath: url, venue_id: id});


        // const {dispatch} = this.props;
        // dispatch(actions.lastRailPos({trackCode: trackCode}));
    }

    railPosition_ClickHandler = (event) => {
        this.setState({modalOpen: true})
    }
    closeModal = () => {
        this.setState({modalOpen: false});
    }
    comments_ClickHandler = (event) => {
        this.listComments();
    }
    listComments = async () => {
        const{dispatch} = this.props;
        await dispatch(actions.listVenueComments({venueID: this.state.venue_id})).then(()=>{
            this.setState({modalComOpen: true});
        });
    }
    closeComModal = () => {
        this.setState({modalComOpen: false});
    }



    renderForm() {

        const {railPos} = this.props;

        const {venues} = this.props;
        let venueRows= [];
        venueRows.push(<option key={-1} value="" defaultValue>Select Map</option>);
        venues.map((item, key)=>{
            venueRows.push(
                <option key={item.venue_id} id={item.venue_id} value={item.venue_shortName}>{item.venue_fullName} &nbsp;({item.venue_state})</option>
            );
        });
        return (

            <div className="container-fluid" style={{ fontSize: "12px" }}>
                <div className={"row mt-3"}>
                    <div className={"col"}>
                        <select className="form-control" onChange={this.map1HandleChange}>{venueRows}</select>
                    </div>
                    <div className={"col"}>
                        <Button color={"secondary"} onClick={this.comments_ClickHandler}>Comments</Button>
                    </div>
                    <div className={"col"}>
                        <Button color={"secondary"} onClick={this.railPosition_ClickHandler}>Rail Position</Button>
                    </div>
                    {/*<div className={"col"}>*/}
                    {/*    <p>RailPos: {railPos.railPos}</p>*/}
                    {/*</div>*/}
                </div>
                <div className={"row mt-12"}>
                    <div className={"col"}>
                        <img className={"w-100 mb-10"} src={this.state.mapPath} />
                    </div>
                </div>
                <div className={"row mt-3"} hidden={this.state.mapPath !== '' ? false : true}>
                    <div className={"col"} style={{fontWeight: 'normal'}}>
                        <p style={{color: 'red', fontSize: '14px'}}>
                            The above information provided by PAST THE POST TECHNOLOGIES PTY LTD.
                            Is to be used as a guide only. For more accurate information, please contact
                            the relevant JOCKEY CLUB.
                        </p>
                    </div>
                </div>
                <Modal size="lg" isOpen={(this.state.modalOpen && this.state.venue_id !== 0)?true:false} toggle={() => this.closeModal()}>
                    <ModalHeader toggle={() => this.closeModal()}>Rail Position</ModalHeader>
                    <ModalBody className="bg-white">
                        <MapRailPos venue_id={this.state.venue_id} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.closeModal()}>Close</Button>
                    </ModalFooter>
                </Modal>
                <Modal size="lg" isOpen={(this.state.modalComOpen && this.state.venue_id !== 0)?true:false} toggle={() => this.closeComModal()}>
                    <ModalHeader toggle={() => this.closeComModal()}>Venue Comments</ModalHeader>
                    <ModalBody className="bg-white">
                        <ComList comments={this.props.venuesCmts} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.closeComModal()}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }

    render() {
        return this.renderForm();
    }
}

const mapStateToProps = state => ({
    venues: state.venuesReducer.allvenues,
    railPos: state.venuesReducer.railPos,
    venuesCmts: state.venuesReducer.venuesCmts,
})

export default connect(mapStateToProps)(withRouter(MapComp));
