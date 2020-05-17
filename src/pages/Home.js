import React from "react";
import Navbars from "../components/nav/Navbars";
import BuySell from "../buysell.png";
import Landing from "../landing1.png";
import ParticlesBg from "particles-bg";
import ButtomBar from "../components/nav/ButtomBar";

export function Home() {
  return (
    <div>
      <Navbars />
      <div
        style={{
          marginTop: 150,
          marginLeft: 50,
          marginRight: 50,
          fontFamily: " 'Baloo Da 2', cursive",
        }}
      >
        <div style={{ marginLeft: 150, marginRight: 150 }}>
          <div style={{ float: "left" }}>
            <span
              class="cvdtitle"
              style={{ marginBottom: 120, color: "#114f08" }}
            >
              <h1>
                Collect
                <br />
                unique and
                <br />
                rare stickers
              </h1>
            </span>
            <br />
            <div class="cvdtitle" style={{ marginBottom: 120 }}>
              <a
                href="/marketplace"
                style={{
                  backgroundColor: "#4CAF50",
                  borderRadius: 12,
                  border: "none",
                  color: "white",
                  padding: "10px 32px",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: 16,
                }}
              >
                Start
              </a>
            </div>
          </div>
          <div style={{ float: "right" }}>
            <video width="600" class="videostyle" controls>
              <source src="video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div
        style={{
          marginTop: 330,
          marginLeft: 200,
          marginRight: 150,
          fontFamily: " 'Baloo Da 2', cursive",
          color: "#114f08",
        }}
      >
        <div class="titletext" style={{ textAlign: "center" }}>
          <h3>What is Crypto CVD Art?</h3>
        </div>

        <div class="normaltext">
          <p />
          Crypto CVD Art is a marketplace of unique and rare stickers all over
          the world. Born from the idea of ​​the Coronovirus pandemic, it wants
          to bring more unique than rare collectibles in your homes.
          <br />
          <br />
          Nice collectibles with different types of rarity will be the result of
          a fantastic and accurate selection model.
          <br />
          <br />
          Based on the Etherum blockchain, it allows you to buy and resell nice
          art elements using a double currency: ETH and CVD. The platform is
          born as an evolution of the ERC 20 Token called Covid19 - CVD, with
          the aim of entertaining users during the pandemic period and also
          subsequently.
          <br />
        </div>
        <div style={{ textAlign: "center" }}>
          <a
            href="/Guide"
            style={{
              backgroundColor: "#4CAF50",
              borderRadius: 12,
              border: "none",
              color: "white",
              padding: "10px 32px",
              textAlign: "center",
              textDecoration: "none",
              fontSize: 16,
            }}
          >
            Learn More
          </a>
        </div>
      </div>
      <div style={{ marginTop: 120, marginLeft: 0 }}>
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "60%",
          }}
          src={BuySell}
          alt="Buy and Sell"
        />
      </div>
      <div style={{ marginTop: 120, marginLeft: 0 }}>
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "60%",
          }}
          src={Landing}
          alt="Buy and Sell"
        />
      </div>
      <div>
        <div style={{ textAlign: "center",
            paddingLeft: "250px",
            paddingRight: "250px",
            fontSize: "30px",
            marginTop: 30,
            fontWeight: "bold", color: "green",
            fontFamily: " 'Baloo Da 2', cursive"}}>
          Ready to collect the best collectibles of the web?
        </div>

        <br />
        <br />

        <div style={{ textAlign: "center" }}>
          <a
            href="/marketplace"
            style={{
              backgroundColor: "#4CAF50",
              borderRadius: 12,
              border: "none",
              color: "white",
              padding: "10px 32px",
              textAlign: "center",
              textDecoration: "none",
              fontSize: 16,              
          fontFamily: " 'Baloo Da 2', cursive"
            }}
          >
            Collect
          </a>
        </div>
        <br />
        <br />
        <br />
      </div>
      <ButtomBar />

      <ParticlesBg type="Square" bg={true} />
    </div>
  );
}
