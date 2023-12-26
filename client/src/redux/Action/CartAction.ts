import { IProduct } from "../Type";
import React from "react";
export const increaseCart = () => {
  return { type: "INCREASE" };
};
export const decreaseCart = () => {
  return { type: "DECREASE" };
};
export const decreaseCartCount = () => {
  return {
    type: "DECREASE_CART_COUNT",
  };
};
