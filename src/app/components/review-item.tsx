import { ReviewData } from "../utils/type";
import ReviewItemDeleteBtn from "./review-item-delete";
import style from "./review-item.module.css";

export default function ReviewItem({ id, content, author, createdAt, movieId }: ReviewData) {
    return (
        <div className={style.container}>
            <div className={style.author}>{author}</div>
            <div className={style.content}>{content}</div>
            <div className={style.bottom_container}>
                <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
                <ReviewItemDeleteBtn reviewId={id} movieId={movieId} />
            </div>
        </div>
    );
}
