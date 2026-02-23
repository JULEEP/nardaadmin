import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Input, Button, Table } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import { useHistory } from "react-router-dom"
import ReactPaginate from "react-paginate"
import { URLS } from "../../Url"
import axios from "axios"

const BlockedUsers = () => {
  const [form1, setform1] = useState([])
  const [plans, setplans] = useState([])
  const history = useHistory()
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const getPlans = () => {
    var token = datas

    axios
      .post(URLS.GetUser, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setplans(res.data.allUsers)
      })
  }

  const planssearch = e => {
    const myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
    const token = datas
    axios
      .post(
        URLS.GetUserSearch + `${e.target.value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            setplans(res.data.allUsers)
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const datass = () => {
    const location = sessionStorage.getItem("tost")
    if (location !== "") {
      toast(location)
      sessionStorage.clear()
    } else {
      sessionStorage.clear()
    }
  }

  useEffect(() => {
    getPlans()
    datass()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage

  // Filter only blocked users
  const filteredPlans = plans.filter(user => user.isBlocked === true)
  const lists = filteredPlans.slice(pagesVisited, pagesVisited + listPerPage)

  const pageCount = Math.ceil(filteredPlans.length / listPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const Agentid1 = data => {
    sessionStorage.setItem("Viewuserid", data._id)
    history.push("/ViewUser")
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Blocked?")
    if (confirmBox === true) {
      DeleteBanner(data)
    }
  }

  const DeleteBanner = data => {
    var token = datas
    var remid = data._id
    axios
      .post(
        URLS.BlockOneDetails,
        { id: remid, block: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
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

  const manageDelete1 = data => {
    const confirmBox = window.confirm("Do you really want to UnBlocked?")
    if (confirmBox === true) {
      DeleteBanner1(data)
    }
  }

  const DeleteBanner1 = data => {
    var token = datas
    var remid = data._id
    axios
      .post(
        URLS.BlockOneDetails,
        { id: remid, block: false },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
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

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Narada Media Admin"
            breadcrumbItem="Blocked Users"
          />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={12}>
                      <div className="col-sm-12 mt-2">
                        <div style={{ float: "right" }}>
                          <Input
                            name="search"
                            value={form1.search}
                            onChange={planssearch}
                            type="search"
                            placeholder="Search..."
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="table-responsive">
                        <Table hover className="table table-bordered mb-4 mt-3">
                          <thead>
                            <tr className="text-center">
                              <th>SlNo</th>
                              <th>Join Date</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>State</th>
                              <th>City</th>
                              {/* <th>Status</th> */}
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists.map((data, key) => (
                              <tr key={key} className="text-center">
                                <th>{(pageNumber - 1) * 5 + key + 6}</th>
                                <td>{data.updatedAt.slice(0, 10)}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td>{data.state}</td>
                                <td>{data.city}</td>
                                {/* <td>
                                  {data.isBlocked === true ? (
                                    <span className="badge bg-danger">
                                      Blocked
                                    </span>
                                  ) : (
                                    <span className="badge bg-success">
                                      Active
                                    </span>
                                  )}
                                </td> */}
                                <td>
                                  <Button
                                    onClick={() => Agentid1(data)}
                                    size="sm"
                                    className="m-1"
                                    color="info"
                                  >
                                    <i className="fas fa-eye px-1">View</i>
                                  </Button>
                                  {data.isBlocked === true ? (
                                    <Button
                                      onClick={() => manageDelete1(data)}
                                      size="sm"
                                      color="warning"
                                    >
                                      <i className="bx bx-lock-alt px-1"></i>
                                      UnBlock
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => manageDelete(data)}
                                      size="sm"
                                      color="danger"
                                    >
                                      <i className="bx bx-lock-open-alt px-1"></i>
                                      Block
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <div
                          className="d-flex mt-3 mb-1"
                          style={{ float: "right" }}
                        >
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
                            total={lists.length}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ToastContainer />
        </div>
      </div>
    </React.Fragment>
  )
}

export default BlockedUsers
