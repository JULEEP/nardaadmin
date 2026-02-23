import React, { useState, useEffect } from "react"
import {
  CardBody,
  Container,
  Row,
  Col,
  Card,
  Input,
  Button,
  Table,
  Badge
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { URLS } from "../../Url"
import { useHistory } from "react-router-dom"

function Complaintbox() {
  const [form1, setform1] = useState([])
  const [plans, setplans] = useState([])
  const [loading, setLoading] = useState(false)
  
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const getPlans = () => {
    var token = datas
    axios
      .post(
        URLS.GetNews,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setplans(res.data.news)
      })
  }

  const planssearch = e => {
    const myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)

    const token = datas

    axios
      .post(
        URLS.GetNewsSearch + `${e.target.value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            setplans(res.data.news)
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  useEffect(() => {
    getPlans()
    datass()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = plans.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(plans.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const history = useHistory()

  const Agentid1 = data => {
    sessionStorage.setItem("Newsid", data._id)
    history.push("/ViewApprovedLocalNews")
  }

  const Agentid2 = data => {
    sessionStorage.setItem("Newsid", data._id)
    history.push("/EditLocalNews")
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)

  const datass = () => {
    const location = sessionStorage.getItem("tost")
    if (location != "") {
      toast(location)
      sessionStorage.clear()
    } else {
      sessionStorage.clear()
    }
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Delete?")
    if (confirmBox === true) {
      DeleteBanner(data)
    }
  }

  const DeleteBanner = data => {
    var token = datas
    var remid = data._id
    axios
      .delete(URLS.DeleteNews + remid, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            getPlans()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  // Function to get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'Inactive': return 'danger';
      case 'draft': return 'warning';
      default: return 'secondary';
    }
  }

  // Function to get premium badge
  const getPremiumBadge = (isPremium) => {
    return isPremium ? 
      <Badge color="warning" className="ms-1">Premium</Badge> : 
      <Badge color="secondary" className="ms-1">Free</Badge>
  }

  // Function to get top news badge
  const getTopNewsBadge = (topnews) => {
    return topnews ? 
      <Badge color="info" className="ms-1">Top News</Badge> : 
      null
  }

  // Function to get allow copy badge
  const getAllowCopyBadge = (allowCopy) => {
    switch(allowCopy) {
      case 'both': 
        return <Badge color="success" className="ms-1">All Users</Badge>;
      case 'subscribed': 
        return <Badge color="primary" className="ms-1">Subscribed Only</Badge>;
      case 'unsubscribed': 
        return <Badge color="info" className="ms-1">Unsubscribed Only</Badge>;
      case 'none': 
        return <Badge color="danger" className="ms-1">No Copy</Badge>;
      default: 
        return <Badge color="secondary" className="ms-1">Not Set</Badge>;
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Narada Media Admin"
            breadcrumbItem="Published News"
          />
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="card-title mb-0">News Articles ({plans.length})</h4>
                    
                    <div className="d-flex gap-3 align-items-center">
                      {/* Search Input */}
                      <div style={{ width: "300px" }}>
                        <Input
                          name="search"
                          value={form1.search}
                          onChange={planssearch}
                          type="search"
                          placeholder="Search news..."
                          className="form-control"
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {loading && (
                    <div className="text-center mb-3">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading news...</span>
                      </div>
                      <small className="text-muted ms-2">Loading news articles...</small>
                    </div>
                  )}

                  <div className="table-responsive">
                    <Table className="table table-bordered table-hover mb-4">
                      <thead className="table-light">
                        <tr className="text-center">
                          <th>S.No</th>
                          <th>Reporter Name</th>
                          <th>Published Date</th>
                          <th>Title</th>
                          <th>Short Description</th>
                          <th>Copy Permission</th>
                          <th>Views</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {lists.length > 0 ? (
                          lists.map((data, key) => (
                            <tr key={key}>
                              <td className="fw-bold">{pagesVisited + key + 1}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <h6 className="mb-0">{data.reporter}</h6>
                                    <small className="text-muted">
                                      {getPremiumBadge(data.isPremium)}
                                      {getTopNewsBadge(data.topnews)}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <small className="text-muted">
                                  {data.updatedAt?.slice(0, 10)}
                                </small>
                              </td>
                              <td>
                                <div>
                                  <h6 className="mb-0 text-start">
                                    {data.title?.slice(0, 25)}
                                    {data.title?.length > 25 && '...'}
                                  </h6>
                                </div>
                              </td>
                              <td>
                                <small className="text-muted">
                                  {data.shortdescription?.slice(0, 30)}
                                  {data.shortdescription?.length > 30 && '...'}
                                </small>
                              </td>
                              <td>
                                {getAllowCopyBadge(data.allowCopy)}
                              </td>
                              <td>
                                <Badge color="info" className="px-2 py-1">
                                  <i className="fas fa-eye me-1"></i>
                                  {data.views}
                                </Badge>
                              </td>
                              <td>
                                <Badge color={getStatusBadge(data.status)} className="px-2 py-1">
                                  {data.status}
                                </Badge>
                              </td>
                              <td>
                                <div className="d-flex justify-content-center gap-1">
                                  <Button
                                    onClick={() => Agentid2(data)}
                                    size="sm"
                                    color="outline-success"
                                    className="btn-sm"
                                    disabled={loading}
                                  >
                                    <i className="bx bx-edit"></i>
                                  </Button>
                                  <Button
                                    onClick={() => Agentid1(data)}
                                    size="sm"
                                    color="outline-info"
                                    className="btn-sm"
                                    disabled={loading}
                                  >
                                    <i className="fas fa-eye"></i>
                                  </Button>
                                  <Button
                                    onClick={() => manageDelete(data)}
                                    size="sm"
                                    color="outline-danger"
                                    className="btn-sm"
                                    disabled={loading}
                                  >
                                    <i className="bx bx-trash"></i>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center py-4">
                              <div className="text-muted">
                                <i className="bx bx-news display-4"></i>
                                <h5 className="mt-2">No news articles found</h5>
                                <p>Create your first news article to get started</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    
                    {plans.length > 0 && (
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="text-muted">
                          Showing {pagesVisited + 1} to {Math.min(pagesVisited + listPerPage, plans.length)} of {plans.length} entries
                        </div>
                        <ReactPaginate
                          previousLabel={"← Previous"}
                          nextLabel={"Next →"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={"pagination pagination-sm"}
                          previousLinkClassName={"page-link"}
                          nextLinkClassName={"page-link"}
                          disabledClassName={"disabled"}
                          activeClassName={"active"}
                          pageClassName={"page-item"}
                          pageLinkClassName={"page-link"}
                        />
                      </div>
                    )}
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