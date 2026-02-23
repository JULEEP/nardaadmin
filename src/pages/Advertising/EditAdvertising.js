import React, { useState, useEffect } from "react"
import {
  CardBody,
  Container,
  Row,
  Col,
  Card,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
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

  const [files, setFiles] = useState("")

  const changeHandler1 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles(e.target.files)
    } else {
      e.target.value = null
      toast("File format not supported choose Image")
    }
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

    for (let i = 0; i < files.length; i++) {
      dataArray.append("file", files[i])
    }

    axios
    .put(URLS.UpdatePosters + "/" + formid, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            history.push(
              "/ApprovedAdvertisingList",
              sessionStorage.setItem(
                "tost",
                "Poster has been Update successfully"
              )
            )
            clearForm()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const clearForm = () => {
    setform({
      reporterId: "",
    })
    setFiles("")
    selectedOptions("")
    selectedOptions1("")
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

  const Sliderid = sessionStorage.getItem("PosterId")

  useEffect(() => {
    Getslider()
  }, [])

  const Getslider = () => {
    var token = datas

    const dataArray = {
      id: Sliderid,
    }

    axios
      .post(URLS.GetOnePosters, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res.data.poster[0])
        setSelectedOptions(res?.data?.poster[0]?.location)
        setSelectedOptions1(res?.data?.poster[0]?.category)
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada" breadcrumbItem="Edit Poster" />
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
                <Row className="mt-2 mb-2">
                  <Col md={12}>
                    <Row className="mt-3">
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
                      </Col>{" "}
                      <Col md={6}>
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Image <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="file"
                            className="form-control"
                            id="basicpill-firstname-input1"
                            name="image"
                            onChange={changeHandler1}
                          />
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
                      <Col md="6">
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
