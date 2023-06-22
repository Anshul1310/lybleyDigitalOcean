import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import LinearProgress from "@mui/material/LinearProgress";
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import api from "../../http";
import baseUrl from "../../http/Constant";
import "./banner.css";

const Banner = () => {
    const [banner1, setBanner1] = useState("")
    const [banner2, setBanner2] = useState("")
    const [banner3, setBanner3] = useState("")
    const [banner4, setBanner4] = useState("")
    const [banner5, setBanner5] = useState("")
    const [openingAd, setOpeningAd] = useState("");
    const [bannerAd, setBannerAd] = useState("");
    const [banner6, setBanner6] = useState("")
    const [banner1Tag, setBanner1Tag] = useState("");
    const [banner2Tag, setBanner2Tag] = useState("");
    const [banner3Tag, setBanner3Tag] = useState("");
    const [banner4Tag, setBanner4Tag] = useState("");
    const [banner5Tag, setBanner5Tag] = useState("");
    const [banner6Tag, setBanner6Tag] = useState("");
    const [bannerAdTag, setBannerAdTag] = useState("");
    const [openingAdTag, setOpeningAdTag] = useState("");


    const [brand1Image, setBrand1Image] = useState("");
    const [brand2Image, setBrand2Image] = useState("");
    const [brand3Image, setBrand3Image] = useState("");
    const [brand4Image, setBrand4Image] = useState("");
    const [brand5Image, setBrand5Image] = useState("");
    const [brand6Image, setBrand6Image] = useState("");

    const [brand1Tag, setBrand1Tag] = useState("");
    const [brand2Tag, setBrand2Tag] = useState("");
    const [brand3Tag, setBrand3Tag] = useState("");
    const [brand4Tag, setBrand4Tag] = useState("");
    const [brand5Tag, setBrand5Tag] = useState("");
    const [brand6Tag, setBrand6Tag] = useState("");

    useEffect(() => {
        api.get("/api/settings/banner").then((data) => {
            console.log(data.data);
            if (data.data.banner != null) {
                
                setBanner1(data.data.banner.banner1);
                setBanner2(data.data.banner.banner2);
                setBanner3(data.data.banner.banner3);
                setOpeningAd(data.data.banner.openingAd);
                setBannerAd(data.data.banner.bannerAd);
                setBanner4(data.data.banner.banner4);
                setBanner5(data.data.banner.banner5);
                setBanner6(data.data.banner.banner6);


                setBanner1Tag(data.data.banner.banner1Tag);
                setBanner2Tag(data.data.banner.banner2Tag);
                setBanner3Tag(data.data.banner.banner3Tag);
                setOpeningAdTag(data.data.banner.openingAdTag);
                setBannerAdTag(data.data.banner.bannerAdTag);
                setBanner4Tag(data.data.banner.banner4Tag);
                setBanner5Tag(data.data.banner.banner5Tag);
                setBanner6Tag(data.data.banner.banner6Tag);

                setBrand1Image(data.data.banner.brand1Image);
                setBrand2Image(data.data.banner.brand2Image);
                setBrand3Image(data.data.banner.brand3Image);
                setBrand4Image(data.data.banner.brand4Image);
                setBrand5Image(data.data.banner.brand5Image);
                setBrand6Image(data.data.banner.brand6Image);

                setBrand1Tag(data.data.banner.brand1Tag);
                setBrand2Tag(data.data.banner.brand2Tag);
                setBrand3Tag(data.data.banner.brand3Tag);
                setBrand4Tag(data.data.banner.brand4Tag);
                setBrand5Tag(data.data.banner.brand5Tag);
                setBrand6Tag(data.data.banner.brand6Tag);

            }


        }).catch((err) => {
            alert("Network Conncetion Error");
            console.log(err);
        });
    }, [])

    const handleChange = (e) => {
        console.log(e.target.id)
        const file = e.target.files[0];
        //to convert file to base64 string
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setVisiblity("flex")
            api.post("/api/settings/upload", { image: reader.result }).then((data) => {
                setVisiblity("none")
                if (e.target.id == "banner1") {
                    setBanner1(baseUrl + "" + data.data)
                } else if (e.target.id == "banner2") {
                    setBanner2(baseUrl + "" + data.data)
                } else if (e.target.id == "banner3") {
                    setBanner3(baseUrl + "" + data.data)
                } else if (e.target.id == "banner4") {
                    setBanner4(baseUrl + "" + data.data)
                } else if (e.target.id == "banner5") {
                    setBanner5(baseUrl + "" + data.data)
                } else if (e.target.id == "banner6") {
                    setBanner6(baseUrl + "" + data.data)
                } else if (e.target.id == "bannerAd") {
                    setBannerAd(baseUrl + "" + data.data)
                } else if (e.target.id == "openingAd") {
                    setOpeningAd(baseUrl + "" + data.data)
                } else if (e.target.id == "brand1") {
                    setBrand1Image(baseUrl + "" + data.data)
                } else if (e.target.id == "brand2") {
                    setBrand2Image(baseUrl + "" + data.data)
                } else if (e.target.id == "brand3") {
                    setBrand3Image(baseUrl + "" + data.data)
                } else if (e.target.id == "brand4") {
                    setBrand4Image(baseUrl + "" + data.data)
                } else if (e.target.id == "brand5") {
                    setBrand5Image(baseUrl + "" + data.data)
                } else if (e.target.id == "brand6") {
                    setBrand6Image(baseUrl + "" + data.data)
                }

            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const handleClick = (e) => {
        api.post("/api/settings/banner", { banner: { brand1Image,brand2Image, brand3Image, brand4Image , brand5Image ,brand6Image, brand1Tag,brand2Tag, brand3Tag, brand4Tag , brand5Tag ,brand6Tag,banner1, openingAd, bannerAd, banner2, banner3, banner4, banner5, banner6, banner1, openingAdTag, bannerAdTag, banner1Tag, banner2Tag, banner3Tag, banner4Tag, banner5Tag, banner6Tag } }).then((data) => {
            alert("Saved successfully")
        }).catch((err) => {
            console.log(err);
        });
    }

    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }
    const [visiblity, setVisiblity] = useState("none");
    return (
        <div className="main">
            {showSidebar ? <div className="Sidebar"><Sidebar /></div> : <div className="SidebarSmall"><Sidebar /></div>}
            <div className="flex-container" style={showSidebar ? { marginLeft: '258px' } : { marginLeft: '95px' }}>
                <Navbar toggleSideBar={toggleSideBar} />
                <div className="container">
                    <LinearProgress variant="indeterminate"
                        value={0}
                        style={{ "display": visiblity }}
                    />
                    <div className="d-flex flex-column align-items-center my-4" style={{ backgroundColor: '#eee', padding: '0.5rem 0', boxShadow: '#dddddd 0rem 0.2rem 1rem', border: '1px solid #dddddd' }}>
                        <div className="my-2">
                            <h2>Banners</h2>
                        </div>
                        <div className="container">
                            <div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon2">Banner1</span>
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="banner1" />

                                    <input type="text" placeholder='banner' className="form-control" id="banner1" value={banner1} onChange={(e) => setBanner1(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={banner1Tag} onChange={(e) => setBanner1Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="banner1" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="banner2" />

                                    <span className="input-group-text" id="basic-addon2">Banner2</span>
                                    <input type="text" placeholder='banner' className="form-control" id="banner2" value={banner2} onChange={(e) => setBanner2(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={banner2Tag} onChange={(e) => setBanner2Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner2}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="banner2" className="input-group-text" ><UploadFileIcon /></label></span>

                                </div>
                            </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="banner3" />

                                    <span className="input-group-text" id="basic-addon2">Banner3</span>
                                    <input type="text" placeholder='banner' className="form-control" id="banner3" value={banner3} onChange={(e) => setBanner3(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={banner3Tag} onChange={(e) => setBanner3Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="banner3" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="banner4" />

                                    <span className="input-group-text" id="basic-addon2">Banner4</span>
                                    <input type="text" placeholder='banner' className="form-control" id="banner4" value={banner4} onChange={(e) => setBanner4(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={banner4Tag} onChange={(e) => setBanner4Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="banner4" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="banner5" />

                                    <span className="input-group-text" id="basic-addon2">Banner5</span>
                                    <input type="text" placeholder='banner' className="form-control" id="banner5" value={banner5} onChange={(e) => setBanner5(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={banner5Tag} onChange={(e) => setBanner5Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="banner5" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="banner6" />

                                    <span className="input-group-text" id="basic-addon2">Banner6</span>
                                    <input type="text" placeholder='banner' className="form-control" id="banner6" value={banner6} onChange={(e) => setBanner6(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={banner6Tag} onChange={(e) => setBanner6Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="banner6" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="openingAd" />

                                    <span className="input-group-text" id="basic-addon2">Opening Ad</span>
                                    <input type="text" placeholder='banner' className="form-control" id="banner6" value={openingAd} onChange={(e) => setOpeningAd(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={openingAdTag} onChange={(e) => setOpeningAdTag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="openingAd" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="bannerAd" />

                                    <span className="input-group-text" id="basic-addon2">Banner Ad</span>
                                    <input type="text" placeholder='banner' className="form-control" id="banner6" value={bannerAd} onChange={(e) => setBannerAd(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={bannerAdTag} onChange={(e) => setBannerAdTag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="bannerAd" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>



                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="brand1" />

                                    <span className="input-group-text" id="basic-addon2">Brand 1</span>
                                    <input type="text" placeholder='banner' className="form-control" id="brand1" value={brand1Image} onChange={(e) => setBrand1Image(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={brand1Tag} onChange={(e) => setBrand1Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="brand1" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>

                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="brand2" />

                                    <span className="input-group-text" id="basic-addon2">Brand 2</span>
                                    <input type="text" placeholder='banner' className="form-control" id="brand2" value={brand2Image} onChange={(e) => setBrand2Image(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={brand2Tag} onChange={(e) => setBrand2Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="brand2" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>

                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="brand3" />

                                    <span className="input-group-text" id="basic-addon2">Brand 3</span>
                                    <input type="text" placeholder='banner' className="form-control" id="brand3" value={brand3Image} onChange={(e) => setBrand3Image(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={brand3Tag} onChange={(e) => setBrand3Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="brand3" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div><div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="brand4" />

                                    <span className="input-group-text" id="basic-addon2">Brand 4</span>
                                    <input type="text" placeholder='banner' className="form-control" id="brand4" value={brand4Image} onChange={(e) => setBrand4Image(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={brand4Tag} onChange={(e) => setBrand4Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="brand4" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="brand5" />

                                    <span className="input-group-text" id="basic-addon2">Brand 5</span>
                                    <input type="text" placeholder='banner' className="form-control" id="brand5" value={brand5Image} onChange={(e) => setBrand5Image(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={brand5Tag} onChange={(e) => setBrand5Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="brand5" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input type="file" onChange={(e) => handleChange(e)} className="inputFile" id="brand6" />

                                    <span className="input-group-text" id="basic-addon2">Brand 6</span>
                                    <input type="text" placeholder='banner' className="form-control" id="brand6" value={brand6Image} onChange={(e) => setBrand6Image(e.target.value)} />
                                    <input type="text" placeholder='mobiles' className="form-control" id="banner1" value={brand6Tag} onChange={(e) => setBrand6Tag(e.target.value)} />
                                    <span className="input-group-text" id="basic-addon2" ><a target="_blank" href={banner1}><VisibilityIcon /></a></span>
                                    <span className="input-group-text" id="basic-addon2"> <label htmlFor="brand6" className="input-group-text" ><UploadFileIcon /></label></span>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-success" onClick={(e) => handleClick(e)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner