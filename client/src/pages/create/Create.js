import { useForm } from 'react-hook-form';
import Topbar from '../../components/topbar/Topbar';
import './create.css';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function Create({ postCreateHandler }) {
    const { auth } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("location", data.location);
        formData.append("tags", data.tags);
        formData.append("description", data.description);
        if (data.image[0]) {
            formData.append("image", data.image[0]);
        }

        postCreateHandler(formData).catch(() => {
            return <Navigate to={'/login'}></Navigate>
        })
    };



    const createOptions = {
        title: {
            required: "Title is required",
        },
        location: {
            required: "Location is required",
        },
        tags: {
            required: "Tags is required",
        },
        description: {
            required: "Description is required",
        },
        // image: {
        //     required: "Image is required",
        //     validate: {
        //         fileTypes: (value) => {
        //             const fileType = value[0].type.split("/")[0];
        //             if (fileType !== "image") {
        //                 return "Please upload an image file";
        //             }
        //         },
        //         fileSize: (value) => {
        //             const fileSize = value[0].size / 1024 / 1024; // in MB
        //             if (fileSize > 10) {
        //                 return "Image size cannot exceed 10MB";
        //             }
        //         },
        //     },
        // },
    };
    if (!auth._id) {
return <Navigate to={'/login'}></Navigate>
    }

    return (
        <>

            <Topbar />
            <div className="errorContainer">
                {errors.title && <p className="fade-in">Title is required</p>}
                {errors.location && <p className="fade-in">Location is required</p>}
                {errors.tags && <p className="fade-in">Tags is required</p>}
                {errors.description && <p className="fade-in">Description is required</p>}
            </div>
            <div className='body'>
                <section className="upload-section">
                    <div className="wrapper">
                        <p className="logoCreate">Create Post</p>
                        <form className="form-area" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <div className="input-wrapper">
                                <p>Title</p>
                                <div className="input-ctr">
                                    <input type="text" {...register("title", createOptions.title)} placeholder="Enter Title" />
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <p>Location</p>
                                <div className="input-ctr">
                                    <input type="text" {...register("location", createOptions.location)} placeholder="Enter Location" />
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <p>Tags</p>
                                <div className="input-ctr">
                                    <input type="text" {...register("tags", createOptions.tags)} placeholder="Enter Tags" />
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <p>Image URL</p>
                                <div className="input-ctr">
                                    <input type="file" name='image' {...register("image")} placeholder="Enter Image URL" />
                                </div>
                            </div>
                            <div className="textarea-wrapper">
                                <p>Description</p>
                                <div className="textarea-ctr">
                                    <textarea
                                        name="description"
                                        id=""
                                        cols="30"
                                        rows="10"
                                        placeholder="Add Description"
                                        {...register("description", createOptions.description)}
                                    ></textarea>
                                </div>
                                <button className="button-upload" type='submit'>Upload</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div >
        </>
    )
}
