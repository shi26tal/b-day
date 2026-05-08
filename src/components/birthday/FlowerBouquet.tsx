import { useState, useEffect } from "react";

const LILY_IMG =
  "lily.jpg"; // replaceable

const HAWTHORN_IMG = "hawthron.jpg"; // replaceable

const BOUQUET_IMG = "bouquet.png";


function LilyOfTheValley() {
  return (
    <img
      src={LILY_IMG}
      alt="Lily of the Valley"
      className="w-full h-full object-cover rounded-2xl"
    />
  );
}


function Hawthorn() {
  return (
    <img
      src={HAWTHORN_IMG}
      alt="Hawthorn flowers"
      className="w-full h-full object-cover rounded-2xl"
    />
  );
}



function GiftedBouquet({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="flex flex-col items-center gap-6 animate-bouquet-rise">
      <div className="text-center">
        <h3 className="text-xl font-serif italic text-rose-500">
          This one is for you, Munsi
        </h3>

        <p className="max-w-md text-sm text-gray-700 mt-2">
          I made this little bouquet for you, for all the little things you do that mean so much.

You’ve always been someone I look up to,
someone who makes things feel safe and warm.

I don’t always say it,
but I’m really lucky to have you as my sister 💛
        </p>
      </div>

      {/* Local bouquet image */}
      <img
        src={BOUQUET_IMG}
        alt="Bouquet"
        className="w-72 md:w-80 rounded-3xl shadow-xl animate-bloom-in"
      />
    </div>
  );
}


export default function FlowerBouquet() {
  const [bouquetVisible, setBouquetVisible] = useState(false);
  const [cardsAnimated, setCardsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setCardsAnimated(true), 200);
  }, []);

  return (

    <section id="flowers" className="py-16 px-4 bg-linear-to-b from-rose-50 to-yellow-50">

      {/* HEADER */}
      <div className="text-center mb-12">
        <p className="tracking-widest text-rose-500 text-xs uppercase">
          For my sister
        </p>

        <h2 className="text-4xl font-bold font-serif mt-2">
          A Little Bouquet for You
        </h2>

        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Just a small reminder of how special you are to me. Like these May flowers, you carry both softness and strength in your own beautiful way.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

        {/* LILY */}
        <div className="bg-white rounded-3xl shadow-lg p-4">
          <p className="text-purple-500 text-sm mb-2">May Birth Flower</p>
          <h3 className="text-xl font-semibold mb-3">Lily of the Valley</h3>

          <div className="h-56">
            <LilyOfTheValley />
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Sweetness • Purity • Happiness 
          </p>
           <p className="mt-1 text-sm text-gray-600">
            Just like the gentle care you always show
          </p>
          
        </div>

        {/* HAWTHORN */}
        <div className="bg-white rounded-3xl shadow-lg p-4">
          <p className="text-amber-500 text-sm mb-2">May Birth Flower</p>
          <h3 className="text-xl font-semibold mb-3">Hawthorn</h3>

          <div className="h-56">
            <Hawthorn />
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Hope • Protection • New Beginnings
          </p>
           <p className="mt-1 text-sm text-gray-600">
           Just like how you stay strong through everything
          </p>
        </div>
      </div>

      {/* BUTTON / REVEAL */}
      <div className="text-center mt-12">
        {!bouquetVisible ? (
          <button
            onClick={() => setBouquetVisible(true)}
            className="px-8 py-3 rounded-full text-white font-semibold bg-linear-to-r from-rose-500 via-purple-500 to-amber-400 shadow-lg hover:scale-105 transition cursor-pointer"
          > 
            Reveal Your Bouquet
          </button>
        ) : (
          <div className="mt-10">
            <GiftedBouquet visible={bouquetVisible} />
          </div>
        )}
      </div>
    </section>


  );
}
