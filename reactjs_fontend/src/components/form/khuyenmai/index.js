import React, { useEffect, useState } from 'react'
import * as B from 'react-bootstrap'
import magiamgia from './magiamgia.png'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css'
import axios from 'axios';

const discountNull = [
    { id: 0, name: 'Không có mã', start: 'Không có mã giảm giá' },
    { id: 1, name: 'Không có mã', start: 'Không có mã giảm giá' },
    { id: 2, name: 'Không có mã', start: 'Không có mã giảm giá' },
    { id: 3, name: 'Không có mã', start: 'Không có mã giảm giá' },
    { id: 4, name: 'Không có mã', start: 'Không có mã giảm giá' },
    { id: 5, name: 'Không có mã', start: 'Không có mã giảm giá' },
    { id: 6, name: 'Không có mã', start: 'Không có mã giảm giá' },
]

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
    }, [])

    var discount_html = '';
    if (discountList.length > 0) {
        discount_html =
            <Carousel
                additionalTransfrom={0}
                removeArrowOnDeviceType={['mobile', 'smallmobile']}
                autoPlay
                autoPlaySpeed={3000}
                centerMode={false}
                partialVisible
                containerClass="container-with-dots"
                dotListClass=""
                draggable={false}
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl={true}
                pauseOnHover={true}
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1600
                        },
                        items: 4,
                        partialVisibilityGutter: 40
                    },
                    desktopMd: {
                        breakpoint: {
                            max: 1600,
                            min: 1024
                        },
                        items: 3,
                        partialVisibilityGutter: 35
                    },
                    smallmobile: {
                        breakpoint: {
                            max: 420,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    mobile: {
                        breakpoint: {
                            max: 720,
                            min: 420
                        },
                        items: 1,
                        partialVisibilityGutter: 100
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 720
                        },
                        items: 2,
                        partialVisibilityGutter: 30
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
    } else {
        discount_html =
            <Carousel
                additionalTransfrom={0}
                removeArrowOnDeviceType={['mobile']}
                autoPlay
                autoPlaySpeed={3000}
                centerMode={true}
                containerClass="container-with-dots"
                dotListClass=""
                draggable={false}
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl={true}
                pauseOnHover={true}
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1600
                        },
                        items: 4,
                        partialVisibilityGutter: 40
                    },
                    desktopMd: {
                        breakpoint: {
                            max: 1600,
                            min: 1024
                        },
                        items: 3,
                        partialVisibilityGutter: 35
                    },
                    smallmobile: {
                        breakpoint: {
                            max: 420,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    mobile: {
                        breakpoint: {
                            max: 720,
                            min: 420
                        },
                        items: 1,
                        partialVisibilityGutter: 100
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 720
                        },
                        items: 2,
                        partialVisibilityGutter: 30
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
                {discountNull.map((item) => (
                    <div className='imgcontainer' key={item.id}>
                        <img src={magiamgia} alt='' className='bgimg'></img>
                        <label className='textimg text-white'>{item.name}</label>
                        <div className='textimg-bottom text-danger'>
                            <span>{item.start}</span>
                        </div>
                    </div>
                ))}
            </Carousel>
    }

    return (
        <>
            <B.Container fluid className='pt-5 mb-5'>
                {/* <B.Row className='px-xl-5 mb-2'>
                    <div className='d-flex'>
                        <AiFillFire className='fs-2 text-danger mt-1' />
                        <MdArrowForwardIos className='iconsize mt-2' />
                        <h2 className=''>Mã khuyến mại sốc</h2>
                    </div>
                </B.Row> */}
                <B.Row className='px-xl-5 me-0'>
                    {discount_html}
                </B.Row>
            </B.Container>
        </>
    )
}

export default Index;
