import React, { useEffect, useState } from "react"
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
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import ReactPaginate from "react-paginate"
import { URLS } from "../../Url"
import axios from "axios"

const Staff = () => {
  const [show, setshow] = useState(false)
  const [show1, setshow1] = useState(false)
  const toggle = () => setshow1(!show1)

  const [form, setform] = useState([])
  const [users, setusers] = useState([])
  const [form1, setform1] = useState([])

  const [Files, setFiles] = useState("")
  const [Files1, setFiles1] = useState("")

  const changeHandler = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles(e.target.files)
    } else {
      e.target.value = null
      toast("File format not supported. Please choose JPG, JPEG, or PNG.")
    }
  }
  const changeHandler1 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles1(e.target.files)
    } else {
      e.target.value = null
      toast("File format not supported. Please choose JPG, JPEG, or PNG.")
    }
  }

  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }
  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const Get = () => {
    var token = datas
    axios
      .post(
        URLS.GetActiveReporter,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setusers(res.data.activeReporters)
      })
  }

  const custsearch = e => {
    const myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
    const token = datas

    axios
      .post(
        URLS.GetActiveReporterSearch + `${e.target.value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            setusers(res.data.activeReporters)
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const Add = () => {
    var token = datas
    const dataArray = new FormData()
    dataArray.append("name", form.name)
    dataArray.append("email", form.email)
    dataArray.append("phone", form.phone)
    dataArray.append("password", form.password)
    dataArray.append("bio", form.bio)

    for (let i = 0; i < Files.length; i++) {
      dataArray.append("file", Files[i])
    }
    axios
      .post(URLS.AddReporter, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            console.log(res.data)
            toast(res.data.message)
            setshow(false)
            setform("")
            Get()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const formsubmit = e => {
    e.preventDefault()
    Add()
  }

  const Update = () => {
    var token = datas
    const dataArray = new FormData()
    dataArray.append("bio", form1.bio)
    dataArray.append("name", form1.name)
    dataArray.append("email", form1.email)
    dataArray.append("phone", form1.phone)

    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("file", Files1[i])
    }

    axios
      .put(URLS.EditReporter + form1._id, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            setform1("")
            setshow1(false)
            Get()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const formeditsubmit = e => {
    e.preventDefault()
    Update()
  }

  const usedata = data => {
    setshow1(true)
    setform1(data)
  }

  useEffect(() => {
    Get()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = users.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(users.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Delete?")
    if (confirmBox === true) {
      Delete(data)
    }
  }

  const Delete = data => {
    var token = datas
    var remid = data._id
    axios
      .post(
        URLS.DeleteReporter + remid,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            Get()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var Roles = data?.rolesAndPermission[0]


  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Narada Media Admin"
            breadcrumbItem="Reporter List"
          />
          <Row>
            <Col>
              {show == true ? (
                <Card className="p-4">
                  <Form
                    onSubmit={e => {
                      formsubmit(e)
                    }}
                  >
                    <h5>Add New Reporter</h5>
                    <hr></hr>
                    <Row>
                      <Col md="12">
                        <Row className="mt-3">
                          <Col md="4">
                            <Label>Name</Label>
                            <span className="text-danger">*</span>
                            <Input
                              name="name"
                              onChange={e => {
                                handleChange(e)
                              }}
                              value={form.name}
                              required
                              type="text"
                              placeholder="Enter Name"
                            />
                          </Col>
                          <Col md="4">
                            <Label>Mobile No</Label>
                            <span className="text-danger">*</span>
                            <div className="input-group mb-3">
                              <Input
                                name="phone"
                                onChange={e => {
                                  handleChange(e)
                                }}
                                value={form.phone}
                                required
                                type="text"
                                minLength="10"
                                maxLength="10"
                                pattern="[0-9]+"
                                className="form-control"
                                placeholder="Enter Mobile No"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                              />
                            </div>
                          </Col>
                          <Col md="4">
                            <Label>Email Id</Label>
                            <span className="text-danger">*</span>
                            <Input
                              name="email"
                              onChange={e => {
                                handleChange(e)
                              }}
                              value={form.email}
                              required
                              type="email"
                              placeholder="Enter Email"
                            />
                          </Col>
                          <Col md="4">
                            <Label>Password</Label>
                            <span className="text-danger">*</span>
                            <Input
                              name="password"
                              onChange={e => {
                                handleChange(e)
                              }}
                              type="text"
                              value={form.password}
                              required
                              placeholder="Enter password"
                            />
                          </Col>
                          <Col md="4">
                            <Label for="basicpill-firstname-input1">
                              Reporter Profile Image
                            </Label>{" "}
                            <span className="text-danger">260 * 190</span>
                            <Input
                              type="file"
                              className="form-control"
                              id="basicpill-firstname-input1"
                              required
                              name="profileimg"
                              value={Files.profileimg}
                              onChange={changeHandler}
                            />
                          </Col>
                          <Col md="4">
                            <Label> Address</Label>
                            <span className="text-danger">*</span>
                            <textarea
                              name="bio"
                              required
                              value={form.bio}
                              type="text"
                              onChange={e => {
                                handleChange(e)
                              }}
                              className="form-control"
                              placeholder="Enter Address"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            ></textarea>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <div className="text-end mt-3">
                      <Button
                        type="button"
                        onClick={() => {
                          setshow(!show)
                        }}
                        color="danger m-1"
                      >
                        Cancel <i className="bx bx-x-circle"></i>
                      </Button>
                      <Button type="submit" color="success m-1">
                        Submit <i className="bx bx-check-circle"></i>
                      </Button>
                    </div>
                  </Form>
                </Card>
              ) : (
                ""
              )}
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      {Roles?.Dashview === true || Roles?.accessAll === true ? (
                        <>
                          <Button
                            onClick={() => {
                              setshow(!show)
                            }}
                            color="primary"
                          >
                            New Reporter <i className="bx bx-user-plus"></i>
                          </Button>
                        </>
                      ) : (
                        ""
                      )}
                    </Col>

                    <Col>
                      <div style={{ float: "right" }}>
                        <Input
                          name="search"
                          value={form.search}
                          onChange={custsearch}
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
                          <th>Reporter Image</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile No</th>
                          <th>Address</th>
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
                                src={URLS.Base + data.profileimg}
                                width="80px"
                              ></img>
                            </td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.phone}</td>
                            <td>{data.bio}</td>
                            <td>
                              <Button
                                onClick={() => {
                                  usedata(data)
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
                                size="sm"
                                color="danger"
                                className="m-1"
                                onClick={() => {
                                  manageDelete(data)
                                }}
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
                    <Col sm="12">
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
                    </Col>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <ToastContainer />
      </div>
      <Modal isOpen={show1} toggle={toggle} centered size="lg">
        <ModalHeader toggle={toggle}>Edit Reporter Details</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              formeditsubmit(e)
            }}
          >
            <Row>
              <Col md="12">
                <Row className="mt-3">
                  <Col md="4">
                    <Label>Name</Label>
                    <span className="text-danger">*</span>
                    <Input
                      name="name"
                      onChange={e => {
                        handleChange1(e)
                      }}
                      value={form1.name}
                      required
                      type="text"
                      placeholder="Enter Name"
                    />
                  </Col>
                  <Col md="4">
                    <Label>Mobile No</Label>
                    <span className="text-danger">*</span>
                    <div className="input-group mb-3">
                      <Input
                        name="phone"
                        onChange={e => {
                          handleChange1(e)
                        }}
                        value={form1.phone}
                        required
                        type="text"
                        minLength="10"
                        maxLength="10"
                        pattern="[0-9]+"
                        className="form-control"
                        placeholder="Enter Mobile No"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <Label>Email Id</Label>
                    <span className="text-danger">*</span>
                    <Input
                      name="email"
                      onChange={e => {
                        handleChange1(e)
                      }}
                      value={form1.email}
                      required
                      type="email"
                      placeholder="Enter Email"
                    />
                  </Col>
                  <Col md="4">
                    <Label for="basicpill-firstname-input1">
                      Reporter Profile Image
                    </Label>{" "}
                    <span className="text-danger">260 * 190</span>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      name="profileimg"
                      value={Files1.profileimg}
                      onChange={changeHandler1}
                    />
                  </Col>
                  <Col md="4">
                    <Label> Address</Label>
                    <span className="text-danger">*</span>
                    <textarea
                      name="bio"
                      required
                      value={form1.bio}
                      type="text"
                      onChange={e => {
                        handleChange1(e)
                      }}
                      className="form-control"
                      placeholder="Enter Address"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    ></textarea>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr></hr>
            <div className="text-end mt-3">
              <Button type="submit" color="success m-1" outline>
                Submit <i className="bx bx-check-circle"></i>
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setshow1(!show1)
                }}
                color="danger m-1"
                outline
              >
                Cancel <i className="bx bx-x-circle"></i>
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default Staff
