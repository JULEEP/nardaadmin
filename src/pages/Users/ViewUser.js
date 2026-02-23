import React, { useState, useEffect } from "react"
import { CardBody, Container, Row, Col, Card, Button } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useHistory } from "react-router-dom"
import { URLS } from "../../Url"
import axios from "axios"

function ViewUser() {
  const [form, setform] = useState([])

  const [Plan, setPlan] = useState([])

  useEffect(() => {
    GetuserDetails()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const Agentid = sessionStorage.getItem("Viewuserid")

  const GetuserDetails = () => {
    var token = datas

    const dataArray = {
      _id: Agentid,
    }
    axios
      .post(URLS.GetOneDetails, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res?.data?.user[0])
        setPlan(res?.data?.plans[0])
      })
  }

  const history = useHistory()

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="PaperBoys" breadcrumbItem="View User Details" />
          <Row className="mb-2">
            <Col md="12">
              <Button
                className="m-1"
                style={{ float: "right" }}
                onClick={() => {
                  history.goBack()
                }}
                color="primary"
              >
                <i className="bx bx-left-arrow-alt" /> Back
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Card>
                <CardBody>
                  <h5 className="text-danger">User Information : </h5>
                  <ul className="list-unstyled vstack gap-3 mb-0 mt-3">
                    <li>
                      <div className="d-flex mt-3">
                        <i className="bx bx-user-circle font-size-18 text-primary"></i>
                        <div className="ms-3">
                          <h6 className="mb-1 fw-semibold">Name: </h6>
                          <span className="text-muted">{form?.name} </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex pt-3">
                        <i className="bx bx-phone font-size-18 text-primary"></i>
                        <div className="ms-3">
                          <h6 className="mb-1 fw-semibold">Phone:</h6>
                          <span className="text-muted">{form?.phone}</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex pt-3">
                        <i className="bx bx-envelope font-size-18 text-primary"></i>
                        <div className="ms-3">
                          <h6 className="mb-1 fw-semibold">Email:</h6>
                          {form?.email}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex pt-3">
                        <i className="bx bx-buildings font-size-18 text-primary"></i>
                        <div className="ms-3">
                          <h6 className="mb-1 fw-semibold">State</h6>
                          {form?.state}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex pt-3">
                        <i className="bx bx-carousel font-size-18 text-primary"></i>
                        <div className="ms-3">
                          <h6 className="mb-1 fw-semibold">City</h6>
                          {form?.city}
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <h5 className="text-danger">Plan Information : </h5>
                  <Row>
                    {" "}
                    <Col md={6}>
                      <ul className="verti-timeline list-unstyled">
                        <li className="event-list">
                          <div className="event-timeline-dot">
                            <i className="bx bx-right-arrow-circle"></i>
                          </div>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <div>
                                <h6 className="font-size-14 mb-1">Plan Name</h6>
                                <p className="text-muted">{Plan?.planName}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="event-list">
                          <div className="event-timeline-dot">
                            <i className="bx bx-right-arrow-circle"></i>
                          </div>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <div>
                                <h6 className="font-size-14 mb-1">
                                  Plan Price
                                </h6>
                                <p className="text-muted">{Plan?.price}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="event-list">
                          <div className="event-timeline-dot">
                            <i className="bx bx-right-arrow-circle"></i>
                          </div>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <div>
                                <h6 className="font-size-14 mb-1">
                                  {" "}
                                  Plan Purchase Date{" "}
                                </h6>
                                <p className="text-muted">
                                  <p className="text-muted">
                                    {Plan?.logDateCreated &&
                                      new Date(Plan.logDateCreated)
                                        .toISOString()
                                        .split("T")[0]}
                                  </p>
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="event-list">
                          <div className="event-timeline-dot">
                            <i className="bx bx-right-arrow-circle"></i>
                          </div>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <div>
                                <h6 className="font-size-14 mb-1">
                                  {" "}
                                  Plan Expire Date{" "}
                                </h6>
                                <p className="text-muted">
                                  <p className="text-muted">
                                    {Plan?.expirydate?.slice(0, 10)}
                                  </p>
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul className="verti-timeline list-unstyled">
                        <li className="event-list">
                          <div className="event-timeline-dot">
                            <i className="bx bx-right-arrow-circle"></i>
                          </div>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <div>
                                <h6 className="font-size-14 mb-1">
                                  Transtation Id
                                </h6>
                                <p className="text-muted">
                                  {Plan?.transactionId}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="event-list">
                          <div className="event-timeline-dot">
                            <i className="bx bx-right-arrow-circle"></i>
                          </div>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <div>
                                <h6 className="font-size-14 mb-1">
                                  Transtation Status
                                </h6>
                                <p className="text-muted">{Plan?.status}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ViewUser
