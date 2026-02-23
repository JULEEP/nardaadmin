import React, { useState, useEffect } from "react"
import {
  CardBody,
  Container,
  Row,
  Col,
  Card,
  Form,
  Label,
  Input,
  Button,
  Table,
  Modal,
  Spinner,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { URLS } from "../../Url"

const Banner = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [modal_small1, setmodal_small1] = useState(false)
  const [banner, setbanner] = useState([])
  const [form1, setform1] = useState([])
  const [form3, setform3] = useState([])
  const [Files1, setFiles1] = useState("")
  const [Files2, setFiles2] = useState("")
  const [Files3, setFiles3] = useState("")
  const [Files4, setFiles4] = useState("")
  const [Files5, setFiles5] = useState("")
  const [Files6, setFiles6] = useState("")
  const [Files7, setFiles7] = useState("")
  const [Files8, setFiles8] = useState("")

  const [isLoading, setIsLoading] = useState(true)

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
  const changeHandler2 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles2(e.target.files)
    } else {
      e.target.value = null
      toast("file format not supported.Pls choose Image")
    }
  }

  const changeHandler3 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles3(e.target.files)
    } else {
      e.target.value = null
      toast("file format not supported.Pls choose Image")
    }
  }

  const changeHandler4 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles4(e.target.files)
    } else {
      e.target.value = null
      toast("file format not supported.Pls choose Image")
    }
  }

  const changeHandler5 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles5(e.target.files)
    } else {
      e.target.value = null
      toast("file format not supported.Pls choose Image")
    }
  }

  const changeHandler6 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles6(e.target.files)
    } else {
      e.target.value = null
      toast("file format not supported.Pls choose Image")
    }
  }

  const changeHandler7 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles7(e.target.files)
    } else {
      e.target.value = null
      toast("file format not supported.Pls choose Image")
    }
  }
  const changeHandler8 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles8(e.target.files)
    } else {
      e.target.value = null
      toast("file format not supported.Pls choose Image")
    }
  }

  function tog_small() {
    setmodal_small(!modal_small)
  }

  function tog_small1() {
    setmodal_small1(!modal_small1)
  }

  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }

  useEffect(() => {
    GetAllBanners()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const EditBanner = () => {
    var token = datas
    const dataArray = new FormData()
    dataArray.append("title", form1.title)
    dataArray.append("description", form1.description)
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("image", Files1[i])
    }
    for (let i = 0; i < Files2.length; i++) {
      dataArray.append("addAdvertise", Files2[i])
    }
    for (let i = 0; i < Files3.length; i++) {
      dataArray.append("addLocalNews", Files3[i])
    }
    for (let i = 0; i < Files4.length; i++) {
      dataArray.append("localNews", Files4[i])
    }
    for (let i = 0; i < Files5.length; i++) {
      dataArray.append("digitalNews", Files5[i])
    }
    for (let i = 0; i < Files6.length; i++) {
      dataArray.append("tvNews", Files6[i])
    }
    for (let i = 0; i < Files7.length; i++) {
      dataArray.append("jobs", Files7[i])
    }
    for (let i = 0; i < Files8.length; i++) {
      dataArray.append("searchPage", Files8[i])
    }

    axios
      .put(URLS.UpdatePopup, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            GetAllBanners()
            setmodal_small(false)
            clearForm1()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    EditBanner()
  }

  const GetAllBanners = () => {
    var token = datas
    axios
      .post(
        URLS.GetPopup,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setbanner(res.data.popup)
      })
  }
  const clearForm1 = () => {
    setFiles1({
      image: "",
    })
    setFiles2({
      image: "",
    })

    setFiles3({
      image: "",
    })

    setFiles4({
      image: "",
    })

    setFiles5({
      image: "",
    })

    setFiles6({
      image: "",
    })

    setFiles7({
      image: "",
    })

    setFiles8({
      image: "",
    })
  }

  const getpopup = data => {
    setform1(data)
    tog_small()
  }

  const getpopup1 = data => {
    setform3(data)
    tog_small1()
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada Media Admin " breadcrumbItem="Popup" />

          <Row>
            <Col md={12}>
              <Card>
                <CardBody className="mb-5">
                  <Row>
                    <Col md={12}>
                      <div style={{ float: "right" }}>
                        <Button
                          onClick={() => {
                            getpopup(banner)
                          }}
                          className="mr-2"
                          style={{
                            padding: "6px",
                            margin: "3px",
                          }}
                          color="success"
                          outline
                        >
                          <i className="bx bx-edit "></i>Edit
                        </Button>{" "}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className="table-responsive">
                        <div className="mt-3">
                          <Table
                            id="empTable"
                            className="table table-bordered mb-3"
                          >
                            <tbody className="text-center">
                              <tr>
                                <th
                                  className="w-30"
                                  style={{ paddingTop: "50px" }}
                                >
                                  Popup 1
                                </th>
                                <th className="w-70">
                                  <a
                                    href={URLS.Base + banner.image}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      style={{ width: "100px" }}
                                      src={URLS.Base + banner.image}
                                    />
                                  </a>
                                </th>
                                <th
                                  className="w-30"
                                  style={{ paddingTop: "50px" }}
                                >
                                    Popup 2
                                </th>
                                <th className="w-70">
                                  <a
                                    href={URLS.Base + banner.addAdvertise}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      style={{ width: "100px" }}
                                      src={URLS.Base + banner.addAdvertise}
                                    />
                                  </a>
                                </th>
                              </tr>
                              <tr>
                                <th
                                  className="w-30"
                                  style={{ paddingTop: "50px" }}
                                >
                                    Popup 3
                                </th>
                                <th className="w-70">
                                  <a
                                    href={URLS.Base + banner.addLocalNews}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      style={{ width: "100px" }}
                                      src={URLS.Base + banner.addLocalNews}
                                    />
                                  </a>
                                </th>

                                <th
                                  className="w-30"
                                  style={{ paddingTop: "50px" }}
                                >
                                   Popup 4
                                </th>
                                <th className="w-70">
                                  <a
                                    href={URLS.Base + banner.localNews}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      style={{ width: "100px" }}
                                      src={URLS.Base + banner.localNews}
                                    />
                                  </a>
                                </th>
                              </tr>
                              <tr>
                                <th
                                  className="w-30"
                                  style={{ paddingTop: "50px" }}
                                >
                                   Popup 5
                                </th>
                                <th className="w-70">
                                  <a
                                    href={URLS.Base + banner.digitalNews}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      style={{ width: "100px" }}
                                      src={URLS.Base + banner.digitalNews}
                                    />
                                  </a>
                                </th>

                                <th
                                  className="w-30"
                                  style={{ paddingTop: "50px" }}
                                >
                                    Popup 6
                                </th>
                                <th className="w-70">
                                  <a
                                    href={URLS.Base + banner.tvNews}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      style={{ width: "100px" }}
                                      src={URLS.Base + banner.tvNews}
                                    />
                                  </a>
                                </th>
                              </tr>
                              <tr>
                                <th
                                  className="w-30"
                                  style={{ paddingTop: "50px" }}
                                >
                                    Popup 7
                                </th>
                                <th className="w-70">
                                  <a
                                    href={URLS.Base + banner.jobs}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      style={{ width: "100px" }}
                                      src={URLS.Base + banner.jobs}
                                    />
                                  </a>
                                </th>

                                <th
                                  className="w-30"
                                  style={{ paddingTop: "50px" }}
                                >
                                    Popup 8
                                </th>
                                <th className="w-70">
                                  <img
                                    style={{ width: "100px" }}
                                    src={URLS.Base + banner.searchPage}
                                  />
                                </th>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal
          size="lg"
          isOpen={modal_small}
          toggle={() => {
            tog_small()
          }}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Edit Popup
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
              <Row>
                {/* <Col md={6}>
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">
                      Banner Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter Banner Name"
                      required
                      name="title"
                      value={form1.title}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </div>
                </Col> */}
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">Home</Label>
                    <span className="text-danger " style={{ fontSize: "10px" }}>
                      (height : 700 px * width : 500 px)
                      <i
                        onClick={() => {
                          getpopup1(URLS.Base + banner.image)
                        }}
                        style={{ fontSize: " 14px", cursor: "pointer" }}
                        className="fas fa-eye text-primary "
                      ></i>
                    </span>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter image"
                      name="image"
                      value={Files1.image}
                      onChange={changeHandler1}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">
                      Add Advertise
                    </Label>{" "}
                    <span className="text-danger " style={{ fontSize: "10px" }}>
                      (height : 700 px * width : 500 px)
                    </span>
                    <i
                      onClick={() => {
                        getpopup1(URLS.Base + banner.addAdvertise)
                      }}
                      style={{ fontSize: " 14px", cursor: "pointer" }}
                      className="fas fa-eye text-primary "
                    ></i>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter image"
                      name="image"
                      value={Files2.image}
                      onChange={changeHandler2}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">
                      Add Local News
                    </Label>{" "}
                    <span className="text-danger " style={{ fontSize: "10px" }}>
                      (height : 700 px * width : 500 px)
                    </span>
                    <i
                      onClick={() => {
                        getpopup1(URLS.Base + banner.addLocalNews)
                      }}
                      style={{ fontSize: " 14px", cursor: "pointer" }}
                      className="fas fa-eye text-primary "
                    ></i>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter image"
                      name="image"
                      value={Files3.image}
                      onChange={changeHandler3}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">local News</Label>{" "}
                    <span className="text-danger " style={{ fontSize: "10px" }}>
                      (height : 700 px * width : 500 px)
                    </span>
                    <i
                      onClick={() => {
                        getpopup1(URLS.Base + banner.localNews)
                      }}
                      style={{ fontSize: " 14px", cursor: "pointer" }}
                      className="fas fa-eye text-primary "
                    ></i>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter image"
                      name="image"
                      value={Files4.image}
                      onChange={changeHandler4}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">Digital News</Label>
                    <span className="text-danger " style={{ fontSize: "10px" }}>
                      (height : 700 px * width : 500 px)
                    </span>
                    <i
                      onClick={() => {
                        getpopup1(URLS.Base + banner.digitalNews)
                      }}
                      style={{ fontSize: " 14px", cursor: "pointer" }}
                      className="fas fa-eye text-primary "
                    ></i>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter image"
                      name="image"
                      value={Files5.image}
                      onChange={changeHandler5}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">Tv News</Label>
                    <span className="text-danger " style={{ fontSize: "10px" }}>
                      (height : 700 px * width : 500 px)
                    </span>
                    <i
                      onClick={() => {
                        getpopup1(URLS.Base + banner.tvNews)
                      }}
                      style={{ fontSize: " 14px", cursor: "pointer" }}
                      className="fas fa-eye text-primary "
                    ></i>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter image"
                      name="image"
                      value={Files6.image}
                      onChange={changeHandler6}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">Jobs</Label>
                    <span className="text-danger " style={{ fontSize: "10px" }}>
                      (height : 700 px * width : 500 px)
                    </span>
                    <i
                      onClick={() => {
                        getpopup1(URLS.Base + banner.image)
                      }}
                      style={{ fontSize: " 14px", cursor: "pointer" }}
                      className="fas fa-eye text-primary "
                    ></i>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter image"
                      name="image"
                      value={Files7.image}
                      onChange={changeHandler7}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">Search Page</Label>
                    <span className="text-danger " style={{ fontSize: "10px" }}>
                      (height : 700 px * width : 500 px)
                    </span>
                    <i
                      onClick={() => {
                        getpopup1(URLS.Base + banner.jobs)
                      }}
                      style={{ fontSize: " 14px", cursor: "pointer" }}
                      className="fas fa-eye text-primary "
                    ></i>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter image"
                      name="image"
                      value={Files8.searchPage}
                      onChange={changeHandler8}
                    />
                  </div>
                </Col>
                {/* <Col md={6}>
                  <div className="mb-3">
                    <Label>Description</Label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="basicpill-namecard-input11"
                      placeholder="Enter Description"
                      name="description"
                      required
                      value={form1.description}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </div>
                </Col> */}
              </Row>
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

        <Modal
          size="md"
          isOpen={modal_small1}
          toggle={() => {
            tog_small1()
          }}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
              View Image
            </h5>
            <button
              onClick={() => {
                setmodal_small1(false)
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
            <img src={form3} width="100%" height="400px"></img>
          </div>
        </Modal>

        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default Banner
