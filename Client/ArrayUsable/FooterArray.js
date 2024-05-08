import notification from "../assets/notification.png"

exports.FooterArray=[
     {index:0,name:"Home",icon:"home"},
     {index:1,name:"Projects",icon:"briefcase-outline",iconise:true},
     {index:2, name: "Create", icon: "create-outline",iconise:true },
     {index:3, name: "Profile", icon: "users" ,feather:true},
     {index:4,name:"Alerts" ,image_icon:notification,image:true}
]
exports.navigateArray=[ 
    {index:0,navigate:"HomePage"},
    {index:1,navigate:"JobPage"},
    {index:2,navigate:"Index"},
    {index:3,navigate:"Profile"},
    {index:4,navigate:"Alert"}
]