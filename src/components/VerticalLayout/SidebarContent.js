import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var Roles = data?.rolesAndPermission[0]

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>

            {Roles?.Dashview === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/dashboard">
                    <i className="fas fa-home"></i>
                    <span>{props.t("Dashboard")}</span>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

            {Roles?.EmployeeManagmentView === true ||
            Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bxs-wallet-alt"></i>
                    <span>{props.t("Staff Managment")}</span>
                  </Link>
                  <ul className="sub-menu">
                    {Roles?.departementView === true ||
                    Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/Departments">
                            {props.t("Departments")}
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}

                    {Roles?.rolesAndPermissionView === true ||
                    Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/RolesPremissions">
                            {props.t("Roles & Premissions")}
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}

                    {Roles?.staffView === true || Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/Staff">{props.t("Staff")}</Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}

            {Roles?.ReporterView === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/Reporter">
                    <i className="fa fa-user"></i>
                    <span>{props.t("Reporter")}</span>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

            {Roles?.CategorylistView === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bxs-book"></i>
                    <span>{props.t("Category")}</span>
                  </Link>
                  <ul className="sub-menu">
                    {Roles?.CategoryView === true ||
                    Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/Category">{props.t("Category")}</Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}

                    {Roles?.SubCategoryView === true ||
                    Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/SubCategory">
                            {props.t("Sub Category")}
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}

            {/* {Roles?.UsersView === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/Users">
                    <i className="bx bxs-user-pin"></i>
                    <span>{props.t("Users List")}</span>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )} */}

            {Roles?.UserslistView === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bxs-map-alt"></i>
                    <span>{props.t("Users")}</span>
                  </Link>
                  <ul className="sub-menu">
                    {Roles?.UsersView === true || Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/Users">{props.t("Users")}</Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}{" "}
                    {Roles?.BlockedUsersView === true ||
                    Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/BlockedUsersView">
                            {props.t("Blocked Users")}
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}

            {Roles?.PlanslistView === true || Roles?.accessAll === true ? (
              <>
              <li>
  <Link to="/#" className="has-arrow">
    <i className="bx bxs-map-alt"></i>
    <span>{props.t("Plans")}</span>
  </Link>
  <ul className="sub-menu">
    {Roles?.PlansView === true || Roles?.accessAll === true ? (
      <>
        <li>
          <Link to="/Plans">{props.t("Plans")}</Link>
        </li>
      </>
    ) : (
      ""
    )}

    {Roles?.PaymentsView === true || Roles?.accessAll === true ? (
      <>
        <li>
          <Link to="/Paymensts">{props.t("Plan Payments")}</Link>
        </li>
      </>
    ) : (
      ""
    )}

    {/** ✅ Popup route added here */}
    {Roles?.accessAll === true ? (
      <>
        <li>
          <Link to="/Planspopup">{props.t("AddSubscriptionPopup")}</Link>
        </li>
      </>
    ) : (
      ""
    )}
  </ul>
</li>

              </>
            ) : (
              ""
            )}

            {Roles?.ArticleView === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="fas fa-file"></i>
                    <span>{props.t("Article")}</span>
                  </Link>
                  <ul className="sub-menu">
                    {Roles?.ArticleAdd === true || Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/AddArticle">{props.t("Add Article")}</Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                    <li>
                      <Link to="/PublishedArticle">
                        {props.t("Published Article")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}

            {/* adding the new Ads */}

            <li>
              <Link to="/#" className="has-arrow">
                <i className="fas fa-ad"></i>
                <span>{props.t("Ads")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/AddAds">{props.t("AddAds")}</Link>
                </li>
                <li>
                  <Link to="/ListOfAds">{props.t("ListOfAds")}</Link>
                </li>
                <li>
                  <Link to="/PopUpImage">{props.t("PopUpImage")}</Link>
                </li>
              </ul>
            </li>

            {Roles?.NewsView === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bxs-news"></i>
                    <span>{props.t("News")}</span>
                  </Link>
                  <ul className="sub-menu">
                    {Roles?.NewsAdd === true || Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/AddLocalNews">{props.t("Add News")}</Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                    <li>
                      <Link to="/ApprovedLocalNews">
                        {props.t("Published News")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/Banner">{props.t("Banners")}</Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}

            {Roles?.PostersView === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bxs-layer"></i>
                    <span>{props.t("Posters")}</span>
                  </Link>
                  <ul className="sub-menu">
                    {Roles?.PostersAdd === true || Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/AddAdvertising">
                            {props.t("Add Posters")}
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                    <li>
                      <Link to="/ApprovedAdvertisingList">
                        {props.t("Published Posters")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}

            {Roles?.VideosView === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="bx bxs-movie"></i>
                    <span>{props.t("Videos")}</span>
                  </Link>
                  <ul className="sub-menu">
                    {Roles?.VideosAdd === true || Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/AddVideos">{props.t("Add Videos")}</Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                    <li>
                      <Link to="/PublishedVideos">
                        {props.t("Published Videos")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}

            {Roles?.SliderView === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="fas fa-sliders-h"></i>
                    <span>{props.t("Sliders")}</span>
                  </Link>
                  <ul className="sub-menu">
                    {Roles?.SliderAdd === true || Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/AddSlider">{props.t("Add Slider")}</Link>
                        </li>{" "}
                      </>
                    ) : (
                      ""
                    )}
                    <li>
                      <Link to="/PublishedSlider">
                        {props.t("Published Slider")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}

            {Roles?.notificationView === true || Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/Notifications">
                    <i className="fa fa-bell"></i>
                    <span>{props.t("Notifications")}</span>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

            {Roles?.SettingManagmentView === true ||
            Roles?.accessAll === true ? (
              <>
                <li>
                  <Link to="/#" className="has-arrow">
                    <i className="fas fa-cogs"></i>
                    <span>{props.t("Settings")}</span>
                  </Link>
                  <ul className="sub-menu">
                    {Roles?.locationView === true ||
                    Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/Locations">{props.t("Locations")}</Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                    {Roles?.faqsView === true || Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/Faqs">{props.t("Faqs")}</Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                    {Roles?.SettingsView === true ||
                    Roles?.accessAll === true ? (
                      <>
                        <li>
                          <Link to="/About">{props.t("About")}</Link>
                        </li>
                        <li>
                          <Link to="/ContactUs">{props.t("Contact Us")}</Link>
                        </li>
                        <li>
                          <Link to="/PrivicyPolicy">
                            {props.t("Privacy Policy")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/Terms">
                            {props.t("Terms & Conditions")}
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
