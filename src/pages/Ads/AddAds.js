import React, { useState } from "react"
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
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import Dropzone from "react-dropzone"

function AddAds() {
  const [form, setform] = useState({
    title: "",
    expiryDate: "",
    description: "",
    url: "",
    userType: "both", // Set default to both
    showAfterPosters: 1 // New field for showing ads after specific number of posters
  })

  const [files, setFiles] = useState([])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const navigate = useHistory();

  const handleSubmit = e => {
    e.preventDefault()

    if (files.length > 0) {
      GetAll()
    } else {
      toast("Please upload image")
    }
  }

  const formatFileSize = bytes => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const GetAll = () => {
    var token = datas
    const dataArray = new FormData()
    dataArray.append("title", form.title)
    dataArray.append("description", form.description)
    dataArray.append("url", form.url)
    dataArray.append("expiryDate", form.expiryDate)
    dataArray.append("type", "ads") // ✅ Static type "ads" sent to backend
    dataArray.append("userType", form.userType)
    dataArray.append("showAfterPosters", form.showAfterPosters)

    // Append multiple files to FormData
    for (let i = 0; i < files.length; i++) {
      dataArray.append("image", files[i])
    }

    axios
      .post('http://13.51.235.130:8003/admin/createAds', dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          toast(res.data.message)
          navigate.push("/ListOfAds")
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const handleChange = e => {
    const myform = { ...form }
    myform[e.target.name] = e.target.value
    setform(myform)
  }

  const handleDrop = acceptedFiles => {
    const allowedExtensions = ["jpg", "jpeg", "png"]
    const validatedFiles = acceptedFiles
      .filter(file => {
        const fileExtension = file.name.split(".").pop().toLowerCase()
        if (!allowedExtensions.includes(fileExtension)) {
          toast(
            `Invalid file format: ${file.name}. Only JPG, JPEG, PNG are allowed.`
          )
          return false
        }
        return true
      })
      .map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: formatFileSize(file.size),
        })
      )

    setFiles(prevFiles => {
      // Handle multiple file uploads
      const combinedFiles = [...prevFiles, ...validatedFiles]

      // Show a toast if more than 5 files are uploaded
      if (combinedFiles.length > 5) {
        toast("You can only upload up to 5 files.")
        return combinedFiles.slice(0, 5) // Only keep the first 5 files
      }
      return combinedFiles
    })
  }

  const clearForm = () => {
    setform({
      title: "",
      expiryDate: "",
      description: "",
      url: "",
      userType: "both",
      showAfterPosters: 1
    })
    setFiles([])
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada" breadcrumbItem="Add Ads" />
          <Form
            onSubmit={e => {
              handleSubmit(e)
            }}
          >
            <Card>
              <CardBody>
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
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input2">
                             URL <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="basicpill-firstname-input2"
                            placeholder="Enter URL"
                            required
                            name="url"
                            value={form.url}
                            onChange={e => {
                              handleChange(e)
                            }}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input2">
                             Expiry Date <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="date"
                            className="form-control"
                            id="basicpill-firstname-input2"
                            placeholder="Enter expiryDate"
                            required
                            name="expiryDate"
                            value={form.expiryDate}
                            onChange={e => {
                              handleChange(e)
                            }}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="userType-input">
                            User Type
                            <span className="text-danger">*</span>
                          </Label>
                          <select
                            name="userType"
                            value={form.userType}
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            className="form-select"
                          >
                            <option value="both">Both</option>
                            <option value="subscribed">Subscribed</option>
                            <option value="unsubscribed">Unsubscribed</option>
                          </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="showAfterPosters-input">
                            Show After Posters Count
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="showAfterPosters-input"
                            placeholder="Enter number of posters after which to show this ad"
                            required
                            min="1"
                            max="50"
                            name="showAfterPosters"
                            value={form.showAfterPosters}
                            onChange={e => {
                              handleChange(e)
                            }}
                          />
                          <small className="text-muted">
                            This ad will be shown after every {form.showAfterPosters} poster(s)
                          </small>
                        </div>
                      </Col>
                      <Col md={12}>
                        <div>
                          <Label> Description</Label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="basicpill-namecard-input11"
                            placeholder="Short Description"
                            name="description"
                            value={form.description}
                            required
                            rows={3}
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
                          <h5 style={{ fontWeight: "bold" }}> Image</h5>
                          <div className="w-75 m-auto">
                            <Dropzone onDrop={handleDrop} multiple>
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
                                    <h4>Upload Images.</h4>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
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
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Row className="mt-3 mb-3">
              <Col md={12}>
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
                    Submit <i className="fa fa-upload"></i>
                  </Button>
                  <Button
                    className="m-1"
                    color="secondary"
                    type="button"
                    onClick={clearForm}
                    style={{
                      backgroundColor: "#6c757d",
                      border: "2px solid #6c757d",
                    }}
                  >
                    Clear Form
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default AddAds