import styles from "./page.module.css";
import { MovieItem } from "../components/movie-Item";
import { MovieData } from "../utils/type";

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
                <MovieItem key={`all-${movie.id}`} {...movie} />
            ))}
        </>
    );
}

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
                <MovieItem key={`reco-${movie.id}`} {...movie} />
            ))}
        </>
    );
}

export default async function Home() {
    return (
        <div className={styles.container}>
            <section>
                <h3>지금 가장 추천하는 영화</h3>
                <div className={styles.reco_container}>
                    <RecoMovies />
                </div>

                <h3>등록된 모든 영화</h3>
                <div className={styles.all_container}>
                    <AllMovies />
                </div>
            </section>
        </div>
    );
}
