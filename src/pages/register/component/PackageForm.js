import React, { Component } from 'react'
import { Grid } from "@material-ui/core";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import PhoneInput from 'react-phone-input-2'


export default class PackageForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
  }


  handlePhone = (phone) => {
    this.props.setUserPhone(phone)
  }

  handleCountry = (country) => {
    this.props.setUserCountry(country)
  }

  handleRegion = (region) => {
    this.props.setUserRegion(region)
  }

  handleInputChange = (e) => {
    this.props.setUserDetails(e)
  }

  handlePlaceSelect = () => {

    let addressObject = this.autocomplete.getPlace()
    let address = addressObject.address_components

    let addressLength = address.length
    this.props.setName(addressObject.name)
    this.props.setStreet(`${address[0].long_name} , ${address[1].long_name}`)
    if (address[addressLength-4]) { this.props.setCity(address[addressLength-4].short_name) }
    if (address[addressLength-3]) { this.props.setRegion(address[addressLength-3].long_name) }
    if (address[addressLength -2]) { this.props.setUserCountry(address[addressLength-2].long_name) }
    if (address[addressLength-1]) { this.props.setZip(address[addressLength-1].short_name) }
    if (addressObject.url) { this.props.setGoogleMap(addressObject.url) }
  }

  render() {
    return (<>
      <Grid item xs={12}>
        <h3>Contact address And Details</h3>
      </Grid>


      {/* <Grid item xs={12} sm={4}>
                <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
                    Country
                </div>
                <CountryDropdown
                    className="form-control h-auto form-control-solid py-4 px-8"
                    value={this.props.country}
                    onChange={country => this.handleCountry( country )}/>
            </Grid> */}

      {/*<Grid item xs={12} sm={4}>
                <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
                    State
                </div>
                <RegionDropdown
                    className="form-control h-auto form-control-solid py-4 px-8"
                    country={this.props.country}
                    value={this.props.region}
                    onChange={region => this.handleRegion( region )}/>
            </Grid>*/}

      <Grid item xs={12} sm={6}>
        <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
          Year of Birth
        </div>
        <input
          onChange={this.handleInputChange}
          className="form-control h-auto form-control-solid py-4 px-8"
          style={{ textAlign: 'left' }}
          type="number"
          min={1900}
          max={2004}
          placeholder="YYYY"
          name="dob" />
      </Grid>

      <Grid item xs={12} sm={6}>
        <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
          Phone
        </div>
        <PhoneInput
          country={'au'}
          onChange={phone => this.handlePhone(phone)}
          inputStyle={{ height: '45px', width: '100%', borderColor: '#d2d8dd', textAlign: 'left' }}
        />
      </Grid>

      <Grid item xs={12}>
        <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
          Full Address
        </div>
        <input id="autocomplete"
          className="input-field"
          ref="input"
          style={{ textAlign: 'left' }}
          className="form-control h-auto form-control-solid py-4 px-8"
          type="text" />
      </Grid>

      <Grid item xs={12} sm={4}>
        <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
          Street Name
        </div>
        <input
          name={"name"}
          required
          value={this.props.name}
          placeholder={"Name"}
          style={{ textAlign: 'left' }}
          className="form-control h-auto form-control-solid py-4 px-8"
          onChange={this.handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
          Street Address
        </div>
        <input
          name={"street_address"}
          required
          value={this.props.street_address}
          style={{ textAlign: 'left' }}
          className="form-control h-auto form-control-solid py-4 px-8"
          placeholder={"Street Address"}
          onChange={this.handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
          City
        </div>
        <input
          name={"city"}
          required
          value={this.props.city}
          style={{ textAlign: 'left' }}
          className="form-control h-auto form-control-solid py-4 px-8"
          placeholder={"City"}
          onChange={this.handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
          State
        </div>
        <input
          name={"state"}
          required
          value={this.props.state}
          style={{ textAlign: 'left' }}
          className="form-control h-auto form-control-solid py-4 px-8"
          placeholder={"State"}
          onChange={this.handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
          Country
        </div>
        <input
          required
          name={"country"}
          value={this.props.country}
          style={{ textAlign: 'left' }}
          className="form-control h-auto form-control-solid py-4 px-8"
          placeholder={"Country"}
          onChange={this.handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
          Postal Code
        </div>
        <input
          required
          name={"zip_code"}
          value={this.props.zip_code}
          style={{ textAlign: 'left' }}
          className="form-control h-auto form-control-solid py-4 px-8"
          placeholder={"Postal Code"}
          onChange={this.handleInputChange}
        />
      </Grid>

    </>
    )
  }
}
