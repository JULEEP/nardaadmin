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
} from "reactstrap"
import axios from "axios"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import { URLS } from "../../Url"
import { useHistory } from "react-router-dom"

const Roles = () => {
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const [ras, setras] = useState([])

  const handleChange1s = e => {
    const myUser = { ...ras }
    myUser[e.target.name] = e.target.checked
    setras(myUser)
  }

  const [form, setform] = useState([])

  const handleSubmit = e => {
    e.preventDefault()
    Addrole()
  }

  const check = {
    Dashview: ras.Dashview,

    Dashview: ras.Dashview,

    EmployeeManagmentView: ras.EmployeeManagmentView,

    departementView: ras.departementView,
    departementAdd: ras.departementAdd,
    departementeEdit: ras.departementeEdit,
    departementDelete: ras.departementDelete,

    rolesAndPermissionView: ras.rolesAndPermissionView,
    rolesAndPermissionAdd: ras.rolesAndPermissionAdd,
    rolesAndPermissionEdit: ras.rolesAndPermissionEdit,

    staffView: ras.staffView,
    staffAdd: ras.staffAdd,
    staffEdit: ras.staffEdit,
    staffDelete: ras.staffDelete,

    notificationView: ras.notificationView,
    notificationAdd: ras.notificationAdd,
    notificationEdit: ras.notificationEdit,

    ReporterView: ras.ReporterView,
    ReporterAdd: ras.ReporterAdd,
    ReporterEdit: ras.ReporterEdit,
    ReporterDelete: ras.ReporterDelete,

    CategorylistView: ras.CategorylistView,

    CategoryView: ras.CategoryView,
    CategoryAdd: ras.CategoryAdd,
    CategoryEdit: ras.CategoryEdit,
    CategoryDelete: ras.CategoryDelete,

    SubCategoryView: ras.SubCategoryView,
    SubCategoryAdd: ras.SubCategoryAdd,
    SubCategoryEdit: ras.SubCategoryEdit,
    SubCategoryDelete: ras.SubCategoryDelete,

    UserslistView: ras.UserslistView,
    
    UsersView: ras.UsersView,
    BlockedUsersView: ras.BlockedUsersView,

    PlanslistView: ras.PlanslistView,

    PlansView: ras.PlansView,
    PlansAdd: ras.PlansAdd,
    PlansEdit: ras.PlansEdit,
    PlansDelete: ras.PlansDelete,

    PaymentsView: ras.PaymentsView,

    ArticleView: ras.ArticleView,
    ArticleAdd: ras.ArticleAdd,
    ArticleEdit: ras.ArticleEdit,
    ArticleDelete: ras.ArticleDelete,

    NewsView: ras.NewsView,
    NewsAdd: ras.NewsAdd,
    NewsEdit: ras.NewsEdit,
    NewsDelete: ras.NewsDelete,

    PostersView: ras.PostersView,
    PostersAdd: ras.PostersAdd,
    PostersEdit: ras.PostersEdit,
    PostersDelete: ras.PostersDelete,

    VideosView: ras.VideosView,
    VideosAdd: ras.VideosAdd,
    VideosEdit: ras.VideosEdit,
    VideosDelete: ras.VideosDelete,

    SliderView: ras.SliderView,
    SliderAdd: ras.SliderAdd,
    SliderEdit: ras.SliderEdit,
    SliderDelete: ras.SliderDelete,

    notificationView: ras.notificationView,
    notificationAdd: ras.notificationAdd,
    notificationDelete: ras.notificationDelete,

    locationView: ras.locationView,
    locationAdd: ras.locationAdd,
    locationEdit: ras.locationEdit,
    locationDelete: ras.locationDelete,

    faqsView: ras.faqsView,
    faqsAdd: ras.faqsAdd,
    faqsEdit: ras.faqsEdit,
    faqsDelete: ras.faqsDelete,

    SettingManagmentView: ras.SettingManagmentView,
    SettingsView: ras.SettingsView,
    SettingsEdit: ras.SettingsEdit,
  }

  const Addrole = () => {
    const token = datas

    const data = {
      roleName: form.roleName,
      rolesAndPermission: check,
    }
    axios
      .put(URLS.EditRole + "/" + form._id, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            toast(res.data.message)
            history.push("/RolesPremissions")
            sessionStorage.setItem("tost", "Roles has been Added Successfully")
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  function handleChange(e) {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)

  const history = useHistory()

  useEffect(() => {
    GetOneActins()
  }, [])

  const Actinid = sessionStorage.getItem("Roleids")

  const GetOneActins = () => {
    const data = {
      _id: Actinid,
    }

    var token = datas
    axios
      .post(URLS.GetOneRole, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res.data.data)
        setras(res.data.data.rolesAndPermission[0])
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Breadcrumbs title="Narada Media Admin" breadcrumbItem="Edit Roles" />
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
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader className="bg-white mt-2">
                  <CardTitle>Role & Permissions</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form
                    onSubmit={e => {
                      handleSubmit(e)
                    }}
                  >
                    <Row>
                      <Col md={4}>
                        <Label for="basicpill-firstname-input1">
                          Role <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="basicpill-firstname-input1"
                          placeholder="Enter Role  Name"
                          required
                          value={form.roleName}
                          name="roleName"
                          onChange={e => {
                            handleChange(e)
                          }}
                        />
                      </Col>
                    </Row>
                    <h5 className="mt-4 mb-3">Dashboard:</h5>
                    <Row className=" mt-3">
                      <Col md={2}>
                        <p className="">Dashboard: </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="Dashview"
                            defaultChecked={ras.Dashview}
                            value={ras.Dashview}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="read">
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Employee Managment:</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Employee Managment View: </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="EmployeeManagmentView"
                            defaultChecked={ras.EmployeeManagmentView}
                            value={ras.EmployeeManagmentView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Department : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="departementView"
                            defaultChecked={ras.departementView}
                            value={ras.departementView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="departementAdd"
                            defaultChecked={ras.departementAdd}
                            value={ras.departementAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="departementeEdit"
                            defaultChecked={ras.departementeEdit}
                            value={ras.departementeEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="departementDelete"
                            defaultChecked={ras.departementDelete}
                            value={ras.departementDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Roles & Premissions : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="rolesAndPermissionView"
                            defaultChecked={ras.rolesAndPermissionView}
                            value={ras.rolesAndPermissionView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="rolesAndPermissionAdd"
                            defaultChecked={ras.rolesAndPermissionAdd}
                            value={ras.rolesAndPermissionAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="rolesAndPermissionEdit"
                            defaultChecked={ras.rolesAndPermissionEdit}
                            value={ras.rolesAndPermissionEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Staff : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="staffView"
                            defaultChecked={ras.staffView}
                            value={ras.staffView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="staffAdd"
                            defaultChecked={ras.staffAdd}
                            value={ras.staffAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="staffEdit"
                            defaultChecked={ras.staffEdit}
                            value={ras.staffEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="staffDelete"
                            defaultChecked={ras.staffDelete}
                            value={ras.staffDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Reporter :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Reporter : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="ReporterView"
                            defaultChecked={ras.ReporterView}
                            value={ras.ReporterView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="ReporterAdd"
                            defaultChecked={ras.ReporterAdd}
                            value={ras.ReporterAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="ReporterEdit"
                            defaultChecked={ras.ReporterEdit}
                            value={ras.ReporterEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="ReporterDelete"
                            defaultChecked={ras.ReporterDelete}
                            value={ras.ReporterDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Active / InActive
                          </Label>
                        </div>
                      </Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Category :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Category List View : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="CategorylistView"
                            defaultChecked={ras.CategorylistView}
                            value={ras.CategorylistView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Category : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="CategoryView"
                            defaultChecked={ras.CategoryView}
                            value={ras.CategoryView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="CategoryAdd"
                            defaultChecked={ras.CategoryAdd}
                            value={ras.CategoryAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="CategoryEdit"
                            defaultChecked={ras.CategoryEdit}
                            value={ras.CategoryEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="CategoryDelete"
                            defaultChecked={ras.CategoryDelete}
                            value={ras.CategoryDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Sub Category : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SubCategoryView"
                            defaultChecked={ras.SubCategoryView}
                            value={ras.SubCategoryView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SubCategoryAdd"
                            defaultChecked={ras.SubCategoryAdd}
                            value={ras.SubCategoryAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SubCategoryEdit"
                            defaultChecked={ras.SubCategoryEdit}
                            value={ras.SubCategoryEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SubCategoryDelete"
                            defaultChecked={ras.SubCategoryDelete}
                            value={ras.SubCategoryDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    {/* <h5 className="mt-3 mb-3">Users :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Users : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="UsersView"
                            defaultChecked={ras.UsersView}
                            value={ras.UsersView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row> */}

                    <h5 className="mt-3 mb-3">Users :</h5>
                                        <Row className="mt-2">
                                          <Col md={2}>
                                            <p className="">Users List View : </p>
                                          </Col>
                                          <Col md={1}></Col>
                                          <Col md={2}>
                                            <div className="form-check me-3 me-lg-5">
                                              <Input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="UserslistView"
                                                defaultChecked={ras.UserslistView}
                                                value={ras.UserslistView}
                                                onClick={e => {
                                                  handleChange1s(e)
                                                }}
                                                id="read"
                                              />
                                              <Label
                                                onClick={e => {
                                                  handleChange1s(e)
                                                }}
                                                className="form-check-label"
                                                for="empView"
                                              >
                                                View
                                              </Label>
                                            </div>
                                          </Col>
                                        </Row>
                                        <Row className="mt-2">
                                          <Col md={2}>
                                            <p className="">Users : </p>
                                          </Col>
                                          <Col md={1}></Col>
                                          <Col md={2}>
                                            <div className="form-check me-3 me-lg-5">
                                              <Input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="UsersView"
                                                defaultChecked={ras.UsersView}
                                                value={ras.UsersView}
                                                onClick={e => {
                                                  handleChange1s(e)
                                                }}
                                                id="read"
                                              />
                                              <Label
                                                onClick={e => {
                                                  handleChange1s(e)
                                                }}
                                                className="form-check-label"
                                                for="empView"
                                              >
                                                View
                                              </Label>
                                            </div>
                                          </Col>
                                          <Col md={1}></Col>
                                        </Row>
                                        <Row className="mt-2">
                                          <Col md={2}>
                                            <p className="">Blocked Users View : </p>
                                          </Col>
                                          <Col md={1}></Col>
                                          <Col md={2}>
                                            <div className="form-check me-3 me-lg-5">
                                              <Input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="BlockedUsersView"
                                                defaultChecked={ras.BlockedUsersView}
                                                value={ras.BlockedUsersView}
                                                onClick={e => {
                                                  handleChange1s(e)
                                                }}
                                                id="read"
                                              />
                                              <Label
                                                onClick={e => {
                                                  handleChange1s(e)
                                                }}
                                                className="form-check-label"
                                                for="empView"
                                              >
                                                View
                                              </Label>
                                            </div>
                                          </Col>
                                        </Row>

                    <h5 className="mt-3 mb-3">Plans :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Plans List View : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="PlanslistView"
                            defaultChecked={ras.PlanslistView}
                            value={ras.PlanslistView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Plans : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="PlansView"
                            defaultChecked={ras.PlansView}
                            value={ras.PlansView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="PlansAdd"
                            defaultChecked={ras.PlansAdd}
                            value={ras.PlansAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="PlansEdit"
                            defaultChecked={ras.PlansEdit}
                            value={ras.PlansEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="PlansDelete"
                            defaultChecked={ras.PlansDelete}
                            value={ras.PlansDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Payments View : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="PaymentsView"
                            defaultChecked={ras.PaymentsView}
                            value={ras.PaymentsView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Article :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Article : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="ArticleView"
                            defaultChecked={ras.ArticleView}
                            value={ras.ArticleView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="ArticleAdd"
                            defaultChecked={ras.ArticleAdd}
                            value={ras.ArticleAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="ArticleEdit"
                            defaultChecked={ras.ArticleEdit}
                            value={ras.ArticleEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="ArticleDelete"
                            defaultChecked={ras.ArticleDelete}
                            value={ras.ArticleDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Active / InActive
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">News :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">News : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="NewsView"
                            defaultChecked={ras.NewsView}
                            value={ras.NewsView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="NewsAdd"
                            defaultChecked={ras.NewsAdd}
                            value={ras.NewsAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="NewsEdit"
                            defaultChecked={ras.NewsEdit}
                            value={ras.NewsEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="NewsDelete"
                            defaultChecked={ras.NewsDelete}
                            value={ras.NewsDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Posters :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Posters : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="PostersView"
                            defaultChecked={ras.PostersView}
                            value={ras.PostersView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="PostersAdd"
                            defaultChecked={ras.PostersAdd}
                            value={ras.PostersAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="PostersEdit"
                            defaultChecked={ras.PostersEdit}
                            value={ras.PostersEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="PostersDelete"
                            defaultChecked={ras.PostersDelete}
                            value={ras.PostersDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Videos :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Videos : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="VideosView"
                            defaultChecked={ras.VideosView}
                            value={ras.VideosView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="VideosAdd"
                            defaultChecked={ras.VideosAdd}
                            value={ras.VideosAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="VideosEdit"
                            defaultChecked={ras.VideosEdit}
                            value={ras.VideosEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="VideosDelete"
                            defaultChecked={ras.VideosDelete}
                            value={ras.VideosDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Active / InActive
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Sliders :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Sliders : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SliderView"
                            defaultChecked={ras.SliderView}
                            value={ras.SliderView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SliderAdd"
                            defaultChecked={ras.SliderAdd}
                            value={ras.SliderAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SliderEdit"
                            defaultChecked={ras.SliderEdit}
                            value={ras.SliderEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SliderDelete"
                            defaultChecked={ras.SliderDelete}
                            value={ras.SliderDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Notifications :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Notifications : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="notificationView"
                            defaultChecked={ras.notificationView}
                            value={ras.notificationView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="notificationAdd"
                            defaultChecked={ras.notificationAdd}
                            value={ras.notificationAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="notificationDelete"
                            defaultChecked={ras.notificationDelete}
                            value={ras.notificationDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Delete
                          </Label>
                        </div>
                      </Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Settings Module View:</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Settings: </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SettingManagmentView"
                            defaultChecked={ras.SettingManagmentView}
                            value={ras.SettingManagmentView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Location : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="locationView"
                            defaultChecked={ras.locationView}
                            value={ras.locationView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="locationAdd"
                            defaultChecked={ras.locationAdd}
                            value={ras.locationAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="locationEdit"
                            defaultChecked={ras.locationEdit}
                            value={ras.locationEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="locationDelete"
                            defaultChecked={ras.locationDelete}
                            value={ras.locationDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Faqs : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="faqsView"
                            defaultChecked={ras.faqsView}
                            value={ras.faqsView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="empView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="faqsAdd"
                            defaultChecked={ras.faqsAdd}
                            value={ras.faqsAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="faqsEdit"
                            defaultChecked={ras.faqsEdit}
                            value={ras.faqsEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="faqsDelete"
                            defaultChecked={ras.faqsDelete}
                            value={ras.faqsDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empl3">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">
                          About, Contact Us, Privacy Policy, Terms & Conditions:
                        </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SettingsView"
                            defaultChecked={ras.SettingsView}
                            value={ras.SettingsView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="laneview">
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="SettingsEdit"
                            defaultChecked={ras.SettingsEdit}
                            value={ras.SettingsEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="read"
                          />
                          <Label className="form-check-label" for="empEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                    </Row>

                    <div className="mt-3" style={{ float: "right" }}>
                      <button
                        type="submit"
                        style={{ width: "120px" }}
                        className="btn btn-primary m-1"
                      >
                        Submit
                        <i
                          className="fa fa-check-circle-o"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  )
}

export default Roles
