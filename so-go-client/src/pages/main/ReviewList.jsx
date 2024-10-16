import { useEffect, useState } from "react";

import axiosInstance from "@/axios/AxiosInstance";
import ReviewThumnail from "@/components/main/ReviewThumnail";

import "@/css/review/ReviewList.css";
import { useNavigate } from "react-router-dom";

export default function ReviewList() {
	const navigate = useNavigate();
	const [reviewList, setReviewList] = useState([]);

	useEffect(() => {
		const getReviewList = async () => {
			try {
				const response = await axiosInstance.get(`/reviews`);
				setReviewList(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		getReviewList();
	}, []);

	const goReviewDetail = (reviewUuid) => {
		navigate("/review", { state: reviewUuid });
	};

	return (
		<div className="main-reviewlist">
			{reviewList.length === 0 ? (
				<p className="review-none">현재 리뷰가 없습니다.</p>
			) : (
				reviewList.map((review, index) => (
					<ReviewThumnail
						key={index}
						review={review}
						onClick={() => goReviewDetail(review.reviewUuid)}
					/>
				))
			)}
		</div>
	);
}
