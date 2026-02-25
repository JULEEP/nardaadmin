//const Url = "https://api.naradamedia.com/"
//const Url = "http://13.49.67.31:8003/",
//const Url = "http://31.97.206.144:8003/"
//const Url = "http://localhost:8003/"
const Url = "http://98.95.127.183:8003/"



export const URLS = {
  Base: Url,

  //Dashboard
  GetDashboard: Url + "admin/admindashboard",

  //profile
  getProfile: Url + "admin/getprofile",
  UpdateProfile: Url + "admin/updateprofile",
  UpdateImage: Url + "admin/updateprofileimage",
  ChangePass: Url + "admin/changeadminpassword",

  //Plans
  AddPlans: Url + "add-plans",
  GetPlans: Url + "getalladminplans",
  GetPlansSearch: Url + "getalladminplans?searchQuery=",
  UpdatePlans: Url + "edit-plans/",
  DeletePlans: Url + "delete-plans/",

  //Department
  AddDepartment: Url + "admin/department/adddepartment",
  GetDepartment: Url + "admin/department/getalldepartments",
  GetDepartmentSearch: Url + "admin/department/getalldepartments?searchQuery=",
  UpdateDepartment: Url + "admin/department/edit",
  InActiveDepartment: Url + "admin/department/delete",

  //Role
  AddRole: Url + "admin/role/addrole",
  GetRole: Url + "admin/role/getallroles",
  GetRoleSearch: Url + "admin/role/getallroles?searchQuery=",
  GetOneRole: Url + "admin/role/getrole",
  EditRole: Url + "admin/role/edit",
  DeleteRole: Url + "admin/role/delete/",

  //Staff
  AddStaff: Url + "admin/staff/addstaff",
  GetStaff: Url + "admin/staff/getallstaff",
  GetStaffSearch: Url + "admin/staff/getallstaff?searchQuery=",
  EditStaff: Url + "admin/staff/editstaf/",
  DeleteStaff: Url + "admin/staff/delete/",

  //Reporter
  AddReporter: Url + "add-reporter",
  GetReporter: Url + "getallreporters",
  GetReporterSearch: Url + "getallreporters?searchQuery=",
  GetActiveReporter: Url + "getallactiveandinactivereporters",
  GetActiveReporterSearch:
    Url + "getallactiveandinactivereporters?searchQuery=",
  EditReporter: Url + "update-reporter/",
  DeleteReporter: Url + "delete-reporter/",

  //GetAllCustomers
  GetAllCustomers: Url + "admin/customer/getall",
  GetAllCustomerSearch: Url + "admin/customer/getall?searchQuery=",
  GetOneDetails: Url + "admin/customer/getone",
  GetOneAdsDetails: Url + "admin/advertise/getdetails",
  GetOneNewsDetails: Url + "admin/localnews/newsdetails",
  EditOneDetails: Url + "admin/customer/editcustomer",
  BlockOneDetails: Url + "block-users",

  //GetAllArticle
  GetAllArticle: Url + "v1/naradha/admin/getdata",
  GetAllArticleSearch: Url + "v1/naradha/admin/getdata?searchQuery=",

  //settings/Faqs
  AddFAQ: Url + "admin/faq/addfaq",
  GetFAQ: Url + "admin/faq/getallfaqs",
  UpdateFAQ: Url + "admin/faq/updatefaq",
  DeleteFAQ: Url + "admin/faq/deletefaq",

  //Settings/PinCode
  AddLocation: Url + "admin/add-loctaion",
  GetLocation: Url + "admin/getalllocations",
  GetLocationSearch: Url + "admin/getalllocations?searchQuery=",
  DeleteLocation: Url + "admin/deletelocation/",
  UpdateLocation: Url + "admin/updatelocation/",

  //settings/State
  AddState: Url + "add-state",
  GetState: Url + "get-all-state",
  GetStateSearch: Url + "get-all-state?searchQuery=",
  DeleteState: Url + "delete-state",
  UpdateState: Url + "edit-state",

  //settings/District
  AddDistrict: Url + "add-district",
  GetDistrict: Url + "get-all-districts",
  GetDistrictSearch: Url + "get-all-districts?searchQuery=",
  DeleteDistrict: Url + "delete-districts",
  UpdateDistrict: Url + "edit-districts",
  DropdownStates: Url + "get-districts-by-state",

  //settings/City
  AddCity: Url + "add-constituency",
  GetCity: Url + "get-all-constituencies",
  GetCitySearch: Url + "get-all-constituencies?searchQuery=",
  UpdateCity: Url + "edit-contituency",
  InActiveCity: Url + "delete-contituency/",
  GetIdCity: Url + "admin/constituency/getallbydist",

  //settings/Language
  AddLanguage: Url + "admin/language/addlang",
  GetLanguage: Url + "admin/language/getall",
  DeleteLanguage: Url + "admin/language/deletelang/",
  UpdateLanguage: Url + "admin/language/editlang",
  GetLanguageSearch: Url + "admin/language/getall?searchQuery=",

  //settings/Notifications
  AddNotifications: Url + "admin/notification/add",
  GetNotifications: Url + "admin/notification/getall",
  DeleteNotifications: Url + "admin/notification/delete/",
  GetNotificationsSearch: Url + "admin/notification/getall?searchQuery=",

  //settings/settings
  Getsettings: Url + "admin/setting/getdetails",
  Updatesettings: Url + "admin/setting/editsetting",

  //Settings
  GetSetting: Url + "create-policy",
  UpdatePRIVACYPOLICY: Url + "edit-privacypolicy",
  UpdateTERMSANDCONDITION: Url + "edit-termsandconditions",
  UpdateAbout: Url + "edit-aboutus",
  UpdateContactUs: Url + "edit-contactUs",

  //Category
  AddCategory: Url + "add-category",
  GetCategory: Url + "get-all-categoies",
  GetCategorySearch: Url + "get-all-categoies?searchQuery=",
  UpdateCategory: Url + "editcategory/",
  DeleteCategory: Url + "deletecategory/",

  //SubCategory
  AddSubCategory: Url + "create-subcategory",
  GetSubCategory: Url + "admin/getsubcategorys",
  GetSubCategorySearch: Url + "admin/getsubcategorys?searchQuery=",
  UpdateSubCategory: Url + "edit-subcategory/",
  DeleteSubCategory: Url + "deletesubcategory/",

  //User
  GetUser: Url + "admin/user/userlist",
  GetUserSearch: Url + "admin/user/userlist?searchQuery=",
  GetOneDetails: Url + "admin/user/getbyid",

  //Slider
  AddSlider: Url + "create-slider",
  GetSlider: Url + "getalladminsliders",
  GetSliderSearch: Url + "getalladminsliders?searchQuery=",
  UpdateSlider: Url + "editslider",
  DeleteSlider: Url + "deleteslider/",
  GetOneSlider: Url + "admin/getsliderbyid",

  //Posters
  AddPosters: Url + "admin/createposter",
  GetPosters: Url + "getalladminposters",
  GetPostersSearch: Url + "getalladminposters?searchQuery=",
  UpdatePosters: Url + "admin/updateposter",
  DeletePosters: Url + "admin/deleteposter/",
  GetOnePosters: Url + "admin/getposterbyid",

  //Article
  AddArticle: Url + "create-article",
  GetArticle: Url + "admin/getalladminarticles",
  GetArticleSearch: Url + "admin/getalladminarticles?searchQuery=",
  UpdateArticle: Url + "admin/updatearticle",
  DeleteArticle: Url + "admin/updatearticlestatus/",
  InActiveArticle: Url + "delete-article/list",
  InActiveArticleSearch: Url + "delete-article/list?searchQuery=",
  GetOneArticle: Url + "admin/getarticlebyid",
  UpdateArticleCopy: Url + "admin/updatearticle",


  //Video
  AddVideo: Url + "admin/create-video",
  GetVideo: Url + "admin/getallvideos",
  GetVideoSearch: Url + "admin/getallvideos?searchQuery=",
  UpdateVideo: Url + "admin/update-video",
  DeleteVideo: Url + "admin/updatevideostatus/",
  GetOneVideo: Url + "admin/getvideobyid",

  //News
  AddNews: Url + "admin/create-news",
  GetNews: Url + "admin/getallnews",
  GetNewsSearch: Url + "admin/getallnews?searchQuery=",
  UpdateNews: Url + "admin/editnews",
  DeleteNews: Url + "admin/deletenews/",
  GetOneNews: Url + "admin/getsinglenewsbyid",
  UpdateNewsCopy: Url + "admin/allow-copy",

  //News
  GetPlanPayments: Url + "admin/getallpayments",
  GetPlanPaymentsSearch: Url + "admin/getallpayments?searchQuery=",

  //Comment
  DeleteComment: Url + "admin/deletecomment",

  //Banner
  AddBanner: Url + "admin/addbanner",
  GetBanner: Url + "admin/getallbanners",
  GetBannerSearch: Url + "admin/getallbanners?searchQuery=",
  UpdateBanner: Url + "admin/editbanner/",
  DeleteBanner: Url + "admin/deletebanner/",
}
