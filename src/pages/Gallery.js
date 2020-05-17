import React, { Component } from "react";
import Web3 from "web3";
import "../App.css";
import Marketplace from "mcontract/Marketplace.json";
import Navbars from "../components/nav/Navbars";
import Main from "../components/Gallery.Content";
import ParticlesBg from "particles-bg";
import Spinner from "react-bootstrap/Spinner";
import ButtomBar from "../components/nav/ButtomBar";
//import icon from "../cvd_logo_1.png"

//Import coingecko-api
const CoinGecko = require("coingecko-api");

//Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

class Gallery extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.getExchangeRate();
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

  async getExchangeRate() {
   
    let data = await CoinGeckoClient.coins.fetch('covid19', {});
    this.setState({"cvdRate": parseFloat(data.data.tickers[1].last)})
    
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      productCount: 0,
      products: [],
      loading: true,
      cvdRate: 0.000,
      displayArts: []
    };
    this.purchaseProduct = this.purchaseProduct.bind(this);
    this.resellProduct = this.resellProduct.bind(this);
    
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .purchaseArtPicxProduct(id)
      .send({ from: this.state.account, value: price })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }


  sellProduct = (id, price) =>{
    this.state.marketplace.methods
    .resell(id)
    .send({ from: this.state.account, value: price })
    .once("receipt", (receipt) => {
      this.setState({ loading: false });
    });    
    return true;
  }

  resellProduct = (id, price) => {
    //let success = false;
    this.setState({ loading: true });
    this.state.marketplace.methods
      .resell(id)
      .send({ from: this.state.account, value: price })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
        //success = true;
      });
    //return success;
  }

  render() {

    let config = {
      num: [3, 7],
      rps: 0.05,
      radius: [5, 30],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-50, 50],
      alpha: [0.6, 0],
      scale: [.1, 0.3],
      position: "all",
      //body: icon,
      color: ["random", "#44cc00"],
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
      <Navbars account={this.state.account} isLanding={true}/>
      
        <div className="container-fluid mt-5">
        
          <div className="row">
            <main
              role="main"
              className="col-lg-12 d-flex"
              style={{ marginTop: 120 }}
            >
              {this.state.loading ? (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 34,
                  }}
                >
                  {" "}
                  <div id="loader" className="text-center">
                    {" "}
                    <Spinner animation="border" variant="success" />{" "}
                    <p className="text-center" style={{color: "green", fontWeight: 400 , fontFamily: " 'Baloo Da 2', cursive"}}>Loading Marketplace...</p>
                  </div>
                 
                </div>
              ) : (
                
               
                <Main
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct}
                  resellProduct-={this.resellProduct}
                  sellProduct={this.sellProduct}
                  account={this.state.account}
                  cvdRate={this.state.cvdRate}
                />
                
              )}
            </main>
            
        
        <ParticlesBg type="custom" config={config} bg={true} />
          </div>
        </div>
        <ButtomBar/>
      </div>
    );
  }
}

export default Gallery;
