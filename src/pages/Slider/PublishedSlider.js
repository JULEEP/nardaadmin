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
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const getPlans = () => {
    var token = datas
    axios
      .post(
        URLS.GetSlider,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setplans(res.data.sliders)
      })
  }

  const planssearch = e => {
    const myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)

    const token = datas

    axios
      .post(
        URLS.GetSliderSearch + `${e.target.value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            setplans(res.data.sliders)
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
    sessionStorage.setItem("Sliderid", data._id)
    history.push("/ViewSlider")
  }

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
      .delete(URLS.DeleteSlider + remid, {
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

  const Agentid2 = data => {
    sessionStorage.setItem("Sliderid", data._id)
    history.push("/EditSlider")
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Narada Media Admin "
            breadcrumbItem="Published Slider"
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
                            <th>Title</th>
                            <th>Type</th>
                            <th>Image</th>
                            <th>Likes</th>
                            <th>Reporter</th>
                            <th>Expiry date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key} className="text-center">
                              <th>{(pageNumber) * 5 + key + 1}</th>
                              <td>{data.title}</td>
                              <td>
                                <span 
                                  className={`badge ${
                                    data.type === 'slider' ? 'bg-primary' : 
                                    data.type === 'banner' ? 'bg-success' : 
                                    data.type === 'popup' ? 'bg-warning' : 
                                    'bg-info'
                                  }`}
                                >
                                  {data.type?.toUpperCase() || 'SLIDER'}
                                </span>
                              </td>
                              <td>
                                <img
                                  style={{
                                    width: "120px",
                                    height: "80px",
                                    objectFit: "cover"
                                  }}
                                  src={URLS.Base + data.sliders[0]}
                                  alt={data.title}
                                />
                              </td>
                              <td>
                                <Badge color="primary" className="px-2 py-1">
                                  <i className="fas fa-heart me-1"></i>
                                  {data.likes || 0}
                                </Badge>
                              </td>
                              <td>{data.reporter}</td>
                              <td>{data.expirydate}</td>
                              <td>
                                <Button
                                  onClick={() => {
                                    Agentid2(data)
                                  }}
                                  size="sm"
                                  className="m-1"
                                  color="success"
                                >
                                  <small className="d-flex">
                                    <i className="bx bx-edit px-1"></i>Edit
                                  </small>
                                </Button>
                                <Button
                                  onClick={() => {
                                    Agentid1(data)
                                  }}
                                  size="sm"
                                  className="m-1"
                                  color="info"
                                >
                                  <small className="d-flex">
                                    {" "}
                                    <i className="fas fa-eye px-1"></i>
                                    View
                                  </small>
                                </Button>
                                <Button
                                  onClick={() => {
                                    manageDelete(data)
                                  }}
                                  size="sm"
                                  color="danger"
                                  className="m-1"
                                >
                                  <small className="d-flex">
                                    <i className="bx bx-trash px-1"></i>
                                    Delete
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