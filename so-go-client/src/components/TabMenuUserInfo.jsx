import { BellSimple, UserCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import axiosInstance from "@/axios/AxiosInstance";

import DefaultProfile from "@/assets/profile.png";
import Notification from "@/components/Notification.jsx";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/UseAuthStore";

import "@/css/common/TabMenuUserInfo.css";

export default function TabMenuUserInfo() {
	const navigate = useNavigate();

	const [isLogin, setIsLogin] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);

	const { accessToken, userUuid } = useAuthStore(); // useAuthStore에서 accessToken과 userUuid 가져오기
	const [userInfo, setUserInfo] = useState({
		nickname: "",
		img: null,
	});

	// 로그인 상태 확인 및 사용자 정보 가져오기
	useEffect(() => {
		if (accessToken) {
			const fetchUserInfo = async () => {
				try {
					const response = await axiosInstance.get(`/users/${userUuid}`);
					setUserInfo({
						nickname: response.data.nickname,
						img: response.data.img,
					});
				} catch (error) {
					console.error("유저 정보를 가져오는 데 실패했습니다.", error);
				}
			};

			setIsLogin(true);
			fetchUserInfo();
		} else {
			setIsLogin(false);
		}
	}, [accessToken, userUuid]);

	const openNotification = () => {
		if (!accessToken) {
			alert("로그인 후 이용해주세요");
			navigate("/login");
			return;
		}

		setShowNotifications(true);
	};

	return (
		<div className="profile-header">
			{isLogin ? (
				<div className="user-info-container">
					<img
						src={userInfo.img || DefaultProfile}
						alt="Profile"
						className="profile-pic"
					/>
					<div className="user-info">
						<p className="user-name"> {userInfo.nickname} 님</p>
					</div>
					<div className="notification">
						<span className="notification-dot">
							<BellSimple
								onClick={openNotification}
								size={24}
							/>
						</span>
						<Notification
							isOpen={showNotifications}
							onClose={() => setShowNotifications(false)}
						/>
					</div>
				</div>
			) : (
				<div className="login-tab">
					<div className="login-info">
						<UserCircle
							className="login-profile"
							size={24}
							weight="fill"
						/>
						<h3 onClick={() => navigate("/login")}>로그인해주세요</h3>
					</div>
				</div>
			)}
		</div>
	);
}
