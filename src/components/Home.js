import React from "react";
import Product from "./Product";

function Home() {
  return (
    <div
      id="home"
      className="container flex flex-col justify-center md:flex-row mx-auto"
    >
      <div id="homeContainer" className="">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/gateway/launch/THEBOYSS2/CTATEST/THBY_S2_GWBleedingHero_HO_COVIDUPDATE_XSite_1500x600_PV_en-GB._CB404774151_.jpg"
          alt="Home header"
          className="homeContainer_img"
        />
        <div id="homeRow2" className="flex flex-col md:flex-row mx-4 z-10">
          <Product
            id={1}
            title="The Lean Startup"
            price={11.99}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
          />
          <Product
            id={2}
            title="DVI 2 Port Manual Switcher Selector Switch Box Monitor single mode 1920X1080 2:1"
            price={24.51}
            rating={2}
            image="https://images-na.ssl-images-amazon.com/images/I/61zrPy3KVDL._AC_SL1500_.jpg"
          />
        </div>
        <div id="homeRow3" className="flex flex-col md:flex-row mx-4 z-10">
          <Product
            id={3}
            title="NETTA Electric Panel Heater, Slimline Glass Heater, Wall Mounted Electric Heater Or Free Standing, With Thermostat, Eco Friendly Mode, 1000W, Black."
            price={58.69}
            rating={1}
            image="https://images-na.ssl-images-amazon.com/images/I/517zgNHV-4L._AC_SL1500_.jpg"
          />
          <Product
            id={4}
            title="Alexa LED Strip Lights DreamColour, Govee WiFi Wireless 5m Smart Phone Controlled Light Strip 5050 LED Lights Sync to Music, Works with Amazon Alexa, Google..."
            price={39.99}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/8127dKnhZVL._AC_SL1500_.jpg"
          />
          <Product
            id={5}
            title="Nescafé Dolce Gusto Chococino Coffee Pods, 16 Capsule, Pack of 3"
            price={18.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/5140CdYckSL._AC_.jpg"
          />
        </div>
        <div id="homeRow1" className="flex flex-col md:flex-row mx-4 z-10">
          <Product
            id={6}
            title='Philips B Line 346B1C- 34" LED USB-C docking curved monitor - ( 3440 x 1440 Ultra WQHD - VA - 300 cd/m² ,5 ms - HDMI, DisplayPort, USB-C -...'
            price={311.99}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/618Zf45B0uL._AC_SL1500_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
