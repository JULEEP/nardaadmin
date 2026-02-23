import React, { useState, useEffect } from "react"
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
  Badge,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { URLS } from "../../Url"
import axios from "axios"

function LocalNewsView() {
  const history = useHistory()

  const [form, setform] = useState({})
  const [items, setitems] = useState([])
  const [Locations, setLocations] = useState([])
  const [Category, setCategory] = useState([])
  const [Tags, setTags] = useState([])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  useEffect(() => {
    Getslider()
  }, [])

  const Sliderid = sessionStorage.getItem("Newsid")

  const Getslider = () => {
    var token = datas

    const dataArray = {
      id: Sliderid,
    }

    axios
      .post(URLS.GetOneNews, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res?.data?.news || {})
        setTags(res?.data?.news?.tags || [])
        setitems(res?.data?.news?.image || [])
        setLocations(res?.data?.news?.location || [])
        setCategory(res?.data?.news?.category || [])
      })
      .catch(error => {
        console.error("Error fetching news:", error)
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

  const slides = items.map((item, index) => {
    return (
      <CarouselItem onExiting={onExiting} onExited={onExited} key={index}>
        <img
          src={URLS.Base + item}
          style={{ width: "100%", height: "500px", objectFit: "cover" }}
          alt={`News ${index + 1}`}
        />
      </CarouselItem>
    )
  })

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN') + " " + date.toLocaleTimeString('en-IN')
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="News" breadcrumbItem="View News" />
          <Row>
            <Col>
              <Button
                onClick={() => history.goBack()}
                className="mb-3 m-1"
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
                      <div className="col-xl-10">
                        <div>
                          {/* Header Section */}
                          <div className="text-center">
                            <div className="mb-4">
                              <Link className="badge bg-light font-size-12">
                                <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>
                                News Details
                              </Link>
                            </div>
                            <h2 className="text-primary">{form?.title}</h2>
                            <p className="mb-4 text-muted">
                              <i className="mdi mdi-calendar me-1"></i>
                              {formatDate(form?.createdAt)}
                            </p>
                            
                            {/* Status Badges */}
                            <div className="mb-3">
                              {form?.isPremium && (
                                <Badge color="warning" className="me-2">
                                  <i className="bx bx-crown align-middle me-1"></i>
                                  Premium
                                </Badge>
                              )}
                              {form?.topnews && (
                                <Badge color="success" className="me-2">
                                  <i className="bx bx-star align-middle me-1"></i>
                                  Top News
                                </Badge>
                              )}
                              <Badge color={form?.status === 'active' ? 'success' : 'warning'} className="me-2">
                                {form?.status}
                              </Badge>
                              <Badge color={form?.allowCopy === 'both' ? 'info' : 'secondary'}>
                                Allow Copy: {form?.allowCopy}
                              </Badge>
                            </div>
                          </div>
                          
                          <hr />

                          {/* Basic Info */}
                          <div className="text-center">
                            <Row>
                              <Col sm={3}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Reporter</p>
                                  <h5 className="font-size-15 text-primary">
                                    {form?.reporter || "N/A"}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div>
                                  <p className="text-muted mb-2">Published</p>
                                  <h5 className="font-size-15">
                                    <Badge color={form?.ispublished ? 'success' : 'warning'}>
                                      {form?.ispublished ? 'Yes' : 'No'}
                                    </Badge>
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Premium</p>
                                  <h5 className="font-size-15">
                                    <Badge color={form?.isPremium ? 'warning' : 'secondary'}>
                                      {form?.isPremium ? 'Yes' : 'No'}
                                    </Badge>
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">Time to Read</p>
                                  <h5 className="font-size-15 text-primary">
                                    {form?.timetoread || "N/A"}
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <hr />

                          {/* Main Images Carousel */}
                          {items.length > 0 && (
                            <div className="my-5">
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
                          )}

                          {/* Middle Image */}
                          {form?.middleImage && (
                            <div className="my-5 text-center">
                              <h5 className="mb-3 text-primary">Middle Content Image</h5>
                              <img
                                src={URLS.Base + form.middleImage}
                                style={{ 
                                  width: "100%", 
                                  maxHeight: "500px", 
                                  objectFit: "cover" 
                                }}
                                alt="Middle content"
                                className="img-thumbnail"
                              />
                            </div>
                          )}

                          <hr />

                          {/* Views Only */}
                          <Row>
                            <Col md={12}>
                              <div className="text-center">
                                <a className="text-muted">
                                  <i
                                    className="fas fa-eye align-middle text-muted me-1"
                                    style={{
                                      fontSize: "25px",
                                      color: "black",
                                    }}
                                  ></i>
                                  {form?.views || 0} Views
                                </a>
                              </div>
                            </Col>
                          </Row>

                          {/* Short Description */}
                          {form?.shortdescription && (
                            <div className="mt-4">
                              <h5 className="text-primary">Short Description</h5>
                              <p className="text-muted">{form.shortdescription}</p>
                              <hr />
                            </div>
                          )}

                          {/* Main Content */}
                          <div className="mt-4">
                            <div className="text-muted font-size-14">
                              <div
                                className="mt-3"
                                style={{ width: "100%" }}
                                dangerouslySetInnerHTML={{
                                  __html: form?.allcontent || form?.description,
                                }}
                              ></div>
                            </div>
                          </div>

                          <hr />

                          {/* Additional Information */}
                          <div className="text-center mb-3">
                            
                            {/* Allow Copy Setting */}
                            <Row>
                              <Col sm={12} className="mb-4">
                                <div>
                                  <h5 className="mb-2 text-primary">Copy Settings</h5>
                                  <hr />
                                  <h5 className="font-size-15">
                                    <Badge 
                                      color={
                                        form?.allowCopy === 'both' ? 'success' : 
                                        form?.allowCopy === 'text' ? 'info' : 
                                        form?.allowCopy === 'image' ? 'warning' : 'secondary'
                                      }
                                    >
                                      Allow Copy: {form?.allowCopy ? form.allowCopy.toUpperCase() : 'N/A'}
                                    </Badge>
                                  </h5>
                                </div>
                              </Col>
                            </Row>

                            {/* Location */}
                            <Row>
                              <Col sm={12} className="mb-4">
                                <div>
                                  <h5 className="mb-2 text-primary">Location</h5>
                                  <hr />
                                  <div className="mb-4">
                                    {Locations?.length > 0 ? (
                                      Locations.map((data, key) => (
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
                                      ))
                                    ) : (
                                      <p className="text-muted">No locations specified</p>
                                    )}
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            {/* Categories */}
                            {/* <Row>
                              <Col sm={12} className="mb-4">
                                <div>
                                  <h5 className="mb-2 text-primary">Categories</h5>
                                  <hr />
                                  <div className="mb-4">
                                    {Category?.length > 0 ? (
                                      Category.map((data, key) => (
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
                                      ))
                                    ) : (
                                      <p className="text-muted">No categories specified</p>
                                    )}
                                  </div>
                                </div>
                              </Col>
                            </Row> */}

                            {/* Tags */}
                            {/* <Row>
                              <Col sm={12} className="mb-4">
                                <div>
                                  <h5 className="mb-2 text-primary">Tags</h5>
                                  <hr />
                                  <div className="mb-4">
                                    {Tags?.length > 0 ? (
                                      Tags.map((data, key) => (
                                        <Button
                                          key={key}
                                          size="sm"
                                          className="m-1"
                                          color="primary"
                                          outline
                                        >
                                          <small className="d-flex">{data}</small>
                                        </Button>
                                      ))
                                    ) : (
                                      <p className="text-muted">No tags specified</p>
                                    )}
                                  </div>
                                </div>
                              </Col>
                            </Row> */}
                          </div>

                          {/* Timestamps */}
                          <hr />
                          <div className="text-muted small">
                            <Row>
                              <Col sm={6}>
                                <p><strong>Created:</strong> {formatDate(form?.createdAt)}</p>
                              </Col>
                              <Col sm={6}>
                                <p><strong>Last Updated:</strong> {formatDate(form?.updatedAt)}</p>
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