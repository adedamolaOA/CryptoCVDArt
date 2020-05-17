import React, { Component } from "react";
import Web3 from "web3";
import "../../App.css";
import Marketplace from "mcontract/Marketplace.json";
import Navbars from "../../components/nav/Navbars";
import Spinner from 'react-bootstrap/Spinner'
import ArtStickersContent from "../../components/ArtStickers.Content";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

class ArtSticker extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

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
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      this.setState({ marketplace });
      const productCount = await marketplace.methods.productCount().call();
      this.setState({ productCount });
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.artPicxProducts(i).call();
        this.setState({
          products: [...this.state.products, product],
        });
      }
      this.setState({ loading: false });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      productCount: 0,
      products: [],
      loading: true,
    };
    this.createProduct = this.createProduct.bind(this);
  }

  createProduct(name, price, buffer, noOfStickers, rarity) {
    this.setState({ loading: true });
    ipfs.add(buffer, (err, ipfsHash) => {
      if (err) {
        console.error(err);
        return;
      }
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      let noStickers = parseInt(noOfStickers);
      let i=0;
      for(i=0 ; i< noStickers;i++){
        this.state.marketplace.methods
        .createArtPicxProduct(name, price, ipfsHash[0].hash,parseInt(noOfStickers), rarity)
        .send({ from: this.state.account })
        .once("receipt", (receipt) => {
          this.setState({ loading: false });
        });
      }
     
    });
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
              justifyContent: "center", marginTop: 204}}> <div id="loader" className="text-center">  <Spinner animation="border" variant="success" /> <p className="text-center">Loading Genesis Stickers...</p></div></div>
              
              ) : (
                <ArtStickersContent
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct}
                  account={this.state.account}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtSticker;
