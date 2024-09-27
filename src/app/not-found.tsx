import Link from "next/link";
import style from "./not-found.module.css";

export default function NotFound() {
    return (
        <div className={style.container}>
            <h2>올바르지 않은 주소입니다.</h2>
            <Link href={"/"}>홈으로 돌아가기</Link>
        </div>
    );
}
