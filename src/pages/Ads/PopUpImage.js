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
import axios from "axios"
import { URLS } from "../../Url"
import Dropzone from "react-dropzone"
import { useHistory } from "react-router-dom"

const PopUp = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [allPlans, setAllPlans] = useState([])
  const [editingPlan, setEditingPlan] = useState({})
  const [planToDelete, setPlanToDelete] = useState(null)
  const [Files1, setFiles1] = useState("")
  const [form, setForm] = useState({
    url: "",
    type: ""
  })
  const [files, setFiles] = useState([])

  const history = useHistory()

  const changeHandler1 = e => {
    const file = e.target.files
    if (file.length > 0) {
      var ext = file[0].name.split(".").pop()
      var type = ext.toLowerCase()
      if (type == "jpg" || type == "jpeg" || type == "png") {
        setFiles1(file)
      } else {
        e.target.value = null
        toast("File format not supported. Please choose JPG, JPEG, or PNG.")
      }
    }
  }

  function tog_small() {
    setmodal_small(!modal_small)
  }

  function tog_add() {
    setAddModal(!addModal)
    clearForm()
  }

  function tog_delete() {
    setDeleteModal(!deleteModal)
  }

  const handleEditingPlanChange = e => {
    let myUser = { ...editingPlan }
    myUser[e.target.name] = e.target.value
    setEditingPlan(myUser)
  }

  const handleFormChange = e => {
    const myform = { ...form }
    myform[e.target.name] = e.target.value
    setForm(myform)
  }

  useEffect(() => {
    GetAllPlans()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const EditPlans = () => {
    var token = datas
    const dataArray = new FormData()
    dataArray.append("url", editingPlan.url)
    dataArray.append("type", editingPlan.type)
    dataArray.append("_id", editingPlan._id)
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("image", Files1[i])
    }
    axios
      .post("http://98.95.127.183:8003/admin/ads/adsImageUpdate", dataArray, {
        headers: { Authorization: `Bearer ${token}` },
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
          }
        }
      )
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    EditPlans()
  }

  const GetAllPlans = () => {
    const token = datas;

    axios
      .get("http://98.95.127.183:8003/admin/getAllAdsImages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.success) {
          setAllPlans(res.data.data);
        }
      })
      .catch(error => {
        toast.error("Failed to fetch ads images");
        console.error("Error fetching ads images:", error);
      });
  };

  const getpopup = (plan) => {
    setEditingPlan(plan);
    tog_small();
  }

  const confirmDelete = (plan) => {
    setPlanToDelete(plan);
    tog_delete();
  }

  // Updated delete function using DELETE method and params
  const deleteAd = () => {
    if (!planToDelete) return;

    var token = datas;

    // Using DELETE method and sending ID in URL params
    axios
      .delete(`http://98.95.127.183:8003/admin/deletepopup/${planToDelete._id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast.success(res.data.message);
            GetAllPlans();
            setDeleteModal(false);
            setPlanToDelete(null);
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong while deleting");
          }
        }
      )
      .catch(error => {
        toast.error("Failed to delete ad");
        console.error("Delete error:", error);
      });
  }

  const formatFileSize = bytes => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDrop = acceptedFiles => {
    const allowedExtensions = ["jpg", "jpeg", "png"]
    const validatedFiles = acceptedFiles
      .filter(file => {
        const fileExtension = file.name.split(".").pop().toLowerCase()
        if (!allowedExtensions.includes(fileExtension)) {
          toast.error(
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
      if (combinedFiles.length > 1) {
        toast.error("Only 1 file can be uploaded.")
        return combinedFiles.slice(0, 1)
      }
      return combinedFiles
    })
  }

  const handleSubmitAdd = e => {
    e.preventDefault()
    if (files.length > 0) {
      AddNewPopup()
    } else {
      toast.error("Please upload an image")
    }
  }

  const AddNewPopup = () => {
    var token = datas;
    const dataArray = new FormData();
    dataArray.append("url", form.url);
    dataArray.append("type", form.type);

    for (let i = 0; i < files.length; i++) {
      dataArray.append("file", files[i]);
    }

    axios
      .post("http://98.95.127.183:8003/admin/createadsimg", dataArray, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            GetAllPlans();
            setAddModal(false);
            clearForm();
          }
        },
        (error) => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong");
          }
        }
      );
  };

  const clearForm1 = () => {
    setFiles1("")
  }

  const clearForm = () => {
    setForm({
      url: "",
      type: ""
    })
    setFiles([])
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Narada Media Admin"
            breadcrumbItem="PopUp Image"
          />

          <Row>
            <Col className="text-end mb-3">
              <Button color="primary" onClick={tog_add}>
                <i className="bx bx-plus me-1"></i> Add New Popup
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <div>
                    <Row>
                      <Col></Col>
                    </Row>
                    <div className="table-responsive">
                      <Table className="table table-bordered mb-4 mt-5">
                        <thead>
                          <tr className="text-center">
                            <th>Image</th>
                            <th>URL</th>
                            <th>Type</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allPlans.length > 0 ? (
                            allPlans.map((plan, index) => (
                              <tr key={plan._id} className="text-center">
                                <td>
                                  <img
                                    style={{ width: "60px" }}
                                    src={URLS.Base + plan.image.replace(/\\/g, "/")}
                                    alt="Ad"
                                  />
                                </td>
                                <td>{plan.url}</td>
                                <td>{plan.type}</td>
                                <td style={{ width: "200px" }}>
                                  <Button
                                    onClick={() => {
                                      getpopup(plan)
                                    }}
                                    size="sm"
                                    className="m-1"
                                    color="success"
                                  >
                                    <small className="d-flex">
                                      <i className="bx bx-edit px-1"></i>Edit
                                    </small>
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      confirmDelete(plan)
                                    }}
                                    size="sm"
                                    className="m-1"
                                    color="danger"
                                  >
                                    <small className="d-flex">
                                      <i className="bx bx-trash px-1"></i>Delete
                                    </small>
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">
                                No ads available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
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
                <Col md="6">
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">Image</Label>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      name="file"
                      onChange={changeHandler1}
                    />
                  </div>
                </Col>

                <Col md="6">
                  <div className="mb-3">
                    <Label for="basicpill-type-input">
                      Type <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="select"
                      className="form-control"
                      id="basicpill-type-input"
                      required
                      name="type"
                      value={editingPlan.type || ""}
                      onChange={e => {
                        handleEditingPlanChange(e)
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="news">News</option>
                      <option value="posters">Posters</option>
                      <option value="videos">Videos</option>
                    </Input>
                  </div>
                </Col>

                <Col md="12">
                  <div className="mb-3">
                    <Label for="basicpill-url-input">
                      URL <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="basicpill-url-input"
                      placeholder="Enter URL "
                      required
                      name="url"
                      value={editingPlan.url || ""}
                      onChange={e => {
                        handleEditingPlanChange(e)
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <div style={{ float: "right" }}>
                <Button color="primary" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>

        {/* Add Modal */}
        <Modal
          size="lg"
          isOpen={addModal}
          toggle={() => {
            tog_add()
          }}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0">
              Add New Popup
            </h5>
            <button
              onClick={() => {
                setAddModal(false)
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
                handleSubmitAdd(e)
              }}
            >
              <Row>
                <Col md="6">
                  <div className="mb-3">
                    <Label for="add-type-input">
                      Type <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="select"
                      className="form-control"
                      id="add-type-input"
                      required
                      name="type"
                      value={form.type}
                      onChange={e => {
                        handleFormChange(e)
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="news">News</option>
                      <option value="posters">Posters</option>
                      <option value="videos">Videos</option>
                    </Input>
                  </div>
                </Col>

                <Col md="6">
                  <div className="mb-3">
                    <Label for="add-url-input">
                      URL <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="add-url-input"
                      placeholder="Enter URL "
                      required
                      name="url"
                      value={form.url}
                      onChange={e => {
                        handleFormChange(e)
                      }}
                    />
                  </div>
                </Col>

                <Col md="12">
                  <div className="mb-3">
                    <Label>Image <span className="text-danger">*</span></Label>
                    <div className="text-center">
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
                                    <p className="text-muted font-weight-bold mb-0">
                                      {f.name}
                                    </p>
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
              <div style={{ float: "right" }}>
                <Button color="primary" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModal}
          toggle={() => {
            tog_delete()
          }}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0">
              Confirm Delete
            </h5>
            <button
              onClick={() => {
                setDeleteModal(false)
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
            <p>
              Are you sure you want to delete this ad?<br />
              <strong>URL:</strong> {planToDelete?.url}<br />
              <strong>Type:</strong> {planToDelete?.type}
            </p>
            <div className="text-center">
              <img
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                src={planToDelete ? URLS.Base + planToDelete.image.replace(/\\/g, "/") : ""}
                alt="Ad to delete"
              />
            </div>
          </div>
          <div className="modal-footer">
            <Button 
              color="secondary" 
              onClick={() => {
                setDeleteModal(false)
                setPlanToDelete(null)
              }}
            >
              Cancel
            </Button>
            <Button 
              color="danger" 
              onClick={deleteAd}
            >
              Delete
            </Button>
          </div>
        </Modal>

        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default PopUp