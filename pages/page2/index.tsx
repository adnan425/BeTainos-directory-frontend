import React from "react";
import Head from "next/head";
import { Header, Footer, Categories } from '../components/landing-page';
import { Banner, AdvertisementBox, ProfessionalBox } from '../components/sub-page';

const Index = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </Head>
      <Header />
      <Banner />
      <AdvertisementBox />
      <ProfessionalBox />
      <Categories />
      <Footer />
    </>
  );
};

export default Index;
