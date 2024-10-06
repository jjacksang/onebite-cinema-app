import styles from "./page.module.css";
import { MovieItem } from "@/app/components/movie-Item";
import { delay } from "@/app/utils/delay";
import { MovieData } from "@/app/utils/type";
import { Suspense } from "react";
import MovieListSkeleton from "@/app/components/skeleton/movie-list-skeleton";
import { Metadata } from "next";

async function SearhResult({ q }: { q: string }) {
    // 검색을 한 이후 동일한 검색일 경우 다시 불러오지 않게 하기 위해 cache: "force-cache"
    await delay(1500);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`, {
        cache: "force-cache",
    });
    if (!res.ok) {
        return <div>오류 발생</div>;
    }

    const movies: MovieData[] = await res.json();

    return movies.map((movie) => <MovieItem key={movie.id} {...movie} height={392} />);
}

type Props = {
    searchParams: {
        q?: string;
    };
};

export function generateMetadata({ searchParams }: Props): Metadata {
    return {
        title: `${searchParams.q} : 한입 무비 검색`,
        description: `${searchParams.q} 검색 결과입니다.`,
        openGraph: {
            title: `${searchParams.q} : 한입 무비 검색`,
            description: `${searchParams.q} 검색 결과입니다.`,
            images: ["/thumbnail.png"],
        },
    };
}

export default function Page({ searchParams }: Props) {
    return (
        <div className={styles.container}>
            <Suspense key={searchParams.q || ""} fallback={<MovieListSkeleton count={15} />}>
                <SearhResult q={searchParams.q || ""} />
            </Suspense>
        </div>
    );
}
