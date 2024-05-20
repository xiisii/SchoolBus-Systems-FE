import { useEffect, useState, useRef } from "react";
import type { Page as PageType } from "src/types/page";

import { paths } from "src/paths";
import { IssuerGuard } from "src/guards/issuer-guard";
import { GuestGuard } from "src/guards/guest-guard";
import { Issuer } from "src/utils/auth";
import { useRouter } from "next/router";

const Page: PageType = () => {
  const router = useRouter();
  const handleGoBack = () => {
    console.log("Quay lại");
    router.replace(paths.auth.login);
  };
  const handleImageClick = (path: string) => {
    router.push(path);
  };
  return <h1>CheckOut Screen</h1>;
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.JWT}>
    <GuestGuard>{page}</GuestGuard>
  </IssuerGuard>
);
export default Page;
