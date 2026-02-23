import React, { useState, useEffect } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  Input,
  Button,
  Table,
  Modal,
  Label,
  Form,
  Spinner,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { URLS } from "../../Url"

function Complaintbox() {
  const [form1, setform1] = useState([])
  const [plans, setplans] = useState([])
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const getpopup = data => {
    setform1(data)
    tog_small()
  }

  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }

  const getPlans = () => {
    var token = datas
    axios
      .post(
        URLS.getallcomplaints,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setplans(res.data.complaints)
      })
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    EditDep()
  }

  const EditDep = () => {
    var token = datas
    var formid = form1._id

    const dataArray = new FormData()
    dataArray.append("status", form1.status)
    dataArray.append("rejectionReason", form1.rejectionReason)

    axios
      .put(URLS.Updateallcomplaints + "/" + formid, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            getPlans()
            toast(res.data.message)
            setmodal_small(false)
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const planssearch = e => {
    const myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)

    const token = datas

    axios
      .post(
        URLS.getallcomplaintssearch + `${e.target.value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            setplans(res.data.complaints)
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
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = plans.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(plans.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  const roles = data.rolesAndPermission
  const roles1 = data.user.departementName

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Narada Media Admin"
            breadcrumbItem="Complaint box"
          />
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>Complaint List</CardTitle>
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
                            <th>Ticket Id</th>
                            <th>Date</th>
                            <th>User Name</th>
                            <th>User mobile</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <th>{(pageNumber - 1) * 5 + key + 6}</th>
                              <td>{data.complaintCode}</td>
                              <td>{data.logCreatedDate.slice(0, 10)} </td>
                              <td>{data.customerName}</td>
                              <td>{data.customerPhone}</td>
                              <td>{data.title} </td>
                              <td>
                                <img
                                  style={{ width: "100px" }}
                                  src={URLS.Base + data.image}
                                />
                              </td>
                              <td>{data.description}</td>
                              <td>{data.status}</td>
                              <td>
                                {roles.complaintBoxEdit === true ||
                                roles1 === "superadmin" ? (
                                  <>
                                    {data.status == "resolved" ? (
                                      "-"
                                    ) : (
                                      <Button
                                        onClick={() => {
                                          getpopup(data)
                                        }}
                                        className="mr-2"
                                        style={{
                                          padding: "6px",
                                          margin: "3px",
                                        }}
                                        color="success"
                                        outline
                                      >
                                        <i className="bx bx-edit"></i>
                                      </Button>
                                    )}
                                  </>
                                ) : (
                                  ""
                                )}
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
        <Modal
          size="md"
          isOpen={modal_small}
          toggle={() => {
            tog_small()
          }}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Status Update
            </h5>
            <button
              onClick={() => {
                setmodal_small(false)
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Form
              onSubmit={e => {
                handleSubmit1(e)
              }}
            >
              <Col md={12}>
                <div className="mb-3">
                  <Label> Status </Label>
                  <span className="text-danger">*</span>
                  <select
                    value={form1.status}
                    name="status"
                    onChange={e => {
                      handleChange1(e)
                    }}
                    className="form-select"
                  >
                    <option value="">Select</option>

                    <option value="resolved">Resolved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">reject</option>
                  </select>
                </div>
              </Col>
              {form1.status == "rejected" ? (
                <Col md={12}>
                  <div className="mb-3">
                    <Label> Status </Label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter Reject Reason"
                      required
                      rows={3}
                      name="rejectionReason"
                      value={form1.rejectionReason}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </div>
                </Col>
              ) : (
                ""
              )}
              <div style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    setmodal_small(false)
                  }}
                  color="danger"
                  type="button"
                >
                  Cancel <i className="fas fa-times-circle"></i>
                </Button>
                <Button className="m-1" color="primary" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default Complaintbox
