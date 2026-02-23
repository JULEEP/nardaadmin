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
  Badge,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useHistory } from "react-router-dom"
import mark from "../../assets/images/cn.gif"
import Trash from "../../assets/images/trash.gif"
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
  const [modal_small1, setmodal_small1] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  function tog_small1() {
    setmodal_small1(!modal_small1)
  }

  const [news, setNews] = useState({})
  const [loading, setLoading] = useState(true)

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const [form1, setform1] = useState({
    rejectionReason: ""
  })

  useEffect(() => {
    getNewsDetails()
  }, [])

  const newsId = sessionStorage.getItem("pendingnewsid")

  const getNewsDetails = () => {
    var token = datas

    const dataArray = new FormData()
    dataArray.append("_id", newsId)
    
    axios
      .post(URLS.GetpendinglocalnewsView, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.success) {
          setNews(res.data.news)
        } else {
          toast.error(res.data.message)
        }
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching news:", error)
        toast.error("Failed to load news details")
        setLoading(false)
      })
  }

  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    rejectNews()
  }

  const rejectNews = () => {
    var token = datas
    var newsId = news._id

    const dataArray = new FormData()
    dataArray.append("rejectionReason", form1.rejectionReason)

    axios
      .put(URLS.rejectlocalnews + "/RejectLocalNews/" + newsId, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast.success(res.data.message)
            setmodal_small1(false)
            history.push(
              "./",
              sessionStorage.setItem(
                "tost",
                "News has been Rejected successfully"
              )
            )
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message)
          }
        }
      )
  }

  const handleSubmit2 = e => {
    e.preventDefault()
    approveNews()
  }

  const approveNews = () => {
    var token = datas
    var newsId = news._id
    const data = { allcustomers: formg.allcustomers }
    
    axios
      .put(URLS.Approvelocalnews + "/" + newsId, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast.success(res.data.message)
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
            toast.error(error.response.data.message)
          }
        }
      )
  }

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN') + " " + date.toLocaleTimeString('en-IN')
  }

  if (loading) {
    return (
      <div className="page-content">
        <Container fluid>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="News" breadcrumbItem="News Details" />
          
          {/* Action Buttons */}
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

              <Button
                onClick={tog_small1}
                className="mb-3 m-1"
                style={{ float: "right" }}
                color="danger"
              >
                Reject
              </Button>

              <Button
                onClick={tog_small}
                className="mb-3 m-1"
                style={{ float: "right" }}
                color="info"
              >
                Approved
              </Button>
            </Col>
          </Row>

          {/* News Details Card */}
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
                              <Badge color="light" className="font-size-12">
                                <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>
                                News Details
                              </Badge>
                            </div>
                            <h2>{news.title}</h2>
                            <p className="text-muted mb-4">
                              <i className="mdi mdi-calendar me-1"></i>
                              {formatDate(news.createdAt)}
                            </p>
                            
                            {/* Premium Badge */}
                            {news.isPremium && (
                              <Badge color="warning" className="mb-3">
                                <i className="bx bx-crown align-middle me-1"></i>
                                Premium
                              </Badge>
                            )}
                            
                            {/* Top News Badge */}
                            {news.topnews && (
                              <Badge color="success" className="mb-3 ms-2">
                                <i className="bx bx-star align-middle me-1"></i>
                                Top News
                              </Badge>
                            )}
                          </div>
                          
                          <hr />

                          {/* Basic Info */}
                          <div className="text-center">
                            <Row>
                              <Col sm={3}>
                                <div>
                                  <p className="text-muted mb-2">Category</p>
                                  <h5 className="font-size-15">
                                    {news.category && news.category.length > 0 
                                      ? news.category[0].label 
                                      : "N/A"}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div>
                                  <p className="text-muted mb-2">Status</p>
                                  <h5 className="font-size-15">
                                    <Badge color={
                                      news.status === 'active' ? 'success' : 
                                      news.status === 'inactive' ? 'warning' : 'secondary'
                                    }>
                                      {news.status}
                                    </Badge>
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div>
                                  <p className="text-muted mb-2">Reporter</p>
                                  <h5 className="font-size-15">{news.reporter || "N/A"}</h5>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div>
                                  <p className="text-muted mb-2">Time to Read</p>
                                  <h5 className="font-size-15">{news.timetoread || "N/A"}</h5>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <hr />

                          {/* Images Section */}
                          <div className="my-5">
                            {news.image && news.image.length > 0 && (
                              <Row>
                                {news.image.map((img, index) => (
                                  <Col md={6} key={index} className="mb-3">
                                    <img
                                      src={URLS.Base + img}
                                      alt={`News ${index + 1}`}
                                      className="img-thumbnail w-100"
                                      style={{maxHeight: "400px", objectFit: "cover"}}
                                    />
                                  </Col>
                                ))}
                              </Row>
                            )}
                            
                            {/* Middle Image */}
                            {news.middleImage && (
                              <div className="text-center mt-4">
                                <img
                                  src={URLS.Base + news.middleImage}
                                  alt="Middle content"
                                  className="img-thumbnail"
                                  style={{maxHeight: "400px"}}
                                />
                              </div>
                            )}
                          </div>

                          <hr />

                          {/* Short Description */}
                          <div className="mb-4">
                            <h5>Short Description</h5>
                            <p className="text-muted">{news.shortdescription}</p>
                          </div>

                          {/* Full Description */}
                          <div className="mb-4">
                            <h5>Full Description</h5>
                            <div 
                              className="text-muted font-size-14"
                              dangerouslySetInnerHTML={{ __html: news.description }}
                            />
                          </div>

                          {/* All Content */}
                          {news.allcontent && (
                            <div className="mb-4">
                              <h5>Complete Content</h5>
                              <div 
                                className="text-muted font-size-14"
                                dangerouslySetInnerHTML={{ __html: news.allcontent }}
                              />
                            </div>
                          )}

                          <hr />

                          {/* Location Information */}
                          <div className="text-center mb-3">
                            <h5 className="mb-4">Location Details</h5>
                            <Row>
                              <Col sm={4}>
                                <div>
                                  <p className="text-muted mb-2">Location</p>
                                  <h5 className="font-size-15">
                                    {news.location && news.location.length > 0 
                                      ? news.location[0].label 
                                      : "N/A"}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div>
                                  <p className="text-muted mb-2">Allow Copy</p>
                                  <h5 className="font-size-15">
                                    {news.allowCopy ? news.allowCopy.charAt(0).toUpperCase() + news.allowCopy.slice(1) : "N/A"}
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div>
                                  <p className="text-muted mb-2">Published</p>
                                  <h5 className="font-size-15">
                                    <Badge color={news.ispublished ? 'success' : 'warning'}>
                                      {news.ispublished ? 'Yes' : 'No'}
                                    </Badge>
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <hr />

                          {/* Engagement Stats */}
                          <div className="text-center">
                            <h5 className="mb-4">Engagement Statistics</h5>
                            <Row>
                              <Col sm={3}>
                                <div>
                                  <p className="text-muted mb-2">Likes</p>
                                  <h4 className="text-primary">{news.likes || 0}</h4>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div>
                                  <p className="text-muted mb-2">Comments</p>
                                  <h4 className="text-info">{news.comments || 0}</h4>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div>
                                  <p className="text-muted mb-2">Views</p>
                                  <h4 className="text-success">{news.views || 0}</h4>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div>
                                  <p className="text-muted mb-2">Bookmarked</p>
                                  <h4 className="text-warning">
                                    {news.bookmark ? 'Yes' : 'No'}
                                  </h4>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <hr />

                          {/* Timestamps */}
                          <div className="text-muted small">
                            <Row>
                              <Col sm={6}>
                                <p><strong>Created:</strong> {formatDate(news.createdAt)}</p>
                              </Col>
                              <Col sm={6}>
                                <p><strong>Last Updated:</strong> {formatDate(news.updatedAt)}</p>
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

          {/* Approve Modal */}
          <Modal
            size="md"
            isOpen={modal_small}
            toggle={tog_small}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0">Approve News</h5>
              <button
                type="button"
                className="close"
                onClick={tog_small}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form onSubmit={handleSubmit2}>
                <Col md={12}>
                  <img src={mark} width="100%" alt="Approve" />
                </Col>
                <hr />
                <div className="form-check">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    checked={formg.allcustomers}
                    name="allcustomers"
                    onChange={handleChange}
                    id="read"
                  />
                  <Label className="form-check-label mt-2 ml-3" for="read">
                    Send Notification To All
                  </Label>
                </div>
                <hr />
                <div className="text-end">
                  <Button
                    onClick={tog_small}
                    color="danger"
                    type="button"
                    className="me-2"
                  >
                    Cancel <i className="fas fa-times-circle"></i>
                  </Button>
                  <Button color="primary" type="submit">
                    Approve <i className="fas fa-check-circle"></i>
                  </Button>
                </div>
              </Form>
            </div>
          </Modal>

          {/* Reject Modal */}
          <Modal
            size="md"
            isOpen={modal_small1}
            toggle={tog_small1}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0">Reject News</h5>
              <button
                type="button"
                className="close"
                onClick={tog_small1}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Col md={12}>
                <img src={Trash} width="100%" height="250px" alt="Reject" />
              </Col>
              <Form onSubmit={handleSubmit1}>
                <div className="mb-3">
                  <Label for="rejectionReason">
                    Reject Reason <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="textarea"
                    className="form-control"
                    id="rejectionReason"
                    placeholder="Enter Reject Reason"
                    required
                    rows={3}
                    name="rejectionReason"
                    value={form1.rejectionReason}
                    onChange={handleChange1}
                  />
                </div>
                <div className="text-end">
                  <Button
                    onClick={tog_small1}
                    color="danger"
                    type="button"
                    className="me-2"
                  >
                    Cancel <i className="fas fa-times-circle"></i>
                  </Button>
                  <Button color="primary" type="submit">
                    Reject <i className="fas fa-check-circle"></i>
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

export default LocalNewsView