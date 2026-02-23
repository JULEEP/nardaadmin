import React, { useState, useEffect } from "react"
import { Container, Card, CardBody, Col, Row, Button } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { URLS } from "../../Url"
import axios from "axios"

function LocalNewsView() {
  const history = useHistory()

  const [form, setform] = useState([])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  useEffect(() => {
    Getslider()
  }, [])

  const Sliderid = sessionStorage.getItem("Videoid")

  const [Locations, setLocations] = useState([])

  const [Category, setCategory] = useState([])

  const [Tags, setTags] = useState([])

  const Getslider = () => {
    var token = datas

    const dataArray = {
      id: Sliderid,
    }

    axios
      .post(URLS.GetOneVideo, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res?.data?.video[0])
        setTags(res?.data?.video[0].tags)
        setLocations(res?.data?.video[0]?.location)
        setCategory(res?.data?.video[0]?.category)
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="News" breadcrumbItem="Video Details" />
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
                              <Link className="badge bg-light font-size-12 ">
                                <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>
                                Video Details
                              </Link>
                            </div>
                            <h4 className="text-primary">{form?.title}</h4>
                            <p className="mb-4 text-primary">
                              <i className="mdi mdi-calendar me-1"></i>
                              {form?.createdAt?.slice(0, 10)}
                            </p>
                          </div>
                          <hr />
                          <div className="text-center">
                            <Row>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Post-by</p>
                                  <h5 className="font-size-15 text-primary">
                                    {form?.reporter}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div>
                                  <p className="text-muted mb-2">
                                    Is-Published
                                  </p>
                                  <h5 className="font-size-15 text-primary">
                                    {form?.isPremium == true ? (
                                      <>Yes</>
                                    ) : (
                                      <>No</>
                                    )}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Is-Premium</p>
                                  <h5 className="font-size-15 text-primary">
                                    {form?.ispublished == true ? (
                                      <>Yes</>
                                    ) : (
                                      <>No</>
                                    )}
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <hr />
                          <div className="my-5">
                            {form?.youtube == true ? (
                              <>
                                <iframe
                                 style={{ width: "100%" ,height:"400px"}}
                                  src={form?.video}
                                  title="YouTube video player"
                                  frameBorder={0}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  allowFullScreen=""
                                />
                              </>
                            ) : (
                              <>
                                <video
                                  controls
                                  style={{ width: "100%" }}
                                  src={URLS?.Base + form?.video}
                                />
                              </>
                            )}
                          </div>
                          <hr />
                          <Row>
                            <Col md={6}>
                              <ul className="list-inline">
                                <li className="list-inline-item mr-5">
                                  <a className="text-muted">
                                    <i
                                      className="bx bx-like align-middle text-muted me-1"
                                      style={{
                                        fontSize: "  25px",
                                        color: "black",
                                      }}
                                    ></i>
                                    {form?.likes}
                                  </a>
                                </li>
                              </ul>
                            </Col>
                            <Col md={6}>
                              <div style={{ float: "right" }}>
                                <ul className="list-inline">
                                  <li className="list-inline-item mr-5">
                                    <a className="text-muted">
                                      <i
                                        className="fas fa-eye align-middle text-muted me-1"
                                        style={{
                                          fontSize: "  25px",
                                          color: "black",
                                        }}
                                      ></i>
                                      {form?.views}
                                    </a>
                                  </li>
                                  <li className="list-inline-item mr-3">
                                    <a className="text-muted">
                                      <i
                                        className="bx bx-comment-dots align-middle text-muted me-1"
                                        style={{
                                          fontSize: "  25px",
                                          color: "black",
                                        }}
                                      ></i>
                                      {form?.comments}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={12}>
                              <div className="mt-4">
                                <div className="text-muted font-size-14">
                                  <div
                                    className="mt-3"
                                    style={{ width: "90%" }}
                                    dangerouslySetInnerHTML={{
                                      __html: form?.description,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <hr />
                          <div className="text-center mb-3">
                            <Row>
                              <Col sm={12}>
                                <div>
                                  <h5 className=" mb-2  text-primary">
                                    Location
                                  </h5>
                                  <hr />
                                  <h5 className="font-size-15 mb-4">
                                    {Locations?.map((data, key) => (
                                      <Button
                                        key={key}
                                        size="sm"
                                        className="m-1"
                                        color="primary"
                                        outline
                                      >
                                        <small className="d-flex">
                                          {data?.label}
                                        </small>
                                      </Button>
                                    ))}
                                  </h5>
                                </div>
                              </Col>{" "}
                              <hr />
                              <Col sm={12}>
                                <div className="mt-4 mt-sm-0">
                                  <h5 className=" mb-2  text-primary">
                                    Categories
                                  </h5>
                                  <hr />
                                  <h5 className="font-size-15 mb-4">
                                    {Category?.map((data, key) => (
                                      <Button
                                        key={key}
                                        size="sm"
                                        className="m-1"
                                        color="primary"
                                        outline
                                      >
                                        <small className="d-flex">
                                          {data?.label}
                                        </small>
                                      </Button>
                                    ))}
                                  </h5>
                                </div>
                              </Col>{" "}
                              <hr />
                              <Col sm={12}>
                                <div className="mt-4 mt-sm-0">
                                  <h5 className=" mb-2 text-primary">Tags</h5>
                                  <hr />
                                  <h5 className="font-size-15 mb-4">
                                    {Tags?.map((data, key) => (
                                      <Button
                                        key={key}
                                        size="sm"
                                        className="m-1"
                                        color="primary"
                                        outline
                                      >
                                        <small className="d-flex">{data}</small>
                                      </Button>
                                    ))}
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
        </Container>
      </div>
    </React.Fragment>
  )
}

export default LocalNewsView
