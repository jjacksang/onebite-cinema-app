import styles from "./movie-Item.module.css";

import Link from "next/link";
import { MovieData } from "../utils/type";

export const MovieItem = (props: MovieData) => {
    return (
        <Link href={`/movie/${props.id}`} className={styles.container}>
            <img src={props.posterImgUrl} />
        </Link>
    );
};
