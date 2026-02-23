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
    allowCopy: "both" // Default value for new field
  })

  const [form1, setform1] = useState([])

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
    AddPosters()
  }

  const history = useHistory()
  const AddPosters = () => {
    var token = datas
    var formid = form._id
    const dataArray = new FormData()
    dataArray.append("location", JSON.stringify(selectedOptions))
    dataArray.append("category", JSON.stringify(selectedOptions1))
    dataArray.append("ispublished", form.ispublished)
    dataArray.append("reporterId", form.reporterId)
    dataArray.append("isPremium", form.isPremium)
    dataArray.append("topnews", form.topnews)
    dataArray.append("timetoread", form.timetoread)
    dataArray.append("title", form.title)
    dataArray.append("allcontent", text)
    dataArray.append("description", text)
    dataArray.append("tagsArray", tags)
    dataArray.append("allowCopy", form.allowCopy) // New field added

    for (let i = 0; i < files.length; i++) {
      dataArray.append("image", files[i])
    }

    axios
      .put(URLS.UpdateNews + "/" + formid, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            history.push(
              "/ApprovedLocalNews",
              sessionStorage.setItem(
                "tost",
                "News has been Updated successfully"
              )
            )
            // clearForm()
            setSelectedOptions("")
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

  useEffect(() => {
    Getslider()
  }, [])

  const Sliderid = sessionStorage.getItem("Newsid")

  const Getslider = () => {
    var token = datas

    const dataArray = {
      id: Sliderid,
    }

    axios
      .post(URLS.GetOneNews, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res?.data?.news)
        setTags(res?.data?.news?.tags)
        setSelectedOptions(res?.data?.news?.location)
        setSelectedOptions1(res?.data?.news?.category)
        setText(res?.data?.news?.description)
        setform1(res.data.news.image)
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada" breadcrumbItem="Edit News" />
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
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Col md={12}>
                        <div className="text-center">
                          <h5 style={{ fontWeight: "bold" }}> Image</h5>
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
                              <>
                                <Card className="mt-2 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                                  <div className="p-2 ">
                                    <Row
                                      className="align-items-center"
                                      key={key}
                                    >
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="20"
                                          className="avatar-sm rounded bg-light"
                                          src={URLS.Base + data}
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
                                    </Row>{" "}
                                  </div>
                                </Card>
                              </>
                            ))}
                          </div>
                        </div>
                      </Col>
                    </Row>
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