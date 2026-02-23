import React, { useState, useEffect } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  Form,
  Input,
  Button,
  Table,
  Modal,
  Label,
  Spinner,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { URLS } from "../../Url"
import { useHistory } from "react-router-dom"

function Complaintbox() {
  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const [form1, setform1] = useState([])
  const [plans, setplans] = useState([])
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const getPlans = () => {
    var token = datas
    axios
      .post(
        URLS.GetpendingAdvertisements,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setplans(res.data.localNews)
      })
  }

  const planssearch = e => {
    const myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)

    const token = datas

    axios
      .post(
        URLS.GetpendingAdvertisementsSearch + `${e.target.value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            setplans(res.data.localNews)
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

  const history = useHistory()

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = plans.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(plans.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const Agentid1 = data => {
    sessionStorage.setItem("pendingadsid", data._id)
    history.push("/ViewAdvertising")
  }

  const Agentid2 = data => {
    sessionStorage.setItem("adsid", data._id)
    history.push("/EditAdvertising")
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  const roles = data.rolesAndPermission
  const roles1 = data.user.departementName

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
      .delete(URLS.DeleteAds + remid, {
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Narada Media Admin "
            breadcrumbItem="Pending ADVERTISING List"
          />
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader className="bg-white">
                  <CardTitle>Pending Advertising List</CardTitle>
                </CardHeader>
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
                          <tr>
                            <th>S.No</th>
                            <th>Date/Time</th>
                            <th>Title</th>
                            <th>IMAGE</th>
                            <th>Link</th>
                            <th>Post By</th>
                            <th>Language</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <th>{(pageNumber - 1) * 5 + key + 6}</th>
                              <td>{data.logCreatedDate.slice(0, 10)} </td>
                              <td>{data.name}</td>
                              <td>
                                <img
                                  style={{ width: "100px" }}
                                  src={URLS.Base + data.image}
                                />
                              </td>
                              <td>{data.link.slice(0, 30) + "..."}</td>
                              <td>
                                {data.createrName == "" ? (
                                  <>Admin </>
                                ) : (
                                  <>{data.createrName} </>
                                )}
                              </td>

                              <td>{data.languageName}</td>
                              <td>
                                {roles.advertiseEdit === true ||
                                roles1 === "superadmin" ? (
                                  <>
                                    <Button
                                      onClick={() => {
                                        Agentid2(data)
                                      }}
                                      size="sm"
                                      className="m-1"
                                      outline
                                      color="success"
                                    >
                                      <i
                                        style={{ fontSize: " 14px" }}
                                        className="bx bx-edit"
                                      ></i>
                                    </Button>
                                  </>
                                ) : (
                                  ""
                                )}
                                {roles.advertiseView === true ||
                                roles1 === "superadmin" ? (
                                  <>
                                    <Button
                                      onClick={() => {
                                        Agentid1(data)
                                      }}
                                      size="sm"
                                      className="m-1"
                                      outline
                                      color="info"
                                    >
                                      <i
                                        style={{ fontSize: " 14px" }}
                                        className="fas fa-eye"
                                      ></i>
                                    </Button>
                                  </>
                                ) : (
                                  ""
                                )}

                                {roles.advertiseDelete === true ||
                                roles1 === "superadmin" ? (
                                  <>
                                    <Button
                                      onClick={() => {
                                        manageDelete(data)
                                      }}
                                      size="sm"
                                      className="m-1"
                                      outline
                                      color="danger"
                                    >
                                      <i
                                        style={{ fontSize: " 14px" }}
                                        className="bx bx-trash"
                                      ></i>
                                    </Button>
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
                    <option value="solved">Solved</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </Col>
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
