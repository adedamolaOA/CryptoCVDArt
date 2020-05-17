import React, { Component } from "react";

class ButtomBar extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#E2E8E9", fontFamily: "'Baloo Da 2', cursive", height: 250}}>
      <div  style={{backgroundColor: "#44cc00", height: 2, marginButtom: 5 , width: "100%", left: 0}} >
           
      </div>
      <table style={{textAlign: "left",
        color:  "#3d3d29",
          width:"100%",
          marginTop: 20,
          marginLeft:"auto", 
          marginRight:"auto",
          fontSize: 15,
      maxWidth:"60%",
    height: 120 }}>
          <tr style={{fontWeight:"bold"}}>
            <td>
              <img style={{
                verticalAlign: "middle",
  marginBottom: "0.75em",
  padding: "5px",
  width: "80px"
              }} src="./cvd_logo_1.png" alt="*" />
              <span class="text1">Crypto CVD Art</span>  
            </td>
            <td>Legal</td>
            <td>Info</td>
            <td>Catalogue</td>
            <td>Social</td>
          </tr>
          <tr>
            <td>© CryptoCVDArts 2020. All Rights Reserved.</td>
            <td>
              <a style={{textDecoration : "none", color : "#3d3d29"}} href="/doc/terms">Terms Of Services</a>
            </td>
            <td>
            <a style={{textDecoration : "none", color : "Black"}} href="/doc/guide">Guides</a>
           </td>
            <td>Normal</td>
            <td>
              <a style={{textDecoration : "none", color : "Blue"}} href="https://twitter.com/Covid19Token">Twitter</a>
                   
             </td>
          </tr>
          <tr>
            <td>
          </td>
            <td></td>
            <td></td>
            <td>Rare</td>
            <td>
              <a style={{textDecoration : "none", color : "Red"}} href="https://t.me/joinchat/PoAH5xoxTPIKn0nQWW0a1Q">Telegram</a>
    
          </td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Legendary</td>
              <td>
                <a style={{textDecoration : "none", color : "#ac39ac"}} href="https://discord.gg/fU5UVuX">Discord</a>
    
          </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Limited Collection</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>All Stickers</td>
              <td></td>
            </tr>
        </table>
    
    
    </div>
    );
  }
}

export default ButtomBar;