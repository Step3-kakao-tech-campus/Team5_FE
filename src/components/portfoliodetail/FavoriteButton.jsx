import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../../apis/favorite";
import { ReactComponent as HeartOutlinedIcon } from "../../assets/heart-03.svg";
import { ReactComponent as HeartIcon } from "../../assets/heart-04.svg";
import { openLoginBottomSheet } from "../../utils/handleBottomSheet";
import Button from "../common/atoms/Button";

export default function FavoriteButton({ isLiked }) {
  const { isLogged } = useSelector((state) => state.user);
  const { mutate: addFavoriteMutate } = useMutation(addFavorite);
  const { mutate: deleteFavoriteMutate } = useMutation(deleteFavorite);
  const { id } = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddFavorite = () => {
    if (!isLogged) {
      openLoginBottomSheet(dispatch);
      return;
    }
    if (isLiked) return;
    setIsSubmitting(true);
    addFavoriteMutate(
      { portfolioId: parseInt(id, 10) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(`portfolio/${id}`);
          setIsSubmitting(false);
        },
        onError: (error) => {
          console.log(error);
          setIsSubmitting(false);
        },
      },
    );
  };

  const handleDeleteFavorite = () => {
    setIsSubmitting(true);
    deleteFavoriteMutate(
      { portfolioId: parseInt(id, 10) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(`portfolio/${id}`);
          setIsSubmitting(false);
        },
        onError: (error) => {
          console.log(error);
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <Button
      className="w-fit flex items-center gap-1"
      onClick={isLogged && isLiked ? handleDeleteFavorite : handleAddFavorite}
      disabled={isSubmitting}
    >
      {isLogged && isLiked ? (
        <HeartOutlinedIcon className="w-[20px] h-[20px] object-cover" />
      ) : (
        <HeartIcon className="w-[20px] h-[20px] object-cover" />
      )}
      <span className="font-bold">찜하기</span>
    </Button>
  );
}
