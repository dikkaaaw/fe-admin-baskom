import { useState, useEffect } from "react";
import axios from "axios";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  const [activeUserCount, setActiveUserCount] = useState(0);

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
        percentFillValue={20}
        cardInfo={{
          title: "Todays Revenue",
          value: "IDR 200.000",
          text: "Available to payout",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={25}
        cardInfo={{
          title: "Total Revenue",
          value: "IDR 2.500.000",
          text: "Available to payout",
        }}
      />
    </section>
  );
};

export default AreaCards;
