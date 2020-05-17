import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GavelIcon from "@material-ui/icons/Gavel";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Button from 'react-bootstrap/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function CommaFormatted(amount) {
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = i.toString();
	a = [];
	while(n.length > 3) {
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d.length < 1) { amount = n; }
	else { amount = n ; }
	amount = minus + amount;
	return amount;
}
export default function ProductReviewCard({
  productId,
  productName,
  price,
  imageHash,
  purchaseProduct,
  rarity,
  noOfStickers,
  isGallary,
  addResaleRequest,
  isGen,
  isOnSale,
  cvdRate,
  db,
  sellProduct,
  account,
  isOwner
}) {
  //<img src="https://dummyimage.com/250/ffffff/000000" alt={product.name} />
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [resellPrice, setResellPrice] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getRarity = (rare) => {
    switch(rare){
      case "Normal":
        return 1
      case "Rare":
        return 2
      case "Legendary":
        return 3
      default:
        return 0
    }
  }

  const purchaseResaleUpdate = (productId, price) => {
    if(sellProduct(productId, price)){
      db
      .collection("resales")
      .deleteMany({art_id: productId });
    }
    //window.location.reload();
  }
  return (
    <Card
      className={classes.root}
      style={{ margin: 20, width: 400, height: 700, fontFamily: " 'Baloo Da 2', cursive" }}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            style={{ backgroundColor: "green" }}
          >
            {productName.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={(<div style={{fontFamily: " 'Baloo Da 2', cursive"}}>{productName}</div>)}
        subheader={
          <div>
          <span  style={{fontWeight: "bold", fontFamily: " 'Baloo Da 2', cursive"}}>{ window.web3.utils.fromWei(price.toString(), "Ether") + " ETH" }</span>
          <br/>
          <span style={{fontWeight: "bolder", color: "green", fontFamily: " 'Baloo Da 2', cursive"}}>{ CommaFormatted((parseFloat(window.web3.utils.fromWei(price.toString(), "Ether"))/cvdRate).toString()) +" CVD"}</span>
          </div>
         
          
        }
      />
      <CardMedia
        className={classes.media}
        image={`https://ipfs.infura.io/ipfs/${imageHash}`}
        title={productName}
        style={{ height: 500 }}
      />
      <CardContent>{isGallary && !isOnSale ? (<div>Number of Stickers Left : {noOfStickers}</div>) : (<div></div>)}</CardContent>

      <CardActions disableSpacing>
        <Rating name="read-only" value={getRarity(rarity)} max={3} readOnly />
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {isGallary ? ( // Display Buy for Gallery
          <IconButton
            disabled={isOwner}
            onClick={(event) => {
              isOnSale ? purchaseResaleUpdate(productId, price) : purchaseProduct(productId, price);
            }}
            style={{
              backgroundColor: "transparent",
              marginLeft: 111,
              float: "right",
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
        ) : ( // Display Sell for collections
          <div>
            <IconButton
            
            disabled={!isGen || isOnSale }
              onClick={handleClickOpen}
              style={{
                backgroundColor: "transparent",
                marginLeft: 111,
                float: "right",
              }}
            >
              <GavelIcon />
            </IconButton>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title" style={{fontFamily: " 'Baloo Da 2', cursive"}}>
                {"Sell Sticker Art - "}{productName}
              </DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" style={{paddingTop: 10, fontFamily: " 'Baloo Da 2', cursive"}}>
                  To Begin resale of your sticker {productName}, 
                  enter the amount you wish to sell the stickers and click " Post Sales Ad " to begin.
                </DialogContentText>
                <form onSubmit={
                  (event)=>{
                    event.preventDefault();
                    addResaleRequest(productId, productName, parseFloat(resellPrice), price, isGen,imageHash, noOfStickers,rarity);
                    setOpen(false);
                  }
                }>               
                <div className="form-group mr-sm-2">
                  <input
                    id="productPrice"
                    type="Numebr"
                    name="price"
                    className="form-control"
                    placeholder="Enter Resell Amount"
                    onChange={(event)=>{
                      setResellPrice(event.target.value)
                    }}
                    required
                  />
                </div>
                <div>
                
                </div>
                
                <Button type="submit" variant="success" className="btn btn-primary" style={{float: "right", marginBottom: 10}}>
                 Post Sales Ad
                </Button>
                </form>
              </DialogContent>
             
            </Dialog>
          </div>
        )}
      </CardActions>
    </Card>
  );
}
