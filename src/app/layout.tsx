import { ReactNode } from "react";
import ".//globals.css";
import style from "./layout.module.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ko">
            <body>
                <div className={style.container}>
                    <header>
                        <Link href={"/"}>ONEBITE CINEMA</Link>
                    </header>
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
