'use client';
import styles from './page.module.scss'
import { useEffect, useMemo, useState } from "react";
import { useLogin } from "@/hook/useLogin";

export default function Home() {
  const startTime = 1696274405648;
  const [list, setList] = useState<any[]>([]);
  const [time, setTime] = useState<string>();
  const login = useMemo(() => useLogin, [useLogin]);
  useEffect(() => {
    (async () => {
      if (await login()) {
      } else {
        alert("당신의 신원을 먼저 밝히는게 좋겠어요.");
        if (typeof window !== 'undefined') {
          window.location.replace('/login');
        }
      }
      const headers = new Headers();
      if (typeof window !== 'undefined') {
        headers.append('Authorization', window.localStorage.getItem("Authorization") ?? "");
      }
      await fetch("https://list-dyvsvnnkwq-uc.a.run.app/", {
        headers
      })
        .then(e => e.json()).then(e => {
          if (e.msg === "go away") {
            alert("당신의 신원을 먼저 밝히는게 좋겠어요.");
            if (typeof window !== 'undefined') {
              window.location.replace('/login');
            }
            return false;
          }
          e = e.data;
          setList(e as any[]);
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
      <br/>
      <a href={"/editor"}>글쓰기</a>
      <br/>
      <ul>
        {list.map(e => {
          return <li key={e.key}><a href={`/detail/${e.key}`}>{e.title.trim().length === 0 ? "제목 없음" : e.title}</a></li>
        })}
      </ul>
    </main>
  )
}
