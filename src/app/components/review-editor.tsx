import style from "./review-editor.module.css";

import { createReviewAction } from "@/actions/create-reivew-action";

export default function ReviewEditor({ movieId }: { movieId: string }) {
    return (
        <section>
            <form className={style.form_container} action={createReviewAction}>
                <h4>한 줄 리뷰 작성하기</h4>
                <input name="movieId" value={movieId} hidden />
                <textarea required name="content" placeholder="리뷰 내용" />
                <div className={style.submit_container}>
                    <input required name="author" placeholder="작성자" />
                    <button type="submit">작성하기</button>
                </div>
            </form>
        </section>
    );
}
