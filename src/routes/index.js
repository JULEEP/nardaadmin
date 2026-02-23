import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Resetpsw from "pages/Authentication/Resetpsw"
import Compareotp from "pages/Authentication/Compareotp"
import ForgetPassword from "pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Reporters
import Users from "../pages/Users/Users"
import BlockedUsersView from "pages/Users/BlockedUsersView"

//Employee List
import Staff from "pages/Staff/Staff"
import AddRoles from "pages/Staff/AddRoles"
import EditRoles from "pages/Staff/EditRoles"
import Departments from "pages/Staff/Departments"
import RolesPremissions from "pages/Staff/RolesPremissions"

// News
import ViewUser from "pages/Users/ViewUser"
import LocalNews from "pages/LocalNews/LocalNews"
import ReportNews from "pages/LocalNews/ReportNews"
import ViewuserNews from "pages/Users/ViewuserNews"
import DraftedNews from "pages/LocalNews/DraftedNews"
import AddLocalNews from "pages/LocalNews/AddLocalNews"
import EditLocalNews from "pages/LocalNews/EditLocalNews"
import LocalNewsView from "pages/LocalNews/LocalNewsView"
import RejectLocalNews from "pages/LocalNews/RejectLocalNews"
import ApprovedLocalNews from "pages/LocalNews/ApprovedLocalNews"
import ViewApprovedLocalNews from "pages/LocalNews/ViewApprovedLocalNews"
import ViewRejectlocalNews from "pages/LocalNews/ViewRejectlocalNews"

//Notifications
import Notifications from "pages/Notifications/Notifications"

//ComplaintBox
import Complaintbox from "pages/ComplaintBox/ComplaintBox"

//Settings
import City from "pages/Settings/City"
import Faqs from "pages/Settings/Faqs"
import About from "pages/Settings/About"
import State from "pages/Settings/State"
import Terms from "pages/Settings/Terms"
import District from "pages/Settings/District"
import Languages from "pages/Settings/Languages"
import Locations from "pages/Settings/Locations"
import ContactUs from "pages/Settings/ContactUs"
import PrivicyPolicy from "pages/Settings/PrivicyPolicy"

//AdvertisingList
import ViewuserAds from "pages/Users/ViewuserAds"
import AddAdvertising from "pages/Advertising/AddAdvertising"
import EditAdvertising from "pages/Advertising/EditAdvertising"
import AdvertisingList from "pages/Advertising/AdvertisingList"
import ViewAdvertising from "pages/Advertising/ViewAdvertising"
import RejectAdvertising from "pages/Advertising/RejectAdvertising"
import DraftedAdvertising from "pages/Advertising/DraftedAdvertising"
import ViewRejectAdvertising from "pages/Advertising/ViewRejectAdvertising"
import ViewApprovedAdvertising from "pages/Advertising/ViewApprovedAdvertising"
import ApprovedAdvertisingList from "pages/Advertising/ApprovedAdvertisingList"

//Article
import AddArticle from "pages/DigitalNews/AddArticle"
import ViewArticle from "pages/DigitalNews/ViewArticle"
import EditArticle from "pages/DigitalNews/EditArticle"
import DraftedArticle from "pages/DigitalNews/DraftedArticle"
import InActiveArticle from "pages/DigitalNews/InActiveArticle"
import PublishedArticle from "pages/DigitalNews/PublishedArticle"

// Ads
import AddAds from "pages/Ads/AddAds"
import ListOfAds from "pages/Ads/ListOfAds"
import PopUpImage from "pages/Ads/PopUpImage"

//Reporter
import Reporter from "pages/Reporter/Reporter"
import InActiveReporter from "pages/Reporter/InActiveReporter"

//Videos
import AddVideos from "pages/Videos/AddVideos"
import EditVideos from "pages/Videos/EditVideos"
import InActiveVideos from "pages/Videos/InActiveVideos"
import PublishedVideos from "pages/Videos/PublishedVideos"
import ViewVideos from "pages/Videos/ViewVideos"

//Subscriptions
import Plans from "pages/Subscriptions/Plans"
import AddSubscriptionPopup from "pages/Subscriptions/AddSubscriptionPopup"
import Paymensts from "pages/Subscriptions/Paymensts"

//Category
import Category from "pages/Category/Category"
import SubCategory from "pages/Category/SubCategory"

//Slider
import AddSlider from "pages/Slider/AddSlider"
import EditSlider from "pages/Slider/EditSlider"
import SliderList from "pages/Slider/SliderList"
import PublishedSlider from "pages/Slider/PublishedSlider"
import ViewSlider from "pages/Slider/ViewSlider"
import Banner from "pages/Settings/Banner"

