import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import Dropdown from "react-bootstrap/Dropdown";
import ProductCard from "./card/ProductCard";
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient,
} from "mongodb-stitch-browser-sdk";
import Spinner from "react-bootstrap/Spinner";

class CollectionsContent extends Component {
  state = {
    ipfsHash: null,
    buffer: "",
    ethAddress: "",
    blockNumber: "",
    transactionHash: "",
    gasUsed: "",
    txReceipt: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      resales: [],
      artProducts: props.products,
      value: "",
      loading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.getResales = this.getResales.bind(this);
    this.addResaleRequest = this.addResaleRequest.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
  }

  async componentDidMount() {
    try {
      // Initialize the App Client
      this.client = null;
      this.client = Stitch.initializeDefaultAppClient("cryptocvdarts-hnotl");

      // Get a MongoDB Service Client, used for logging in and communicating with Stitch
      const mongodb = this.client.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
      );
      // Get a reference to the todo database
      this.db = mongodb.db("art_collection");

      this.getResalesOnLoad();
      this.getResales();
      //this.deleteResales();
    } catch {}
  }

  containedInResale(id) {
    let r = this.state.resales;
    let i;
    for (i = 0; i < r.length; i++) {
      if (r[i].art_id === id && r[i].status === 1) {
        return true;
      }
    }
    return false;
  }

  getResales() {
    this.db
      .collection("resales")
      .find({}, { limit: 1000 })
      .asArray()
      .then((resales) => {
        this.setState({
          resales,
        });
        this.setState({ loading: false });
      });
  }

  deleteResales() {
    this.db.collection("resales").deleteMany({ status: 1 });
  }

  getResalesOnLoad() {
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(this.getResales)
      .catch(console.error);
  }

  addResaleRequest(
    artId,
    artName,
    artPrice,
    oldPrice,
    purchased,
    imageHash,
    noOfSticker,
    rarity
  ) {
    this.db
      .collection("resales")
      .insertOne({
        owner_id: this.props.account,
        art_id: artId,
        art_name: artName,
        price: artPrice,
        oldPrice: oldPrice,
        isGen: !purchased,
        imageHash: imageHash,
        noOfSticker: noOfSticker,
        rarity: rarity,
        status: 1, // on sales
      })
      .then(this.getResales);
    this.getResales();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  filterProducts(selected) {
    if (selected === "All") {
      this.setState({ artProducts: this.props.products });
    } else {
      let filtered = this.props.products.filter(
        (arts) => arts.rarity === selected
      );
      this.setState({ artProducts: filtered });
    }
  }

  filterProductBasedOnPrice(order) {
    switch (order) {
      case "Asc":
        let ascSorted = this.props.products.sort((a, b) => a.price - b.price);
        this.setState({ artProducts: ascSorted });
        break;
      case "Desc":
        let descSorted = this.props.products.sort((a, b) => b.price - a.price);
        this.setState({ artProducts: descSorted });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Container maxWidth="lg" style={{ marginTop: 43 }}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = this.productName.value;
            const buff = this.state.buffer;
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              "Ether"
            );
            this.props.createProduct(name, price, buff);
          }}
        >
          <Dropdown style={{ float: "right", marginRight: 7 , fontFamily: " 'Baloo Da 2', cursive"}}>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              Rarity
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.filterProducts("All")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.filterProducts("Normal")}>
                Normal
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.filterProducts("Rare")}>
                Rare
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.filterProducts("Legendary")}>
                Legendary
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown style={{ float: "right", marginRight: "1%", fontFamily: " 'Baloo Da 2', cursive" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Price
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => this.filterProductBasedOnPrice("Asc")}
              >
                Low to High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.filterProductBasedOnPrice("Asc")}>
                Low Cost Gen Stickers
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.filterProductBasedOnPrice("Desc")}>High to Low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </form>

        <div
          style={{
            position: "relative",
            left: "3%",
            marginTop: "7%",
          }}
        >
          {this.state.loading ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 262,
                color: "green",
                fontWeight: 400,
              }}
            >
              {" "}
              <div
                id="loader"
                className="text-center"
                style={{ marginRight: 29 }}
              >
                {" "}
                <Spinner animation="border" variant="success" />{" "}
                <p className="text-center" style={{fontFamily: " 'Baloo Da 2', cursive"}}>
                  Loading Your Collections Status...
                </p>
              </div>
            </div>
          ) : (
            <GridList
              cellHeight={500}
              cols={3}
              style={{ overflowY: "visible" }}
            >
              {this.state.artProducts.filter(
                (arts) => arts.owner === this.props.account
              ).length > 0 ? (
                this.state.artProducts
                  .filter((arts) => arts.owner === this.props.account)
                  .map((product, key) => (
                    <ProductCard
                      key={key}
                      productId={product.id}
                      productName={product.name}
                      price={product.price}
                      imageHash={product.imageHash}
                      purchaseProduct={this.props.purchaseProduct}
                      rarity={product.rarity}
                      noOfStickers={product.noOfSticker}
                      isGallary={false}
                      addResaleRequest={this.addResaleRequest}
                      isGen={product.purchased}
                      cvdRate={this.props.cvdRate}
                      isOnSale={this.containedInResale(product.id)}
                    />
                  ))
              ) : (
                <a href="/" style={{ color: "white", fontWeight: 700 }}>
                  {" "}
                  You have no sticker collection, click now to get a sticker
                  from the gallery.
                </a>
              )}
            </GridList>
          )}
        </div>
      </Container>
      /*<Container maxWidth="sm">
      <div id="content">
        <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <p>&nbsp;</p>
        { this.props.p roducts.map((product, key) => {
          return(
            <ProductCard productName={product.name} price={product.price.toString()} purchaseProduct={this.props.purchaseProduct} owner={product.owner} />    
          )
        })}
      </div>
      </Container>*/
    );
  }
}

export default CollectionsContent;
