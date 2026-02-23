import React, { useEffect, useState } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
  Label,
  Input,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import { URLS } from "../../Url"
import axios from "axios"

function DigitalBrochure() {
  const [form, setform] = useState([])

  const [forms, setforms] = useState([])

  const handlechange = e => {
    const myform = { ...forms }
    myform[e.target.name] = e.target.value
    setforms(myform)
  }

  useEffect(() => {
    GetContactUs()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const GetContactUs = () => {
    var token = datas

    axios
      .post(
        URLS.GetSetting,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setform(res.data.policy.contactUs)
        setforms(res.data.policy.contactUs)
      })
  }
  const [modal_small, setmodal_small] = useState(false)
  function tog_small() {
    setmodal_small(!modal_small)
  }

  const getpopup1 = () => {
    tog_small()
  }

  const submibooking = e => {
    e.preventDefault()

    changstatus()
  }

  const changstatus = () => {
    var token = datas

    const dataArray = {
      mobile: forms.mobile,
      email: forms.email,
      facebook: forms.facebook,
      instagram: forms.instagram,
      twitter: forms.twitter,
      location: forms.location,
      business: forms.business,
    }

    axios
      .post(URLS.UpdateContactUs, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            setmodal_small(false)
            GetContactUs()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada Media Admin" breadcrumbItem="Contact Us" />
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader className="bg-white">
                  <Row>
                    <Col>
                      <div style={{ float: "right" }}>
                        <Button
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Edit Booking"
                          onClick={() => {
                            getpopup1(form)
                          }}
                          className="mr-5 mb-1 m-1 mt-3"
                          color="success"
                        >
                          <i className="bx bx-edit px-1"></i>
                          <span>Edit Contact Us</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <div>
                      <div className="table-rep-plugin mt-4 table-responsive">
                        <Table hover className="table table-bordered mb-4">
                          <thead>
                            <tr className="text-center">
                              <th>Email </th>
                              <td>{form.email}</td>
                            </tr>
                            <tr className="text-center">
                              <th>Contact Number</th>
                              <td>{form.mobile}</td>
                            </tr>
                            <tr className="text-center">
                              <th>Business Hours </th>
                              <td>{form.business}</td>
                            </tr>
                            <tr className="text-center">
                              <th>Address</th>
                              <td>{form.location}</td>
                            </tr>
                            <tr className="text-center">
                              <th>Facebook Link</th>
                              <td>{form.facebook}</td>
                            </tr>
                            <tr className="text-center">
                              <th>Twitter Link</th>
                              <td>{form.twitter}</td>
                            </tr>
                            <tr className="text-center">
                              <th>Instagram Link</th>
                              <td>{form.instagram}</td>
                            </tr>
                          </thead>
                        </Table>
                      </div>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal
            size="lg"
            isOpen={modal_small}
            toggle={() => {
              tog_small()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
                Edit Contact Us
              </h5>
              <button
                onClick={() => {
                  setmodal_small(false)
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form
                onSubmit={e => {
                  submibooking(e)
                }}
              >
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Email <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="email"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Email"
                        value={forms.email}
                        name="email"
                        onChange={e => {
                          handlechange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Contact Number <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Contact Number"
                        value={forms.mobile}
                        name="mobile"
                        onChange={e => {
                          handlechange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Facebook Link <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Facebook Link"
                        value={forms.facebook}
                        name="facebook"
                        onChange={e => {
                          handlechange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Twitter Link<span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Twitter Link"
                        value={forms.twitter}
                        name="twitter"
                        onChange={e => {
                          handlechange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Instagram Link <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Instagram Link"
                        value={forms.instagram}
                        name="instagram"
                        onChange={e => {
                          handlechange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Business Hours <span className="text-danger">*</span>
                      </Label>
                      <textarea
                        type="text"
                        rows="1"
                        className="form-control "
                        id="basicpill-firstname-input1"
                        placeholder="Enter  Business Hours"
                        value={forms.business}
                        name="business"
                        onChange={e => {
                          handlechange(e)
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Address <span className="text-danger">*</span>
                      </Label>
                      <textarea
                        type="text"
                        rows="3"
                        className="form-control "
                        id="basicpill-firstname-input1"
                        placeholder="Enter Address"
                        value={forms.location}
                        name="location"
                        onChange={e => {
                          handlechange(e)
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <hr></hr>
                <div style={{ float: "right" }} className="m-2">
                  <Button className="m-1" color="primary" type="submit">
                    Submit <i className="fas fa-check-circle"></i>
                  </Button>
                </div>
              </Form>
            </div>
          </Modal>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default DigitalBrochure
