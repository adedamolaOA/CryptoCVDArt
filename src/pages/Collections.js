import React, { Component } from "react";
import Web3 from "web3";
import "../App.css";
import Marketplace from "mcontract/Marketplace.json";
import Navbars from "../components/nav/Navbars";
import CollectionsContent from "../components/Collections.Content";
import Spinner from 'react-bootstrap/Spinner';
import ParticlesBg from "particles-bg";
import ButtomBar from "../components/nav/ButtomBar";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

//Import coingecko-api
const CoinGecko = require("coingecko-api");

//Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

class Collections extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.getExchangeRate();
  }

  async getExchangeRate() {
   
    let data = await CoinGeckoClient.coins.fetch('covid19', {});
    this.setState({"cvdRate": parseFloat(data.data.tickers[1].last)})
    
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
      cvdRate: 0.000
    };
    this.createProduct = this.createProduct.bind(this);
  }

  createProduct(name, price, buffer) {
    ipfs.add(buffer, (err, ipfsHash) => {
      if (err) {
        console.error(err);
        return;
      }
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      this.state.marketplace.methods
        .createArtPicxProduct(name, price, ipfsHash[0].hash)
        .send({ from: this.state.account })
        .once("receipt", (receipt) => {
          this.setState({ loading: false });
        });
    });
  }
  render() {

    let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-40, 40],
      alpha: [0.6, 0],
      scale: [.1, 0.4],
      position: "all",
      color: ["random", "#0bbb000"],
      cross: "dead",
      // emitter: "follow",
      random: 15
    };

    if (Math.random() > 0.85) {
      config = Object.assign(config, {
        onParticleUpdate: (ctx, particle) => {
          ctx.beginPath();
          ctx.rect(
            particle.p.x,
            particle.p.y,
            particle.radius * 2,
            particle.radius * 2
          );
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
        }
      });
    }

    return (
      <div>
        <Navbars account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex" 
            style={{ marginTop: 50 }}>
              {this.state.loading ? (<div style={{height: "100%",width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center", marginTop: 34, color: "green", fontWeight: 400 , fontFamily: " 'Baloo Da 2', cursive"}}> <div id="loader" className="text-center">  <Spinner animation="border" variant="success" style={{color: "white"}}/> <p className="text-center">Loading Your Collections...</p></div></div>
              
              ) : (
                <CollectionsContent
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct}
                  account={this.state.account}
                  cvdRate={this.state.cvdRate}
                />
              )}
            </main>
          </div>
        </div>
        
        <ButtomBar/>
        <ParticlesBg type="custom" config={config} bg={true} />
        
      </div>
    );
  }
}

export default Collections;
