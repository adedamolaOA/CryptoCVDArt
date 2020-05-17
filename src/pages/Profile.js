import React, { Component } from "react";
import Web3 from "web3";
import "../App.css";
import Marketplace from "mcontract/Marketplace.json";
import Navbars from "../components/nav/Navbars";
import Spinner from 'react-bootstrap/Spinner'
import {
    Stitch,
    AnonymousCredential,
    RemoteMongoClient
  } from "mongodb-stitch-browser-sdk";
import ProfileContent from "../components/Profile.Content";
import ButtomBar from "../components/nav/ButtomBar";

// leaving out the arguments will default to these values

class Profile extends Component {
  
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId]
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      this.setState({ marketplace });
      const productCount = await marketplace.methods.productCount().call();
      this.setState({ productCount });
    
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      productCount: 0,
      loading: true,
      profile: [],
      value: ""
    };
    
    this.getProfile = this.getProfile.bind(this);
    this.addProfile = this.addProfile.bind(this);
  }


  async componentDidMount() {
    // Initialize the App Client
    await this.loadWeb3();
    await this.loadBlockchainData();
    this.client = Stitch.initializeDefaultAppClient("cryptocvdarts-hnotl");
    // Get a MongoDB Service Client, used for logging in and communicating with Stitch
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    // Get a reference to the todo database
    this.db = mongodb.db("art_collection");

    this.getProfileOnLoad();
  }

  getProfile() {
    this.db
      .collection("profile")
      .find({ownerId: this.state.account}, { limit: 1000 })
      .asArray()
      .then(profile => {
        this.setState({
            profile
        });
        this.setState({"loading": false});
      });
  }

  getProfileOnLoad() {
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(this.getProfile)
      .catch(console.error);
  }

  addProfile(firstName, lastName, email) {

    this.db
      .collection("profile")
      .insertOne({
        ownerId: this.state.account,
        firstName: firstName,
        lastName: lastName,
        email: email
      })
      .then(this.getProfile());
  }
 
  render() {
    return (
      <div>
        <Navbars account={this.state.account} />
        <div className="container-fluid" style={{marginTop: 150}}>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading ? (<div style={{height: "100%",width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center", marginTop: 34}}> <div id="loader" className="text-center">  <Spinner animation="border" variant="success" /> <p className="text-center">Loading CVD profile...</p></div></div>
              
              ) : (
                <ProfileContent
                  firstName={this.state.profile.length > 0 ? this.state.profile[0].firstName : ""}
                  lastName={this.state.profile.length > 0 ? this.state.profile[0].lastName : ""}
                  email={this.state.profile.length > 0 ? this.state.profile[0].email : ""}
                  addProfile={this.addProfile}
                  account={this.state.account}
                />
              )}
            </main>
          </div>
        </div>
        <ButtomBar/>
      </div>
    );
  }
}

export default Profile;
