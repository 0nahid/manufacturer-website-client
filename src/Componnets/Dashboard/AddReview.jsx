import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ReactStars from "react-stars";
import auth from "../../firebase.init";
const AddReview = () => {
    const [rating, setRating] = useState(0);
    const handleAddReview = async (e) => {
        e.preventDefault();
        const reviewText = e.target.reviewText.value;
        const reviewData = {
            reviewText,
            rating,
            reviewDate: new Date().toDateString(),
            author: {
                name: auth?.currentUser?.displayName,
                uid: auth?.currentUser?.uid,
                photo: auth?.currentUser?.photoURL,
            },
        };
        // console.log(reviewData);
        if (rating && reviewText) {
            axios.post(`https://car-parts-bangladesh.herokuapp.com/api/review`, reviewData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                }
            })
                .then((res) => {
                    if (res.data?.insertedId) {
                        toast.success("Review added successfully");
                        e.target.reset();
                    }
                });
        } else {
            toast.error(`Provide Valid Information`);
        }
    };

    const [reviewError, setReviewError] = useState("");
    const handleReviewTextLimit = (e) => {
        const reviewText = e.target.value;
        if (reviewText.length === 250) {
            setReviewError(
                `Stop, ${auth?.currentUser?.displayName}! You have reached the limit 😃`
            );
        } else if (reviewText.length < 100) {
            setReviewError(
                `Hey, ${auth?.currentUser?.displayName}! Minimum 100 characters required 😋`
            );
        } else {
            setReviewError(null);
        }
    };

    return (
        <div className="container mx-auto mt-5">
            <div className="title">
                <h2 className="text-2xl font-semibold px-4">Add Review</h2>
            </div>
            <form
                onSubmit={handleAddReview}
                action=""
                className="p-4 md:p-10 shadow-lg rounded mt-4"
            >
                <div>
                    <textarea
                        className={`textarea textarea-bordered w-full ${reviewError &&
                            "border-error outline-error shadow-error focus:outline-error"
                            }`}
                        placeholder="Review Description"
                        name="reviewText"
                        maxLength={250}
                        onChange={handleReviewTextLimit}
                        style={{ resize: "none", height: "10rem" }}
                    ></textarea>
                    {reviewError && (
                        <small className="block text-error">{reviewError}</small>
                    )}
                </div>
                <div>
                    <ReactStars
                        count={5}
                        onChange={setRating}
                        size={34}
                        color2={"#0E71F9"}
                    />
                </div>
                <button className="btn btn-primary my-3 text-white">
                    Send Feedback
                </button>
            </form>
        </div>
    );
};

export default AddReview;