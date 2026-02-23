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
    allowCopy: "both"
  })

  const [Location, setLocation] = useState([])
  const [Category, setCategory] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [selectedOptions1, setSelectedOptions1] = useState([])
  const [text, setText] = useState("")
  const [files, setFiles] = useState([])
  const [middleImage, setMiddleImage] = useState(null) // ✅ Changed to single file (null)
  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState("")

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
  dataArray.append("tagsArray", JSON.stringify(tags))
  dataArray.append("allowCopy", form.allowCopy)

  // Files
  files.forEach((file) => {
    dataArray.append("image", file)
  })

  if (middleImage) {
    dataArray.append("middleImage", middleImage)
  }

  // ✅ CORRECT URL FOR NEWS
  axios
    .post(URLS.AddNews, dataArray, { // ✅ Use AddNews URL
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    })
    .then(
      res => {
        if (res.status === 200) {
          toast.success(res.data.message)
          history.push("/ApprovedLocalNews") // ✅ Correct redirect
          clearForm()
        }
      },
      error => {
        console.error("Error:", error)
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message)
        }
      }
    )
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
      const combinedFiles = [...prevFiles, ...validatedFiles]
      if (combinedFiles.length > 5) {
        toast("Maximum of 5 files can be uploaded.")
        return combinedFiles.slice(0, 5)
      }
      return combinedFiles
    })
  }

  // ✅ Updated - Middle image as single file
  const handleMiddleImageDrop = acceptedFiles => {
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

    // ✅ Take only the first file (single image)
    if (validatedFiles.length > 0) {
      setMiddleImage(validatedFiles[0]) // Single file set
      if (validatedFiles.length > 1) {
        toast("Only one middle image can be uploaded. Using the first one.")
      }
    }
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
    setMiddleImage(null) // ✅ Set to null
    setTags([])
    setSelectedOptions([])
    setSelectedOptions1([])
    setText("")
    setInputValue("")
  }

  // ✅ Updated - Remove middle image
  const removeMiddleImage = () => {
    setMiddleImage(null) // Set to null
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
          <Breadcrumbs title="Narada" breadcrumbItem="Add News" />
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardBody>
                <Row className="mt-4">
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input2">
                            HeadLine <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="basicpill-firstname-input2"
                            placeholder="Enter HeadLine"
                            required
                            name="title"
                            value={form.title}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            required
                            className="form-select"
                          >
                            <option value="">Select Reporter</option>
                            {Reporter.map((data, key) => (
                              <option key={key} value={data._id}>
                                {data.name}
                              </option>
                            ))}
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
                            <span className="text-danger">*</span>
                          </Label>
                          <Select
                            options={options1}
                            placeholder="Enter Category"
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            Time To Read <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="basicpill-firstname-input2"
                            placeholder="Enter Time To Read"
                            required
                            name="timetoread"
                            value={form.timetoread}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            required
                            className="form-select"
                          >
                            <option value="both">Both Subscribed & Unsubscribed</option>
                            <option value="subscribed">Subscribed Users Only</option>
                            <option value="unsubscribed">Unsubscribed Users Only</option>
                            <option value="none">No One (Disable Copy)</option>
                          </select>
                          <small className="text-muted">
                            {form.allowCopy === "both" && "All users can copy this news"}
                            {form.allowCopy === "subscribed" && "Only subscribed users can copy this news"}
                            {form.allowCopy === "unsubscribed" && "Only unsubscribed users can copy this news"}
                            {form.allowCopy === "none" && "Copy functionality is disabled for all users"}
                          </small>
                        </div>
                      </Col>
                      {/* <Col md={6}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Tags
                            <span className="text-danger">*</span>
                          </Label>
                          <div className="tags-input-container">
                            {tags.map((tag, index) => (
                              <div className="tag-item" key={index}>
                                <span className="tag-text">{tag}</span>
                                <span
                                  className="tag-close"
                                  onClick={() => removeTag(index)}
                                >
                                  &times;
                                </span>
                              </div>
                            ))}
                            <input
                              type="text"
                              value={inputValue}
                              onChange={handleInputChange}
                              onKeyDown={handleKeyDown}
                              placeholder="Enter Tags Type and press Enter"
                              id="twss"
                            />
                          </div>
                        </div>
                      </Col> */}
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
                            onChange={handleChange}
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
                            <div className="dropzone-previews mt-3" id="file-previews">
                              {files.map((f, i) => (
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
                                        <Link to="#" className="text-muted font-weight-bold">
                                          {f.name}
                                        </Link>
                                        <p className="mb-0">
                                          <strong>{f.formattedSize}</strong>
                                        </p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              ))}
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
                      <p className="text-muted">Image that appears in the middle of the news content</p>
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
                        
                        {/* ✅ Updated - Middle Image Preview for single file */}
                        {middleImage && (
                          <div className="mt-3">
                            <h6>Middle Image Preview:</h6>
                            <Card className="shadow-none border">
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      height="60"
                                      className="rounded bg-light"
                                      alt={middleImage.name}
                                      src={middleImage.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link to="#" className="text-muted font-weight-bold">
                                      {middleImage.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{middleImage.formattedSize}</strong>
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