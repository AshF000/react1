import React from "react";
// import bhaskar from "./Assets/lucky-bh.mkv";

const vid = () => {
  return(

    <div className="bg-emerald-100 py-2">
    <p className="text-center font-bold text-2xl">Video Section</p>

    <div className="p-3 mx-auto my-4 shadow-custom w-9/12 flex flex-col justify-center items-center">
    <a href="https://drive.google.com/uc?export=download&id=1RPICq1Pn_1qJVOq7jw8adnWxoYMnIkwp" download>Lucky Bhaskar</a>
    {/* <a href="/"></a> */}
    {/* <video width="750" height="500" controls >
      <source src={bhaskar} type="video/mp4"/>
     </video> */}
    </div>
  </div>
  )
};

export default vid;
