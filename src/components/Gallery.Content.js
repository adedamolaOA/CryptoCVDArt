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

class Main extends Component {
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
      value: "",
      loading: true,
      displayArts: [],
      artProducts: props.products,
      searchValue: "",
    }
    this.getResales = this.getResales.bind(this);
    this.textFilterProduct = this.textFilterProduct.bind(this);
  }

  componentDidMount() {
    // Initialize the App Client
    try {
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
    } catch {
      window.location.reload();
    }

    //this.deleteResales();
    this.setState({ loading: false });
    this.getSortedProducts();
  }

  getResales() {
    this.db
      .collection("resales")
      .find({}, { limit: 1000 })
      .asArray()
      .then((resales) => {
        this.setState({
          resales: resales,
        });
      });
  }

  getResalesOnLoad() {
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(this.getResales)
      .catch(console.error);
  }

  deleteResales() {
    this.db.collection("resales").deleteMany({ status: 1 });
  }

  updateResale(id) {
    this.db
      .collection("resales")
      .updateOne({ art_id: id }, { $set: { status: 0 } });
  }
  getSortedProducts() {
    const arts = this.state.artProducts
      .filter((arts) => arts.owner !== this.props.account && !arts.purchased)
      .reduce((artsSoFar, { name, id }) => {
        if (!artsSoFar[name]) artsSoFar[name] = [];
        artsSoFar[name].push(this.props.products[id - 1]);
        return artsSoFar;
      }, {});
    this.setState({ displayArts: arts });
  }

  getSortedProductsBy(data) {
    let artsFiltered = data.filter((arts) => arts.owner !== this.props.account && !arts.purchased);
    
    let artsReduced = artsFiltered.reduce((artsSoFar, { name, id }, index) => {
      if (!artsSoFar[name]) artsSoFar[name] = [];
        artsSoFar[name].push(artsFiltered[index]);
        return artsSoFar;
      }, {});
    this.setState({ displayArts: artsReduced });
  }

  filterProducts(selected) {
    if (selected === "All") {
      this.setState({ artProducts: this.props.products });
      this.getSortedProductsBy(this.props.products);
    } else {
      let filtered = this.props.products.filter(
        (arts) => arts.rarity === selected
      );
      this.setState({ artProducts: filtered });
      this.getSortedProductsBy(filtered);
    }
  }

  filterProductBasedOnPrice(order) {
    switch (order) {
      case "Asc":
        let ascSorted = this.props.products.sort((a, b) => a.price - b.price);
        this.setState({ artProducts: ascSorted });
        this.getSortedProductsBy(ascSorted);
        break;
      case "Desc":
        let descSorted = this.props.products.sort((a, b) => b.price - a.price);
        this.setState({ artProducts: descSorted });
        this.getSortedProductsBy(descSorted);
        break;
      default:
        break;
    }
  }

  textFilterProduct(e) {
    this.setState({
      searchValue: e.target.value,
    });
    let filtered = this.props.products.filter((arts) =>
      arts.name.toString().toLowerCase().includes(e.target.value) || arts.owner.toString().includes(e.target.value)
    );
    this.setState({ artProducts: filtered });
    this.getSortedProductsBy(filtered);
  }

  render() {
    return (
      <Container maxWidth="lg">
        <div style={{ marginLeft: 40, marginRight: 47 }}>
          <div className="form-group mr-sm-1">
            <input
              id="search"
              type="text"
              ref={(input) => {
                this.productName = input;
              }}
              value={this.state.searchValue}
              onChange={this.textFilterProduct}
              className="form-control"
              placeholder="Art Name, Art owner eth address, e.t.c...."
              required
            />
          </div>

          <Dropdown style={{ float: "right", marginRight: 7, fontFamily: " 'Baloo Da 2', cursive" }}>
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
          <Dropdown style={{ float: "right", marginRight: "1%" , fontFamily: " 'Baloo Da 2', cursive"}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Price
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => this.filterProductBasedOnPrice("Asc")}
              >
                Low to High
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.filterProductBasedOnPrice("Asc")}
              >
                Low Cost Gen Stickers
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.filterProductBasedOnPrice("Desc")}
              >
                High to Low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div
          style={{
            position: "relative",
            left: "3%",
            marginTop: "10%",
          }}
        >
          <GridList cellHeight={500} cols={3} style={{ overflowY: "visible" }}>
            {
              Object.values(this.state.displayArts).map((key, id) => {
                return <ProductCard
                  key={id}
                  productId={key[0].id}
                  productName={key[0].name}
                  price={key[0].price}
                  imageHash={key[0].imageHash}
                  rarity={key[0].rarity}
                  noOfStickers={this.state.displayArts[key[0].name].length}
                  purchaseProduct={this.props.purchaseProduct}
                  resellProduct={this.props.resellProduct}
                  isGallary={true}
                  stickers={this.state.displayArts[key[0].name]}
                  isGen={key[0].purchased}
                  cvdRate={this.props.cvdRate}
                />
              }
              )

              /*this.props.products.filter(arts => arts.owner !== this.props.account && !arts.purchased).map((product, key) => (
              <ProductCard
                key={key}
                productId={product.id}
                productName={product.name}
                price={product.price}
                imageHash={product.imageHash}                
                rarity={product.rarity}
                noOfStickers={product.noOfSticker}
                purchaseProduct={this.props.purchaseProduct}
                isGallary={true}
                isGen={product.purchased}
                cvdRate={this.props.cvdRate}
              />
            ))*/
            }
          </GridList>
          {this.state.loading ? (
            <div>Loading Resale</div>
          ) : (
            <GridList
              cellHeight={500}
              cols={3}
              style={{ overflowY: "visible" }}
            >
              {this.state.resales
                .filter((arts) => arts.status !== 0)
                .map((product, key) => (
                  <ProductCard
                    key={key}
                    productId={product.art_id}
                    productName={product.art_name}
                    price={parseFloat(product.price) * 1000000000000000000}
                    imageHash={product.imageHash}
                    rarity={product.rarity}
                    noOfStickers={product.noOfSticker}
                    purchaseProduct={this.props.purchaseProduct}
                    resellProduct={this.props.resellProduct}
                    sellProduct={this.props.sellProduct}
                    isGallary={true}
                    isOnSale={true}
                    isGen={product.purchased}
                    cvdRate={this.props.cvdRate}
                    db={this.db}
                    account={this.props.account}
                    isOwner={product.owner_id === this.props.account}
                  />
                ))}
            </GridList>
          )}
        </div>
      </Container>
    );
  }
}

export default Main;
