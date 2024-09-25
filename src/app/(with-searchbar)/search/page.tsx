import styles from "./page.module.css";
import { MovieItem } from "@/app/components/movie-Item";
import { MovieData } from "@/app/utils/type";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        q?: string;
    };
}) {
    // 검색을 한 이후 동일한 검색일 경우 다시 불러오지 않게 하기 위해 cache: "force-cache"
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${searchParams.q}`,
        { cache: "force-cache" }
    );
    if (!res.ok) {
        return <div>오류 발생</div>;
    }

    const movies: MovieData[] = await res.json();

    return (
        <div className={styles.container}>
            {movies.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
            ))}
        </div>
    );
}
