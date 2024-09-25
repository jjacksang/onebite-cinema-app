import styles from "./page.module.css";

export default async function Page({ params }: { params: { id: string | string[] } }) {
    console.log(params.id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`);
    if (!res.ok) {
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
