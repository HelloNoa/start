'use client';
import styles from './page.module.scss'
import {useEffect, useMemo, useState} from "react";
import {useLogin} from "@/hook/useLogin";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    const startTime = 1696274405648;
    const [list, setList] = useState<any[]>([]);
    const [time, setTime] = useState<string>();
    const login = useMemo(()=>useLogin,[useLogin]);
    useEffect(() => {
        (async () => {
            if (await login) {
            } else {
                alert("당신의 신원을 먼저 밝히는게 좋겠어요.");
                router.replace('/login');
            }
            const headers = new Headers();
            if (typeof window !== 'undefined') {
                headers.append('Authorization', window.localStorage.getItem("Authorization") ?? "");
            }
            await fetch("https://list-dyvsvnnkwq-uc.a.run.app/", {
                headers
            })
                .then(e => e.json()).then(e => {
                    console.log(e.data);
                    setList(e.data as any[]);
                });
        })();
        Timer();
    }, []);
    const Timer = () => {
        const fixTime = Math.floor((new Date().getTime() - startTime) * 0.001)
        setTime(fixTime.toLocaleString());
        setTimeout(Timer, 10);
    }
    return (
        <main className={styles.main}>
            <h1>{time}</h1>
            <ul>
                {list.map(e => {
                    return <li key={e.key}><a href={`/detail/${e.key}`}>{e.title}</a></li>
                })}
            </ul>
            <a href={"/editor"}>글쓰기</a>
        </main>
    )
}
