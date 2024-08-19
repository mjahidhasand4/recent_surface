"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from ".";
import {
  BackpackIcon,
  BikeIcon,
  CartBrokenIcon,
  CompassBrokenIcon,
  GridBrokenIcon,
  LetterBrokenIcon,
  RouteBrokenIcon,
  SettingsIcon,
  TrashBinBrokenIcon,
} from "@/components/icons";
import { useClickOutside } from "@/hooks/share";

enum Menu {
  DASHBOARD = "Dashboard",
  TRAVEL = "Travel",
  DISCOVER = "Discover",
  MARKETPLACE = "Marketplace",
  HOTEL = "Hotel",
  RIDER = "Rider",
  MAIL = "Mail",
  TRASH = "Trash",
  SETTINGS = "Settings",
}

interface State {
  expand: boolean;
  menu: Menu;
}

const initialState: State = {
  expand: false,
  menu: Menu.DASHBOARD,
};

export const SideBar = () => {
  const [state, setState] = useState<State>(initialState);

  const collapse = () => {
    setState((prev) => ({ ...prev, expand: false }));
  };

  const ref = useClickOutside(collapse);

  const open = (menu: Menu) => {
    setState((prev) => ({ ...prev, expand: true, menu }));
  };

  return (
    <aside
      ref={ref}
      className={`sidebar${state.expand ? " expand" : " collapse"}`}
    >
      <div>
        <Link href="/">
          <img src="/images/icons/xbox.svg" alt="" />
        </Link>

        <Button
          onlyIcon
          icon={<GridBrokenIcon />}
          onClick={() => open(Menu.DASHBOARD)}
        />
        <Button
          onlyIcon
          icon={<RouteBrokenIcon />}
          onClick={() => open(Menu.TRAVEL)}
        />
        <Button
          onlyIcon
          icon={<CompassBrokenIcon />}
          onClick={() => open(Menu.DISCOVER)}
        />
        <Button
          onlyIcon
          icon={<CartBrokenIcon />}
          onClick={() => open(Menu.MARKETPLACE)}
        />
        <Button
          onlyIcon
          icon={<BackpackIcon />}
          onClick={() => open(Menu.HOTEL)}
        />
        <Button onlyIcon icon={<BikeIcon />} onClick={() => open(Menu.RIDER)} />

        <Button
          onlyIcon
          icon={<LetterBrokenIcon />}
          onClick={() => open(Menu.MAIL)}
        />
        <Button
          onlyIcon
          icon={<TrashBinBrokenIcon />}
          onClick={() => open(Menu.TRASH)}
        />
        <Button
          onlyIcon
          icon={<SettingsIcon />}
          onClick={() => open(Menu.SETTINGS)}
        />
      </div>

      {state.expand && (
        <div>
          <Link href="/">
            <img src="/images/logos/Microsoft_Surface_Logo.png" alt="" />
          </Link>

          {state.menu === Menu.DASHBOARD && (
            <div>
              <nav>
                <h4>Dashboard</h4>

                <Link href="/">
                  <span>Balance Overview</span>
                </Link>
              </nav>
            </div>
          )}

          {state.menu === Menu.TRAVEL && <div>Travel</div>}
          {state.menu === Menu.DISCOVER && <div>Discover</div>}
          {state.menu === Menu.MARKETPLACE && <div>Marketplace</div>}
          {state.menu === Menu.HOTEL && <div>Hotel</div>}
          {state.menu === Menu.RIDER && <div>Rider</div>}
          {state.menu === Menu.MAIL && <div>Mail</div>}
          {state.menu === Menu.TRASH && <div>Trash</div>}
          {state.menu === Menu.SETTINGS && <div>Settings</div>}
        </div>
      )}
    </aside>
  );
};
