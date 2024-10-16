import { useEffect, useState } from "react";
import axiosInstance from "@/axios/AxiosInstance";
import useAuthStore from "../../store/UseAuthStore";
import { useNavigate } from "react-router-dom";

import "@/css/mypage/MyTrip.css";

const MyTrip = () => {
	const navigate = useNavigate();

	const [myTrips, setMyTrips] = useState([]);
	const { userUuid } = useAuthStore();

	useEffect(() => {
		const getMyReviewList = async () => {
			try {
				const response = await axiosInstance.get(`/reviews/my-reviews/${userUuid}`);
				setMyTrips(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		getMyReviewList();
	}, [userUuid]);

	const goReviewDetail = (reviewUuid) => {
		navigate("/review", { state: reviewUuid });
	};

	return (
		<>
			{myTrips.length === 0 ? (
				<div className="no-info-title">
					<p>등록된 여행이 없습니다.</p>
				</div>
			) : (
				<div className="my-trip-grid">
					{myTrips.map((myTrip) => (
						<img
							key={myTrip.id} // 각 아이템에 고유한 키 추가
							src={myTrip.img}
							alt="여행사진"
							className="my-trip-review-img"
							onClick={() => goReviewDetail(myTrip.reviewUuid)}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default MyTrip;
