import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Badge
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { URLS } from "../../Url"

function LocalNewsView() {
  const history = useHistory()
  const [form, setform] = useState([])
  const [items, setitems] = useState([])
  const [tags, settags] = useState([])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  useEffect(() => {
    Getslider()
  }, [])

  const Sliderid = sessionStorage.getItem("Sliderid")

  const Getslider = () => {
    var token = datas

    const dataArray = {
      id: Sliderid,
    }

    axios
      .post(URLS.GetOneSlider, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res.data.slider[0])
        setitems(res.data.slider[0].sliders)
        settags(res.data.slider[0].tags)
      })
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const onExiting = () => {
    setAnimating(true)
  }

  const onExited = () => {
    setAnimating(false)
  }

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = newIndex => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const slides = items.map(item => {
    return (
      <CarouselItem onExiting={onExiting} onExited={onExited} key={item}>
        <img
          src={URLS.Base + item}
          style={{ width: "100%" }}
          alt={item}
        />
      </CarouselItem>
    )
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="News" breadcrumbItem="View Slider" />
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
                              <Link
                                to="#"
                                className="badge bg-light font-size-12"
                              >
                                <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                Slider Details
                              </Link>
                            </div>
                            <h4 className="text-primary">{form.title}</h4>
                            <p className="text-muted mb-4">
                              <i className="mdi mdi-calendar me-1"></i>
                              {form.expirydate}
                            </p>
                          </div>
                          <hr />
                          <div className="text-center">
                            <Row>
                              <Col sm={4}>
                                <div>
                                  <p className="text-muted mb-2">Type</p>
                                  <h5 className="font-size-15">
                                    <Badge color="primary">
                                      {form.type?.toUpperCase() || 'SLIDER'}
                                    </Badge>
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Reporter</p>
                                  <h5 className="font-size-15">
                                    {form.reporter}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Status</p>
                                  <h5 className="font-size-15">
                                    <Badge color={form.status === 'active' ? 'success' : 'warning'}>
                                      {form.status?.toUpperCase() || 'INACTIVE'}
                                    </Badge>
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <hr />
                          <div>
                            <Carousel
                              activeIndex={activeIndex}
                              fade={true}
                              next={next}
                              previous={previous}
                            >
                              <CarouselIndicators
                                items={items}
                                activeIndex={activeIndex}
                                onClickHandler={goToIndex}
                              />
                              {slides}
                              <CarouselControl
                                direction="prev"
                                directionText="Previous"
                                onClickHandler={previous}
                              />
                              <CarouselControl
                                direction="next"
                                directionText="Next"
                                onClickHandler={next}
                              />
                            </Carousel>
                          </div>
                          <hr />
                          <Row>
                            <Col md={6}>
                              <div>
                                <ul className="list-inline">
                                  <li className="list-inline-item mr-5">
                                    <a className="text-muted">
                                      <i
                                        className="fas fa-eye align-middle text-muted me-1"
                                        style={{
                                          fontSize: "25px",
                                          color: "black",
                                        }}
                                      ></i>{" "}
                                      {form.views || 0}
                                    </a>
                                  </li>
                                  <li className="list-inline-item mr-5">
                                    <a className="text-muted">
                                      <i
                                        className="fas fa-heart align-middle text-muted me-1"
                                        style={{
                                          fontSize: "25px",
                                          color: "red",
                                        }}
                                      ></i>{" "}
                                      {form.likes || 0}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </Col>
                          </Row>
                          <hr />
                          {/* <div className="mt-4">
                            <div className="text-muted font-size-14">
                              <blockquote className="p-4 border-light border rounded mb-4">
                                <div className="d-flex">
                                  <div className="me-3">
                                    <i className="bx bxs-quote-alt-left text-dark font-size-24"></i>
                                  </div>
                                  <div>
                                    <p className="mb-0">
                                      {" "}
                                      {tags && tags.map((data, key) => (
                                        <span key={key}>
                                          <Button
                                            size="sm"
                                            className="m-1"
                                            color="primary"
                                            outline
                                          >
                                            #{data}
                                          </Button>
                                          {" "}
                                        </span>
                                      ))}
                                      {(!tags || tags.length === 0) && (
                                        <span className="text-muted">No tags available</span>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </blockquote>
                            </div>
                          </div> */}

                          {/* Additional Information */}
                          <div className="mt-4">
                            <Row>
                              <Col sm={6}>
                                <div className="text-center">
                                  <h5 className="text-primary mb-3">Engagement Stats</h5>
                                  <div className="d-flex justify-content-center gap-4">
                                    <div className="text-center">
                                      <i className="fas fa-heart text-danger fs-4"></i>
                                      <p className="mb-0 mt-1 text-muted">Likes</p>
                                      <h5 className="mb-0">{form.likes || 0}</h5>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="text-center">
                                  <h5 className="text-primary mb-3">Settings</h5>
                                  <div className="d-flex flex-column gap-2">
                                    <div>
                                      <Badge color={form.status === 'active' ? 'success' : 'warning'} className="me-2">
                                        Status: {form.status?.toUpperCase() || 'INACTIVE'}
                                      </Badge>
                                    </div>
                                    <div>
                                      <Badge color="primary" className="me-2">
                                        Type: {form.type?.toUpperCase() || 'SLIDER'}
                                      </Badge>
                                    </div>
                                    <div>
                                      <Badge color="secondary" className="me-2">
                                        Created: {new Date(form.createdAt).toLocaleDateString()}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
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