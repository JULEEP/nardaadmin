import React, { useState, useEffect } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Table,
  Modal,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { URLS } from "../../Url"

const ListOfAds = () => {
  const [show, setshow] = useState(false)
  const [modal_small, setmodal_small] = useState(false)
  const [Plans, setPlans] = useState([])
  const [form, setform] = useState({
    title: "",
    url: "",
    type: "posters",
    description: "",
    expiryDate: "",
    userType: "both",
    showAfterPosters: 1
  })
  const [form1, setform1] = useState({
    title: "",
    url: "",
    type: "posters",
    description: "",
    expiryDate: "",
    userType: "both",
    showAfterPosters: 1
  })
  const [Files, setFiles] = useState([])
  const [Files1, setFiles1] = useState([])

  const changeHandler = e => {
    const files = Array.from(e.target.files)
    const allowedExtensions = ["jpg", "jpeg", "png"]
    
    const validatedFiles = files.filter(file => {
      const fileExtension = file.name.split(".").pop().toLowerCase()
      if (!allowedExtensions.includes(fileExtension)) {
        toast(`Invalid file format: ${file.name}. Only JPG, JPEG, PNG are allowed.`)
        return false
      }
      return true
    })

    if (validatedFiles.length > 0) {
      setFiles(prevFiles => {
        const combinedFiles = [...prevFiles, ...validatedFiles]
        if (combinedFiles.length > 5) {
          toast("You can only upload up to 5 files.")
          return combinedFiles.slice(0, 5)
        }
        return combinedFiles
      })
    }
  }

  const changeHandler1 = e => {
    const files = Array.from(e.target.files)
    const allowedExtensions = ["jpg", "jpeg", "png"]
    
    const validatedFiles = files.filter(file => {
      const fileExtension = file.name.split(".").pop().toLowerCase()
      if (!allowedExtensions.includes(fileExtension)) {
        toast(`Invalid file format: ${file.name}. Only JPG, JPEG, PNG are allowed.`)
        return false
      }
      return true
    })

    if (validatedFiles.length > 0) {
      setFiles1(prevFiles => {
        const combinedFiles = [...prevFiles, ...validatedFiles]
        if (combinedFiles.length > 5) {
          toast("You can only upload up to 5 files.")
          return combinedFiles.slice(0, 5)
        }
        return combinedFiles
      })
    }
  }

  function tog_small() {
    setmodal_small(!modal_small)
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

  useEffect(() => {
    GetAllPlans()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = Plans.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(Plans.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  // Add new ad
  const AddAd = () => {
    var token = datas
    const dataArray = new FormData()
    dataArray.append("title", form.title)
    dataArray.append("url", form.url)
    dataArray.append("type", form.type)
    dataArray.append("description", form.description)
    dataArray.append("expiryDate", form.expiryDate)
    dataArray.append("userType", form.userType)
    dataArray.append("showAfterPosters", form.showAfterPosters.toString())

    // Append multiple files to FormData
    for (let i = 0; i < Files.length; i++) {
      dataArray.append("image", Files[i])
    }

    axios
      .post('http://52.206.223.237:8003/admin/createAds', dataArray, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast.success(res.data.message)
            GetAllPlans()
            setshow(false)
            clearForm()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message)
          } else {
            toast.error("Something went wrong")
          }
        }
      )
  }

  // Edit ad
  const EditPlans = () => {
    var token = datas
    const dataArray = new FormData()
    dataArray.append("_id", form1._id)
    dataArray.append("title", form1.title)
    dataArray.append("url", form1.url)
    dataArray.append("type", form1.type)
    dataArray.append("description", form1.description)
    dataArray.append("expiryDate", form1.expiryDate)
    dataArray.append("userType", form1.userType)
    dataArray.append("showAfterPosters", form1.showAfterPosters.toString())

    // Append new files if any
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("image", Files1[i])
    }

    axios
      .post('http://52.206.223.237:8003/admin/ads/update', dataArray, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast.success(res.data.message)
            GetAllPlans()
            setmodal_small(false)
            clearForm1()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message)
          } else {
            toast.error("Something went wrong")
          }
        }
      )
  }

  const DeletePlans = (data) => {
    var token = datas
    const adId = data._id
    
    axios
      .delete(`http://52.206.223.237:8003/admin/ads/delete/${adId}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast.success(res.data.message)
            GetAllPlans()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message)
          } else if (error.response && error.response.status === 404) {
            toast.error("Ad not found")
          } else if (error.response && error.response.status === 500) {
            toast.error("Server error")
          } else {
            toast.error("Something went wrong")
          }
        }
      )
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Delete this ad?")
    if (confirmBox === true) {
      DeletePlans(data)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (Files.length === 0) {
      toast.error("Please upload at least one image")
      return
    }
    AddAd()
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    EditPlans()
  }

  const GetAllPlans = () => {
    var token = datas
    axios
      .post(
        'http://52.206.223.237:8003/admin/ads/getall',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setPlans(res.data.data)
      })
      .catch(error => {
        toast.error("Failed to fetch ads")
      })
  }

  const clearForm1 = () => {
    setFiles1([])
    setform1({
      title: "",
      url: "",
      type: "posters",
      description: "",
      expiryDate: "",
      userType: "both",
      showAfterPosters: 1
    })
  }

  const clearForm = () => {
    setform({
      title: "",
      url: "",
      type: "posters",
      description: "",
      expiryDate: "",
      userType: "both",
      showAfterPosters: 1
    })
    setFiles([])
  }

  const getpopup = data => {
    setform1(data)
    tog_small()
  }

  // File preview component
  const FilePreview = ({ files, onRemove }) => {
    if (!files || files.length === 0) return null

    return (
      <div className="mt-2">
        {files.map((file, index) => (
          <Card key={index} className="mt-1 mb-0 shadow-none border">
            <div className="p-2">
              <Row className="align-items-center">
                <Col className="col-auto">
                  <img
                    height="40"
                    className="avatar-sm rounded bg-light"
                    alt={file.name}
                    src={file.preview || URL.createObjectURL(file)}
                  />
                </Col>
                <Col>
                  <div className="text-muted font-weight-bold">
                    {file.name}
                  </div>
                  <p className="mb-0">
                    <strong>{(file.size / 1024 / 1024).toFixed(2)} MB</strong>
                  </p>
                </Col>
                <Col className="col-auto">
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => onRemove(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  const removeFile1 = (index) => {
    setFiles1(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada Media Admin" breadcrumbItem="List of Ads" />
          
          {/* Add New Button */}
          <Row className="mb-3">
            <Col md={12}>
              <Button
                color="primary"
                onClick={() => setshow(!show)}
                style={{ float: "right" }}
              >
                {show ? "Cancel" : "Add New Ad"}
              </Button>
            </Col>
          </Row>

          {/* Add New Ad Form */}
          <Row>
            {show && (
              <Col md={12}>
                <Card>
                  <CardHeader className="bg-white">
                    <CardTitle>Add New Ad</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="6">
                          <div className="mb-3">
                            <Label>Title <span className="text-danger">*</span></Label>
                            <Input
                              type="text"
                              placeholder="Enter Title"
                              required
                              name="title"
                              value={form.title}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="mb-3">
                            <Label>URL <span className="text-danger">*</span></Label>
                            <Input
                              type="text"
                              placeholder="Enter URL"
                              required
                              name="url"
                              value={form.url}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="mb-3">
                            <Label>Type <span className="text-danger">*</span></Label>
                            <select
                              name="type"
                              value={form.type}
                              required
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value="posters">Posters</option>
                            </select>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="mb-3">
                            <Label>Expiry Date <span className="text-danger">*</span></Label>
                            <Input
                              type="date"
                              required
                              name="expiryDate"
                              value={form.expiryDate}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="mb-3">
                            <Label>User Type <span className="text-danger">*</span></Label>
                            <select
                              name="userType"
                              value={form.userType}
                              required
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value="both">Both</option>
                              <option value="subscribed">Subscribed</option>
                              <option value="unsubscribed">Unsubscribed</option>
                            </select>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="mb-3">
                            <Label>Show After Posters Count <span className="text-danger">*</span></Label>
                            <Input
                              type="number"
                              placeholder="Enter number"
                              required
                              min="1"
                              max="50"
                              name="showAfterPosters"
                              value={form.showAfterPosters}
                              onChange={handleChange}
                            />
                            <small className="text-muted">
                              This ad will be shown after every {form.showAfterPosters} poster(s)
                            </small>
                          </div>
                        </Col>
                        <Col md="12">
                          <div className="mb-3">
                            <Label>Description <span className="text-danger">*</span></Label>
                            <textarea
                              className="form-control"
                              placeholder="Short Description"
                              required
                              rows={3}
                              name="description"
                              value={form.description}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col md="12">
                          <div className="mb-3">
                            <Label>Images <span className="text-danger">*</span></Label>
                            <Input
                              type="file"
                              multiple
                              accept=".jpg,.jpeg,.png"
                              onChange={changeHandler}
                            />
                            <small className="text-muted">You can upload up to 5 images (JPG, JPEG, PNG)</small>
                            <FilePreview files={Files} onRemove={removeFile} />
                          </div>
                        </Col>
                      </Row>
                      <div style={{ float: "right" }}>
                        <Button color="primary" type="submit" className="me-2">
                          Submit
                        </Button>
                        <Button color="secondary" type="button" onClick={clearForm}>
                          Clear
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>

          {/* Ads List Table */}
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table table-bordered mb-4 mt-2">
                      <thead>
                        <tr className="text-center">
                          <th>S.No</th>
                          <th>Date</th>
                          <th>Image</th>
                          <th>Title</th>
                          <th>URL</th>
                          <th>Type</th>
                          <th>User Type</th>
                          <th>Show After</th>
                          <th>Expiry Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.map((data, key) => (
                          <tr key={key} className="text-center">
                            <th>{(pageNumber) * 5 + key + 1}</th>
                            <td>{data.updatedAt?.slice(0, 10)}</td>
                            <td>
                              {data.image && data.image.length > 0 ? (
                                <img
                                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                  src={URLS.Base + data.image[0]}
                                  alt={data.title}
                                />
                              ) : (
                                "No Image"
                              )}
                            </td>
                            <td>{data.title}</td>
                            <td>
                              <a href={data.url} target="_blank" rel="noopener noreferrer">
                                {data.url}
                              </a>
                            </td>
                            <td>{data.type}</td>
                            <td>{data.userType || "both"}</td>
                            <td>{data.showAfterPosters || 1}</td>
                            <td>{data.expiryDate}</td>
                            <td style={{ width: "200px" }}>
                              <Button
                                onClick={() => getpopup(data)}
                                size="sm"
                                className="m-1"
                                color="success"
                              >
                                <i className="bx bx-edit px-1"></i>Edit
                              </Button>
                              <Button
                                onClick={() => manageDelete(data)}
                                className="m-1"
                                size="sm"
                                color="danger"
                              >
                                <i className="bx bx-trash px-1"></i>Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    
                    {/* Pagination */}
                    {Plans.length > listPerPage && (
                      <div className="mt-3" style={{ float: "right" }}>
                        <ReactPaginate
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={"pagination"}
                          previousLinkClassName={"page-link"}
                          nextLinkClassName={"page-link"}
                          pageLinkClassName={"page-link"}
                          disabledClassName={"disabled"}
                          activeClassName={"active"}
                        />
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Edit Modal */}
        <Modal
          size="lg"
          isOpen={modal_small}
          toggle={tog_small}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0">Edit Ad</h5>
            <button
              onClick={tog_small}
              type="button"
              className="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Form onSubmit={handleSubmit1}>
              <Row>
                <Col md="6">
                  <div className="mb-3">
                    <Label>Title <span className="text-danger">*</span></Label>
                    <Input
                      type="text"
                      required
                      name="title"
                      value={form1.title}
                      onChange={handleChange1}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label>URL <span className="text-danger">*</span></Label>
                    <Input
                      type="text"
                      required
                      name="url"
                      value={form1.url}
                      onChange={handleChange1}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label>Type <span className="text-danger">*</span></Label>
                    <select
                      name="type"
                      value={form1.type}
                      required
                      onChange={handleChange1}
                      className="form-select"
                    >
                      <option value="posters">Posters</option>
                    </select>
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label>Expiry Date <span className="text-danger">*</span></Label>
                    <Input
                      type="date"
                      required
                      name="expiryDate"
                      value={form1.expiryDate}
                      onChange={handleChange1}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label>User Type <span className="text-danger">*</span></Label>
                    <select
                      name="userType"
                      value={form1.userType}
                      required
                      onChange={handleChange1}
                      className="form-select"
                    >
                      <option value="both">Both</option>
                      <option value="subscribed">Subscribed</option>
                      <option value="unsubscribed">Unsubscribed</option>
                    </select>
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label>Show After Posters <span className="text-danger">*</span></Label>
                    <Input
                      type="number"
                      required
                      min="1"
                      max="50"
                      name="showAfterPosters"
                      value={form1.showAfterPosters}
                      onChange={handleChange1}
                    />
                  </div>
                </Col>
                <Col md="12">
                  <div className="mb-3">
                    <Label>Description <span className="text-danger">*</span></Label>
                    <textarea
                      className="form-control"
                      required
                      rows={3}
                      name="description"
                      value={form1.description}
                      onChange={handleChange1}
                    />
                  </div>
                </Col>
                <Col md="12">
                  <div className="mb-3">
                    <Label>Update Images</Label>
                    <Input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png"
                      onChange={changeHandler1}
                    />
                    <small className="text-muted">Upload new images to replace existing ones</small>
                    <FilePreview files={Files1} onRemove={removeFile1} />
                  </div>
                </Col>
              </Row>
              <div style={{ float: "right" }} className="mt-3">
                <Button color="primary" type="submit" className="me-2">
                  Update
                </Button>
                <Button color="secondary" type="button" onClick={clearForm1}>
                  Clear
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default ListOfAds