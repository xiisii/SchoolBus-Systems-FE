"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "src/hooks/use-auth";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import type { Page as PageType } from "src/types/page";
import { Loader } from "@googlemaps/js-api-loader";
import { Zoom } from "@mui/material";
const Page: PageType = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: `${process.env.NEXT_PUBLIC_MAPS_API_KEY}` as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;
      const position = {
        lat: 10.874243,
        lng: 106.7948193,
      };

      //map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };
      const map = new Map(mapRef.current as any, mapOptions);

      const marker = new Marker({
        map: map,
        position: position,
      });
    };
    initMap();
  }, []);

  return (
    <>
      <div className="h-[600px] mt-10" ref={mapRef}></div>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
