import React, { useCallback, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import * as B from 'react-bootstrap'
import axios from "axios";
import Pagination from '../../form/pagination/index'
import { RiMailSendFill, RiMailCheckFill } from 'react-icons/ri'
import { GrSend } from 'react-icons/gr'
import swal from "sweetalert";

const ContactAdmin = () => {
  const [show, setShow] = useState(false);
  const [contact, setContact] = useState();
  const [contactList, setContactList] = useState([]);
  const [reply, setReply] = useState();
  const [submitting, setSubmitting] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [perPage, setPerPage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const handlePerPage = (page) => {
    setPage(page);
  };

  const handleClose = () => {
    setSubmitting(true);
    setShow(prev => !prev)
  };
  const handleShow = (contact) => {
    setContact(contact)
    setShow(true);
  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }

  const getContactData = useCallback(async () => {
    const res = await axios.get(`/api/nhanvien/contact?page=${page}`)
    if (res.data.status === 200) {
      setContactList(res.data.contact.data);
      setTotalPage(res.data.contact.total);
      setPerPage(res.data.contact.per_page);
      setCurrentPage(res.data.contact.current_page)
    }
  }, [page]);

  useEffect(() => {
    getContactData().then(() => setSubmitting(false))
  }, [submitting, getContactData]);

  const SubmitReply = (e) => {
    e.preventDefault();

    const customer_id = contact.customer_id;

    const data = {
      msg: reply,
    }

    axios.post(`/api/nhanvien/contact/${customer_id}`, data).then(res => {
      if (res.data.status === 200) {
        swal('Thành công', res.data.message, 'success');
        setSubmitting(true);
        setShow(false);
        setReply();
      }
    })
  }

  return (
    <>
      <B.Modal show={show} onHide={handleClose}>
        <B.ModalHeader closeButton className="bg-secondary">
          <B.ModalTitle>Phản hồi khách hàng</B.ModalTitle>
        </B.ModalHeader>
        <B.ModalBody>
          <B.Form onSubmit={SubmitReply}>
            <B.FormGroup>
              <B.FormLabel className='fs-6'>Lời nhắn của <span className="text-success">{contact?.customer?.ten}</span></B.FormLabel>
              <B.FormText className='fs-6 mb-3 text-muted border border-secondary p-3'>{contact?.message}</B.FormText>
            </B.FormGroup>
            <B.FormGroup>
              <B.FormLabel className='fs-6'>Phản hồi khách hàng</B.FormLabel>
              <B.FormControl as='textarea' rows={6} className='mb-3 rounded-0' value={reply} onChange={(e) => setReply(e.target.value)}></B.FormControl>
            </B.FormGroup>
            <B.Button type='submit' variant='primary' className='rounded-0'>Gửi phản hồi <GrSend className="ms-1" /></B.Button>
          </B.Form>
        </B.ModalBody>
        <B.ModalFooter className="bg-secondary">
          <B.Button
            variant="outline-primary"
            className="mt-2 rounded-0"
            onClick={handleClose}
          >
            Hủy bỏ
          </B.Button>
        </B.ModalFooter>
      </B.Modal>

      <B.Container fluid>
        <B.Row className='pe-xl-5 mb-4'>
          <h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ LIÊN HỆ</h1>
        </B.Row>

        <B.Row className='pe-xl-5 mb-5'>
          <B.Table responsive='lg' className='table-borderless border border-secondary mb-0'>
            <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
              <tr>
                <th>Họ và tên khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {contactList && contactList.map((contact, index) => {
                return (
                  <tr key={index}>
                    <td>{contact.customer?.ten}</td>
                    <td>{contact.customer?.user.email}</td>
                    <td>{contact.customer?.sdt}</td>
                    <td>{contact.status === 0 ? 'Chưa phản hồi' : 'Đã phản hồi'}</td>
                    <td className="text-center">{contact.status === 0 ? <RiMailSendFill className="text-info fs-4" onClick={() => handleShow(contact)} />
                      : <RiMailCheckFill className="text-success fs-4" />}</td>
                  </tr>
                )
              })}
            </tbody>
          </B.Table>
        </B.Row>
        <Pagination currentPage={currentPage} totalPage={pageNumbers} handlePerPage={handlePerPage} />
      </B.Container>
    </>
  );
};
export default ContactAdmin;
