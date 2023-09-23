import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMarketsDetails } from "../../../store/MarketsSlice";
import MatgerHeader from "./MatgerHeader/MatgerHeader";
import MatgerDescription from "./MatgerDescription/MatgerDescription";
// import GMapDemo from "./MatgerLocation/MatgerLocation";
import MatgerLocation from "./MatgerLocation/MatgerLocation";
import MatgerProducts from "./MatgerProducts/MatgerProducts";
import { Helmet } from "react-helmet";
import styles from "../../page.module.css"
const MarketDetials = () => {
  const dispatch = useDispatch();
  const { id, name } = useParams();
  useEffect(() => {
    dispatch(getMarketsDetails(parseInt(id)));
  }, [dispatch, id]);
  const { MarketDetialsArr } = useSelector((state) => state.MarketsSlice);
  // const MarketInfo = MarketDetialsArr
  //   ? MarketDetialsArr.products.map((ele) => {
  //       return <div>{ele.name}</div>;
  //     })
  //   : null;
  const MatHeader = MarketDetialsArr && (
    <MatgerHeader
      coverImage={MarketDetialsArr.coverImage}
      name={MarketDetialsArr.name}
      phone={MarketDetialsArr.call}
      face={MarketDetialsArr.face}
      messenger={MarketDetialsArr.messenger}
      whats={MarketDetialsArr.whats}
      pdf={MarketDetialsArr.pdf}
    />
  );

  const MatDescription = MarketDetialsArr && (
    <MatgerDescription
      description={MarketDetialsArr.description}
      face={MarketDetialsArr.face}
      address={MarketDetialsArr.address}
      phone={MarketDetialsArr.call}
      name={MarketDetialsArr.name}
      call={MarketDetialsArr.call}
    />
  );

  // const options = MarketDetialsArr && {
  //   center: { lat: MarketDetialsArr.lat, lng: MarketDetialsArr.lng },
  //   zoom: 12,
  // };

  const MatMap = MarketDetialsArr && (
    <MatgerLocation lat={MarketDetialsArr.lat} lng={MarketDetialsArr.lng} />
  );

  const MatgerProductsSection = MarketDetialsArr && (
    <MatgerProducts
      MatgerLogo={MarketDetialsArr.matgarImage}
      productsItems={MarketDetialsArr.products}
    />
  );
  return (
    <div className={styles.MatgerPage}>
      <Helmet>
        <title>{name}</title>
        <meta itemprop="name" content={`${name}`} />
        <meta
          itemprop="description"
          content={`${MarketDetialsArr && MarketDetialsArr.description}`}
        />
        <meta
          itemprop="image"
          content={`${MarketDetialsArr && MarketDetialsArr.images[0]}`}
        />
        <meta
          property="og:url"
          content={`${MarketDetialsArr && MarketDetialsArr.url}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${name}`} />
        <meta
          property="og:description"
          content={`${MarketDetialsArr && MarketDetialsArr.description}`}
        />
        <meta
          property="og:image"
          content={`${MarketDetialsArr && MarketDetialsArr.images[0]}`}
        />
        {MarketDetialsArr && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Person",
              name: `${name}`,
              email: `${MarketDetialsArr.email}`,
              jobTitle: `${MarketDetialsArr.catName}`,
              telephone: `${MarketDetialsArr.call}`,
              url: `${MarketDetialsArr.url}`,
              priceRange: "0 : 1000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "street",
                addressLocality: `${MarketDetialsArr.city}`,
                addressCountry: "EG",
              },
              image: [
                `http://souq.deltawy.com//imag?id=${MarketDetialsArr.images[0]}`,
              ],
              geo: {
                "@type": "GeoCoordinates",
                latitude: MarketDetialsArr.lat,
                longitude: MarketDetialsArr.lng,
              },
              sameAs: [MarketDetialsArr.face, MarketDetialsArr.url],
            })}
          </script>
        )}
      </Helmet>
      {MatHeader}
      {/* {MarketInfo} */}
      {MatDescription}
      {MatMap}
      {MatgerProductsSection}
    </div>
  );
};

export default MarketDetials;
