import React, { useState } from "react";
// import { Container, Grid, Typography } from "@mui/material";
import Select from "react-select";

const iceCreamFlavors = [
  {
    value: "vanilla",
    label: "Vanilla",
    description: "Pure Pleasure in Every Scoop!",
  },
  {
    value: "chocolate",
    label: "Chocolate",
    description: "Indulge in Chocolate Bliss!",
  },
  {
    value: "strawberry",
    label: "Strawberry",
    description: "Sweet, Juicy, and Simply Berrylicious!",
  },
  {
    value: "mintChocolateChip",
    label: "Mint Chocolate Chip",
    description: "Cool Mint, Chocolate Bliss!",
  },
  {
    value: "rockyRoad",
    label: "Rocky Road",
    description: "A Bumpy Road to Chocolate Heaven!",
  },
  {
    value: "cookieDough",
    label: "Cookie Dough",
    description: "Dig In for a Dough-licious Delight!",
  },
  {
    value: "butterPecan",
    label: "Butter Pecan",
    description: "Rich, Creamy, and Nutty Perfection!",
  },
  {
    value: "coffee",
    label: "Coffee",
    description: "Wake Up Your Taste Buds with Coffee Creaminess!",
  },
  {
    value: "raspberryRipple",
    label: "Raspberry Ripple",
    description: "Swirls of Raspberry Delight in Every Bite!",
  },
  {
    value: "pistachio",
    label: "Pistachio",
    description: "Nuts for Pistachio? You Bet-chachio!",
  },
  {
    value: "cookiesAndCream",
    label: "Cookies and Cream",
    description: "Classic Cookies Meet Dreamy Cream!",
  },
  {
    value: "caramelSwirl",
    label: "Caramel Swirl",
    description: "Caramel Heaven in Every Swirl!",
  },
  {
    value: "neapolitan",
    label: "Neapolitan",
    description: "Three Flavors, One Spoonful of Happiness!",
  },
  {
    value: "toffeeCrunch",
    label: "Toffee Crunch",
    description: "Crunch Your Way to Toffee Delight!",
  },
  {
    value: "blueberryCheesecake",
    label: "Blueberry Cheesecake",
    description: "Creamy Cheesecake with a Blueberry Burst!",
  },
  {
    value: "rainbowSherbet",
    label: "Rainbow Sherbet",
    description: "Taste the Rainbow, Scoop by Scoop!",
  },
  {
    value: "cherryGarcia",
    label: "Cherry Garcia",
    description: "Cherry Goodness with a Dash of Fun!",
  },
  {
    value: "lemonSorbet",
    label: "Lemon Sorbet",
    description: "Tangy and Refreshing, Lemon Sorbet Delight!",
  },
  {
    value: "coconutBliss",
    label: "Coconut Bliss",
    description: "Escape to the Tropics with Every Bite!",
  },
  {
    value: "mapleWalnut",
    label: "Maple Walnut",
    description: "A Taste of Maple Syrup Magic!",
  },
];

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid gray",
  }),
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,
    backgroundColor: state.isSelected ? "blue" : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: "",
    },
  }),
};

const formatOptionLabel = ({ label, description }: any) => (
  <div>
    <strong>{label}</strong>
    <span style={{ color: "gray" }}> ({description})</span>
  </div>
);

export default function MultiSelectComponent({
  onChange,
  values,
}: {
  onChange: (value: any) => void;
  values: any[];
}) {
  const handleMultiSelectChange = (selected: any) => {
    onChange(selected);
  };

  return (
    <>
      <Select
        options={iceCreamFlavors}
        value={values}
        onChange={handleMultiSelectChange}
        placeholder="Selecione 1 ou mais"
        styles={customStyles}
        isMulti
        formatOptionLabel={formatOptionLabel}
        noOptionsMessage={() => "Anotação não encontrada"}
      />
      {values.length > 0 && (
        <div className="">
          You selected: {values.map((option: any) => option.label).join(", ")}
        </div>
      )}
    </>
  );
}
