"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import EventList from "@/Components/EventList";
import EventForm from "@/Components/EventForm";
import Spiner from "@/Components/Spiner";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  return (
    <main className="">
      
      <EventList/>
    
    </main>
  );
}