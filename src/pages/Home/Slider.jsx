import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from "../../../public/images/slider_1.jpeg";
import slider2 from "../../../public/images/slider_2.png";
import slider3 from "../../../public/images/slider_3.png";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <Carousel
      showThumbs={false}
    //   showStatus={false}
        // autoPlay={true}
      infiniteLoop={true}>
      <div className="relative ">
        <img
          src={slider1}
          alt="Slide 1"
          className="md:h-screen h-[calc(100vh-350px)]"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#0c0d09f7] via-[#0c0d09d4] to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="font-bold md:text-6xl text-4xl font-fancy tracking-wider pt-8 md:pt-0">
            This Summer <br /> must be different
          </h2>
          <p className="text-lg pt-2  md:py-4">
            We are offering wide range of course in different languages. You can
            choose wisely.
          </p>
          <Link to="/classes" className="bg-blue-500 text-white py-2 px-4 mt-4 mb-4 md:mb-0">
            All Classes
          </Link>
        </div>
      </div>
      <div className="relative">
      <img
          src={slider2}
          alt="Slide 1"
          className="md:h-screen h-[calc(100vh-350px)]"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#0c0d09f7] via-[#0c0d09d4] to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="font-bold md:text-6xl text-4xl font-fancy tracking-wider pt-8 md:pt-0">
            This Summer <br /> must be different
          </h2>
          <p className="text-lg pt-2  md:py-4">
            We are offering wide range of course in different languages. You can
            choose wisely.
          </p>
          <Link to="/classes" className="bg-blue-500 text-white py-2 px-4 mt-4 mb-4 md:mb-0">
            All Classes
          </Link>
        </div>
      </div>
      <div className="relative">
      <img
          src={slider3}
          alt="Slide 1"
          className="md:h-screen h-[calc(100vh-350px)]"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#0c0d09f7] via-[#0c0d09d4] to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="font-bold md:text-6xl text-4xl font-fancy tracking-wider pt-8 md:pt-0">
            This Summer <br /> must be different
          </h2>
          <p className="text-lg pt-2  md:py-4">
            We are offering wide range of course in different languages. You can
            choose wisely.
          </p>
          <Link to="/classes" className="bg-blue-500 text-white py-2 px-4 mt-4 mb-4 md:mb-0">
            All Classes
          </Link>
        </div>
      </div>
    </Carousel>
  );
};

export default Slider;
