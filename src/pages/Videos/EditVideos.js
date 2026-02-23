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
import Select from "react-select"
import { URLS } from "Url"
import axios from "axios"

function Addnews() {
  const [form, setform] = useState([])

  const [Location, setLocation] = useState([])

  const [Category, setCategory] = useState([])

  const [selectedOptions, setSelectedOptions] = useState([])

  const [selectedOptions1, setSelectedOptions1] = useState([])

  const [files, setFiles] = useState("")

  const [Files1, setFiles1] = useState("")

  const changeHandler = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "mp4" || type == "mkv" || type == "x-m4v") {
      setFiles(e.target.files)
    } else {
      e.target.value = null
      toast("file format not supported.Pls choose Image")
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
      toast("file format not supported.Pls choose Image")
    }
  }

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
    dataArray.append("reporterId", form.reporterId)
    dataArray.append("isPremium", form.isPremium)
    dataArray.append("timetoread", form.timetoread)
    dataArray.append("youtube", form.youtube)
    dataArray.append("videourl", form.video)
    dataArray.append("title", form.title)
    dataArray.append("description", text)
    dataArray.append("tagsArray", tags)

    for (let i = 0; i < files.length; i++) {
      dataArray.append("video", files[i])
    }

    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("image", Files1[i])
    }

    axios
      .put(URLS.UpdateVideo + "/" + formid, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            history.push(
              "/PublishedVideos",
              sessionStorage.setItem(
                "tost",
                "Video has been Updated successfully"
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

  const handleChange1 = e => {
    const myform = { ...form }
    myform[e.target.name] = e.target.value
    setform(myform)
    // const c = { ...form }
    // c["video"] = ""
    // setform(c)
  }

  useEffect(() => {
    Getslider()
  }, [])

  const Sliderid = sessionStorage.getItem("Videoid")

  const Getslider = () => {
    var token = datas

    const dataArray = {
      id: Sliderid,
    }

    axios
      .post(URLS.GetOneVideo, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res?.data?.video[0])
        setTags(res?.data?.video[0]?.tags)
        setSelectedOptions(res?.data?.video[0]?.location)
        setSelectedOptions1(res?.data?.video[0]?.category)
        setText(res?.data?.video[0]?.description)
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada" breadcrumbItem="Edit Video" />
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
                  <Col md={12}>
                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input2">
                            Title <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="basicpill-firstname-input2"
                            placeholder="Enter 
                             Title"
                            required
                            name="title"
                            value={form.title}
                            onChange={e => {
                              handleChange(e)
                            }}
                          />
                        </div>
                      </Col>
                      <Col md={4}>
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
                      <Col md="4">
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
                      <Col md="4">
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
                      </Col>
                      <Col md={4}>
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
                      <Col md={4}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Is Youtube Link
                            <span className="text-danger">*</span>
                          </Label>
                          <select
                            name="youtube"
                            value={form.youtube}
                            onChange={e => {
                              handleChange1(e)
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
                      <Col md={4}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Image <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="file"
                            className="form-control"
                            id="basicpill-firstname-input1"
                            name="image"
                            value={Files1.image}
                            onChange={changeHandler1}
                          />
                        </div>
                      </Col>
                      {form.youtube == true || form.youtube == "true" ? (
                        <>
                          {" "}
                          <Col md={4}>
                            <div className="mb-3">
                              <Label>Youtube Link</Label>
                              <textarea
                                type="text"
                                className="form-control"
                                id="basicpill-namecard-input11"
                                placeholder="Youtube Link"
                                name="video"
                                value={form.video}
                                rows={1}
                                onChange={e => {
                                  handleChange(e)
                                }}
                              />
                            </div>{" "}
                          </Col>
                        </>
                      ) : (
                        <>
                          <Col md={4}>
                            <div className="mb-3">
                              <Label for="basicpill-firstname-input1">
                                Video <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="file"
                                className="form-control"
                                id="basicpill-firstname-input1"
                                name="image"
                                value={files.image}
                                onChange={changeHandler}
                              />
                            </div>
                          </Col>
                        </>
                      )}
                      <Col md={4}>
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
                      <Col md={4}>
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
