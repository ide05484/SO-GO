import "@/css/search/SearchHotelList.css";
import SearchHotelListItem from "@/components/searchList/SearchHotelListItem";

export default function SearchHotelList({ result }) {
	return (
		<div id="hotel-list">
			<div id="hotel-title">
				<h1>추천 숙소</h1>
				<button>전체 보기</button>
			</div>

			<div className="hotel-content">
				{result.length > 0 ? (
					result.slice(0, 5).map((hotel) => (
						<SearchHotelListItem
							key={hotel.placeUuid}
							thumbnail={hotel.placeImgs}
							name={hotel.placeName}
							address={hotel.address}
							tag={hotel.tag}
						/>
					))
				) : (
					<p>관련 장소가 없습니다.</p>
				)}
			</div>
		</div>
	);
}
