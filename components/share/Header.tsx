import { BellBrokenIcon, TrafficEconomyBrokenIcon } from "@/components/icons";

export const Header = () => {
  return (
    <header className="global overlap">
      <button>
        <TrafficEconomyBrokenIcon />
      </button>
      <button>
        <BellBrokenIcon />
      </button>
      <button>
        <img src="/images/Photo by Warren Wong.png" alt="" />
      </button>
    </header>
  );
};
