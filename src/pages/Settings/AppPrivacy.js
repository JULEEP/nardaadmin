import React, { useEffect, useState } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Card,
  Button,
} from "reactstrap"
import { URLS } from "../../Url"
import axios from "axios"

function AppPrivacy() {
  const [form, setform] = useState([])

  useEffect(() => {
    GetSettings()
  }, [])

  const GetSettings = () => {
    axios.post(URLS.GetSetting, {}).then(res => {
      setform(res.data.policy.privacypolicy)
    })
  }
  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const [text1, setText1] = useState([])

  const getpopup1 = forms => {
    setText1(forms)
    tog_small()
  }

  return (
    <React.Fragment>
      <Container fluid className="mt-3">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader className="bg-white"></CardHeader>
              <CardBody>
                  <h5>Privacy Policy</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: form,
                    }}
                  ></div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default AppPrivacy
