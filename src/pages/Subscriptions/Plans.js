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

const Plans = () => {
  const [show, setshow] = useState(false)
  const [modal_small, setmodal_small] = useState(false)
  const [Plans, setPlans] = useState([])
  const [form, setform] = useState({
    planName: "",
    duration: "",
    price: "",
    discount: "",
    order: ""
  })
  const [form1, setform1] = useState({
    planName: "",
    duration: "",
    price: "",
    discount: "",
    order: ""
  })
  const [inputList, setInputList] = useState([""])
  const [inputList1, setInputList1] = useState([""])
  const [search, setsearch] = useState("")
  const [ins, setins] = useState(false)
  const [Instructions, setInstructions] = useState([])

  // Get token from localStorage
  const gets = localStorage.getItem("authUser")
  const data = JSON.parse(gets)
  const datas = data?.token || ""

  // Pagination states
  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = Plans.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(Plans.length / listPerPage)

  // Input handlers for dynamic advantages
  const handleInputChange = (e, index) => {
    const { value } = e.target
    const list = [...inputList]
    list[index] = value
    setInputList(list)
  }

  const handleRemoveClick = index => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  const handleAddClick = () => {
    setInputList([...inputList, ""])
  }

  const handleInputChange1 = (e, index) => {
    const { value } = e.target
    const list = [...inputList1]
    list[index] = value
    setInputList1(list)
  }

  const handleRemoveClick1 = index => {
    const list = [...inputList1]
    list.splice(index, 1)
    setInputList1(list)
  }

  const handleAddClick1 = () => {
    setInputList1([...inputList1, ""])
  }

  // Modal handlers
  function tog_small() {
    setmodal_small(!modal_small)
  }

  function inst() {
    setins(!ins)
  }

  // Form change handlers
  const handleChange = e => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleChange1 = e => {
    setform1({
      ...form1,
      [e.target.name]: e.target.value
    })
  }

  // Page change handler
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  // Form submission handlers
  const handleSubmit = e => {
    e.preventDefault()
    AddPlans()
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    EditPlans()
  }

 const AddPlans = () => {
  // Filter out empty advantages
  const filteredAdvantages = inputList.filter(adv => adv.trim() !== "")
  
  // Direct object banao FormData ki jagah
  const requestData = {
    planName: form.planName,
    duration: form.duration,
    price: form.price,
    discount: form.discount,
    order: form.order,
    advantages: JSON.stringify(filteredAdvantages)
  };

  console.log("Sending data:", requestData); // Debug ke liye

  axios
    .post(URLS.AddPlans, requestData, { // Direct object bhejo
      headers: { 
        Authorization: `Bearer ${datas}`,
        'Content-Type': 'application/json' // JSON header add karo
      },
    })
    .then(res => {
      if (res.status === 200) {
        toast.success(res.data.message)
        GetAllPlans()
        clearForm()
        setshow(false)
      }
    })
    .catch(error => {
      console.log("Error:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Something went wrong")
      }
    })
}
  const EditPlans = () => {
  const formid = form1._id
  // Filter out empty advantages
  const filteredAdvantages = inputList1.filter(adv => adv.trim() !== "")
  
  // Direct object banao FormData ki jagah
  const requestData = {
    planName: form1.planName,
    duration: form1.duration,
    price: form1.price,
    discount: form1.discount,
    order: form1.order,
    advantages: JSON.stringify(filteredAdvantages)
  };

  axios
    .put(URLS.UpdatePlans + formid, requestData, { // Direct object bhejo
      headers: { 
        Authorization: `Bearer ${datas}`,
        'Content-Type': 'application/json' // JSON header add karo
      },
    })
    .then(res => {
      if (res.status === 200) {
        toast.success(res.data.message)
        GetAllPlans()
        setmodal_small(false)
        clearForm1()
      }
    })
    .catch(error => {
      console.log("Error:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Something went wrong")
      }
    })
}

  const DeletePlans = data => {
    const remid = data._id
    axios
      .delete(URLS.DeletePlans + remid, {
        headers: { Authorization: `Bearer ${datas}` },
      })
      .then(res => {
        if (res.status === 200) {
          toast.success(res.data.message)
          GetAllPlans()
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Something went wrong")
        }
      })
  }

  const GetAllPlans = () => {
    axios
      .post(
        URLS.GetPlans,
        {},
        {
          headers: { Authorization: `Bearer ${datas}` },
        }
      )
      .then(res => {
        setPlans(res.data.plans || [])
      })
      .catch(error => {
        console.error("Error fetching plans:", error)
        toast.error("Failed to fetch plans")
      })
  }

  const searchAll = e => {
    const searchValue = e.target.value
    setsearch(searchValue)

    if (searchValue.trim() === "") {
      GetAllPlans()
      return
    }

    axios
      .post(
        URLS.GetPlansSearch + `${searchValue}`,
        {},
        {
          headers: { Authorization: `Bearer ${datas}` },
        }
      )
      .then(res => {
        setPlans(res.data.plans || [])
      })
      .catch(error => {
        console.error("Search error:", error)
        toast.error("Search failed")
      })
  }

  // Utility functions
  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Delete this plan?")
    if (confirmBox === true) {
      DeletePlans(data)
    }
  }

  const clearForm1 = () => {
    setform1({
      planName: "",
      duration: "",
      price: "",
      discount: "",
      order: "",
    })
    setInputList1([""])
  }

  const clearForm = () => {
    setform({
      planName: "",
      duration: "",
      price: "",
      discount: "",
      order: "",
    })
    setInputList([""])
  }

  const getpopup = data => {
    setform1(data)
    setInputList1(data.advantages && data.advantages.length > 0 ? data.advantages : [""])
    tog_small()
  }

  const getinc = data => {
    setInstructions(data.advantages || [])
    inst()
  }

  // Effects
  useEffect(() => {
    GetAllPlans()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada Media Admin" breadcrumbItem="Plans" />
          
          {/* Add Plan Form */}
          <Row>
            {show && (
              <Col md={12}>
                <Card>
                  <CardHeader className="bg-white">
                    <CardTitle>Add Plan</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <div className="mb-3">
                            <Label for="planName">
                              Plan Name <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="planName"
                              placeholder="Enter Name"
                              required
                              name="planName"
                              value={form.planName}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3">
                            <Label>Duration <span className="text-danger">*</span></Label>
                            <select
                              value={form.duration}
                              name="duration"
                              required
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option value="">Select</option>
                              <option value="1">1 Month</option>
                              <option value="3">3 Months</option>
                              <option value="6">6 Months</option>
                              <option value="9">9 Months</option>
                              <option value="12">12 Months</option>
                            </select>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3">
                            <Label for="price">
                              Plan Price <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="number"
                              className="form-control"
                              id="price"
                              placeholder="Enter Plan Price"
                              required
                              name="price"
                              value={form.price}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3">
                            <Label for="discount">
                              Discount <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="number"
                              className="form-control"
                              id="discount"
                              placeholder="Enter Discount"
                              required
                              name="discount"
                              value={form.discount}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3">
                            <Label for="order">
                              Order <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="number"
                              className="form-control"
                              id="order"
                              placeholder="Enter Order Number"
                              required
                              name="order"
                              value={form.order}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        
                        {/* Advantages Section */}
                        <Col md="12">
                          <div className="mb-3">
                            <Label>Advantages</Label>
                            {inputList.map((x, i) => (
                              <Row key={i} className="mb-2">
                                <Col md="6">
                                  <Input
                                    type="text"
                                    required
                                    name="advantages"
                                    placeholder="Enter Advantage"
                                    value={x}
                                    onChange={e => handleInputChange(e, i)}
                                  />
                                </Col>
                                <Col md="6">
                                  <div className="btn-box">
                                    {inputList.length !== 1 && (
                                      <Button
                                        color="outline-danger"
                                        size="sm"
                                        className="me-2"
                                        type="button"
                                        onClick={() => handleRemoveClick(i)}
                                      >
                                        Remove <i className="bx bx-x-circle"></i>
                                      </Button>
                                    )}
                                    {inputList.length - 1 === i && (
                                      <Button
                                        color="outline-info"
                                        size="sm"
                                        onClick={handleAddClick}
                                      >
                                        Add <i className="bx bx-plus-circle"></i>
                                      </Button>
                                    )}
                                  </div>
                                </Col>
                              </Row>
                            ))}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <div className="text-end">
                            <Button color="primary" type="submit">
                              Submit <i className="fas fa-check-circle"></i>
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>

          {/* Plans List */}
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <Row className="mb-3">
                    <Col md="6">
                      <Button
                        onClick={() => setshow(!show)}
                        color="primary"
                      >
                        {show ? "Cancel" : "Add Plan"} <i className="bx bx-user-plus"></i>
                      </Button>
                    </Col>
                    <Col md="6">
                      <div className="text-end">
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Search plans..."
                          value={search}
                          onChange={searchAll}
                          name="search"
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="table-responsive">
                    <Table className="table table-bordered mb-4 mt-3">
                      <thead>
                        <tr className="text-center">
                          <th>S.No</th>
                          <th>Plan Name</th>
                          <th>Plan Duration</th>
                          <th>Plan Price</th>
                          <th>Discount</th>
                          <th>Order</th>
                          <th>Advantages</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.length > 0 ? (
                          lists.map((data, key) => (
                            <tr key={key} className="text-center">
                              <td>{(pageNumber) * listPerPage + key + 1}</td>
                              <td>{data.planName}</td>
                              <td>{data.duration == 1 ? "1 Month" : `${data.duration} Months`}</td>
                              <td>₹{data.price}</td>
                              <td>{data.discount}%</td>
                              <td>{data.order}</td>
                              <td style={{ width: "200px" }}>
                                <Button
                                  outline
                                  color="warning"
                                  className="btn-sm"
                                  onClick={() => getinc(data)}
                                >
                                  <div className="d-flex align-items-center">
                                    <i className="bx bxs-file me-1"></i>
                                    <small>View</small>
                                  </div>
                                </Button>
                              </td>
                              <td style={{ width: "200px" }}>
                                <Button
                                  onClick={() => getpopup(data)}
                                  size="sm"
                                  className="m-1"
                                  color="success"
                                >
                                  <small className="d-flex align-items-center">
                                    <i className="bx bx-edit px-1"></i>Edit
                                  </small>
                                </Button>
                                <Button
                                  onClick={() => manageDelete(data)}
                                  className="m-1"
                                  size="sm"
                                  color="danger"
                                >
                                  <small className="d-flex align-items-center">
                                    <i className="bx bx-trash px-1"></i>
                                    Delete
                                  </small>
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              No plans found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    
                    {Plans.length > listPerPage && (
                      <div className="mt-3 text-end">
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

        {/* Edit Plan Modal */}
        <Modal
          size="lg"
          isOpen={modal_small}
          toggle={tog_small}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0">Edit Plan</h5>
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
                    <Label for="editPlanName">
                      Plan Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="editPlanName"
                      placeholder="Enter Name"
                      required
                      name="planName"
                      value={form1.planName}
                      onChange={handleChange1}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label>Duration <span className="text-danger">*</span></Label>
                    <select
                      value={form1.duration}
                      name="duration"
                      required
                      onChange={handleChange1}
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="9">9 Months</option>
                      <option value="12">12 Months</option>
                    </select>
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label for="editPrice">
                      Plan Price <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      id="editPrice"
                      placeholder="Enter Plan Price"
                      required
                      name="price"
                      value={form1.price}
                      onChange={handleChange1}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label for="editDiscount">
                      Discount <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      id="editDiscount"
                      placeholder="Enter Discount"
                      required
                      name="discount"
                      value={form1.discount}
                      onChange={handleChange1}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Label for="editOrder">
                      Order <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      id="editOrder"
                      placeholder="Enter Order Number"
                      required
                      name="order"
                      value={form1.order}
                      onChange={handleChange1}
                    />
                  </div>
                </Col>
                
                {/* Advantages Section */}
                <Col md="12">
                  <div className="mb-3">
                    <Label>Advantages</Label>
                    {inputList1.map((x, i) => (
                      <Row key={i} className="mb-2">
                        <Col md="6">
                          <Input
                            type="text"
                            required
                            name="advantages"
                            placeholder="Enter Advantage"
                            value={x}
                            onChange={e => handleInputChange1(e, i)}
                          />
                        </Col>
                        <Col md="6">
                          <div className="btn-box">
                            {inputList1.length !== 1 && (
                              <Button
                                color="outline-danger"
                                size="sm"
                                className="me-2"
                                type="button"
                                onClick={() => handleRemoveClick1(i)}
                              >
                                Remove <i className="bx bx-x-circle"></i>
                              </Button>
                            )}
                            {inputList1.length - 1 === i && (
                              <Button
                                color="outline-info"
                                size="sm"
                                onClick={handleAddClick1}
                              >
                                Add <i className="bx bx-plus-circle"></i>
                              </Button>
                            )}
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </div>
                </Col>
              </Row>
              <div className="text-end">
                <Button color="primary" type="submit">
                  Update <i className="fas fa-check-circle"></i>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>

        {/* View Advantages Modal */}
        <Modal
          size="md"
          isOpen={ins}
          toggle={inst}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0">View Advantages</h5>
            <button
              onClick={inst}
              type="button"
              className="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {Instructions.length > 0 ? (
              Instructions.map((data, i) => (
                <div key={i}>
                  <p className="pt-2 mb-2">
                    <i className="bx bx-check-circle text-success me-2"></i>
                    {data}
                  </p>
                  {i < Instructions.length - 1 && <hr />}
                </div>
              ))
            ) : (
              <p className="text-muted">No advantages found</p>
            )}
          </div>
        </Modal>

        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default Plans