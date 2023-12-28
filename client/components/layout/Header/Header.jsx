// Header.js

import React, { useState, useEffect } from "react";
import style from "./header.module.css";
import Link from "next/link";

export default function Header() {
  const [toggle, setToggle] = useState(true);
  const [toggleCart, setToggleCart] = useState(false);
  const [cart, setCart] = useState([]);
  let icon = toggle ? "/hamburger-menu-icon.webp" : "/cross.png";

  function handleClick() {
    setToggle(!toggle);
    const expandElement = document.getElementById("expand");
    if (window.innerWidth > 700 || toggle) {
      expandElement.style.display = "flex";
    } else {
      expandElement.style.display = "none";
    }
  }

  function handleClick1() {
    setToggleCart(!toggleCart);
    const cart_element = document.getElementById("cart_bar");
    if (toggleCart) {
      cart_element.style.display = "none";
    } else {
      cart_element.style.display = "block";
    }
  }

  const handleStorageChange = () => {
    console.log('storage changed');
      
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(updatedCart);
  };

  useEffect(() => {
    // Load cart data from local storage on component mount
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    // Add event listener to update cart when localStorage changes
   

    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className={style.header}>
        <div className={style.logo}>
          <Link href="/">
            <img className={style.logoImg} src={"/logo.svg"} alt="Logo" />
          </Link>
          <div className={style.toggler}>
            <img
              src={icon}
              className={style.image}
              alt="Toggle"
              onClick={handleClick}
            />
          </div>
        </div>
        <div className={style.middlebox} id="expand">
          <div className={style.tiles}>
            <Link href="./newArrivals">New Arrivals</Link>
          </div>
          <div className={style.tiles}> <Link href="./classicCollections">Classic Collections</Link></div>
          <div className={style.tiles}> <Link href="./bestSellers">Best Sellers</Link></div>
          <div className={`${style.tiles} ${style.shopBy}`}>
            Shop By
            <div className={style["dropdown-content"]}>
              <div href="#">Category</div>
              <div href="#">Color</div>
              <div href="#">Size</div>
            </div>
          </div>
          <div className={style.tiles}>Accessories</div>
          <div className={style.tiles}>
            <Link href="./contactUs">Contact us</Link>
          </div>
          <div className={style.cart}>
            <img src={"searchButton.png"} alt="Search" />
          </div>
          <div className={style.cart}>
            <img src={"Cart.png"} alt="Cart" id="cart" onClick={handleClick1} />
          </div>
        </div>
      </div>
      <div className={style.cartbar} id="cart_bar">
        <div className={style.flex}>
          <div> Your Shopping Cart </div>
          <div>
            <img
              src="/cross.png"
              className={style.crossImg}
              onClick={handleClick1}
            />
          </div>
        </div>
        <div className={style.dummy1}></div>
        <div className={style.cartItem}>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <div className={style.dummy1}></div>
        <div className={style.flex}>
          <div>Sub Total</div>
          <div>$0.00</div>
        </div>
        <div className={style.checkOut}>
          <button className={style.checkOutBtn}> Check Out</button>{" "}
        </div>
      </div>
    </>
  );
}