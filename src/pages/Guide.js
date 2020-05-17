import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Navbars from "../components/nav/Navbars";
import ButtomBar from "../components/nav/ButtomBar";

export function Guide() {
  return (
    <div>
      <Navbars />
      <h4 style={{ padding: 15, marginLeft: 50 }}>Guide</h4>
      <Accordion
        defaultActiveKey="0"
        style={{ padding: 15, marginRight: 50, marginLeft: 50, marginTop: 80 }}
      >
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              style={{ color: "green", fontWeight: 500 }}
            >
              What do I need to play Crypto CVD Art?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p>
                In order to use the crypto CVD Art MarketPlace you need a
                broswer compatible with the web3 functionality of Integration
                with ETH. Chrome and Firefox are for example two browsers
                supported for access to web3 type Wallets such as Metamask.
                <br />
                MetaMask is a digital wallet used to hold your money and use it
                for the Crypto CVD Art Transactions. Just have enough ETH or CVD
                funds to start buying and reselling stickers within the platform
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="1"
              style={{ color: "green", fontWeight: 500 }}
            >
              What are ETH and CVD?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <p>
                ETH is the short name of Etherum, one of the most famous
                cryptocurrency in the crypto world. In addition to allowing the
                commercial exchange of ETH coins, this blockchain allows the
                development of Dapps and contracts usually called Smart
                Contracts. CVD is therefore an ERC20 based Token as a contract
                on the etherum blockchain
                <br />
                CVD is therefore an ERC 20 Token whose purpose is to encourage
                purchases on the CVD art Marketplace. Users will then be able to
                purchase or resell collectibles using the dual ETH / CVD
                currency. All those who will be able to use CVD rather than ETH
                will receive special discounts and prizes compared to other
                users. "For example, the limited collection will be one of those
                things reserved only for users who have reached a certain CVD
                quorum"
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="2"
              style={{ color: "green", fontWeight: 500 }}
            >
              How do I get a Stickers?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <p>
                Go to the marketplace, choose the sticker you love and make the
                purchase using the appropriate buttton.
                <br />
                Once you have purchased a sticker, it will appear in the My
                collection section. From this moment on, you can decide to keep
                the sticker or to sell it at the price you deem most
                appropriate.
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="3"
              style={{ color: "green", fontWeight: 500 }}
            >
            How much does it cost to play Crypto CVD Art?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
            <p>It costs ETH or CVD to buy a Sticker based on the sell price a user pushed. There’s also a small ‘gas’ fee paid to conduct transactions on the blockchain.<p/>
            When you buy a Sticker, there’s no standard price. Users choose Auction selling price for their stickers.
          
        
          </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              style={{ color: "green", fontWeight: 500 }}
            >
            So, what is Crypto CVD Art?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
            <p>
      
            Crypto CVD Art is a marketplace of unique and rare stickers all over the world. Born from the idea of ​​the Coronovirus pandemic, it wants to bring more unique than rare collectibles in your homes.
      <br/>
            Nice collectibles with different types of rarity will be the result of a fantastic and accurate selection model.
            <br/>
            Based on the Etherum blockchain, it allows you to buy and resell nice art elements using a double currency: ETH and CVD.
            <br/>
            The platform is born as an evolution of the ERC 20 Token called Covid19 - CVD, with the aim of entertaining users during the pandemic period and also subsequently.
            <br/>
            CVD is therefore an ERC 20 Token whose purpose is to encourage purchases on the CVD art Marketplace. Users will then be able to purchase or resell collectibles using the dual ETH / CVD currency. All those who will be able to use CVD rather than ETH will receive special discounts and prizes compared to other users.
            "For example, the limited collection will be one of those things reserved only for users who have reached a certain CVD quorum"
      
      
          </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="5"
              style={{ color: "green", fontWeight: 500 }}
            >
            What to do if I have problems on Crypto CVD Art?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="5">
            <Card.Body>
            <p>
      
            We suggest to make a page refresh and see if it help you.  If needed you can also contact us at:
            <br/> postmaster@cryptocvdart.org
       
           </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="6"
              style={{ color: "green", fontWeight: 500 }}
            >
            How does Crypto CVD Art pay the developers and the managers?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="6">
            <Card.Body>
            <p>
      
            We generate revenue from the sale of the Gen0 Stickers we create as well as a 4% fee on all successful auction sales in our marketplace. The fee is taken from the seller.
      
          </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="7"
              style={{ color: "green", fontWeight: 500 }}
            >
            How many types of stickers are there?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="7">
            <Card.Body>
            <p>
            there are three types of collectible sticker items:
      <br/><br/>
      - Normal
      <br/>
      - Rare
      <br/> 
      - Legendary
      <br/>
      <br/>
      Each of these three types will have a different percentage of rarity.
      <br/><br/>
      - Normal: there may be 10 to 30 stickers<br/>
      - Rare: there may be 4 to 9 stickers<br/>
      - Legendary: there may be 1 to 3 stickers<br/>
      <br/><br/>
      each sticker will have an initial price based on its rarity.
      The first time a figurine is offered for sale, users will only be able to decide whether to buy it or not.
      <br/><br/>
      they will have two purchase options:<br/>
      1) CVD<br/>
      2) ETH<br/>
      <br/><br/>
      
      those who buy in CVD will not only have a discount on the initial price, but will take advantage of special access dedicated to premium users (For example a limited sticker collection).
      <br/>
      After a user has made the purchase of a Sticker, he will become the owner and will be able to resell it at the price he deems most appropriate.
            
      
          </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="8"
              style={{ color: "green", fontWeight: 500 }}
            >
            How can I get in contact with you?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="8">
            <Card.Body>
            <p>
      
            You can join or contact us on <br/>
            <a style={{textDecoration : "none"}} href="https://discord.gg/fU5UVuX">Discord</a><br/>
            <a style={{textDecoration : "none"}} href="https://t.me/joinchat/PoAH5xoxTPIKn0nQWW0a1Q">Telegram</a><br/>
            <a style={{textDecoration : "none"}} href="https://twitter.com/Covid19Token">Twitter</a><br/>
            or send an email to postmaster@cryptocvdart.org or postmaster@covid19token.org<br/>
      
          </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <ButtomBar />
    </div>
  );
}
