import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { MovieData, ReviewData } from "@/app/utils/type";
import ReviewItem from "@/app/components/review-item";
import ReviewEditor from "@/app/components/review-editor";
import Image from "next/image";
import { Metadata } from "next";

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

async function MovieDetail({ movieId }: { movieId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`, {
        cache: "force-cache",
    });
    if (!res.ok) {
        if (res.status === 404) {
            notFound();
        }
        return <div>오류 발생</div>;
    }

    const movie = await res.json();
    const { title, subTitle, description, company, runtime, posterImgUrl, releaseDate, genres } =
        movie;
    return (
        <div className={styles.container}>
            <div
                className={styles.cover_img_container}
                style={{ backgroundImage: `url('${posterImgUrl}')` }}
            >
                <Image src={posterImgUrl} alt={`영화 ${title}의 표지`} width={234} height={350} />
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

async function ReviewList({ movieId }: { movieId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`, {
        next: { tags: [`review-${movieId}`] },
    });

    if (!res.ok) {
        throw new Error(`Review fetch failed : ${res.statusText}`);
    }

    const reviews: ReviewData[] = await res.json();
    return (
        <section>
            {reviews.map((review) => (
                <ReviewItem key={`review-item-${review.id}`} {...review} />
            ))}
        </section>
    );
}

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`, {
        cache: "force-cache",
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const movie: MovieData = await res.json();
    return {
        title: `${movie.title} - 한입 무비`,
        description: `${movie.description}`,
        openGraph: {
            title: `${movie.title} - 한입 무비`,
            description: `${movie.description}`,
            images: [movie.posterImgUrl],
        },
    };
}

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className={styles.container}>
            <MovieDetail movieId={params.id} />
            <ReviewEditor movieId={params.id} />
            <ReviewList movieId={params.id} />
        </div>
    );
}
