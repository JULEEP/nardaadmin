import PropTypes from "prop-types"
import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Input,
  Label,
  Form,
} from "reactstrap"
import { withRouter, Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const ForgetPasswordPage = () => {
  const [form, setform] = useState([])
  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }

  const handleSubmit = async e => {
    e.preventDefault()
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-3 pt-sm-4">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden" id="oppd">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={6}>
                      <div className="text-white p-4 mt-2">
                        <h5 className="text-white">Delete Account</h5>
                      </div>
                    </Col>
                    <Col className="col-6 p-4 bg-white border border-primary">
                      <h3 className="text-primary">Narada Media</h3>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        handleSubmit(e)
                      }}
                    >
                      <Row>
                        <Col md={9}>
                          <div className="mb-3 mt-3">
                            <Label className="form-label">Mobile Number</Label>
                            <Input
                              name="number"
                              className="form-control"
                              placeholder="Enter Mobile Number"
                              type="number"
                              required
                              onChange={e => {
                                handleChange(e)
                              }}
                            />
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className=" mt-5">
                            <button
                              className="btn btn-primary btn-sm"
                              type="button"
                            >
                              Send Otp
                            </button>
                          </div>
                        </Col>
                      </Row>
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter Email"
                          type="email"
                          required
                          onChange={e => {
                            handleChange(e)
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Otp</Label>
                        <Input
                          name="number"
                          className="form-control"
                          placeholder="Enter Otp"
                          type="text"
                          required
                          onChange={e => {
                            handleChange(e)
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <Label for="basicpill-firstname-input1">
                          Reason For Delete Account{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <textarea
                          type="text"
                          rows="3"
                          className="form-control "
                          id="basicpill-firstname-input1"
                          placeholder="Enter Reason For Delete Account"
                          required
                          value={form.description}
                          name="description"
                          onChange={e => {
                            handleChange(e)
                          }}
                        />
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            Submit
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-3 text-center">
                <p>
                  Go back to{" "}
                  <Link to="login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p className="mb-0">
                  © {new Date().getFullYear()} Narada Media. Design & Develop by
                  Digitalraiz
                </p>
              </div>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPasswordPage)
