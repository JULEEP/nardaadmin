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
import Breadcrumbs from "../../components/Common/Breadcrumb"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { ToastContainer, toast } from "react-toastify"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import Dropzone from "react-dropzone"
import Select from "react-select"
import { URLS } from "Url"
import axios from "axios"

function Addnews() {
  const [form, setform] = useState({
    title: "",
    reporterId: "",
    shortdescription: "",
    isPremium: "",
    topnews: "",
    ispublished: "",
    timetoread: "",
    allowCopy: "both" // New field for copy permission
  })

  const [Location, setLocation] = useState([])
  const [Category, setCategory] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [selectedOptions1, setSelectedOptions1] = useState([])

  const Locations = selectedOptions => {
    setSelectedOptions(selectedOptions)
  }

  const Categorys = selectedOptions => {
    setSelectedOptions1(selectedOptions)
  }

  const options1 = Category.map(response => ({
    value: response._id,
    label: response.name,
  }))

  const options = Location.map(response => ({
    value: response._id,
    label: response.name,
  }))

  useEffect(() => {
    GetLocations()
  }, [])

  const GetLocations = () => {
    var token = datas
    axios
      .post(
        URLS.GetLocation,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          setLocation(res.data.locations)
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const [text, setText] = useState([])
  const [files, setFiles] = useState([])
  const [middleImage, setMiddleImage] = useState([])

  // Static tags - always send these to backend
  const staticTags = ["news", "article", "latest"]

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const handleSubmit = e => {
    e.preventDefault()

    if (files.length > 0) {
      AddPosters()
    } else {
      toast("Please upload main image")
    }
  }

  const history = useHistory()
  const AddPosters = () => {
    var token = datas
    const dataArray = new FormData()
    
    // Text fields
    dataArray.append("location", JSON.stringify(selectedOptions))
    dataArray.append("category", JSON.stringify(selectedOptions1))
    dataArray.append("shortdescription", form.shortdescription)
    dataArray.append("ispublished", form.ispublished)
    dataArray.append("reporterId", form.reporterId)
    dataArray.append("isPremium", form.isPremium)
    dataArray.append("topnews", form.topnews)
    dataArray.append("timetoread", form.timetoread)
    dataArray.append("title", form.title)
    dataArray.append("allcontent", text)
    dataArray.append("description", text)
    dataArray.append("tagsArray", JSON.stringify(staticTags)) // Static tags
    dataArray.append("allowCopy", form.allowCopy)

    // Main images append
    files.forEach((file) => {
      dataArray.append("image", file)
    })

    // Middle image append
    if (middleImage.length > 0) {
      dataArray.append("middleImage", middleImage[0])
    }

    console.log("FormData contents:")
    for (let pair of dataArray.entries()) {
      console.log(pair[0] + ': ', pair[1])
    }

    axios
      .post(URLS.AddArticle, dataArray, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            history.push(
              "/PublishedArticle",
              sessionStorage.setItem(
                "tost",
                "Article has been Added successfully"
              )
            )
            clearForm()
            setSelectedOptions("")
          }
        },
        error => {
          console.error("Error:", error)
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const handleDrop = acceptedFiles => {
    const allowedExtensions = ["jpg", "jpeg", "png"]

    // Filter and validate the files
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

    // Combine the new files with existing files and enforce the limit
    setFiles(prevFiles => {
      const combinedFiles = [...prevFiles, ...validatedFiles]
      if (combinedFiles.length > 5) {
        toast("Maximum of 5 files can be uploaded.")
        return combinedFiles.slice(0, 5)
      }
      return combinedFiles
    })
  }

  // New function for middle image upload
  const handleMiddleImageDrop = acceptedFiles => {
    const allowedExtensions = ["jpg", "jpeg", "png"]

    // Filter and validate the files
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

    // For middle image, we'll allow only one file
    setMiddleImage(prevFiles => {
      const combinedFiles = [...prevFiles, ...validatedFiles]
      if (combinedFiles.length > 1) {
        toast("Only one middle image can be uploaded.")
        return combinedFiles.slice(0, 1)
      }
      return combinedFiles
    })
  }

  const formatFileSize = bytes => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const clearForm = () => {
    setform({
      title: "",
      reporterId: "",
      shortdescription: "",
      isPremium: "",
      topnews: "",
      ispublished: "",
      timetoread: "",
      allowCopy: "both"
    })
    setFiles([])
    setMiddleImage([])
    setSelectedOptions([])
    setSelectedOptions1([])
    setText("")
  }

  // Function to remove middle image
  const removeMiddleImage = () => {
    setMiddleImage([])
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

  useEffect(() => {
    GetCategory()
  }, [])

  const GetCategory = () => {
    var token = datas
    axios
      .get(
        URLS.GetCategory,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setCategory(res.data.data)
      })
  }

  const handleChange = e => {
    const myform = { ...form }
    myform[e.target.name] = e.target.value
    setform(myform)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada" breadcrumbItem="Add Article" />
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
                            Article Title <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="basicpill-firstname-input2"
                            placeholder="Enter Article Title"
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
                            <option value="">Select Reporter</option>
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
                      <Col md="6">
                        <div className="mb-3 ">
                          <Label for="basicpill-firstname-input1">
                            Location
                            <span className="text-danger">*</span>
                          </Label>
                          <Select
                            options={options}
                            placeholder="Enter Location"
                            value={selectedOptions}
                            onChange={Locations}
                            isSearchable={true}
                            isMulti
                          />
                        </div>
                      </Col>
                      {/* <Col md="6">
                        <div className="mb-3 ">
                          <Label for="basicpill-firstname-input1">
                            Category
                          </Label>
                          <Select
                            options={options1}
                            placeholder="Enter Category (Optional)"
                            value={selectedOptions1}
                            onChange={Categorys}
                            isSearchable={true}
                            isMulti
                          />
                        </div>
                      </Col> */}
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Is Premium
                            <span className="text-danger">*</span>
                          </Label>
                          <select
                            name="isPremium"
                            value={form.isPremium}
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            className="form-select"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Is Published
                            <span className="text-danger">*</span>
                          </Label>
                          <select
                            name="ispublished"
                            value={form.ispublished}
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            className="form-select"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Top News
                            <span className="text-danger">*</span>
                          </Label>
                          <select
                            name="topnews"
                            value={form.topnews}
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            className="form-select"
                          >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input2">
                            Time To Post <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="basicpill-firstname-input2"
                            placeholder="Enter Time To Post"
                            required
                            name="timetoread"
                            value={form.timetoread}
                            onChange={e => {
                              handleChange(e)
                            }}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="allowCopy-input">
                            Allow Copy To
                            <span className="text-danger">*</span>
                          </Label>
                          <select
                            name="allowCopy"
                            value={form.allowCopy}
                            onChange={e => {
                              handleChange(e)
                            }}
                            required
                            className="form-select"
                          >
                            <option value="both">Both Subscribed & Unsubscribed</option>
                            <option value="subscribed">Subscribed Users Only</option>
                            <option value="unsubscribed">Unsubscribed Users Only</option>
                            <option value="none">No One (Disable Copy)</option>
                          </select>
                          <small className="text-muted">
                            {form.allowCopy === "both" && "All users can copy this article"}
                            {form.allowCopy === "subscribed" && "Only subscribed users can copy this article"}
                            {form.allowCopy === "unsubscribed" && "Only unsubscribed users can copy this article"}
                            {form.allowCopy === "none" && "Copy functionality is disabled for all users"}
                          </small>
                        </div>
                      </Col>
                      <Col md={12}>
                        <div>
                          <Label>Short Description</Label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="basicpill-namecard-input11"
                            placeholder="Short Description"
                            name="shortdescription"
                            value={form.shortdescription}
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
                          <h5 style={{ fontWeight: "bold" }}>Main Images</h5>
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
                                    <h4>Upload Main Images</h4>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            <span className="text-danger mt-3">
                              Upload Multiple Images (Max 5)
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
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            {/* Middle Image Upload Section */}
            <Card className="mt-3">
              <CardBody>
                <Row>
                  <Col md={12}>
                    <div className="text-center">
                      <h5 style={{ fontWeight: "bold" }}>Middle Image</h5>
                      <p className="text-muted">Image that appears in the middle of the article content</p>
                      <div className="w-75 m-auto">
                        <Dropzone onDrop={handleMiddleImageDrop}>
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
                                <h4>Upload Middle Image</h4>
                                <span className="text-muted">Only one image allowed</span>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        
                        {/* Middle Image Preview */}
                        {middleImage.length > 0 && (
                          <div className="mt-3">
                            <h6>Middle Image Preview:</h6>
                            <Card className="shadow-none border">
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      height="60"
                                      className="rounded bg-light"
                                      alt={middleImage[0].name}
                                      src={middleImage[0].preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {middleImage[0].name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{middleImage[0].formattedSize}</strong>
                                    </p>
                                    <Button
                                      color="danger"
                                      size="sm"
                                      className="mt-1"
                                      onClick={removeMiddleImage}
                                    >
                                      Remove
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Row>
                  <Col md="12" className="mt-3 mb-3">
                    <Label>Description</Label>
                    <CKEditor
                      editor={ClassicEditor}
                      id="header"
                      data={text}
                      onReady={editor => {
                        console.log("Editor is ready to use!", editor)
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        setText(data)
                      }}
                    />
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
                    Publish <i className="fa fa-upload"></i>
                  </Button>
                  <Button
                    className="m-1"
                    color="secondary"
                    type="button"
                    onClick={clearForm}
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

export default Addnews