import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className=" -mt-20 lg:-mt-40 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-4 py-36 ">
        <div className="flex justify-center items-center gap-6 call_to_action">
          <div>
            <img
              src="https://htmldemo.net/lukas/lukas/assets/img/icons/icon-1.png"
              alt=""
              className="w-20 rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl">Free Home Delivery</h2>
            <p>Provide free home delivery for all product over $100</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 call_to_action">
          <div>
            <img
              src="https://htmldemo.net/lukas/lukas/assets/img/icons/icon-2.png"
              alt=""
              className="w-20 rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl">Quality Products</h2>
            <p>We ensure our product quality all times</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6">
          <div>
            <img
              src="https://htmldemo.net/lukas/lukas/assets/img/icons/icon-3.png"
              alt=""
              className="w-20 rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl">Online Support</h2>
            <p>To satisfy our customer we try to give support online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;