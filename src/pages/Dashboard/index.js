import React, { useEffect, useState } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import CountUp from "react-countup"
import { URLS } from "../../Url"
import axios from "axios"
import ReactApexChart from "react-apexcharts"

const Dashboard = () => {
  const [dash, setdash] = useState([])

  const [series1, setseries1] = useState([])

  const [series2, setseries2] = useState([])

  const [ArticleImage, setArticleImage] = useState([])

  const [Article, setArticle] = useState([])

  const [latestnews, setlatestnews] = useState([])

  useEffect(() => {
    getdashdata()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const getdashdata = () => {
    var token = datas

    axios
      .post(
        URLS.GetDashboard,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setdash(res?.data)
        setseries1(res?.data?.monthlyUsers)
        setseries2(res?.data?.monthlypaymnets)
        setArticle(res?.data?.mostArticles)
        setArticleImage(res?.data?.mostArticles.image[0])
        setlatestnews(res?.data?.latestnews)
      })
  }

  const series = [
    {
      name: "Customers",
      data: series1,
    },
    {
      name: "Amount",
      data: series2,
    },
  ]

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "34%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },

    colors: ["#01092C", "#f1b44c"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: " (data)",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        },
      },
    },
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var Roles = data?.rolesAndPermission[0]

  return (
    <React.Fragment>
      {Roles?.Dashview === true || Roles?.accessAll === true ? (
        <>
          <div className="page-content">
            <Container fluid>
              <Breadcrumbs title={"Dashboards"} breadcrumbItem={"Dashboard"} />
              <Row>
                <Col xl="12">
                  <Row>
                    <Col md="3">
                      <div
                        className="db-color-card user-card"
                        style={{ background: "#fef3f1", color: "#a98471" }}
                      >
                        <i
                          className="fa fa-users card-icon"
                          style={{ fontSize: "3rem" }}
                        ></i>

                        <div
                          className="mt-4"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: "20px",
                          }}
                        >
                          <h4
                            style={{
                              color: "#a98471",
                              fontWeight: "900",
                            }}
                          >
                            <CountUp delay={2} end={dash?.users} />
                          </h4>

                          <h5 style={{ color: "#a98471", float: "right" }}>
                            Users
                          </h5>
                        </div>
                      </div>
                    </Col>

                    <Col md="3">
                      <div
                        className="db-color-card user-card"
                        style={{ backgroundColor: "#f4f2ff", color: "#736AA6" }}
                      >
                        <i
                          className="fa fa-list-ul card-icon"
                          style={{ fontSize: "3rem" }}
                        ></i>

                        <div
                          className="mt-4"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: "20px",
                          }}
                        >
                          <h4
                            style={{
                              color: "#736AA6",
                              fontWeight: "900",
                              marginRight: "100px",
                            }}
                          >
                            <CountUp delay={2} end={dash?.news} />
                          </h4>
                          <h5 style={{ color: "#736AA6" }}>News</h5>
                        </div>
                      </div>
                    </Col>

                    <Col md="3">
                      <div
                        className="db-color-card user-card"
                        style={{ backgroundColor: "#edffef" }}
                      >
                        <i
                          className="fas fa-newspaper  card-icon"
                          style={{ fontSize: "3rem" }}
                        ></i>

                        <div
                          className="mt-4"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: "20px",
                          }}
                        >
                          <h4
                            style={{
                              color: "#6CB373",
                              fontWeight: "900",
                              marginRight: "100px",
                            }}
                          >
                            <CountUp delay={2} end={dash?.artciles} />
                          </h4>
                          <h5 style={{ color: "#6CB373" }}>Article</h5>
                        </div>
                      </div>
                    </Col>

                    <Col md="3">
                      <div
                        className="db-color-card user-card"
                        style={{ backgroundColor: "#e9aaf1", color: "#9D0BB1" }}
                      >
                        <div>
                          <div id="designicon2">
                            <i
                              className="fa fa-globe card-icon"
                              style={{ fontSize: "3rem" }}
                            ></i>
                          </div>
                          <div
                            className="mt-4"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingTop: "20px",
                            }}
                          >
                            <h4
                              style={{
                                color: "#9D0BB1",
                                fontWeight: "900",
                                marginRight: "100px",
                              }}
                            >
                              <CountUp delay={2} end={dash?.postercount} />
                            </h4>
                            <h5 style={{ color: "#9D0BB1" }}>Posters</h5>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <div
                        className="db-color-card user-card"
                        style={{
                          backgroundColor: "#C9B7F1",
                          color: "#530899",
                        }}
                      >
                        <div>
                          <i
                            className="bx bxs-movie card-icon"
                            style={{ fontSize: "3rem" }}
                          ></i>

                          <div
                            className="mt-4"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingTop: "20px",
                            }}
                          >
                            <h4
                              style={{
                                color: "#530899",
                                fontWeight: "900",
                                marginRight: "90px",
                              }}
                            >
                              <CountUp delay={2} end={dash?.videoscount} />
                            </h4>
                            <h5 style={{ color: "#530899" }}>Videos </h5>
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div
                        className="db-color-card user-card"
                        style={{ backgroundColor: "#83CF78", color: "#245C1C" }}
                      >
                        <i
                          className="fa fa-archive card-icon"
                          style={{ fontSize: "3rem" }}
                        ></i>

                        <div
                          className="mt-4"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: "20px",
                          }}
                        >
                          <h4
                            style={{
                              color: "#245C1C",
                              fontWeight: "900",
                              marginRight: "100px",
                            }}
                          >
                            <CountUp delay={2} end={dash?.slidercount} />
                          </h4>
                          <h5 style={{ color: "#245C1C" }}>Sliders</h5>
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div
                        className="db-color-card user-card"
                        style={{ backgroundColor: "#999898", color: "#201F1E" }}
                      >
                        <i
                          className="fa fa-credit-card card-icon"
                          style={{ fontSize: "3rem" }}
                        ></i>

                        <div
                          className="mt-4"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: "20px",
                          }}
                        >
                          <h4>
                            <CountUp delay={2} end={dash?.paymentsCount} />
                          </h4>
                          <h5 style={{ color: "#201F1E" }}>Payments</h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <Card>
                        <CardBody>
                          <ReactApexChart
                            options={options}
                            series={series}
                            type="bar"
                            height={350}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card style={{ height: "400px", background: "#F9FAFF" }}>
                        <CardBody>
                          <Row>
                            <Col md={8}>
                              <h5>
                                <b>Most Viewed Article</b>
                              </h5>
                            </Col>
                            <Col md={4}>
                              <div style={{ float: "right" }}>
                                <h5>
                                  <a href="/PublishedArticle">
                                    <b className="text-muted">View All</b>
                                  </a>
                                </h5>
                              </div>
                            </Col>
                          </Row>
                          <hr></hr>
                          <div>
                            <img
                              src={URLS?.Base + ArticleImage}
                              className="img-thumbnail"
                              style={{
                                height: "180px",
                                width: "100%",
                                borderradius: "31px",
                                border: "1px solid rgb(206 200 200)",
                              }}
                            />
                          </div>
                          <div className="text-center">
                            <h5
                              className="name mt-4"
                              style={{
                                display: "inline-block",
                                textoverflow: "ellipsis",
                                whitespace: "nowrap",
                                overflow: "hidden",
                                width: "100%",
                                fontWeight: "900",
                                color: "black",
                              }}
                            >
                              {Article?.title}
                            </h5>
                            <hr></hr>
                            <p
                              className="name mb-2"
                              style={{
                                display: "inline-block",
                                textoverflow: "ellipsis",
                                whitespace: "nowrap",
                                overflow: "hidden",
                                width: "100%",
                                fontsize: "16px",
                                fontWeight: "900",
                                color: "black",
                              }}
                            >
                              Reporter :- {Article?.reporter}
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <h5>
                        <b>Latest News</b>
                      </h5>
                    </Col>
                    <Col md={6}>
                      <div style={{ float: "right" }}>
                        <h5>
                          <a href="/ApprovedLocalNews">
                            <b className="text-muted">View All</b>
                          </a>
                        </h5>
                      </div>
                    </Col>
                    <hr></hr>
                    {latestnews?.map((data, key) => (
                      <Col
                        md={3}
                        key={key}
                        style={{ border: "1px solid gray" }}
                      >
                        <div className=" text-center">
                          <img
                            src={URLS?.Base + data?.image[0]}
                            className="img-thumbnail mt-2"
                            style={{
                              height: "180px",
                              width: "180px",
                              borderradius: "31px",
                              border: "1px solid rgb(206 200 200)",
                            }}
                          />
                        </div>
                        <p
                          className="name mt-2 text-center"
                          style={{
                            display: "inline-block",
                            textoverflow: "ellipsis",
                            whitespace: "nowrap",
                            overflow: "hidden",
                            width: "100%",
                            fontWeight: "900",
                            color: "black",
                          }}
                        >
                          {data?.title}
                        </p>
                        <hr></hr>
                        <p
                          className="name mt-2 text-center"
                          style={{
                            display: "inline-block",
                            textoverflow: "ellipsis",
                            whitespace: "nowrap",
                            overflow: "hidden",
                            width: "100%",
                            fontsize: "16px",
                            fontWeight: "900",
                            color: "black",
                          }}
                        >
                          Reporter :- {data?.reporter}
                        </p>
                      </Col>
                    ))}{" "}
                  </Row>
                </CardBody>
              </Card>
            </Container>
          </div>
        </>
      ) : (
        ""
      )}
    </React.Fragment>
  )
}

export default Dashboard
