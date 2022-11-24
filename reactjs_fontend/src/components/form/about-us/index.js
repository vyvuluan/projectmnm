import React from 'react'
import * as B from 'react-bootstrap'
import Breadcum from '../breadcum/index'
import anhnhom from '../../../img/anhlop.jpg'
import { RiMapPinFill } from 'react-icons/ri'
import { HiMail } from 'react-icons/hi'
import { BsTelephoneFill } from 'react-icons/bs'

const index = () => {
    return (
        <>
            <Breadcum
                title='về chúng tôi'
                BC={1}
                name='Về chúng tôi'
            />

            <B.Container fluid className="mb-5 pt-5">
                <B.Row className='px-xl-5'>
                    <img src={anhnhom} alt='' style={{ maxWidth: '800px' }} className='border border-5 border-primary me-5 mb-5'></img>
                    <B.Col lg={6}>
                        <h2 className='fw-semibold pb-2 border-bottom border-2 border-primary mb-3'>Chúng tôi là ai?</h2>
                        <p className='fs-5'>
                            Thành lập từ nhóm 4 bạn trẻ yêu công nghệ cùng nhau học đại học. Chúng tôi luôn mong muốn đem đến cho cộng đồng những chiếc PC-Laptop với
                            giả cả phải chăng phù hợp với các bạn sinh viên. Chúng tôi hiểu được sự khó khăn của nhiều bạn trẻ. Nhờ những điều đó chúng tôi đã thành
                            lập nên L3M SHOP.
                        </p>
                        <h2 className='fw-semibold pb-2 border-bottom border-2 border-primary mb-3'>Cái tên của L3M SHOP có ý nghĩa gì?</h2>
                        <p className='fs-5'>
                            L3M SHOP là tên viết tắt của 4 thành viên thành lập: Luân, Long, Lương, Mạnh. Chúng tôi ghép 4 chữ cài đầu và có được 3 chữ L và 1 chữ M nên
                            chúng tôi gọi là L3M SHOP hay còn gọi là LEM SHOP.
                        </p>
                        <div className='d-flex flex-column mb-3'>
                            <h5 className='fw-semibold mb-3'>Thông tin liên hệ</h5>
                            <p className='mb-2'><RiMapPinFill className='text-primary me-2' style={{ width: 'auto', height: '20px' }} />273 An D.Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh</p>
                            <p className='mb-2'><HiMail className='text-primary me-2' style={{ width: 'auto', height: '20px' }} />hotrol3m@gmail.com</p>
                            <p className='mb-2'><BsTelephoneFill className='text-primary me-2' style={{ width: 'auto', height: '20px' }} />+84 349 262 670</p>
                        </div>
                    </B.Col>

                </B.Row>
            </B.Container>
        </>
    )
}

export default index