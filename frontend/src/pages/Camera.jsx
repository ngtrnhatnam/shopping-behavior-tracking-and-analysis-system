import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/Slide_Show/marin1.jpg",
  "/Slide_Show/marin2.jpg",
  "/Slide_Show/marin3.png",
];

export default function Camera() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100">
      <div className="backdrop-blur-md bg-white/30 border border-white/50 shadow-xl rounded-2xl px-6 py-4 mb-6 text-gray-700 max-w-xl text-center">
        <p className="text-lg font-medium">
          Tính năng đang phát triển... Hẹ hẹ hẹ <br />
          Thêm vài tấm hình Kitagawa Marin cho đỡ trống nha :3
        </p>
      </div>
      <div className="w-full max-w-lg">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Marin ${index}`}
                className="rounded-xl shadow-lg object-cover w-full h-[400px] mx-auto transition-transform duration-300 hover:scale-105"
                />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}