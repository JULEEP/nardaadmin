import React, { useState, useEffect } from "react"
import {
  CardBody,
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import Dropzone from "react-dropzone"
import { FaTrash } from "react-icons/fa"

function AddSubscriptionPopup() {
  const [file, setFile] = useState(null)
  const [popups, setPopups] = useState([]) // popup list
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(5) // items per page
  const [totalPages, setTotalPages] = useState(1)

  const gets = localStorage.getItem("authUser")
  const data = JSON.parse(gets)
  const token = data.token

  // Fetch popup list
  const fetchPopups = async page => {
    try {
      const res = await axios.get("http://98.95.127.183:8003/get-subscriptions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const allPopups = res.data.data.filter(p => p.popupImg) // only popups with image
      setTotalPages(Math.ceil(allPopups.length / pageSize))
      const paginatedData = allPopups.slice(
        (page - 1) * pageSize,
        page * pageSize
      )
      setPopups(paginatedData)
    } catch (err) {
      console.error(err)
      toast("Failed to fetch popups")
    }
  }

  useEffect(() => {
    fetchPopups(currentPage)
  }, [currentPage])

  const handleSubmit = e => {
    e.preventDefault()
    if (file) uploadPopup()
    else toast("Please upload popup image")
  }

  const formatFileSize = bytes => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const uploadPopup = async () => {
    const dataArray = new FormData()
    dataArray.append("popupImg", file)

    try {
      const res = await axios.post(
        "http://98.95.127.183:8003/add-seubscriptionpopup",
        dataArray,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast(res.data.message)
      setFile(null)
      fetchPopups(currentPage) // refresh list after upload
    } catch (err) {
      if (err.response && err.response.status === 400)
        toast(err.response.data.message)
      else toast("Something went wrong")
    }
  }

  const handleDrop = acceptedFiles => {
    const allowedExtensions = ["jpg", "jpeg", "png"]
    const validated = acceptedFiles[0]
    if (!validated) return
    const fileExtension = validated.name.split(".").pop().toLowerCase()
    if (!allowedExtensions.includes(fileExtension)) {
      toast("Only JPG, JPEG, PNG are allowed.")
      return
    }
    setFile(
      Object.assign(validated, {
        preview: URL.createObjectURL(validated),
        formattedSize: formatFileSize(validated.size),
      })
    )
  }

  const clearForm = () => setFile(null)

  const handlePageChange = page => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleDeletePopup = async id => {
    if (!window.confirm("Are you sure you want to delete this popup?")) return

    try {
      await axios.delete(
        `http://98.95.127.183:8003/delete-subscriptionpopup/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast("Popup deleted successfully")
      fetchPopups(currentPage)
    } catch (err) {
      toast("Failed to delete popup")
      console.error(err)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Narada"
            breadcrumbItem="Add Subscription Popup"
          />

          {/* Upload Form */}
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardBody>
                <Row className="mt-4">
                  <Col md={12} className="text-center">
                    <h5 style={{ fontWeight: "bold" }}>Popup Image</h5>
                    <div className="w-50 m-auto">
                      <Dropzone onDrop={handleDrop} multiple={false}>
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
                              <h4>Upload Popup Image</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>

                      {file && (
                        <Card className="mt-3 shadow-none border dz-image-preview dz-success">
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  height="40"
                                  className="avatar-sm rounded bg-light"
                                  alt={file.name}
                                  src={file.preview}
                                />
                              </Col>
                              <Col>
                                <p className="text-muted font-weight-bold mb-0">
                                  {file.name} ({file.formattedSize})
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      )}
                    </div>
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
                    style={{ backgroundColor: "#01092c", border: "2px solid #01092c" }}
                  >
                    Submit <i className="fa fa-upload"></i>
                  </Button>
                  <Button
                    className="m-1"
                    color="secondary"
                    type="button"
                    onClick={clearForm}
                  >
                    Clear
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>

          {/* Subscription Popup List */}
          <Card className="mt-4">
            <CardBody>
              <h5>Uploaded Subscription Popups</h5>
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Popup Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {popups.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No popups found
                      </td>
                    </tr>
                  ) : (
                    popups.map((p, i) => (
                      <tr key={i}>
                        <td>{(currentPage - 1) * pageSize + i + 1}</td>
                        <td>
                          <img
                            src={`http://98.95.127.183:8003/${p.popupImg.replace("\\", "/")}`}
                            alt="Popup"
                            height="50"
                          />
                        </td>
                        <td>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleDeletePopup(p._id)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>

              {/* Pagination */}
              <div className="d-flex justify-content-center mt-3">
                <Button
                  color="primary"
                  className="me-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>
                <span className="align-self-center mx-2">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  color="primary"
                  className="ms-2"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </CardBody>
          </Card>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default AddSubscriptionPopup
