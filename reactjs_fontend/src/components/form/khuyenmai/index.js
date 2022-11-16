import React, { useEffect, useState } from 'react'
import * as B from 'react-bootstrap'
import magiamgia from './magiamgia.png'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css'
import axios from 'axios';

const Index = () => {
    const [discountList, setDisList] = useState([]);

    function formatMoney(money) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(money);
    }

    useEffect(() => {
        axios.get(`/api/ds_discount_tontai`).then(res => {
            if (res.data.status === 200) {
                setDisList(res.data.discount)
            }
        })
    })

    return (
        <>
            <B.Container fluid className='pt-5'>
                <B.Row className='px-xl-5'>
                    <Carousel
                        additionalTransfrom={0}
                        removeArrowOnDeviceType={['mobile']}
                        autoPlay
                        autoPlaySpeed={3000}
                        centerMode={false}
                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable={false}
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl={false}
                        pauseOnHover={true}
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024
                                },
                                items: 5,
                                partialVisibilityGutter: 100
                            },
                            desktopMd: {
                                breakpoint: {
                                    max: 1600,
                                    min: 600
                                },
                                items: 3,
                                partialVisibilityGutter: 100
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0
                                },
                                items: 2,
                                partialVisibilityGutter: 50
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464
                                },
                                items: 2,
                                partialVisibilityGutter: 80
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable>
                        {discountList.map((item, index) => (
                            <div className='imgcontainer' key={index}>
                                <img src={magiamgia} alt='' className='bgimg'></img>
                                <label className='textimg text-white'>{item.discount_id}</label>
                                <div className='textimg-bottom text-danger'>
                                    <span>{item.start}</span>
                                    <span> - </span>
                                    <span>{item.end}</span>
                                </div>
                                <label className='textimg-bottom2 text-danger'>Chi tiêu tối thiểu: {formatMoney(item.dieukien)}</label>
                            </div>
                        ))}
                    </Carousel>
                </B.Row>
            </B.Container>
        </>
    )
}

export default Index;
