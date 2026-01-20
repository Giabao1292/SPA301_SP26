import Carousel from "react-bootstrap/Carousel";
import { banners } from "../data/banners";

function HomeCarousel() {
  return (
    <Carousel fade className="home-carousel">
      {banners.map((banner) => (
        <Carousel.Item key={banner.id} interval={banner.interval}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
          />
          <Carousel.Caption>
            <h3>{banner.title}</h3>
            <p>{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;
