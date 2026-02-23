import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Input, Button, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import { useHistory } from "react-router-dom"
import ReactPaginate from "react-paginate"
import { URLS } from "../../Url"
import axios from "axios"
import { FaFileExport, FaFilter } from "react-icons/fa"

const ResponsiveTables = () => {
  const [form1, setform1] = useState([])
  const [plans, setplans] = useState([])
  const [filteredPlans, setFilteredPlans] = useState([])
  const [statusFilter, setStatusFilter] = useState("all") // "all", "active", "inactive"
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const history = useHistory()
  
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const getPlans = () => {
    var token = datas

    axios
      .post(
        URLS.GetUser,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        const activeUsers = res.data.allUsers.filter(user => !user.isBlocked)
        setplans(activeUsers)
        setFilteredPlans(activeUsers)
      })
  }

  // Apply status filter
  const applyStatusFilter = (users, status) => {
    if (status === "all") {
      return users
    } else if (status === "active") {
      return users.filter(user => !user.isBlocked)
    } else if (status === "inactive") {
      return users.filter(user => user.isBlocked)
    }
    return users
  }

  const planssearch = e => {
    const myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
    const token = datas
    
    if (e.target.value.trim() === "") {
      // If search is empty, show all users with current filter
      const filtered = applyStatusFilter(plans, statusFilter)
      setFilteredPlans(filtered)
      return
    }

    axios
      .post(
        URLS.GetUserSearch + `${e.target.value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            const activeUsers = res.data.allUsers.filter(user => !user.isBlocked)
            const filtered = applyStatusFilter(activeUsers, statusFilter)
            setFilteredPlans(filtered)
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  // Handle status filter change
  const handleStatusFilter = (status) => {
    setStatusFilter(status)
    const filtered = applyStatusFilter(plans, status)
    setFilteredPlans(filtered)
  }

  const datass = () => {
    const location = sessionStorage.getItem("tost")
    if (location != "") {
      toast(location)
      sessionStorage.clear()
    } else {
      sessionStorage.clear()
    }
  }

  useEffect(() => {
    getPlans()
    datass()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = filteredPlans.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(filteredPlans.length / listPerPage)
  
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const Agentid1 = data => {
    sessionStorage.setItem("Viewuserid", data._id)
    history.push("/ViewUser")
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Blocked?")
    if (confirmBox === true) {
      DeleteBanner(data)
    }
  }

  const DeleteBanner = data => {
    var token = datas
    var remid = data._id
    axios
      .post(
        URLS.BlockOneDetails,
        { id: remid, block: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            getPlans()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const manageDelete1 = data => {
    const confirmBox = window.confirm("Do you really want to UnBlocked?")
    if (confirmBox === true) {
      DeleteBanner1(data)
    }
  }

  const DeleteBanner1 = data => {
    var token = datas
    var remid = data._id
    axios
      .post(
        URLS.BlockOneDetails,
        { id: remid, block: false },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            getPlans()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  // Enhanced CSV Export Function with Complete Data
  const exportToCSV = () => {
    if (filteredPlans.length === 0) {
      toast.warning("No data to export!")
      return
    }

    // Define CSV headers with all fields
    const headers = [
      "SlNo",
      "User ID",
      "Join Date",
      "Name",
      "Email",
      "Phone",
      "State",
      "City",
      "Status",
      "Plan Expiry Date",
      "Subscribed User",
      "Total Payments",
      "Payment Plan Names",
      "Payment Statuses",
      "Total Amount Paid",
      "Last Transaction ID",
      "Created At",
      "Updated At"
    ]

    // Convert data to CSV format with all fields
    const csvData = filteredPlans.map((user, index) => {
      const totalPayments = user.paymentDetails ? user.paymentDetails.length : 0
      const paymentPlanNames = user.paymentDetails ? 
        user.paymentDetails.map(payment => payment.planName).join("; ") : ""
      const paymentStatuses = user.paymentDetails ? 
        user.paymentDetails.map(payment => payment.status).join("; ") : ""
      const totalAmountPaid = user.paymentDetails ? 
        user.paymentDetails.reduce((sum, payment) => sum + parseFloat(payment.price || 0), 0) : 0
      const lastTransaction = user.paymentDetails && user.paymentDetails.length > 0 ? 
        user.paymentDetails[user.paymentDetails.length - 1].transactionId : ""

      return [
        index + 1,
        `"${user._id || ''}"`,
        user.createdAt ? user.createdAt.slice(0, 10) : '',
        `"${user.name || ''}"`,
        `"${user.email || ''}"`,
        `"${user.phone || ''}"`,
        `"${user.state || ''}"`,
        `"${user.city || ''}"`,
        user.isBlocked ? "Blocked" : "Active",
        user.planExpiryDate ? user.planExpiryDate.slice(0, 10) : '',
        user.subscribedUser ? "Yes" : "No",
        totalPayments,
        `"${paymentPlanNames}"`,
        `"${paymentStatuses}"`,
        totalAmountPaid,
        `"${lastTransaction}"`,
        user.createdAt ? user.createdAt.slice(0, 10) : '',
        user.updatedAt ? user.updatedAt.slice(0, 10) : ''
      ]
    })

    // Combine headers and data
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n")

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    
    link.setAttribute("href", url)
    link.setAttribute("download", `users_complete_data_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success("CSV exported successfully with complete data!")
  }

  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState)

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Narada Media Admin " breadcrumbItem="User list" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={12}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex gap-2">
                          {/* Status Filter Dropdown */}
                          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle color="primary" caret>
                              <FaFilter className="me-2" />
                              Status: {statusFilter === "all" ? "All Users" : 
                                     statusFilter === "active" ? "Active" : "Inactive"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem 
                                onClick={() => handleStatusFilter("all")}
                                active={statusFilter === "all"}
                              >
                                All Users
                              </DropdownItem>
                              <DropdownItem 
                                onClick={() => handleStatusFilter("active")}
                                active={statusFilter === "active"}
                              >
                                Active
                              </DropdownItem>
                              <DropdownItem 
                                onClick={() => handleStatusFilter("inactive")}
                                active={statusFilter === "inactive"}
                              >
                                Inactive
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>

                          {/* Export CSV Button */}
                          <Button color="success" onClick={exportToCSV}>
                            <FaFileExport className="me-2" />
                            Export Complete CSV
                          </Button>
                        </div>

                        {/* Search Input */}
                        <div style={{ width: "300px" }}>
                          <Input
                            name="search"
                            value={form1.search}
                            onChange={planssearch}
                            type="search"
                            placeholder="Search by name, email, phone..."
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md={12}>
                      <div className="table-responsive">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div>
                            <strong>Total Users: {filteredPlans.length}</strong>
                            {statusFilter !== "all" && (
                              <span className="text-muted ms-2">
                                ({statusFilter === "active" ? "Active" : "Inactive"} only)
                              </span>
                            )}
                          </div>
                          <div className="text-muted">
                            Showing {Math.min(listPerPage, lists.length)} of {filteredPlans.length} users
                          </div>
                        </div>

                        <Table hover className="table table-bordered mb-4 mt-3">
                          <thead>
                            <tr className="text-center">
                              <th>SlNo</th>
                              <th>Join Date</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>State</th>
                              <th>City</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists.length > 0 ? (
                              lists.map((data, key) => (
                                <tr key={key} className="text-center">
                                  <th>{(pageNumber) * listPerPage + key + 1}</th>
                                  <td>{data.updatedAt.slice(0, 10)}</td>
                                  <td>{data.name}</td>
                                  <td>{data.email}</td>
                                  <td>{data.phone}</td>
                                  <td>{data.state}</td>
                                  <td>{data.city}</td>
                                  <td>
                                    {data.isBlocked ? (
                                      <span className="badge bg-danger">
                                        Blocked
                                      </span>
                                    ) : (
                                      <span className="badge bg-success">
                                        Active
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <Button
                                      onClick={() => Agentid1(data)}
                                      size="sm"
                                      className="m-1"
                                      color="info"
                                    >
                                      <small>
                                        <i className="fas fa-eye px-1">View</i>
                                      </small>
                                    </Button>
                                    {data.isBlocked ? (
                                      <Button
                                        onClick={() => manageDelete1(data)}
                                        size="sm"
                                        color="warning"
                                      >
                                        <small className="d-flex">
                                          <i className="bx bx-lock-alt px-1"></i>
                                          UnBlock
                                        </small>
                                      </Button>
                                    ) : (
                                      <Button
                                        onClick={() => manageDelete(data)}
                                        size="sm"
                                        color="danger"
                                      >
                                        <small className="d-flex">
                                          <i className="bx bx-lock-open-alt px-1"></i>
                                          Block
                                        </small>
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="9" className="text-center py-4">
                                  <div className="text-muted">
                                    {plans.length === 0 ? 
                                      "No users found" : 
                                      `No ${statusFilter !== "all" ? statusFilter : ""} users match your search criteria`
                                    }
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>

                        {/* Pagination */}
                        {filteredPlans.length > listPerPage && (
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="text-muted">
                              Page {pageNumber + 1} of {pageCount}
                            </div>
                            <ReactPaginate
                              previousLabel={"Previous"}
                              nextLabel={"Next"}
                              pageCount={pageCount}
                              onPageChange={changePage}
                              containerClassName={"pagination mb-0"}
                              previousLinkClassName={"page-link"}
                              nextLinkClassName={"page-link"}
                              pageLinkClassName={"page-link"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              breakLabel={"..."}
                            />
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ToastContainer />
        </div>
      </div>
    </React.Fragment>
  )
}

export default ResponsiveTables