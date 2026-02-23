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
  Input,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useHistory } from "react-router-dom"
import mark from "../../assets/images/cn.gif"
import axios from "axios"
import { URLS } from "../../Url"
import { ToastContainer, toast } from "react-toastify"

function LocalNewsView() {
  const history = useHistory()

  const [formg, setformg] = useState({ allcustomers: false })

  const handleChange = e => {
    const myUser = { ...formg }
    myUser[e.target.name] = e.target.checked
    setformg(myUser)
  }

  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const [modal_small1, setmodal_small1] = useState(false)

  function tog_small1() {
    setmodal_small1(!modal_small1)
  }

  const [time, setime] = useState([])

  const [sts, setsts] = useState([])

  const [cts, setcts] = useState([])

  const [dts, setdts] = useState([])

  const [form, setform] = useState([])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  useEffect(() => {
    getpendingnews()
  }, [])

  const Agentid = sessionStorage.getItem("Agentid")

  const getpendingnews = () => {
    var token = datas

    const dataArray = new FormData()
    dataArray.append("_id", Agentid)
    axios
      .post(URLS.GetRejectlocalnewsView, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res.data.localNews)
        setime(res.data.localNews.newTimings)
        setsts(res.data.localNews.stateName)
        setcts(res.data.localNews.constituencyName)
        setdts(res.data.localNews.districtName)
      })
  }

  const handleSubmit2 = e => {
    e.preventDefault()
    EditNews2()
  }
  const EditNews2 = () => {
    var token = datas
    var formid = form._id
    const data = { allcustomers: formg.allcustomers }
    axios
      .put(URLS.Approvelocalnews + "/" + formid, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            setmodal_small(false)
            history.push(
              "./ApprovedLocalNews",
              sessionStorage.setItem(
                "tost",
                "News has been Approved successfully"
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
          <Breadcrumbs title="News" breadcrumbItem="News Details" />
          <Row>
            <Col>
              <Button
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
              </Button> */}

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
                              <Link
                                to="#"
                                className="badge bg-light font-size-12"
                              >
                                <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                News Details
                              </Link>
                            </div>
                            <h4>{form.headLine}</h4>
                            <p className="text-muted mb-4">
                              <i className="mdi mdi-calendar me-1"></i>

                              {time.rejectNewDate == "" ? (
                                <>{form.dateOfNews}</>
                              ) : (
                                <>
                                  {" "}
                                  {time.rejectNewDate}/{time.rejectNewTime}
                                </>
                              )}
                            </p>
                          </div>
                          <hr />
                          <div className="text-center">
                            <Row>
                              <Col sm={4}>
                                <div>
                                  <p className="text-muted mb-2">Categories</p>
                                  <h5 className="font-size-15">News</h5>
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
                                    {form.createrName}
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <hr />
                          <div className="my-5">
                            {form.imageType == "false" ? (
                              <>
                                <video
                                  controls
                                  style={{ width: "100%" }}
                                  src={URLS.Base + form.image}
                                />
                              </>
                            ) : (
                              <>
                                {" "}
                                <img
                                  src={URLS.Base + form.image}
                                  alt=""
                                  className="img-thumbnail mx-auto d-block"
                                />
                              </>
                            )}
                          </div>
                          <hr />
                          <span>Link :</span>{" "}
                          <a
                            href={form.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-danger"
                          >
                            <small>{form.link}</small>
                          </a>
                          <div className="mt-4">
                            <div className="text-muted font-size-14">
                              <p>{form.description}</p>

                              <blockquote className="p-4 border-light border rounded mb-4">
                                <div className="d-flex">
                                  <div className="me-3">
                                    <i className="bx bxs-quote-alt-left text-dark font-size-24"></i>
                                  </div>
                                  <div>
                                    <p className="mb-0"> {form.languageName}</p>
                                  </div>
                                </div>
                              </blockquote>
                            </div>
                          </div>
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
                                    {dts.length > 1 || sts.length > 1 ? (
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
                                    {cts.length > 1 || dts.length ? (
                                      <>{"All"}</>
                                    ) : (
                                      <> {form.constituencyName}</>
                                    )}
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal
            size="md"
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
                <hr></hr>
                <div>
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={formg.allcustomers}
                    name="allcustomers"
                    value={formg.allcustomers}
                    onClick={e => {
                      handleChange(e)
                    }}
                    style={{ fontSize: "24px" }}
                    id="read"
                  />

                  <Label className="form-check-label mt-2 ml-3" for="read ">
                    Send Notification To All
                  </Label>
                </div>
                <hr></hr>
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
          </Modal>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default LocalNewsView
