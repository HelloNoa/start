'use client';
import styles from './page.module.scss'
import {useEffect, useState} from "react";

export default function Home() {
    const startTime = 1696274405648;
    const [list, setList] = useState<any[]>([]);
    const [time, setTime] = useState<string>();
    useEffect(()=>{
        (async ()=>{
            await fetch("https://list-dyvsvnnkwq-uc.a.run.app/", {
                headers: new Headers({
                    'AuthorizationCode': localStorage.getItem("AuthorizationCode") ?? "",
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
                .then(e=>e.json()).then(e=>{
                    console.log(e.data);
                    setList(e.data as any[]);
                });
        })();
        Timer();
    },[]);
    const Timer = ()=>{
        const fixTime = Math.floor((new Date().getTime()-startTime)*0.001)
        setTime(fixTime.toLocaleString());
        setTimeout(Timer,10);
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
