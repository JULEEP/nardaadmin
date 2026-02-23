import React, { useState, useEffect } from "react"
import { CardBody, Container, Row, Col, Card, Button, Table } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useHistory } from "react-router-dom"
import { URLS } from "../../Url"
import axios from "axios"

const Postdetails = () => {
  const history = useHistory()

  const [form, setform] = useState([])

  useEffect(() => {
    GetuserDetails()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const Agentid = sessionStorage.getItem("Viewusernewsid")

  const GetuserDetails = () => {
    var token = datas

    const dataArray = new FormData()
    dataArray.append("_id", Agentid)
    axios
      .post(URLS.GetOneNewsDetails, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res.data.localNews)
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Narada Media Admin "
            breadcrumbItem="View News Details"
          />
          <Row className="mb-2">
            <Col md="12">
              <Button
                className="m-1"
                style={{ float: "right" }}
                onClick={() => {
                  history.goBack()
                }}
                color="primary"
              >
                {" "}
                <i className="bx bx-left-arrow-alt" /> Back
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card>
                <CardBody>
                  <div className="table-rep-plugin  table-responsive">
                    <Table hover className="table table-bordered ">
                      <tbody>
                        <tr>
                          <th style={{ width: "150px" }}>HeadLine</th>
                          <td>{form.headLine}</td>
                        </tr>
                        <tr>
                          <th style={{ width: "150px" }}>HeadLine</th>
                          <td>{form.headLine}</td>
                        </tr>
                        <tr>
                          <th>Description</th>
                          <td>{form.description}</td>
                        </tr>
                        <tr>
                          <th>Total views</th>
                          <td>{form.headLine}</td>
                        </tr>
                        <tr>
                          <th>Total Like</th>
                          <td>{form.likesCount}</td>
                        </tr>
                        <tr>
                          <th>Total Reports</th>
                          <td>{form.reportsCount}</td>
                        </tr>
                        <tr>
                          <th>User Name</th>
                          <td>{form.createrName}</td>
                        </tr>
                        <tr>
                          <th>Created Date</th>
                          <td>{form.headLine}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md="6">
              <Card>
                <CardBody>
                  {form.imageType == "false" ? (
                    <>
                      <video
                        controls
                        style={{ width: "100%", height: "400px" }}
                        src={URLS.Base + form.image}
                      />
                    </>
                  ) : (
                    <>
                      {" "}
                      <img
                        height="390px"
                        width="100%"
                        src={URLS.Base + form.image}
                      />
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Postdetails
