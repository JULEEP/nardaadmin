import React, { useState, useEffect } from "react"
import {
  CardBody,
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { URLS } from "../../Url"
import { useHistory } from "react-router-dom"

function Complaintbox() {
  const [plans, setPlans] = useState([])
  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)
  const history = useHistory()

  const authUser = JSON.parse(localStorage.getItem("authUser"))
  const token = authUser?.token

  // ✅ Fetch posters
  const getPlans = () => {
    axios
      .post(
        URLS.GetPosters,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setPlans(res.data.posters || [])
      })
      .catch(() => toast("Error fetching posters"))
  }

  useEffect(() => {
    getPlans()
    showToastOnce()
  }, [])

  // ✅ Pagination logic
  const pagesVisited = pageNumber * listPerPage
  const lists = plans.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(plans.length / listPerPage)
  const changePage = ({ selected }) => setPageNumber(selected)

  // ✅ Toast message if redirected from Add page
  const showToastOnce = () => {
    const msg = sessionStorage.getItem("tost")
    if (msg) toast(msg)
    sessionStorage.removeItem("tost")
  }

  // ✅ View poster
  const handleView = (poster) => {
    sessionStorage.setItem("PosterId", poster._id)
    history.push("/ViewApprovedAdvertising")
  }

  // ✅ Edit poster
  const handleEdit = (poster) => {
    sessionStorage.setItem("PosterId", poster._id)
    history.push("/EditAdvertising")
  }

  // ✅ Delete poster
  const handleDelete = (poster) => {
    if (window.confirm("Do you really want to Delete?")) {
      axios
        .delete(`${URLS.DeletePosters}${poster._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          toast(res.data.message || "Deleted successfully")
          getPlans()
        })
        .catch((err) =>
          toast(err?.response?.data?.message || "Delete failed")
        )
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Narada Media Admin"
            breadcrumbItem="Published Posters List"
          />
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table table-bordered mb-4 mt-3">
                      <thead>
                        <tr className="text-center">
                          <th>S.No</th>
                          <th>Reporter</th>
                          <th>Title</th>
                          <th>Created Date</th>
                          <th>Expiry Date</th>
                          <th>Poster</th>
                          <th>Action</th>
                        </tr>
                      </thead>


                      <tbody className="text-center">
                        {lists.length > 0 ? (
                          lists.map((poster, index) => (
                            <tr key={poster._id}>
                              <td>{pagesVisited + index + 1}</td>
                              <td>{poster.reporter || "N/A"}</td>
                              <td>{poster.title || "Untitled"}</td>
                              <td>{poster.createdAt?.slice(0, 10)}</td>

                              {/* ✅ Expiry Date formatted in IST */}
                              <td>
                                {poster.expirydate
                                  ? new Date(poster.expirydate).toLocaleString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                  })
                                  : "—"}
                              </td>

                              {/* ✅ Poster Image */}
                              <td>
                                {poster.image?.length > 0 ? (
                                  <img
                                    src={`${URLS.Base}${poster.image[0]}`}
                                    alt="Poster"
                                    style={{
                                      width: "100px",
                                      height: "80px",
                                      objectFit: "cover",
                                      borderRadius: "5px",
                                    }}
                                  />
                                ) : (
                                  <span>No Image</span>
                                )}
                              </td>

                              {/* ✅ Actions */}
                              <td>
                                <Button
                                  onClick={() => handleEdit(poster)}
                                  size="sm"
                                  className="m-1"
                                  color="success"
                                >
                                  <i className="bx bx-edit"></i> Edit
                                </Button>
                                <Button
                                  onClick={() => handleView(poster)}
                                  size="sm"
                                  className="m-1"
                                  color="info"
                                >
                                  <i className="fas fa-eye px-1"></i> View
                                </Button>
                                <Button
                                  onClick={() => handleDelete(poster)}
                                  size="sm"
                                  className="m-1"
                                  color="danger"
                                >
                                  <i className="bx bx-trash px-1"></i> Delete
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">No posters found</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>

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
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default Complaintbox
