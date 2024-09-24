"use client";

import styles from "./page.module.css";
import { MovieItem } from "../components/movie-Item";
import dummy from "../dummy.json";

export default function Home() {
    const mockData = dummy;

    return (
        <div className={styles.container}>
            <section>
                <h3>지금 가장 추천하는 영화</h3>
                <div className={styles.reco_container}>
                    {mockData.slice(0, 3).map((movie) => (
                        <MovieItem key={`reco-${movie.id}`} {...movie} />
                    ))}
                </div>
                <div>
                    <h3>등록된 모든 영화</h3>
                    <div className={styles.all_container}>
                        {mockData.map((movie) => (
                            <MovieItem key={`all-${movie.id}`} {...movie} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
