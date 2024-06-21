import { useState, useEffect } from "react";
import axios from "axios";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [productPosted, setProductPosted] = useState(0);
  const [previousProductPosted] = useState(9);
  const [previousActiveUserCount] = useState(8);
  const [userGrowthPercentage, setUserGrowthPercentage] = useState(0);
  const [productGrowthPercentage, setProductGrowthPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://baskom-api.up.railway.app/api/v1/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setActiveUserCount(response.data.length);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataProduct = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://baskom-api.up.railway.app/api/v1/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProductPosted(response.data.length);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchDataProduct();
  }, []);

  useEffect(() => {
    const growth =
      ((activeUserCount - previousActiveUserCount) / previousActiveUserCount) *
      100;
    setUserGrowthPercentage(isNaN(growth) ? 0 : growth);
  }, [activeUserCount, previousActiveUserCount]);

  useEffect(() => {
    const productGrowth =
      ((productPosted - previousProductPosted) / previousProductPosted) * 100;
    setProductGrowthPercentage(isNaN(productGrowth) ? 0 : productGrowth);
  }, [productPosted, previousProductPosted]);

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={40}
        cardInfo={{
          title: "Active User",
          value: activeUserCount,
          text: `We have ${activeUserCount} active users.`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={userGrowthPercentage}
        cardInfo={{
          title: "User Growth",
          value: `${userGrowthPercentage.toFixed(2)}%`,
          text: "User registered since last month",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={productGrowthPercentage}
        cardInfo={{
          title: "Product Growth",
          value: `${productGrowthPercentage.toFixed(2)}%`,
          text: "Total product posted by users since last month",
        }}
      />
    </section>
  );
};

export default AreaCards;
