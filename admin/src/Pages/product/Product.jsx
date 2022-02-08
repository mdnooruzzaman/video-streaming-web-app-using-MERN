import React from 'react'
import './product.scss'
import { Circles, Oval, TailSpin } from 'react-loader-spinner'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { Link, useParams } from 'react-router-dom';
import { MdPublish } from 'react-icons/md';
import { useEffect } from 'react';
import SuccessAlert from '../../components/successAlert/SuccessAlert';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firbase';
import { useState } from 'react';

const Product = () => {
    const [toggel, setToggel] = useState(true)
    const location = useParams()
    const [oneM, setOneM] = useState([]);
    const [oneMovie, setOneMovie] = useState(null);
    const [oneImg, setOneImg] = useState(null);
    const [oneTrailer, setOneTrailer] = useState(null);
    const [oneVideo, setOneVideo] = useState(null);
    const [OneUploaded, setOneUploaded] = useState(0);
    const [loading, setLoading] = useState(true);


    const [oneImgProgress, setOneImgProgress] = useState(0);
    const [oneTrailerProgress, setOneTrailerProgress] = useState(0);
    const [oneVideoProgress, setOneVideoProgress] = useState(0);


    const id = location.productId;


    useEffect(() => {

        const getOneMovie = async (id) => {
            try {
                console.log(id + " ka")
                const res = await axios.get('/api/movies/' + id,
                    { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } });

                setOneM(res.data)

            } catch (err) {
                console.log(err)
            }
        }
        getOneMovie(id);
    }, [])
    console.log(oneM)

    const handleChange = (e) => {
        const value = e.target.value;
        setOneMovie({ ...oneMovie, [e.target.name]: value })
    }

    const handleUpload = (e) => {
        e.preventDefault();
        setLoading(false);
        //Uploading the image
        const uploadoneImg = (oneImg) => {


            console.log(oneImg.name)
            const storageRef = ref(storage, `/image/${oneImg.name}`);
            const uploadTask = uploadBytesResumable(storageRef, oneImg)
            uploadTask.on("state_changes", (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload image is ${progress}% `)
                setOneImgProgress(progress)
            },
                err => { console.log(err) },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(url => setOneMovie((prev) => {
                        return { ...prev, "img": url }
                    })
                    ).then(
                        setOneUploaded((prev) => (prev + 1))
                    ).then(
                        console.log(OneUploaded)
                    )

                }
            )

        }


        //Uploading trailer

        const uploadoneTrailer = (oneTrailer) => {


            console.log(oneTrailer.name)
            const storageRef = ref(storage, `/oneTrailer/${oneTrailer.name}`);
            const uploadTask = uploadBytesResumable(storageRef, oneTrailer)
            uploadTask.on("state_changes", (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload oneTrailer is ${progress}% `)
                setOneTrailerProgress(progress)
            },
                err => { console.log(err) },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(url => setOneMovie((prev) => {
                        return { ...prev, "trailer": url }
                    })
                    ).then(
                        setOneUploaded((prev) => (prev + 1))
                    ).then(
                        console.log(OneUploaded)
                    )

                }
            )

        }
        //uploading video
        const uploadoneVideo = (oneVideo) => {


            console.log(oneVideo.name)
            const storageRef = ref(storage, `/oneVideo/${oneVideo.name}`);
            const uploadTask = uploadBytesResumable(storageRef, oneVideo)
            uploadTask.on("state_changes", (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload oneVideo is ${progress}% `)
                setOneVideoProgress(progress)
            },
                err => { console.log(err) },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(url => setOneMovie((prev) => {
                        return { ...prev, "video": url }
                    })
                    ).then(
                        setOneUploaded((prev) => (prev + 1))
                    ).then(
                        console.log(OneUploaded)
                    )

                }
            )

        }


        uploadoneImg(oneImg);
        uploadoneTrailer(oneTrailer);
        uploadoneVideo(oneVideo);

    }
    console.log(OneUploaded);
    console.log(oneMovie);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const updateMovie = async (id, oneMovie) => {
            try {
                const res = await axios.put('/api/movies/' + id, oneMovie,
                    { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } }
                );
                console.log(`successfull ${res.data}`)
                setOneUploaded(0);
                setToggel(false)
            } catch (err) {
                console.log(err)
            }
        }
        updateMovie(id, oneMovie)
    }

    const handleClick = () => {
        setToggel(true);
    }

    return (
        <div className='product'>
            {toggel ? (<div></div>) : (<div><SuccessAlert crossClick={handleClick} /></div>)}
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to="/newProduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">

                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={oneM.img} alt="" className="productInfoImg" />
                        <span className="productName">{oneM.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{oneM._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Description:</span>
                            <span className="productInfoValue">{oneM.desc}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Year:</span>
                            <span className="productInfoValue">{oneM.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre:</span>
                            <span className="productInfoValue">{oneM.genre}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input type="text" placeholder={oneM.title} name='title' onChange={handleChange} />
                        <label>Year</label>
                        <input type="text" placeholder={oneM.year} name='year' onChange={handleChange} />
                        <label>Genre</label>
                        <input type="text" placeholder={oneM.genre} name='genre' onChange={handleChange} />
                        <label>Duration</label>
                        <input type="text" placeholder={oneM.limit} name='limit' onChange={handleChange} />
                        <label>Description</label>
                        <textarea type="text" placeholder={oneM.desc} name='desc' onChange={handleChange} />
                        <div className="trailerProgress">

                            <label>Trailer</label>
                            <input type="file" onChange={(e) => setOneTrailer(e.target.files[0])} />
                            <Progress type="circle" width={50} percent={oneTrailerProgress} />
                        </div>
                        <div className="videoProgress">

                            <label>Video </label>
                            <input type="file" onChange={(e) => setOneVideo(e.target.files[0])} />
                            <Progress type="circle" width={50} percent={oneVideoProgress} />
                        </div>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={oneM.img} alt="" className="productUploadImg" />
                            <label htmlFor="file">
                                <MdPublish />
                            </label>
                            <input type="file" id="file" className='file' onChange={(e) => setOneImg(e.target.files[0])} />
                            <Progress type="circle" width={40} percent={oneImgProgress} />
                        </div>

                        {
                            OneUploaded === 3 ? (

                                <button className="productButtonupdate" onClick={handleSubmit}>Update</button>
                            ) : (
                                <div className='upload'>
                                    {
                                        loading ? (<div></div>) : (<TailSpin color="darkblue" height="40" width="40" />)
                                    }

                                    <button className="productButton" onClick={handleUpload} >{loading ? "Upload" : "Uploading..."}</button>
                                </div>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product
