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
  Badge
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { URLS } from "../../Url"
import axios from "axios"

function LocalNewsView() {
  const history = useHistory()

  const [form, setform] = useState([])
  const [Locations, setLocations] = useState([])
  const [Category, setCategory] = useState([])
  const [Tags, setTags] = useState([])
  const [items, setitems] = useState([])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const Sliderid = sessionStorage.getItem("Articleid")

  useEffect(() => {
    Getslider()
  }, [])

  const Getslider = () => {
    var token = datas

    const dataArray = {
      id: Sliderid,
    }

    axios
      .post(URLS.GetOneArticle, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res?.data?.artcile[0])
        setTags(res?.data?.artcile[0]?.tags || [])
        setitems(res.data.artcile[0]?.image || [])
        setLocations(res?.data?.artcile[0]?.location || [])
        setCategory(res?.data?.artcile[0]?.category || [])
      })
      .catch(error => {
        console.error("Error fetching article:", error)
      })
  }

  // Carousel state and functions
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
      <CarouselItem 
        onExiting={onExiting} 
        onExited={onExited} 
        key={index}
      >
        <div className="d-flex justify-content-center">
          <img
            src={URLS.Base + item}
            style={{ 
              width: "100%", 
              height: "500px", 
              objectFit: "cover",
              borderRadius: "10px"
            }}
            alt={`Article image ${index + 1}`}
          />
        </div>
      </CarouselItem>
    )
  })

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get allow copy text
  const getAllowCopyText = (allowCopy) => {
    switch(allowCopy) {
      case 'both': return 'Both Subscribed & Unsubscribed';
      case 'subscribed': return 'Subscribed Users Only';
      case 'unsubscribed': return 'Unsubscribed Users Only';
      case 'none': return 'Copy Disabled';
      default: return 'Both Subscribed & Unsubscribed';
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="News" breadcrumbItem="Article Details" />
          
          {/* Back Button */}
          <Row>
            <Col>
              <Button
                onClick={() => history.goBack()}
                className="mb-3"
                color="primary"
                outline
              >
                <i className="fas fa-arrow-left me-2"></i> Back to Articles
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
                        
                        {/* Article Header */}
                        <div className="text-center mb-4">
                          <div className="mb-3">
                            <Badge color="light" className="fs-6 text-dark">
                              <i className="bx bx-purchase-tag-alt align-middle text-primary me-1"></i>
                              Article Details
                            </Badge>
                          </div>
                          <h2 className="text-primary fw-bold">{form?.title}</h2>
                          <p className="text-muted fs-5">
                            <i className="mdi mdi-calendar text-primary me-2"></i>
                            Published on {formatDate(form?.createdAt)}
                          </p>
                        </div>

                        <hr />

                        {/* Article Stats */}
                        <div className="text-center">
                          <Row>
                            <Col sm={3}>
                              <div className="mb-3">
                                <p className="text-muted mb-1">Reporter</p>
                                <h5 className="text-primary fw-semibold">
                                  {form?.reporter || 'N/A'}
                                </h5>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div className="mb-3">
                                <p className="text-muted mb-1">Published</p>
                                <h5 className="text-primary fw-semibold">
                                  {form?.ispublished ? (
                                    <Badge color="success">Yes</Badge>
                                  ) : (
                                    <Badge color="secondary">No</Badge>
                                  )}
                                </h5>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div className="mb-3">
                                <p className="text-muted mb-1">Premium</p>
                                <h5 className="text-primary fw-semibold">
                                  {form?.isPremium ? (
                                    <Badge color="warning">Yes</Badge>
                                  ) : (
                                    <Badge color="secondary">No</Badge>
                                  )}
                                </h5>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div className="mb-3">
                                <p className="text-muted mb-1">Top News</p>
                                <h5 className="text-primary fw-semibold">
                                  {form?.topnews ? (
                                    <Badge color="info">Yes</Badge>
                                  ) : (
                                    <Badge color="secondary">No</Badge>
                                  )}
                                </h5>
                              </div>
                            </Col>
                            <Col sm={3}>
                              <div className="mb-3">
                                <p className="text-muted mb-1">Read Time</p>
                                <h5 className="text-primary fw-semibold">
                                  {form?.timetoread || 'N/A'}
                                </h5>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        <hr />

                        {/* Image Carousel */}
                        {items.length > 0 && (
                          <div className="my-5">
                            <Carousel
                              activeIndex={activeIndex}
                              fade={true}
                              next={next}
                              previous={previous}
                              interval={5000}
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
                            <div className="text-center mt-2">
                              <small className="text-muted">
                                Image {activeIndex + 1} of {items.length}
                              </small>
                            </div>
                          </div>
                        )}

                        {/* Middle Image */}
                        {form?.middleImage && (
                          <div className="my-4 text-center">
                            <img
                              src={URLS.Base + form.middleImage}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "400px",
                                objectFit: "contain",
                                borderRadius: "10px"
                              }}
                              alt="Middle content"
                              className="img-fluid"
                            />
                          </div>
                        )}

                        <hr />

                        {/* Engagement Stats - Only Views */}
                        <Row className="mb-4">
                          <Col md={6}>
                            <div className="d-flex align-items-center gap-4">
                              <div className="text-center">
                                <i className="fas fa-eye text-primary fs-4"></i>
                                <p className="mb-0 mt-1 text-muted">Views</p>
                                <h5 className="mb-0">{form?.views || 0}</h5>
                              </div>
                            </div>
                          </Col>
                          <Col md={6} className="text-end">
                            <div className="text-muted">
                              <small>Copy Permission: {getAllowCopyText(form?.allowCopy)}</small>
                            </div>
                          </Col>
                        </Row>

                        <hr />

                        {/* Short Description */}
                        <blockquote className="p-4 bg-light rounded mb-4 border">
                          <div className="d-flex">
                            <div className="me-3">
                              <i className="bx bxs-quote-alt-left text-primary fs-2"></i>
                            </div>
                            <div className="flex-grow-1">
                              <p className="mb-0 fs-5 text-dark">
                                {form?.shortdescription}
                              </p>
                            </div>
                          </div>
                        </blockquote>

                        {/* Main Content */}
                        <Row>
                          <Col sm={12}>
                            <div className="mt-4">
                              <h5 className="text-primary mb-3">Article Content</h5>
                              <div
                                className="article-content"
                                dangerouslySetInnerHTML={{
                                  __html: form?.allcontent,
                                }}
                              ></div>
                            </div>
                          </Col>
                        </Row>

                        <hr />

                        {/* Meta Information */}
                        <div className="text-center">
                          <Row>
                            {/* Locations */}
                            <Col sm={12} className="mb-4">
                              <div>
                                <h5 className="text-primary mb-3">
                                  <i className="bx bx-map me-2"></i>
                                  Locations
                                </h5>
                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                  {Locations.length > 0 ? (
                                    Locations.map((data, key) => (
                                      <Badge
                                        key={key}
                                        color="primary"
                                        className="px-3 py-2 fs-6"
                                      >
                                        {data?.label}
                                      </Badge>
                                    ))
                                  ) : (
                                    <p className="text-muted">No locations specified</p>
                                  )}
                                </div>
                              </div>
                            </Col>

                            {/* Categories */}
                            {/* <Col sm={12} className="mb-4">
                              <div>
                                <h5 className="text-primary mb-3">
                                  <i className="bx bx-category me-2"></i>
                                  Categories
                                </h5>
                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                  {Category.length > 0 ? (
                                    Category.map((data, key) => (
                                      <Badge
                                        key={key}
                                        color="success"
                                        className="px-3 py-2 fs-6"
                                      >
                                        {data?.label}
                                      </Badge>
                                    ))
                                  ) : (
                                    <p className="text-muted">No categories specified</p>
                                  )}
                                </div>
                              </div>
                            </Col> */}

                            {/* Tags */}
                            {/* <Col sm={12} className="mb-4">
                              <div>
                                <h5 className="text-primary mb-3">
                                  <i className="bx bx-tag me-2"></i>
                                  Tags
                                </h5>
                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                  {Tags.length > 0 ? (
                                    Tags.map((data, key) => (
                                      <Badge
                                        key={key}
                                        color="info"
                                        className="px-3 py-2 fs-6"
                                      >
                                        {data}
                                      </Badge>
                                    ))
                                  ) : (
                                    <p className="text-muted">No tags specified</p>
                                  )}
                                </div>
                              </div>
                            </Col> */}
                          </Row>
                        </div>

                        {/* Article Footer */}
                        <div className="text-center mt-5 pt-4 border-top">
                          <p className="text-muted">
                            Article ID: {form?._id} | 
                            Created By: {form?.createdBy} | 
                            Last Updated: {formatDate(form?.updatedAt)}
                          </p>
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

      {/* Custom Styles */}
      <style>
        {`
          .article-content {
            line-height: 1.8;
            font-size: 1.1rem;
          }
          .article-content p {
            margin-bottom: 1rem;
          }
          .article-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1rem 0;
          }
          .carousel-control-prev,
          .carousel-control-next {
            width: 5%;
          }
        `}
      </style>
    </React.Fragment>
  )
}

export default LocalNewsView