import movies from "@/app/dummy.json";
import styles from "./page.module.css";
import { MovieItem } from "@/app/components/movie-Item";

export default function Page({
    searchParams,
}: {
    searchParams: {
        q?: string;
    };
}) {
    return (
        <div className={styles.container}>
            {movies.map((movie) => (
                <MovieItem key={movie.id} {...movie} />
            ))}
        </div>
    );
}
