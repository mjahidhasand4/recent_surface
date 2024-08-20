"use client";
import {
  UsersBrokenIcon,
  BackpackIcon,
  BikeIcon,
  BrowseAnalyticsIcon,
  CartBrokenIcon,
  ColorPaletteBrokenIcon,
  CompassBrokenIcon,
  EditBrokenIcon,
  GoogleAnalyticsIcon,
  GooglePageSpeedInsightsIcon,
  GridBrokenIcon,
  LetterBrokenIcon,
  PulseIcon,
  RouteBrokenIcon,
  SettingsIcon,
  TrashBinBrokenIcon,
  WalletBrokenIcon,
  FileManagerIcon,
} from "@/components/icons";
import { useClickOutside } from "@/hooks/share";
import Link from "next/link";
import { useState } from "react";
import { Button, Link as CustomLink } from ".";

enum Menu {
  DASHBOARD = "Dashboard",
  TRAVEL = "Travel",
  DISCOVER = "Discover",
  MARKETPLACE = "Marketplace",
  HOTEL = "Hotel",
  RIDER = "Rider",
  MAIL = "Mail",
  USERS = "USERS",
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
      className={`sidebar${state.expand ? " expand" : " collapse"} overlap`}
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
        <CustomLink href="file-manager" onlyIcon icon={<FileManagerIcon />} />

        <Button
          onlyIcon
          icon={<LetterBrokenIcon />}
          onClick={() => open(Menu.MAIL)}
        />
        <Button
          onlyIcon
          icon={<UsersBrokenIcon />}
          onClick={() => open(Menu.USERS)}
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
                  <WalletBrokenIcon />
                  <span>Balance Overview</span>
                </Link>
                <Link href="/">
                  <PulseIcon />
                  <span>User Activity</span>
                </Link>
              </nav>

              <nav>
                <h4>Analytics</h4>

                <Link href="/">
                  <BrowseAnalyticsIcon />
                  <span>Self Analytics</span>
                </Link>
                <Link href="/">
                  <GoogleAnalyticsIcon />
                  <span>Google Analytics</span>
                </Link>
              </nav>

              <nav>
                <h4>Inspect</h4>

                <Link href="/">
                  <GooglePageSpeedInsightsIcon />
                  <span>Google PageSpeed Insight</span>
                </Link>
              </nav>
            </div>
          )}

          {state.menu === Menu.TRAVEL && <div>Travel</div>}
          {state.menu === Menu.DISCOVER && (
            <div>
              <nav>
                <h4>Discover</h4>

                <Link href="/posts">
                  <EditBrokenIcon />
                  <span>Post</span>
                </Link>
                <Link href="/pages">
                  <ColorPaletteBrokenIcon />
                  <span>Page</span>
                </Link>
              </nav>

              <nav>
                <h4>Create</h4>

                <Link href="/editor">
                  <EditBrokenIcon />
                  <span>Post</span>
                </Link>
                <Link href="/page">
                  <ColorPaletteBrokenIcon />
                  <span>Page</span>
                </Link>
              </nav>
            </div>
          )}
          {state.menu === Menu.MARKETPLACE && <div>Marketplace</div>}
          {state.menu === Menu.HOTEL && <div>Hotel</div>}
          {state.menu === Menu.RIDER && <div>Rider</div>}
          {state.menu === Menu.MAIL && <div>Mail</div>}
          {state.menu === Menu.USERS && (
            <div>
              <nav>
                <h4>Users</h4>

                <Link href="/users">
                  <UsersBrokenIcon />
                  <span>All Users</span>
                </Link>
              </nav>

              <nav>
                <h4>New</h4>

                <Link href="/user">
                  <UsersBrokenIcon />
                  <span>User</span>
                </Link>
              </nav>
            </div>
          )}
          {state.menu === Menu.TRASH && <div>Trash</div>}
          {state.menu === Menu.SETTINGS && <div>Settings</div>}
        </div>
      )}
    </aside>
  );
};
