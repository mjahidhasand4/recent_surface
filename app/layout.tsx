import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Providers } from "@/contexts/providers";

export const metadata: Metadata = {
  title: "Surface",
  description: `Surface enables providers to manage and sell a variety of services: Flights, Hotel stays, Car rentals, and Travel packages, Store management. Efficiently handle bookings, track performance, and optimize offerings through a user-friendly control panel.`,
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Providers>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Providers>
  );
};

export default RootLayout;