import { ReactNode } from "react";
import ".//globals.css";
import style from "./layout.module.css";
import Link from "next/link";

export default function RootLayout({
    children,
    modal,
}: Readonly<{ children: ReactNode; modal: ReactNode }>) {
    return (
        <html lang="ko">
            <body>
                <div className={style.container}>
                    <header>
                        <Link href={"/"}>ONEBITE CINEMA</Link>
                    </header>
                    <main>{children}</main>
                </div>
                {modal}
                <div id="modal-root"></div>
            </body>
        </html>
    );
}
