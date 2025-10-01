import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scopsis | Home Page",
  description: "Home page",
};

export default async function HomePage() {
  return <Home />;
}
