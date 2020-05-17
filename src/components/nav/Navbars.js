import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

class Navbars extends Component {
  render() {
    return (
      <Navbar bg={!this.props.isLanding ? "" : ""} expand="lg" fixed="top" style={{backgroundColor: "#E2E8E9", fontFamily: "'Baloo Da 2', cursive"}}>
      {//<Navbar.Brand href="#home" style={ !this.props.isLanding ? {marginLeft: 0} : {marginLeft: 0, color:"white"}}> <img src="./cvd_logo_1.png" alt="*" width="302px" height="302px" style={{marginRight:5}}/></Navbar.Brand>
       }
        <Navbar.Brand href="/" style={{marginLeft: 0, color:"green", fontFamily: " 'Baloo Da 2', cursive", fontWeight: 600}}> {( <img src="./cvd_logo_1.png" alt="*" width="60px" height="60px" style={{marginRight:5}}/>)} Crypto CVD Art</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{marginTop: 17}}>
          
            <Nav.Link href="/marketplace" style={{color:"green"}}>Gallery</Nav.Link>
            <Nav.Link href="/collections" style={{color:"green"}}>My Collection</Nav.Link>
            <Nav.Link href="/doc/guide" style={{color:"green"}}>
            Guide
            </Nav.Link>
            <NavDropdown
            alignRight
              title={(<div style={{color: "Green"}}>Account</div>)}
              id="basic-nav-dropdown"
              style={{ marginRight: 0, color: "white"}}
            >
              
              {
                this.props.account=== "0x0D736Eb095198E8C24299eee84843EbDDCfcB060" ? ( <NavDropdown.Item href="/admin/artstickers">
                Upload Stickers and Arts
              </NavDropdown.Item>): null
              }
              
              <NavDropdown.Divider />
              <NavDropdown.Item href="/profile" >
                <span id="account" style={{ fontSize: 12 }}>{this.props.account}</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <div  style={{backgroundColor: "#44cc00", height: 2, marginTop: "2em" , position: "fixed" , width: "100%", left: 0}} >
           
        </div>
               
      </Navbar>
    );
  }
}

export default Navbars;
