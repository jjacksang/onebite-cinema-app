"use server";

import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
    const movieId = formData.get("movieId")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    console.log(movieId, content, author);

    if (!movieId || !content || !author)
        return {
            status: false,
            error: "리뷰 내용과 작성자를 입력하세요",
        };

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
            method: "POST",
            body: JSON.stringify({ movieId, content, author }),
        });
        console.log(res.status);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        revalidateTag(`review-${movieId}`);
        return {
            status: true,
            error: "",
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            error: `리뷰 작성에 실패하였습니다 : ${error}`,
        };
    }
}
