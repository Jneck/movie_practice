import Button from "./Button";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function CoinTrackerApp() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinCost, setCoinCost] = useState(0);
  const [budget, setBudget] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChangeBudget = (event) => {
    setBudget(event.target.value);
  };
  const onChangeCoin = (event) => {
    setCoinCost(event.target.value);
  };
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <input
            onChange={onChangeBudget}
            type="text"
            placeholder="your budget USD"
          />
          <select onChange={onChangeCoin}>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : {coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <h3>you can translate it {budget / coinCost}</h3>
        </div>
      )}
    </div>
  );
}

export default CoinTrackerApp;
