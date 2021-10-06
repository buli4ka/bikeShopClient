module.exports = {
    server: {
        serverDomain: "http://localhost:5000",
        user:{
            registration: "/api/user/registration",
            login:"/api/user/login",
        },
        car:{
            getCar:"/api/Car/getById/",
            getCars:"/api/Car/getAll/",
            addCar:"/api/Car/add/",
            deleteCar:"/api/Car/delete/",
            updateCar:"/api/Car/update/"
        },
        manufacturer:{
            getManufacturers:"/api/manufacturer/getAll/",
            getManufacturerById:"/api/manufacturer/getById/",
            addManufacturer:"/api/manufacturer/add/",
            deleteManufacturer:"/api/manufacturer/delete/",
            updateManufacturer:"/api/manufacturer/update/"
        },
        image:{
            addImages:"/api/image/add/",
            getPreview:"/api/image/getPreview/",
            getImageIds:"/api/image/getIds/",
            getImage:"/api/image/getById/"
        }



    },

    client: {
        mainUrl: "/",
        detailUrl: "/detail/:id",
        adminUrl: "/admin",
        addBikeUrl: "/admin/addBike",
        addManufacturerUrl: "/admin/addManufacturer",
        cartUrl: "/cart",
        authUrl: "/auth",
        userStorageName: "userData",
        cartStorageName:"Cart"
    }
}
