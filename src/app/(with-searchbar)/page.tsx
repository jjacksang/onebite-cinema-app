import styles from "./page.module.css";
import { MovieItem } from "../components/movie-Item";
import { MovieData } from "../utils/type";
import { Suspense } from "react";
import MovieListSkeleton from "../components/skeleton/movie-list-skeleton";
import { Metadata } from "next";

// 변화가 수시로 있을 경우가 있기에 next: { revaildate: 3 } => 3초 마다 갱신
async function RecoMovies() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`, {
        next: { revalidate: 3 },
    });
    if (!res.ok) {
        return <div>오류 발생</div>;
    }

    const recoMovies: MovieData[] = await res.json();

    return (
        <>
            {recoMovies.slice(0, 3).map((movie) => (
                <MovieItem key={`reco-${movie.id}`} {...movie} height={392} />
            ))}
        </>
    );
}

// 변화가 거의 없을 데이터임으로 cache: "force-cache"
async function AllMovies() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`, {
        cache: "force-cache",
    });
    if (!res.ok) {
        return <div>오류 발생</div>;
    }

    const allMovies: MovieData[] = await res.json();

    return (
        <>
            {allMovies.map((movie) => (
                <MovieItem key={`all-${movie.id}`} {...movie} height={258} />
            ))}
        </>
    );
}

export const metadata: Metadata = {
    title: "한입 무비",
    description: "한입 무비에 오신걸 환영합니다.",
    openGraph: {
        title: "한입 무비",
        description: "한입 무비에 오신걸 환영합니다.",
        images: ["/thumbnail.png"],
    },
};

export default function Home() {
    return (
        <div className={styles.container}>
            <section>
                <h3>지금 가장 추천하는 영화</h3>
                <div className={styles.reco_container}>
                    <Suspense fallback={<MovieListSkeleton count={3} />}>
                        <RecoMovies />
                    </Suspense>
                </div>
            </section>
            <section>
                <h3>등록된 모든 영화</h3>
                <div className={styles.all_container}>
                    <Suspense fallback={<MovieListSkeleton count={10} />}>
                        <AllMovies />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}
