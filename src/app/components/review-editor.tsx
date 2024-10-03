"use client";

import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-reivew-action";
import { useActionState, useEffect } from "react"; // react19^

export default function ReviewEditor({ movieId }: { movieId: string }) {
    const [state, formAction, isPending] = useActionState(createReviewAction, null);

    useEffect(() => {
        if (state && !state.status) {
            alert(state.error);
        }
    }, [state]);
    return (
        <section>
            <form className={style.form_container} action={formAction}>
                <h4>한 줄 리뷰 작성하기</h4>
                <input disabled={isPending} name="movieId" value={movieId} hidden />
                <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
                <div className={style.submit_container}>
                    <input required name="author" placeholder="작성자" />
                    <button disabled={isPending} type="submit">
                        {isPending ? "..." : "작성하기"}
                    </button>
                </div>
            </form>
        </section>
    );
}
