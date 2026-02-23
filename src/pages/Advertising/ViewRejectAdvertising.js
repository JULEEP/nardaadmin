import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Modal,
  Form,
  Label,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useHistory } from "react-router-dom"
import mark from "../../assets/images/cn.gif"
import Trash from "../../assets/images/trash.gif"
import axios from "axios"
import { URLS } from "../../Url"
import { ToastContainer, toast } from "react-toastify"

function ViewAdvertising() {
  const history = useHistory()

  const [sts, setsts] = useState([])

  const [cts, setcts] = useState([])

  const [dts, setdts] = useState([])

  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const [modal_small1, setmodal_small1] = useState(false)

  function tog_small1() {
    setmodal_small1(!modal_small1)
  }

  const [form, setform] = useState([])

  const [form1, setform1] = useState([])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  useEffect(() => {
    getpendingnews()
  }, [])

  const Agentid = sessionStorage.getItem("pendingadsid")

  const getpendingnews = () => {
    var token = datas

    const dataArray = new FormData()
    dataArray.append("_id", Agentid)
    axios
      .post(URLS.GetrejectedAdvertisementsView, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res.data.localNews)
        setsts(res.data.localNews.stateName)
        setdts(res.data.localNews.districtName)
        setcts(res.data.localNews.constituencyName)
      })
  }

  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    EditNews()
  }

  const EditNews = () => {
    var token = datas
    var formid = form._id

    const dataArray = new FormData()
    dataArray.append("rejectionReason", form1.rejectionReason)

    axios
      .put(URLS.RejectAdvertisement + "/" + formid, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            setmodal_small(false)
            history.push(
              "./RejectAdvertising",
              sessionStorage.setItem(
                "tost",
                "Advertise has been Rejected successfully"
              )
            )
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const handleSubmit2 = e => {
    e.preventDefault()
    EditNews2()
  }

  const EditNews2 = () => {
    var token = datas
    var formid = form._id

    axios
      .put(
        URLS.ApproveAdvertisement + "/" + formid,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            setmodal_small(false)
            history.push(
              "./ApprovedAdvertisingList",
              sessionStorage.setItem(
                "tost",
                "Advertise has been Approved successfully"
              )
            )
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
          <Breadcrumbs title="ADVERTISING" breadcrumbItem="ADVERTISING View" />
          <Row>
            <Col>
              <Button
                // onClick={navigation(-1)}
                onClick={() => history.goBack()}
                className="mb-3  m-1 "
                style={{ float: "right" }}
                color="primary"
              >
                <i className="far fa-arrow-alt-circle-left"></i> Back
              </Button>

              {/* <Button
                onClick={() => {
                  tog_small1()
                }}
                className="mb-3  m-1 "
                style={{ float: "right" }}
                color="danger"
              >
                Reject
              </Button>*/}

              <Button
                onClick={() => {
                  tog_small()
                }}
                className="mb-3  m-1 "
                style={{ float: "right" }}
                color="info"
              >
                Approved
              </Button>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3">
                    <div className="row justify-content-center">
                      <div className="col-xl-8">
                        <div>
                          <div className="text-center">
                            <div className="mb-4">
                              <Link className="badge bg-light font-size-12">
                                <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                ADVERTISING
                              </Link>
                            </div>
                            <h4>{form.name}</h4>
                            <p className="text-muted mb-4">
                              <i className="mdi mdi-calendar me-1"></i>{" "}
                              {form.link}
                            </p>
                          </div>
                          <hr />
                          <div className="text-center">
                            <Row>
                              <Col sm={4}>
                                <div>
                                  <p className="text-muted mb-2">From Date </p>
                                  <h5 className="font-size-15">
                                    {" "}
                                    {form.dateOfNews}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Status</p>
                                  <h5 className="font-size-15">
                                    {form.status}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Post by</p>
                                  <h5 className="font-size-15">
                                    {form.createrName == "" ? (
                                      <>Admin</>
                                    ) : (
                                      <>{form.createrName}</>
                                    )}
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <hr />
                          <div className="my-5">
                            <img
                              src={URLS.Base + form.image}
                              alt=""
                              className="img-thumbnail mx-auto d-block"
                            />
                          </div>
                          <span>Link :</span>{" "}
                          <a
                            href={form.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-danger"
                          >
                            <small>{form.link}</small>
                          </a>

                          <blockquote className="p-4 border-light border rounded mb-4 mt-3">
                            <div className="d-flex">
                              <div className="me-3">
                                <i className="bx bxs-quote-alt-left text-dark font-size-24"></i>
                              </div>
                              <div>
                                <p className="mb-0"> {form.languageName}</p>
                              </div>
                            </div>
                          </blockquote>

                          <hr />

                          <div className="text-center mb-3">
                            <Row>
                              <Col sm={4}>
                                <div>
                                  <p className="text-muted mb-2">State</p>
                                  <h5 className="font-size-15">
                                    {sts.length > 1 ? (
                                      <>{"All"}</>
                                    ) : (
                                      <>{form.stateName}</>
                                    )}

                                    {/* {form.stateName} */}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">District</p>
                                  <h5 className="font-size-15">
                                    {dts.length > 1 ? (
                                      <>{"All"}</>
                                    ) : (
                                      <>{form.districtName}</>
                                    )}
                                    {/* {form.districtName} */}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">
                                    Constituency
                                  </p>
                                  <h5 className="font-size-15">
                                    {dts.length > 1 || cts.length > 1 ? (
                                      <>{"All"}</>
                                    ) : (
                                      <> {form.constituencyName}</>
                                    )}
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          {/* <div className="mt-4">
                            <blockquote className="p-4 border-light border rounded mb-4">
                              <div className="d-flex">
                                <div className="me-3">
                                  <i className="bx bxs-quote-alt-left text-dark font-size-24"></i>
                                </div>
                                <div>
                                  <p className="mb-0">
                                    {" "}
                                    SR Sun City in Yadagirigutta, Secunderabad
                                    is a ready-to-move housing society. This
                                    project is a perfect combination of comfort
                                    and style, specifically designed to suit
                                    your requirements and conveniences. This
                                    housing society is now ready to be call..
                                  </p>
                                </div>
                              </div>
                            </blockquote>
                          </div> */}

                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal
          size="sm"
          isOpen={modal_small}
          toggle={() => {
            tog_small()
          }}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Approved
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
                handleSubmit2(e)
              }}
            >
              <Col md={12}>
                <img src={mark} width="100%"></img>
              </Col>

              <div style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    setmodal_small(false)
                  }}
                  color="danger"
                  type="button"
                >
                  Cancel <i className="fas fa-times-circle"></i>
                </Button>
                <Button className="m-1" color="primary" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
        <Modal
          size="md"
          isOpen={modal_small1}
          toggle={() => {
            tog_small1()
          }}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Reject
            </h5>
            <button
              onClick={() => {
                setmodal_small1(false)
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
            <Col md={12}>
              <img src={Trash} width="100%" height="280px"></img>
            </Col>
            <Form
              onSubmit={e => {
                handleSubmit1(e)
              }}
            >
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">
                  Reject Reason <span className="text-danger">*</span>
                </Label>
                <textarea
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter Reject Reason"
                  required
                  rows={3}
                  name="rejectionReason"
                  value={form1.rejectionReason}
                  onChange={e => {
                    handleChange1(e)
                  }}
                />
              </div>

              <div style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    setmodal_small(false)
                  }}
                  color="danger"
                  type="button"
                >
                  Cancel <i className="fas fa-times-circle"></i>
                </Button>
                <Button className="m-1" color="primary" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
      <ToastContainer />
    </React.Fragment>
  )
}

export default ViewAdvertising
