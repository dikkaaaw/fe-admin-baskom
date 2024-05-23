import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={40}
        cardInfo={{
          title: "Active User",
          value: "400",
          text: "We have 400 active users.",
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
