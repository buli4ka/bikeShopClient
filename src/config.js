module.exports = {
    server: {
        serverDomain: "http://localhost:5000",
        user:{
            registration: "/api/user/registration",
            login:"/api/user/login",
        },
        bike:{
            getBike:"/api/bike/getBikeById/",
            getBikes:"/api/bike/getBikes",
            addBike:"/api/bike/addBike",
        },
        manufacturer:{
            getManufacturers:"/api/manufacturer/getManufacturers",
            getManufacturerById:"/api/manufacturer/getManufacturerById/",
            addManufacturer:"/api/manufacturer/addManufacturer"
        },
        image:{
            addImages:"/api/image/addImages/",
            getFirstBikeImage:"/api/image/getFirstBikeImage/",
            getImageIds:"/api/image/getIds/",
            getImage:"/api/image/getBikeImage/"
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
        storageName: "userData"
    }
}
