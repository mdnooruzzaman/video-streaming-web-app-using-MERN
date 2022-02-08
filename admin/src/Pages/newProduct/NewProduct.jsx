import { useState } from 'react'
import { Progress } from 'react-sweet-progress';
import { Circles, Oval, TailSpin } from 'react-loader-spinner'
import "react-sweet-progress/lib/style.css";
import './newproduct.scss'
import { storage } from '../../firbase';
import SuccessAlert from '../../components/successAlert/SuccessAlert';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const NewProduct = () => {
    const [toggel, setToggel] = useState(true)
    const [movie, setMovie] = useState(null);
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0)
    const [loading, setLoading] = useState(false)

    const [imgProgress, setImgProgress] = useState(0);
    const [imgTitleProgress, setImgTitleProgress] = useState(0);
    const [imgSmProgress, setImgSmProgress] = useState(0);
    const [trailerProgress, setTrailerProgress] = useState(0);
    const [videoProgress, setVideoProgress] = useState(0);

    console.log(imgProgress)



    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value })
    }
    console.log(img)
    const handleUploaded = (e) => {
        e.preventDefault();
        setLoading(true)
        //Uploading the image
        const uploadImg = (img) => {


            console.log(img.name)
            const storageRef = ref(storage, `/image/${img.name}`);
            const uploadTask = uploadBytesResumable(storageRef, img)
            uploadTask.on("state_changes", (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload image is ${progress}% `)
                setImgProgress(progress)
            },
                err => { console.log(err) },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(url => setMovie((prev) => {
                        return { ...prev, img: url }
                    })
                    ).then(
                        setUploaded((prev) => (prev + 1))
                    ).then(
                        console.log(uploaded)
                    )

                }
            )

        }
        //uploading image title
        const uploadimgTitle = (imgTitle) => {


            console.log(imgTitle.name)
            const storageRef = ref(storage, `/imageTitle/${imgTitle.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imgTitle)
            uploadTask.on("state_changes", (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload image title  is ${progress}% `)
                setImgTitleProgress(progress)
            },
                err => { console.log(err) },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(url => setMovie((prev) => {
                        return { ...prev, imgTitle: url }
                    })
                    ).then(
                        setUploaded((prev) => (prev + 1))
                    ).then(
                        console.log(uploaded)
                    )


                }
            )

        }

        //Uploading Thumbnail 

        const uploadImgSm = (imgSm) => {


            console.log(imgSm.name)
            const storageRef = ref(storage, `/imageSm/${imgSm.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imgSm)
            uploadTask.on("state_changes", (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload Thumbnail is ${progress}% `)
                setImgSmProgress(progress)
            },
                err => { console.log(err) },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(url => setMovie((prev) => {
                        return { ...prev, imgSm: url }
                    })
                    ).then(
                        setUploaded((prev) => (prev + 1))
                    ).then(
                        console.log(uploaded)
                    )


                }
            )

        }
        //Uploading trailer

        const uploadTrailer = (trailer) => {


            console.log(trailer.name)
            const storageRef = ref(storage, `/trailer/${trailer.name}`);
            const uploadTask = uploadBytesResumable(storageRef, trailer)
            uploadTask.on("state_changes", (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload trailer is ${progress}% `)
                setTrailerProgress(progress)
            },
                err => { console.log(err) },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(url => setMovie((prev) => {
                        return { ...prev, trailer: url }
                    })
                    ).then(
                        setUploaded((prev) => (prev + 1))
                    ).then(
                        console.log(uploaded)
                    )

                }
            )

        }
        //uploading video
        const uploadVideo = (video) => {


            console.log(video.name)
            const storageRef = ref(storage, `/video/${video.name}`);
            const uploadTask = uploadBytesResumable(storageRef, video)
            uploadTask.on("state_changes", (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload video is ${progress}% `)
                setVideoProgress(progress)
            },
                err => { console.log(err) },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(url => setMovie((prev) => {
                        return { ...prev, video: url }
                    })
                    ).then(
                        setUploaded((prev) => (prev + 1))
                    ).then(
                        console.log(uploaded)
                    )

                }
            )

        }


        uploadImg(img);
        uploadimgTitle(imgTitle);
        uploadImgSm(imgSm);
        uploadTrailer(trailer);
        uploadVideo(video);

    }

    //submit to the database

    const handleSubmit = (e) => {
        e.preventDefault(e)
        setLoading(false)
        const createMovie = async (movie) => {
            try {
                const res = await axios.post('/api/movies', movie,
                    { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } }
                );
                console.log(`successfull ${res.data}`)
                setUploaded(0)
                setToggel(false);
            } catch (err) {
                console.log(err)
            }
        }
        createMovie(movie)
    }

    const handleClick = () => {
        setToggel(true)
    }

    console.log(movie)

    return (
        <div className='newProduct'>
            {toggel ? (<div></div>) : (<div><SuccessAlert crossClick={handleClick} /></div>)}
            <h1 className="addProductTitle">New Movie</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="img" name='img' onChange={e => setImg(e.target.files[0])} />
                    <Progress percent={imgProgress} />
                </div>
                <div className="addProductItem">
                    <label>Title Image</label>
                    <input type="file" id="imgTitle" name='imgTitle' onChange={e => setImgTitle(e.target.files[0])} />
                    <Progress percent={imgTitleProgress} />
                </div>
                <div className="addProductItem">
                    <label>Thumbnail Image</label>
                    <input type="file" id="imgSm" name='imgSm' onChange={e => setImgSm(e.target.files[0])} />
                    <Progress percent={imgSmProgress} />
                </div>

                <div className="addProductItem">
                    <label>Title</label>
                    <input type="text" placeholder="Movie title" name='title' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <textarea type="text" placeholder="description" name='desc' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Year</label>
                    <input type="text" placeholder="year" name='year' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Genre</label>
                    <input type="text" placeholder="genre" name='genre' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Duration</label>
                    <input type="text" placeholder="Duration" name='limit' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Limit</label>
                    <input type="text" placeholder="limit" name='duration' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Is Series</label>
                    <select name="isSeries" id="isSeries" onChange={handleChange}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>

                <div className="addProductItem">
                    <label>Trailer</label>
                    <input type="file" name='trailer' onChange={e => setTrailer(e.target.files[0])} />
                    <Progress percent={trailerProgress} />
                </div>
                <div className="addProductItem">
                    <label>Video</label>
                    <input type="file" name='video' onChange={e => setVideo(e.target.files[0])} />
                    <Progress percent={videoProgress} />
                </div>
                {uploaded === 5 ?

                    <button className="addProductButtonMovie" onClick={handleSubmit}>Create</button>
                    :
                    <div className="uploadMovie">
                        {
                            !loading ? (<div></div>) : (<TailSpin color="darkblue" height="30" width="30" />)
                        }

                        <button className="addProductButton" onClick={handleUploaded}>{!loading ? "Upload" : "Uploading..."}</button>
                    </div>
                }
            </form>
        </div>
    )
}

export default NewProduct
