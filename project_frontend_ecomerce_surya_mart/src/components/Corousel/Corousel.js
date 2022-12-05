// carousel from react-boostrapt
import Carousel from 'react-bootstrap/Carousel';

// import image from assets
import bgSlider1 from '../../assets/img/bg-silder1.jpg';
import bgSlider2 from '../../assets/img/bg-slider2.jpg';
import bgSlider3 from '../../assets/img/bg-slider3.jpg';

const Corousel = () => {
    return (
        <Carousel className='corousel'>
            <Carousel.Item interval={2000}>
                <img src={bgSlider1} className="d-block mx-auto mt-2" alt="bgSlider1" style={{ height: '50vh', width: '91%', borderTop: '2px solid orange', borderBottom: '2px solid darkblue' }} />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img src={bgSlider2} className="d-block mx-auto mt-2" alt="bgSlider1" style={{ height: '50vh', width: '91%', borderTop: '2px solid orange', borderBottom: '2px solid darkblue' }} />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img src={bgSlider3} className="d-block mx-auto mt-2" alt="bgSlider1" style={{ height: '50vh', width: '91%', borderTop: '2px solid orange', borderBottom: '2px solid darkblue' }} />
            </Carousel.Item>
        </Carousel>
    )
}

export default Corousel;