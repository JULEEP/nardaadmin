import React, { useState, useEffect } from "react"
import {
  CardBody,
  Container,
  Row,
  Col,
  Card,
  Label,
  Input,
  Button,
  Form,
} from "reactstrap"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import Dropzone from "react-dropzone"
import { useDropzone } from "react-dropzone"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import { URLS } from "Url"
import axios from "axios"

function Addnews() {
  const [form, setform] = useState({
    title: "",
    reporterId: "",
    visible: "",
    expirydate: ""
  })

  const [files, setFiles] = useState([])
  const [form1, setform1] = useState([])
  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  const handleKeyDown = event => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault()
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()])
        setInputValue("")
      }
    }
  }

  const removeTag = indexToRemove => {
    setTags(tags.filter((_, index) => index !== indexToRemove))
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const handleSubmit = e => {
    e.preventDefault()
    Adddealer()
  }

  const history = useHistory()
  const Adddealer = () => {
    var formid = form._id
    var token = datas
    const dataArray = new FormData()
    dataArray.append("title", form.title)
    dataArray.append("reporterId", form.reporterId)
    dataArray.append("visible", form.visible)
    dataArray.append("expirydate", form.expirydate)
    dataArray.append("type", "slider")
    dataArray.append("tags", tags)
    // Removed position from FormData

    for (let i = 0; i < files.length; i++) {
      dataArray.append("sliders", files[i])
    }

    axios
      .put(URLS.UpdateSlider + "/" + formid, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            history.push(
              "/PublishedSlider",
              sessionStorage.setItem(
                "tost",
                "Slider has been Edit Successfully"
              )
            )
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const handleDrop = acceptedFiles => {
    const validatedFiles = acceptedFiles.map(file => {
      const fileExtension = file.name.split(".").pop().toLowerCase()
      const allowedExtensions = ["jpg", "jpeg", "png"]

      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("Invalid file format! Only JPG, JPEG, PNG are allowed.")
        return null
      }

      return Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatFileSize(file.size),
      })
    })

    const filteredFiles = validatedFiles.filter(file => file !== null)
    setFiles(filteredFiles)
  }

  const {} = useDropzone({
    multiple: true,
    onDrop: handleDrop,
  })

  const formatFileSize = bytes => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const [Reporter, setReporter] = useState([])

  useEffect(() => {
    GetReporter()
  }, [])

  const GetReporter = () => {
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
        setReporter(res.data.activeReporters)
      })
  }

  const handleChange = e => {
    const myform = { ...form }
    myform[e.target.name] = e.target.value
    setform(myform)
  }

  useEffect(() => {
    Getslider()
  }, [])

  const Sliderid = sessionStorage.getItem("Sliderid")

  const Getslider = () => {
    var token = datas

    const dataArray = {
      id: Sliderid,
    }

    axios
      .post(URLS.GetOneSlider, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res.data.slider[0])
        setTags(res.data.slider[0].tags)
        setform1(res.data.slider[0].sliders)
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada" breadcrumbItem="Edit Slider" />
          <Row>
            <Col>
              <Button
                onClick={() => history.goBack()}
                className="mb-3  m-1 "
                style={{ float: "right" }}
                color="primary"
              >
                <i className="far fa-arrow-alt-circle-left"></i> Back
              </Button>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <Form
                onSubmit={e => {
                  handleSubmit(e)
                }}
              >
                <Row className="mt-4">
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input2">
                            Title <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="basicpill-firstname-input2"
                            placeholder="Enter Title"
                            required
                            name="title"
                            value={form.title}
                            onChange={e => {
                              handleChange(e)
                            }}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        {" "}
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Reporter
                            <span className="text-danger">*</span>
                          </Label>
                          <select
                            name="reporterId"
                            value={form.reporterId}
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            className="form-select"
                          >
                            <option value="Select Reporter">
                              Select Reporter
                            </option>
                            {Reporter.map((data, key) => {
                              return (
                                <option key={key} value={data._id}>
                                  {data.name}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input2">
                            Expire Date <span className="text-danger">*</span>
                          </Label>
                          <input
                            className="form-control"
                            type="date"
                            name="expirydate"
                            value={form.expirydate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => {
                              handleChange(e)
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Col md={12}>
                        <div className="text-center">
                          <h5 style={{ fontWeight: "bold" }}> Slider Images</h5>

                          <div className="w-75 m-auto">
                            <Dropzone onDrop={handleDrop}>
                              {({ getRootProps, getInputProps }) => (
                                <div className="dropzone">
                                  <div
                                    {...getRootProps()}
                                    className="dz-message needsclick mt-2"
                                  >
                                    <input {...getInputProps()} />
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4>Upload Image.</h4>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            <span className="text-danger mt-3">
                              Upload Multi Images
                            </span>
                            <div
                              className="dropzone-previews mt-3"
                              id="file-previews"
                            >
                              {files.map((f, i) => {
                                return (
                                  <Card
                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                    key={i + "-file"}
                                  >
                                    <div className="p-2">
                                      <Row className="align-items-center">
                                        <Col className="col-auto">
                                          <img
                                            data-dz-thumbnail=""
                                            height="40"
                                            className="avatar-sm rounded bg-light"
                                            alt={f.name}
                                            src={f.preview}
                                          />
                                        </Col>
                                        <Col>
                                          <Link
                                            to="#"
                                            className="text-muted font-weight-bold"
                                          >
                                            {f.name}
                                          </Link>
                                          <p className="mb-0">
                                            <strong>{f.formattedSize}</strong>
                                          </p>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Card>
                                )
                              })}
                            </div>
                            {form1.map((data, key) => (
                              <Card key={key} className="mt-2 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                                <div className="p-2 ">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="20"
                                        className="avatar-sm rounded bg-light"
                                        src={URLS.Base + data}
                                        alt={form.title}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {form.title}
                                      </Link>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12}>
                    {" "}
                    <div style={{ float: "right" }}>
                      <Button
                        className="m-1"
                        color="primary"
                        type="submit"
                        style={{
                          backgroundColor: "#01092c ",
                          border: "2px solid #01092c ",
                        }}
                      >
                        Update <i className="fa fa-upload"></i>
                      </Button>
                    </div>{" "}
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default Addnews