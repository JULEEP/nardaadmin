import React, { useState, useEffect } from "react";
import {
  CardBody,
  Container,
  Row,
  Col,
  Card,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { URLS } from "Url";
import axios from "axios";

function Addnews() {
  const [form, setForm] = useState({
    reporterId: "",
    title: "",
    expirydate: "",
    type: "poster", // ✅ Static type set to "poster"
  });

  const [Location, setLocation] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [files, setFiles] = useState([]);

  const history = useHistory();

  const gets = localStorage.getItem("authUser");
  const data = JSON.parse(gets);
  const token = data.token;

  // Fetch Location
  useEffect(() => {
    axios
      .post(URLS.GetLocation, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(
        (res) => setLocation(res.data.locations),
        (error) => toast(error?.response?.data?.message || "Error loading locations")
      );
  }, []);

  // Fetch Reporter
  const [Reporter, setReporter] = useState([]);
  useEffect(() => {
    axios
      .post(URLS.GetActiveReporter, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setReporter(res.data.activeReporters));
  }, []);

  // Image Upload
  const changeHandler1 = (e) => {
    const selectedFiles = e.target.files;
    let validFiles = true;

    for (let i = 0; i < selectedFiles.length; i++) {
      const ext = selectedFiles[i].name.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png"].includes(ext)) {
        validFiles = false;
        break;
      }
    }

    if (validFiles) {
      setFiles(Array.from(selectedFiles));
    } else {
      e.target.value = null;
      toast("File format not supported. Choose JPG, JPEG, or PNG.");
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    const updated = { ...form };
    updated[e.target.name] = e.target.value;
    setForm(updated);
  };

  // Handle Select Changes
  const handleLocationChange = (selected) => setSelectedOptions(selected);

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.reporterId || !form.title) {
      toast("Please fill in all required fields");
      return;
    }
    if (files.length === 0) {
      toast("Please upload at least one image");
      return;
    }
    addPoster();
  };

  const addPoster = () => {
    const dataArray = new FormData();
    dataArray.append("reporterId", form.reporterId);
    dataArray.append("title", form.title);
    dataArray.append("expirydate", form.expirydate || "");
    dataArray.append("type", form.type); // ✅ Static type "poster" sent to backend
    dataArray.append("location", JSON.stringify(selectedOptions));

    files.forEach((file) => {
      dataArray.append("file", file);
    });

    axios
      .post(URLS.AddPosters, dataArray, { headers: { Authorization: `Bearer ${token}` } })
      .then(
        (res) => {
          if (res.status === 200) {
            toast("Poster added successfully!");
            sessionStorage.setItem(
              "tost",
              "Posters have been added successfully"
            );
            history.push("/ApprovedAdvertisingList");
            clearForm();
          }
        },
        (error) => toast(error?.response?.data?.message || "Failed to add poster")
      );
  };

  const clearForm = () => {
    setForm({ reporterId: "", title: "", expirydate: "", type: "poster" });
    setFiles([]);
    setSelectedOptions([]);
  };

  const locationOptions = Location.map((loc) => ({ value: loc._id, label: loc.name }));

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Narada" breadcrumbItem="Add Poster" />
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardBody>
                <Row className="mt-2 mb-2">
                  <Col md={12}>
                    <Row className="mt-3">
                      <Col md={6}>
                        <div className="mb-3">
                          <Label>Reporter <span className="text-danger">*</span></Label>
                          <select
                            name="reporterId"
                            value={form.reporterId}
                            onChange={handleChange}
                            required
                            className="form-select"
                          >
                            <option value="">Select Reporter</option>
                            {Reporter.map((data, key) => (
                              <option key={key} value={data._id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="mb-3">
                          <Label>Title <span className="text-danger">*</span></Label>
                          <Input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter poster title"
                            required
                          />
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="mb-3">
                          <Label>Image <span className="text-danger">*</span></Label>
                          <Input
                            type="file"
                            className="form-control"
                            required
                            name="file"
                            onChange={changeHandler1}
                            multiple
                          />
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="mb-3">
                          <Label>Expiry Date</Label>
                          <Input
                            type="datetime-local"
                            name="expirydate"
                            value={form.expirydate}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>

                      <Col md="12">
                        <div className="mb-3">
                          <Label>Location <span className="text-danger">*</span></Label>
                          <Select
                            options={locationOptions}
                            placeholder="Enter Location"
                            value={selectedOptions}
                            onChange={handleLocationChange}
                            isSearchable
                            isMulti
                          />
                        </div>
                      </Col>
                    </Row>
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
                    style={{
                      backgroundColor: "#01092c",
                      border: "2px solid #01092c",
                    }}
                  >
                    Publish <i className="fa fa-upload"></i>
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
}

export default Addnews;