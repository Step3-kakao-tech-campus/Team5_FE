import FavoriteListHeader from "../components/favorite/FavoriteListHeader";
import FavoriteListTemplate from "../components/favorite/FavoriteListTemplate";

const FavoriteListPage = () => {
  return (
    <div className="flex w-full h-full flex-col">
      <FavoriteListHeader />
      <FavoriteListTemplate />
    </div>
  );
};

export default FavoriteListPage;
