import React, { Component } from "react";
import Container from "@material-ui/core/Container";

class ProfileContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            email: props.email,
        }
      }
    
  render() {
    return (
      <Container maxWidth="lg" style={{marginTop:33}}>
      <h4>Profile</h4>
     <form
      onSubmit={(event) => {
        event.preventDefault();        
        this.props.addProfile(this.state.firstName, this.state.lastName, this.state.email);
        window.alert('Profile Successfully Added')
      }}
    >
      <div className="form-group mr-sm-2">
        <input
          id="profileFirstName"
          type="text"
          onChange={(event) => {
            this.setState({"firstName":event.target.value})
          }}
          value={this.state.firstName}
          className="form-control"
          placeholder="First Name"
          required
        />
      </div>
      <div className="form-group mr-sm-2">
        <input
          id="profileLastName"
          type="text"
          onChange={(event) => {
            this.setState({"lastName":event.target.value})
          }}
          value={this.state.lastName}
          className="form-control"
          placeholder="Price"
          required
        />
      </div>
      <div className="form-group mr-sm-2">
        <input
          id="profileEmail"
          type="email"
          onChange={(event) => {
            this.setState({"email":event.target.value})
          }}
          value={this.state.email}
          className="form-control"
          placeholder="Email"
          required
        />
      </div>
      
      <button type="submit" className="btn btn-primary" style={{float: "right"}}>
        Save
      </button>
      </form>
    
      
        <div
          style={{
            position: "relative",
            marginTop: "7%",
          }}
        >
        
        </div>
      </Container>
    );
  }
}

export default ProfileContent;
