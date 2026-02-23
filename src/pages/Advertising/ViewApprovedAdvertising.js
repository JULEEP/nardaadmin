import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Container, Card, CardBody, Col, Row, Button } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import ReactPaginate from "react-paginate"
import { URLS } from "../../Url"
import axios from "axios"

function ViewAdvertising() {
  const history = useHistory()
  const [form, setForm] = useState({})
  const [comments, setComments] = useState([])
  const [locations, setLocations] = useState([])
  const [category, setCategory] = useState([])

  const getToken = JSON.parse(localStorage.getItem("authUser"))?.token
  const sliderId = sessionStorage.getItem("PosterId")

  const [listPerPage] = useState(20)
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    fetchPoster()
  }, [])

  const fetchPoster = () => {
    axios
      .post(
        URLS.GetOnePosters,
        { id: sliderId },
        { headers: { Authorization: `Bearer ${getToken}` } }
      )
      .then((res) => {
        const poster = res.data.poster[0] || {}
        setForm(poster)
        setLocations(poster.location || [])
        setCategory(poster.category || [])
        setComments(res.data.comments || [])
      })
      .catch(() => toast("Error fetching poster details"))
  }

  const pagesVisited = pageNumber * listPerPage
  const lists = comments.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(comments.length / listPerPage)
  const changePage = ({ selected }) => setPageNumber(selected)

  const manageDelete = (data) => {
    if (window.confirm("Do you really want to Delete?")) {
      axios
        .post(
          URLS.DeleteComment,
          { id: data._id },
          { headers: { Authorization: `Bearer ${getToken}` } }
        )
        .then((res) => {
          toast(res.data.message)
          fetchPoster()
        })
        .catch((err) => toast(err?.response?.data?.message || "Delete failed"))
    }
  }

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Narada Media" breadcrumbItem="View Poster" />
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
                <div className="text-center">
                  <h4>{form.title}</h4>
                  <p>
                    Reporter: <b>{form.reporter}</b> | Poster Id: <b>{form.posterId}</b> | Created At: <b>{form.updatedAt?.slice(0, 10)}</b> | Expiry Date: <b>{form.expirydate?.slice(0, 10)}</b>
                  </p>

                  {/* Display all images */}
                  <Row className="my-4 justify-content-center">
                    {form.image?.length > 0 ? (
                      form.image.map((img, index) => (
                        <Col key={index} sm={6} md={4} className="mb-3">
                          <img
                            src={URLS.Base + img}
                            alt={`Poster ${index + 1}`}
                            style={{ width: "100%", height: "300px", objectFit: "cover" }}
                            className="img-thumbnail"
                          />
                        </Col>
                      ))
                    ) : (
                      <p>No Images</p>
                    )}
                  </Row>

                  {/* Likes, Views, Comments */}
                  <Row className="mb-3">
                    <Col>
                      <p>Likes: {form.likes || 0}</p>
                      <p>Views: {form.views || 0}</p>
                      <p>Comments: {form.comments || 0}</p>
                    </Col>
                  </Row>

                  {/* Locations and Categories */}
                  <Row className="mb-3">
                    <Col>
                      <h5>Locations:</h5>
                      {locations.map((loc, idx) => (
                        <Button key={idx} size="sm" className="m-1" color="primary" outline>
                          {loc.label}
                        </Button>
                      ))}
                    </Col>
                    <Col>
                      <h5>Categories:</h5>
                      {category.map((cat, idx) => (
                        <Button key={idx} size="sm" className="m-1" color="primary" outline>
                          {cat.label}
                        </Button>
                      ))}
                    </Col>
                  </Row>

                  {/* Comments */}
                  <div className="mt-5">
                    <h5>Comments:</h5>
                    {lists.length === 0 ? (
                      <p className="text-center mt-3"><b>No Data Found...</b></p>
                    ) : (
                      lists.map((comment, idx) => (
                        <div key={idx} className="d-flex py-3 border-bottom">
                          <div className="flex-shrink-0 me-3">
                            <img
                              src={URLS.Base + comment.image}
                              alt=""
                              style={{ width: "40px", height: "40px" }}
                              className="rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1">
                            <h6>
                              {comment.name}
                              <small className="text-muted float-end">
                                {comment.commentedAt}
                                <Button
                                  size="sm"
                                  color="danger"
                                  className="m-1"
                                  onClick={() => manageDelete(comment)}
                                >
                                  Delete
                                </Button>
                              </small>
                            </h6>
                            <p>{comment.comment}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Pagination */}
                  {lists.length > 0 && (
                    <div className="mt-3" style={{ float: "right" }}>
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"disabled"}
                        activeClassName={"active"}
                      />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  )
}

export default ViewAdvertising
