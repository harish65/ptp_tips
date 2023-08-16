import React from 'react';
import StarRatings from "react-star-ratings";


export default (star) => {
   const { rating } = star;
   return (
      <StarRatings
         rating={rating}
         starRatedColor={"#142841"}
         starDimension={window.innerWidth < 1450 ? "22px" : "28px"}
         starSpacing="1px"
         numberOfStars={5}
      />
   )
}
