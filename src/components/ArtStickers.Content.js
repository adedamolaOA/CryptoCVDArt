import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class ArtStickersContent extends Component {
  state = {
    ipfsHash: null,
    buffer: "",
    ethAddress: "",
    blockNumber: "",
    transactionHash: "",
    gasUsed: "",
    txReceipt: "",
    rarity: "Normal",
    noOfStickers: 1
  };
  
  captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async (reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({ buffer });
  };

  handleChange = (event) => {
    this.setState({"rarity":event.target.value});
  };
  
  render() {
    return (
      <Container maxWidth="lg" style={{marginTop:33}}>
      <h4>Create Genesis Sticker</h4>
     <form
      onSubmit={(event) => {
        event.preventDefault();
        const name = this.productName.value;
        const buff = this.state.buffer;
        const price = window.web3.utils.toWei(
          this.productPrice.value.toString(),
          "Ether"
        );
        this.props.createProduct(name, price, buff, this.state.noOfStickers, this.state.rarity);
      }}
    >
      <div className="form-group mr-sm-2">
        <input
          id="productName"
          type="text"
          ref={(input) => {
            this.productName = input;
          }}
          className="form-control"
          placeholder="Sticker Name"
          required
        />
      </div>
      <div className="form-group mr-sm-2">
        <input
          id="productPrice"
          type="text"
          ref={(input) => {
            this.productPrice = input;
          }}
          className="form-control"
          placeholder="Price"
          required
        />
      </div>
      <div>
      <FormControl component="fieldset">
      <FormLabel component="legend">Sticker Rarity</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={this.state.rarity} onChange={this.handleChange}>
        <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
        <FormControlLabel value="Rare" control={<Radio />} label="Rare" />
        <FormControlLabel value="Legendary" control={<Radio />} label="Legendary" />
      </RadioGroup>
    </FormControl>
      </div>
      <div className="form-group mr-sm-2">
        <input
          id="noOfStickers"
          type="Number"
          className="form-control"
          placeholder="Number of stickers"
          value={this.state.noOfStickers}
          onChange={(event)=>{
            this.setState({"noOfStickers":event.target.value});
          }}
          required
        />
      </div>
      <input type="file" onChange={this.captureFile} />
      <button type="submit" className="btn btn-primary" style={{float: "right"}}>
        Add Sticker
      </button>
      </form>
    
      
        <div
          style={{
            position: "relative",
            marginTop: "7%",
          }}
        >
        <h4>All Stickers Created</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Nunber of Stickers</th>              
              <th scope="col">Rarity</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>  
                  <td>{product.noOfSticker}</td> 
                  <td>{product.rarity}</td>                
                </tr>
              )
            })}
          </tbody>
        </table>
         
        </div>
      </Container>
      /*
       <GridList cellHeight={500} cols={3} style={{ overflowY: "visible" }}>
            {this.props.products.map((product, key) => (
              <GridListTile key={key} style={{ width: 350, padding: 10, marginRight: 50}}>
                <img
                  src={`https://ipfs.infura.io/ipfs/${product.imageHash}`}
                  alt={product.name}
                />
                <GridListTileBar
                  title={product.name}
                  subtitle={
                    <div>
                      <span>
                        Cost:{" "}
                        {window.web3.utils.fromWei(
                          product.price.toString(),
                          "Ether"
                        )}{" "}
                        ETH
                      </span>
                      <br />
                      <span>
                        <small className="text-white">
                          Owner: {product.owner}
                        </small>
                      </span>
                    </div>
                  }
                  actionIcon={
                    <button
                      name={product.id}
                      value={product.price}
                      onClick={(event) => {
                        this.props.purchaseProduct(product.id, product.price);
                      }}
                      style={{ backgroundColor: "white", marginRight: 10 }}
                    >
                      <ShoppingCartIcon />
                    </button>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
      
      
      <Container maxWidth="sm">
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

export default ArtStickersContent;
