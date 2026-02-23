import React, { useState, useEffect } from "react"
import {
  CardBody,
  Container,
  Row,
  Col,
  Card,
  Input,
  Button,
  Table,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { ToastContainer, toast } from "react-toastify"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { URLS } from "../../Url"
import { useHistory } from "react-router-dom"

function Complaintbox() {
  const [form1, setform1] = useState([])
  const [plans, setplans] = useState([])
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  // YouTube URL ko embed URL mein convert karne ke liye helper function
  const getYouTubeEmbedUrl = (url) => {
    try {
      // Various YouTube URL formats handle karna
      if (url.includes('youtube.com/embed')) {
        return url;
      }
      
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return videoId ? `https://www.youtube.comembed/${videoId}` : url;
      }
      
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      
      // Agar koi aur format hai toh original return karo
      return url;
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return url;
    }
  };

  const getPlans = () => {
    var token = datas
    axios
      .post(
        URLS.GetVideo,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setplans(res.data.videos)
      })
  }

  const planssearch = e => {
    const myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)

    const token = datas

    axios
      .post(
        URLS.GetVideoSearch + `${e.target.value}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            setplans(res.data.videos)
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  useEffect(() => {
    getPlans()
    datass()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = plans.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(plans.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const history = useHistory()

  const Agentid1 = data => {
    sessionStorage.setItem("Videoid", data._id)
    history.push("/ViewVideos")
  }

  const Agentid2 = data => {
    sessionStorage.setItem("Videoid", data._id)
    history.push("/EditVideos")
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

  // Delete Video Function
  const handleDeleteVideo = (videoData) => {
    const confirmBox = window.confirm("Do you really want to delete this video? This action cannot be undone.")
    if (confirmBox === true) {
      deleteVideo(videoData)
    }
  }

  const deleteVideo = (data) => {
    var token = datas
    var videoId = data._id
    
    // Direct API integration - Replace with your actual backend URL
    const DELETE_API_URL = "http://13.51.235.130:8003/admin/deletevideo/"
    
    axios
      .delete(
        DELETE_API_URL + videoId,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast.success(res.data.message || "Video deleted successfully")
            getPlans() // Refresh the list after deletion
          }
        },
        error => {
          if (error.response) {
            if (error.response.status === 400) {
              toast.error(error.response.data.message || "Bad request")
            } else if (error.response.status === 401) {
              toast.error("Unauthorized - Please login again")
            } else if (error.response.status === 404) {
              toast.error("Video not found")
            } else if (error.response.status === 500) {
              toast.error("Server error - Please try again later")
            } else {
              toast.error("Something went wrong")
            }
          } else {
            toast.error("Network error - Please check your connection")
          }
        }
      )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Narada Media Admin "
            breadcrumbItem="Published Video List"
          />
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <div>
                    <div className="table-responsive">
                      <div style={{ float: "right" }}>
                        <Input
                          name="search"
                          value={form1.search}
                          onChange={planssearch}
                          type="search"
                          placeholder="Search..."
                        />
                      </div>
                      <Table className="table table-bordered mb-4 mt-5">
                        <thead>
                          <tr className="text-center">
                            <th>S.No</th>
                            <th>Reporter Name</th>
                            <th>Published-Date</th>
                            <th>Image</th>
                            <th>Video</th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Views</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <th>{(pageNumber) * 5 + key + 1}</th>
                              <td>{data.reporter}</td>
                              <td>{data.updatedAt?.slice(0, 10)}</td>
                              <td>
                                <img
                                  style={{
                                    width: "150px",
                                  }}
                                  src={URLS.Base + data.banner}
                                  alt="Video banner"
                                />
                              </td>
                              <td>
                                {data.youtube ? (
                                  <>
                                    <iframe
                                      width={150}
                                      height={150}
                                      src={getYouTubeEmbedUrl(data.video)}
                                      title="YouTube video player"
                                      frameBorder={0}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      referrerPolicy="strict-origin-when-cross-origin"
                                      allowFullScreen
                                    />
                                  </>
                                ) : (
                                  <>
                                    <video
                                      controls
                                      style={{
                                        width: "150px",
                                      }}
                                      src={URLS.Base + data.video}
                                    />
                                  </>
                                )}
                              </td>
                              <td>{data.title.slice(0, 30)}</td>
                              <td>{data.likes}</td>
                              <td>{data.views}</td>
                              <td>
                                <Button
                                  onClick={() => {
                                    Agentid2(data)
                                  }}
                                  size="sm"
                                  className="m-1"
                                  color="success"
                                >
                                  <small className="d-flex">
                                    <i className="bx bx-edit"></i>Edit
                                  </small>
                                </Button>
                                <Button
                                  onClick={() => {
                                    Agentid1(data)
                                  }}
                                  size="sm"
                                  className="m-1"
                                  color="info"
                                >
                                  <small className="d-flex">
                                    {" "}
                                    <i className="fas fa-eye px-1"></i>
                                    View
                                  </small>
                                </Button>
                                <Button
                                  onClick={() => {
                                    handleDeleteVideo(data)
                                  }}
                                  size="sm"
                                  color="danger"
                                  className="m-1"
                                >
                                  <small className="d-flex">
                                    <i className="bx bx-trash px-1"></i>
                                    Delete
                                  </small>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div className="mt-3" style={{ float: "right" }}>
                        <ReactPaginate
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={"pagination"}
                          previousLinkClassName={"previousBttn"}
                          nextLinkClassName={"nextBttn"}
                          disabledClassName={"disabled"}
                          activeClassName={"active"}
                          total={lists.length}
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default Complaintbox