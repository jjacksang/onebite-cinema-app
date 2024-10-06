import styles from "./movie-Item.module.css";

import Link from "next/link";
import { MovieData } from "../utils/type";
import Image from "next/image";

interface MovieItemProps extends MovieData {
    height?: number;
}

export const MovieItem = (props: MovieItemProps) => {
    return (
        <Link href={`/movie/${props.id}`} className={styles.container}>
            <Image
                src={props.posterImgUrl}
                alt={`영화 ${props.title}의 표지 이미지`}
                width={258}
                height={props.height}
            />
        </Link>
    );
};
