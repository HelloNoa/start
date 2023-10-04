'use client';
import styles from './page.module.css'
import {useEffect, useState} from "react";

export default function Home() {
    const [list, setList] = useState<any[]>([]);
    useEffect(()=>{
        (async ()=>{
            await fetch("https://list-dyvsvnnkwq-uc.a.run.app/")
                .then(e=>e.json()).then(e=>{
                    console.log(e.data);
                    setList(e.data as any[]);
                });
        })();
    },[])
    return (
        <main className={styles.main}>
            <ul>
                {list.map(e => {
                    return <li key={e.key}><a href={`/detail/${e.key}`}>{e.title}</a></li>
                })}
            </ul>
            <a href={"/editor"}>글쓰기</a>
        </main>
    )
}
