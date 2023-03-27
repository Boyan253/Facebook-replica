import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar"
import { AuthContext } from "../../contexts/AuthContext"
import * as postService from "../../service/postService"
import "./details.css"

export function Details({ posts, postDeleteHandler }) {
    const navigate = useNavigate()
    const [post, setPost] = useState({})
    const { auth } = useContext(AuthContext)
    const { postId } = useParams()
    useEffect(() => {
        postService.getOnePost(postId)
            .then(data => {
                setPost(data)
            }).catch((err) => {
                console.log(err);
                navigate('/404')
            })
    }, [postId, navigate])


    return (
        <>
            <Topbar></Topbar>
            <div className="container">
                <div className="row">
                    {/* <div className="col-md-5">  */}



                    {/* <div className="project-info-box mt-0 mb-0" >
                            <p className="mb-0" >
                                <span className="fw-bold mr-10 va-middle hide-mobile" > Share:</span >
                                <a href="#x" className="btn btn-xs btn-facebook btn-circle btn-icon mr-5 mb-0" > <i className="fab fa-facebook-f" ></i ></a >
                                <a href="#x" className="btn btn-xs btn-twitter btn-circle btn-icon mr-5 mb-0" > <i className="fab fa-twitter" ></i ></a >
                                <a href="#x" className="btn btn-xs btn-pinterest btn-circle btn-icon mr-5 mb-0" > <i className="fab fa-pinterest" ></i ></a >
                                <a href="#x" className="btn btn-xs btn-linkedin btn-circle btn-icon mr-5 mb-0" > <i className="fab fa-linkedin-in" ></i ></a >
                            </p >
                        </div >
                    </div > */}

                    <div className="col-md-7" >
                        <img src={post.imageUrl ? post.imageUrl : 'https://images.squarespace-cdn.com/content/v1/584fb58a725e254d6b0830a3/1580511138056-M3RVKI1B97QKRX48SKJT/PWB+LOGO+-+TM_White-01.png'} alt="project-img" className="rounded" />
                        <div className="project-info-box" >
                            <p><b>Creator:</b> {post.ownerName}
                                <b>Tags:</b> {post.tags}
                                <b>Location:</b> {post.location}
                                <b>Date:</b> {post.createdAt}
                            </p>
                            <p className="mb-0" > <b>Description:</b> {post.description}</p >

                        </div >
                        {auth?._id === post.owner && (<><Link to={`/edit/${postId}`}><Button variant="outlined" startIcon={<Edit />}>Edit</Button></Link>
                            <Button variant="outlined" startIcon={<Delete />}
                                onClick={() => postDeleteHandler(postId)}>Delete</Button></>)
                        }


                    </div >
                    <p>Comments: There are no comments</p>
                </div >
            </div >
        </>)
}