// app purpose
import DeleteAccount from "pages/Settings/DeleteAccount"
import AppPrivacy from "pages/Settings/AppPrivacy"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //Category
  { path: "/Category", component: Category },
  { path: "/SubCategory", component: SubCategory },

  //Slider
  { path: "/AddSlider", component: AddSlider },
  { path: "/EditSlider", component: EditSlider },
  { path: "/SliderList", component: SliderList },
  { path: "/ViewSlider", component: ViewSlider },
  { path: "/PublishedSlider", component: PublishedSlider },

  //Article
  { path: "/AddArticle", component: AddArticle },
  { path: "/EditArticle", component: EditArticle },
  { path: "/InActiveArticle", component: InActiveArticle },
  { path: "/DraftedArticle", component: DraftedArticle },
  { path: "/PublishedArticle", component: PublishedArticle },
  { path: "/ViewArticle", component: ViewArticle },

  { path: "/AddAds", component: AddAds },
  { path: "/ListOfAds", component: ListOfAds },
  { path: "/PopUpImage", component: PopUpImage },

  //Subscriptions
  { path: "/Plans", component: Plans },
    { path: "/Planspopup", component: AddSubscriptionPopup },
  { path: "/Paymensts", component: Paymensts },

  //Videos
  { path: "/AddVideos", component: AddVideos },
  { path: "/EditVideos", component: EditVideos },
  { path: "/InActiveVideos", component: InActiveVideos },
  { path: "/PublishedVideos", component: PublishedVideos },
  { path: "/ViewVideos", component: ViewVideos },

  //Article
  { path: "/AddArticle", component: AddArticle },
  { path: "/EditArticle", component: EditArticle },
  { path: "/InActiveArticle", component: InActiveArticle },
  { path: "/DraftedArticle", component: DraftedArticle },
  { path: "/PublishedArticle", component: PublishedArticle },

  //Reporter
  { path: "/Reporter", component: Reporter },
  { path: "/InActiveReporter", component: InActiveReporter },

  //Advertising
  { path: "/ViewuserAds", component: ViewuserAds },
  { path: "/DraftedNews", component: DraftedNews },
  { path: "/ViewArticle", component: ViewArticle },
  { path: "/AddAdvertising", component: AddAdvertising },
  { path: "/EditAdvertising", component: EditAdvertising },
  { path: "/ViewAdvertising", component: ViewAdvertising },
  { path: "/AdvertisingList", component: AdvertisingList },
  { path: "/RejectAdvertising", component: RejectAdvertising },
  { path: "/DraftedAdvertising", component: DraftedAdvertising },
  { path: "/ViewRejectAdvertising", component: ViewRejectAdvertising },
  { path: "/ViewApprovedAdvertising", component: ViewApprovedAdvertising },
  { path: "/ApprovedAdvertisingList", component: ApprovedAdvertisingList },

  //News
  { path: "/LocalNews", component: LocalNews },
  { path: "/ReportNews", component: ReportNews },
  { path: "/AddLocalNews", component: AddLocalNews },
  { path: "/ViewuserNews", component: ViewuserNews },
  { path: "/EditLocalNews", component: EditLocalNews },
  { path: "/LocalNewsView", component: LocalNewsView },
  { path: "/RejectLocalNews", component: RejectLocalNews },
  { path: "/ApprovedLocalNews", component: ApprovedLocalNews },
  { path: "/ViewRejectlocalNews", component: ViewRejectlocalNews },
  { path: "/ViewApprovedLocalNews", component: ViewApprovedLocalNews },

  //Users
  { path: "/Users", component: Users },
  { path: "/BlockedUsersView", component: BlockedUsersView },
  { path: "/ViewUser", component: ViewUser },

  //Settings
  { path: "/City", component: City },
  { path: "/Faqs", component: Faqs },
  { path: "/State", component: State },
  { path: "/About", component: About },
  { path: "/Terms", component: Terms },
  { path: "/District", component: District },
  { path: "/Languages", component: Languages },
  { path: "/ContactUs", component: ContactUs },
  { path: "/Locations", component: Locations },
  { path: "/PrivicyPolicy", component: PrivicyPolicy },

  //Staff
  { path: "/AddRoles", component: AddRoles },
  { path: "/EditRoles", component: EditRoles },
  { path: "/RolesPremissions", component: RolesPremissions },
  { path: "/Departments", component: Departments },
  { path: "/Staff", component: Staff },

  //TvNew
  { path: "/Banner", component: Banner },

  //Notification
  { path: "/Notifications", component: Notifications },

  //Complaintbox
  { path: "/Complaintbox", component: Complaintbox },

  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routesside
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/ForgetPassword", component: ForgetPassword },
  { path: "/deleteaccount", component: DeleteAccount },
  { path: "/appprivacypolicy", component: AppPrivacy },
  { path: "/Compareotp", component: Compareotp },
  { path: "/Resetpsw", component: Resetpsw },
]

export { publicRoutes, authProtectedRoutes }
