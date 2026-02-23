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
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const getPlans = () => {
    var token = datas
    axios
      .post(
        URLS.InActiveArticle,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setplans(res.data.data)
      })
  }

  const planssearch = e => {
    const myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)

    const token = datas

    axios
      .post(
        URLS.InActiveArticleSearch + `${e.target.value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            setplans(res.data.data)
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
    sessionStorage.setItem("Articleid", data._id)
    history.push("/ViewArticle")
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
    const confirmBox = window.confirm("Do you really want to Active?")
    if (confirmBox === true) {
      DeleteBanner(data)
    }
  }

  const DeleteBanner = data => {
    var token = datas
    var remid = data._id 
    axios
      .put(
        URLS.DeleteArticle + remid,
        { status: "Active" },
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
        <Container fluid>
          <Breadcrumbs
            title="Narada Media Admin"
            breadcrumbItem="InActive Article List"
          />
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <div>
                    <div className="table-responsive">
                      <div style={{ float: "right" }}>
                        <Input
                          name="search"
                          value={form1.search}
                          onChange={planssearch}
                          type="search"
                          placeholder="Search..."
                        />
                      </div>
                      <Table className="table table-bordered mb-4 mt-5">
                        <thead>
                          <tr className="text-center">
                            <th>S.No</th>
                            <th>Reporter Name</th>
                            <th>Published-Date</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Likes</th>
                            <th>Views</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <th>{(pageNumber - 1) * 5 + key + 6}</th>
                              <td>{data.reporter}</td>
                              <td>{data.updatedAt.slice(0, 10)}</td>
                              <td>
                                <img
                                  style={{
                                    width: "100px",
                                    height: "150px",
                                  }}
                                  src={URLS.Base + data.image}
                                />
                              </td>
                              <td>{data.title.slice(0, 20)}</td>
                              <td>{data.shortdescription.slice(0, 20)}</td>
                              <td>{data.likes}</td>
                              <td>{data.views}</td>
                              <td>{data.status}</td>
                              <td>
                                <Button
                                  onClick={() => {
                                    Agentid1(data)
                                  }}
                                  size="sm"
                                  className="m-1"
                                  color="info"
                                >
                                  <small className="d-flex">
                                    <i className="fas fa-eye px-1"></i>
                                    View
                                  </small>
                                </Button>
                                <Button
                                  onClick={() => {
                                    manageDelete(data)
                                  }}
                                  size="sm"
                                  color="success"
                                >
                                  <small className="d-flex">
                                    <i className="bx bx-lock-open-alt px-1"></i>
                                    Active
                                  </small>
                                </Button>
                              </td>
                            </tr>
                          ))}
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
                          total={lists.length}
                        />
                      </div>
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
