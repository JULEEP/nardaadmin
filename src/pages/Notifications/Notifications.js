import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Button,
  Table,
  Label,
  Form,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import axios from "axios"
import ReactPaginate from "react-paginate"
import { ToastContainer, toast } from "react-toastify"
import Select from "react-select"
import { URLS } from "../../Url"

const Notifications = () => {
  const [form, setform] = useState([])

  const [Noti, setNoti] = useState([])

  const [customer, setcustomer] = useState([])

  const [Files1, setFiles1] = useState("")

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }

  const getNotifications = () => {
    var token = datas
    axios
      .post(
        URLS.GetNotifications,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setNoti(res.data.notifications)
      })
  }

  useEffect(() => {
    getNotifications()
    getactivecustomers()
  }, [])

  const getactivecustomers = () => {
    var token = datas
    axios
      .get(URLS.GetReporter, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          setcustomer(res.data.reporters)
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const [selectedMulti, setselectedMulti] = useState([])

  const [error, setError] = useState("")

  function handleMulti(data) {
    setselectedMulti(data)
  }

  const options = customer.map(data => ({
    value: data._id,
    label: data.name,
  }))

  const changeHandler1 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles1(e.target.files)
    } else {
      e.target.value = null
      toast("file format not supported.Pls choose Image")
    }
  }

  const addnotifi = () => {
    var token = datas

    const dataArray = new FormData()
    dataArray.append("title", form.title)
    if (form.sendTo == "All") {
      dataArray.append("sendTo", form.sendTo)
    } else {
      for (let i = 0; i < selectedMulti.length; i++) {
        dataArray.append("sendTo", selectedMulti[i].value)
      }
    }
    dataArray.append("description", form.description)
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("image", Files1[i])
    }
    axios
      .post(URLS.AddNotifications, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            getNotifications()
            clearForm()
            setselectedMulti("")
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const deletenoti = data => {
    var token = datas
    var remid = data._id
    axios
      .delete(URLS.DeleteNotifications + remid, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            getNotifications()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Delete?")
    if (confirmBox === true) {
      deletenoti(data)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (form.sendTo == "All") {
      addnotifi()
    }

    if (selectedMulti.length == 0) {
      setError("Please select at least one option.")
    } else {
      addnotifi()
    }
  }

  const clearForm = () => {
    setform({
      title: "",
      sendTo: "",
      description: "",
      department: "",
    })
    setFiles1({
      notifImg: "",
    })
  }

  const [forms, setforms] = useState([])

  const handlechange = e => {
    let myUser = { ...forms }
    myUser[e.target.name] = e.target.value
    setforms(myUser)
    var token = datas
    axios
      .post(
        URLS.GetNotificationsSearch + `${e.target.value}`,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setNoti(res.data.notifications)
      })
  }

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = Noti.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(Noti.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Narada Media Admin "
            breadcrumbItem="Notifications"
          />

          <Row>
            <Col md={4}>
              <Card className="p-4">
                <h5>Add Notification</h5>
                <Form
                  onSubmit={e => {
                    handleSubmit(e)
                  }}
                >
                  <div>
                    <div className="mt-3">
                      <Label>Title</Label>{" "}
                      <span className="text-danger">*</span>
                      <Input
                        value={form.title}
                        onChange={e => {
                          handleChange(e)
                        }}
                        name="title"
                        required
                        type="text"
                        placeholder="Enter Title"
                      />
                    </div>
                    <div className="mt-3">
                      <Label for="basicpill-firstname-input1">Image</Label>
                      <span
                        className="text-danger "
                        style={{ fontSize: "10px" }}
                      >
                        * (height : 100 px * width : 100 px)
                      </span>
                      <Input
                        type="file"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter notifImg"
                        name="notifImg"
                        value={Files1.notifImg}
                        onChange={changeHandler1}
                      />
                    </div>
                    <div className="mt-3">
                      <Label for="basicpill-firstname-input1">
                        All Users
                        <span className="text-danger">*</span>
                      </Label>
                      <select
                        value={form.sendTo}
                        name="sendTo"
                        onChange={e => {
                          handleChange(e)
                        }}
                        className="form-select"
                        required
                      >
                        <option value="">Select</option>
                        <option value="All">All Users</option>
                        <option value="single">Single User</option>
                      </select>
                    </div>
                    {form.sendTo == "single" ? (
                      <div className="mt-3">
                        <Label>User</Label>
                        <span className="text-danger">*</span>
                        <Select
                          name="sendTo"
                          value={selectedMulti}
                          onChange={handleMulti}
                          options={options}
                          required
                          isMulti
                        />
                        {/* {error && <div className="error">{error}</div>} */}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="mt-3">
                      <Label>Description</Label>{" "}
                      <span className="text-danger">*</span>
                      <textarea
                        className="form-control"
                        value={form.description}
                        onChange={e => {
                          handleChange(e)
                        }}
                        name="description"
                        required
                        type="text"
                        placeholder="Description"
                      />
                    </div>
                  </div>
                  <div className="text-end mt-3">
                    <Button type="submit" color="success m-1" outline>
                      Submit <i className="bx bx-check-circle"></i>
                    </Button>
                  </div>
                </Form>
              </Card>
            </Col>
            <Col md={8}>
              <Card>
                <CardBody>
                  <Row>
                    <Col></Col>
                    <Col>
                      <div style={{ float: "right" }}>
                        <Input
                          name="search"
                          value={forms.search}
                          onChange={handlechange}
                          type="search"
                          placeholder="Search..."
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="table-rep-plugin mt-4 table-responsive">
                    <Table hover bordered responsive>
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.map((data, key) => (
                          <tr key={key}>
                            <th scope="row">
                              {(pageNumber - 1) * 5 + key + 6}
                            </th>
                            <td>
                              <img
                                src={URLS.Base + data.image}
                                width="80px"
                              ></img>
                            </td>
                            <td>{data.title}</td>
                            <td>{data.description} </td>
                            <td>
                              <Button
                                onClick={() => {
                                  manageDelete(data)
                                }}
                                className="m-1"
                                size="sm"
                                color="danger"
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default Notifications
