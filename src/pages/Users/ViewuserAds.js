import React, { useState, useEffect } from "react"
import { CardBody, Container, Row, Col, Card, Button, Table } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useHistory, Link } from "react-router-dom"
import { URLS } from "../../Url"
import axios from "axios"

const Postdetails = () => {
  const history = useHistory()

  const [form, setform] = useState([])

  const [sts, setsts] = useState([])

  const [cts, setcts] = useState([])

  const [dts, setdts] = useState([])

  useEffect(() => {
    GetuserDetails()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const Agentid = sessionStorage.getItem("Viewuseradsid")

  const GetuserDetails = () => {
    var token = datas

    const dataArray = new FormData()
    dataArray.append("_id", Agentid)
    axios
      .post(URLS.GetOneAdsDetails, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setform(res.data.localNews)
        setsts(res.data.localNews.stateName)
        setcts(res.data.localNews.constituencyName)
        setdts(res.data.localNews.districtName)
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada Media Admin " breadcrumbItem="View News Details" />

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
                <i className="bx bx-left-arrow-alt" /> Back
              </Button>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md="6">
              <Card>
                <CardBody>
                  <div className="table-rep-plugin  table-responsive">
                    <Table hover className="table table-bordered ">
                      <tbody>
                        <tr>
                          <th style={{ width: "150px" }}>Name</th>
                          <td>{form.name}</td>
                        </tr>
                        <tr>
                          <th style={{ width: "150px" }}>Link</th>
                          <td>{form.link}</td>
                        </tr>
                        <tr>
                          <th>From Date</th>
                          <td>{form.dateOfNews}</td>
                        </tr>

                        <tr>
                          <th>State</th>
                          <td>
                            {sts.length > 1 ? (
                              <>{"All"}</>
                            ) : (
                              <>{form.stateName}</>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <th>District</th>
                          <td>
                            {dts.length > 1 ? (
                              <>{"All"}</>
                            ) : (
                              <>{form.districtName}</>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <th>Constituency</th>
                          <td>
                            {cts.length || dts.length > 1 ? (
                              <>{"All"}</>
                            ) : (
                              <> {form.constituencyName}</>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <th>Post by</th>
                          <td>{form.createrName}</td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>{form.status}</td>
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
                  <img
                    src={URLS.Base + form.image}
                    alt=""
                    height="400px"
                    width="100%"
                  />
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
