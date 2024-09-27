import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { MovieData } from "@/app/utils/type";
import { delay } from "@/app/utils/delay";

export const dynamicParams = false;

// movie데이터를 미리 패칭하여 movie/[id]로 접근 시 미리 준비해둔 데이터를 반환
export async function generateStaticParams() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`);

        if (!res.ok) {
            throw new Error("오류 발생");
        }

        const movies: MovieData[] = await res.json();

        return movies.map(({ id }) => ({ id: id.toString() }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function Page({ params }: { params: { id: string | string[] } }) {
    await delay(7000);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`, {
        cache: "force-cache",
    });
    if (!res.ok) {
        if (res.status === 404) {
            notFound();
        }
        return <div>오류 발생</div>;
    }

    const movie = await res.json();
    const {
        id,
        title,
        subTitle,
        description,
        company,
        runtime,
        posterImgUrl,
        releaseDate,
        genres,
    } = movie;
    return (
        <div className={styles.container}>
            <div
                className={styles.cover_img_container}
                style={{ backgroundImage: `url('${posterImgUrl}')` }}
            >
                <img src={posterImgUrl} />
            </div>
            <div className={styles.info_container}>
                <h3>{title}</h3>
                <div>
                    {releaseDate} / {genres.join(", ")} / {runtime} 분
                </div>
                <div>{company}</div>
            </div>

            <div className={styles.subTitle}>{subTitle}</div>
            <div className={styles.description}>{description}</div>
        </div>
    );
}
