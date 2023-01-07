import { GetStaticProps } from "next";
import Head from "next/head";
import DeckGL from "@deck.gl/react/typed";
import { Map } from "react-map-gl";
import { TextLayer } from "@deck.gl/layers/typed";
import { addThousandSeparators, shortenNumber } from "../lib/util";
import { useEffect, useState } from "react";
import { data } from "../lib/data";
import { ControlPanel } from "../components/ControlPanel";

const Index = ({ token, mapStyle }: { token: string; mapStyle: string }) => {
  const [value, setValue] = useState("2020");
  const [foreignerData, setForeignerData] = useState(data[value]);

  useEffect(() => {
    setForeignerData(data[value]);
  }, [value]);

  const layer = new TextLayer({
    id: "text-layer",
    data: foreignerData,
    getPosition: (d) => d.coordinates,
    getText: (d) => `${shortenNumber(d.amount)}`,
    getSize: 24,
    getColor: [255, 153, 102, 255],
    pickable: true,
  });

  return (
    <>
      <Head>
        <title>Germany Foreigners</title>
        <meta
          name="description"
          content="A map visualization of the amount of foreigners in Germany."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ControlPanel value={value} setData={setValue} />

      <DeckGL
        initialViewState={{
          longitude: 10.4515,
          latitude: 51.1657,
          zoom: 6,
        }}
        controller={true}
        layers={[layer]}
        getTooltip={({ object }) => {
          if (!object) {
            return null;
          }

          const state = object.state;
          const amount = addThousandSeparators(object.amount);

          return `${state}\n\nAround ${amount} Foreigners`;
        }}
      >
        <Map mapboxAccessToken={token} mapStyle={mapStyle} reuseMaps />
      </DeckGL>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (_) => {
  return {
    props: {
      token: process.env.MAPBOX_ACCESS_TOKEN,
      mapStyle: process.env.MAP_STYLE,
    },
  };
};

export default Index;
