import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../contexts/AuthContext";
import * as postService from "../../service/postService";

export function Edit({ postEditHandler }) {
    const { postId } = useParams();
    const navigate = useNavigate()
    const [postData, setPostData] = useState(null);
    const { isAuthenticated, auth } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    useEffect(() => {
        let isMounted = true;
        postService.getOnePost(postId).then((data) => {

            if (isMounted && data) {
                setPostData(data);

                if (data.owner !== auth._id) {
                    navigate('/login');
                    return null; // Return null to prevent rendering the form
                }

                setValue("title", data.title);
                setValue("location", data.location);
                setValue("tags", data.tags);
                setValue("description", data.description);
            }

        }).catch(() => {
            return <Navigate to={'/login'}></Navigate>
        })

        return () => {
            isMounted = false;
        };
    }, [postId, setValue]);


    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("location", data.location);
        formData.append("tags", data.tags);
        formData.append("description", data.description);
        if (data.image[0]) {
            formData.append("image", data.image[0]);
        }

        postEditHandler(formData, postId)
    };


    return (
        <>
            {isAuthenticated ? <><Topbar />
                <div className="body">
                    <section className="upload-section">
                        <div className="wrapper">
                            <p className="logoCreate">Edit Post</p>
                            {postData && (
                                <form className="form-area" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="input-wrapper">
                                        <p>Title</p>
                                        <div className="input-ctr">
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Enter Title"
                                                {...register("title", { required: "Title is required" })}
                                            />
                                            {errors.title && (
                                                <span className="error">{errors.title.message}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="input-wrapper">
                                        <p>Location</p>
                                        <div className="input-ctr">
                                            <input
                                                type="text"
                                                name="location"
                                                placeholder="Enter Location"
                                                {...register("location", {
                                                    required: "Location is required"
                                                })}
                                            />
                                            {errors.location && (
                                                <span className="error">
                                                    {errors.location.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="input-wrapper">
                                        <p>Tags</p>
                                        <div className="input-ctr">
                                            <input
                                                type="text"
                                                name="tags"
                                                placeholder="Enter Tags"
                                                {...register("tags", { required: "Tags are required" })}
                                            />
                                            {errors.tags && (
                                                <span className="error">{errors.tags.message}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="input-wrapper">
                                        <p>Image</p>
                                        <div className="input-ctr">
                                            <input type="file" name="image" {...register("image")} />
                                        </div>
                                    </div>
                                    <div className="textarea-wrapper">
                                        <p>Description</p>
                                        <div className="textarea-ctr">
                                            <textarea
                                                name="description"
                                                placeholder="Enter Description"
                                                {...register("description", {
                                                    required: "Descriptionis required"
                                                })}
                                            ></textarea>
                                            {errors.description && (
                                                <span className="error">
                                                    {errors.description.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="input-wrapper">
                                        <button className="btn-create">Update</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </section>
                </div> </> : <Navigate to={'/posts'}></Navigate>}

        </>
    );
}
