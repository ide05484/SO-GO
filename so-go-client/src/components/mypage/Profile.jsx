import { useEffect, useState } from "react";

import axiosInstance from "@/axios/AxiosInstance";

import { Pencil } from "phosphor-react";

import "@/css/mypage/Profile.css";
import useAuthStore from "../../store/UseAuthStore";

function Profile() {
	const [userInfo, setUserInfo] = useState({
		nickname: "닉네임",
		mySentence: "@>-- 꽃 한송이",
		myProfileImg: null,
		visitRate: 26,
	});

	const { userUuid } = useAuthStore();

	useEffect(() => {
		const getProfileInfo = async () => {
			try {
				const response = await axiosInstance.get(`/users/${userUuid}`);

				console.log(response);
			} catch (err) {
				console.error(err);
			}
		};

		getProfileInfo();
	}, []);

	return (
		<>
			<div className="profile-box">
				<div className="profile-img">
					<img
						src={userInfo.myProfileImg}
						alt="프로필사진"
					/>
					<div className="profile-modify">
						<Pencil size={16} />
						<span>내 정보 수정</span>
					</div>
				</div>

				<div className="profile-my-info">
					<div className="profile-my-info-container">
						<h3>{userInfo.nickname} 님</h3>
						<span>{userInfo.mySentence}</span>
					</div>
					<div>
						<span>전국 방문률</span>
						<span>{userInfo.visitRate}%</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
