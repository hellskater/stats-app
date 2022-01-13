import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Home() {
  const [mean, setMean] = useState(0);
  const [median, setMedian] = useState(0);
  const [mode, setMode] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const isInt = function (n) {
    return parseInt(n) === n;
  };

  const calcMean = (arr) => {
    let mean;
    if (isNaN(arr[arr.length - 1])) return "Please remove commas from the end";
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
    }

    mean = mean = total / arr.length;

    if (isInt(mean)) return mean;
    else return mean.toFixed(2);
  };

  const calcMedian = (arr) => {
    let median;
    if (isNaN(arr[arr.length - 1])) return "Please remove commas from the end";
    const { length } = arr;

    arr.sort((a, b) => a - b);

    if (length % 2 === 0) {
      return (arr[length / 2 - 1] + arr[length / 2]) / 2;
    }

    median = arr[(length - 1) / 2];

    if (isInt(median)) return median;
    else return median.toFixed(2);
  };

  const calcMode = (arr) => {
    if (isNaN(arr[arr.length - 1])) return "Please remove commas from the end";
    const mode = {};
    let max = 0,
      count = 0;

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (mode[item]) {
        mode[item]++;
      } else {
        mode[item] = 1;
      }

      if (count < mode[item]) {
        max = item;
        count = mode[item];
      }
    }

    return max;
  };

  const handleChange = (e) => {
    setNumbers(
      e.target.value.split(",").map(function (item) {
        return parseInt(item, 10);
      })
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    setMean(calcMean(numbers));
    setMedian(calcMedian(numbers));
    setMode(calcMode(numbers));
  };

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.error("Failed to log out");
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <p className="text-info">User: {currentUser.email}</p>
        <Button variant="danger" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      <Card>
        <Card.Title className="p-3 text-center">Pocket Statistics</Card.Title>
        <Card.Body>
          <input
            type="text"
            className="w-100 mb-3 p-2"
            onChange={handleChange}
            placeholder="Type your inputs separated by comma"
          />
          <div className="d-flex justify-content-center mb-4">
            <Button className="w-50" onClick={handleClick}>
              Results
            </Button>
          </div>
          <div className="d-flex justify-content-around">
            <p>Mean: {mean}</p>
            <p>Median: {median}</p>
            <p>Mode: {mode}</p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Home;
