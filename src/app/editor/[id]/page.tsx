"use client";
import styles from './page.module.scss'
import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import {useLogin} from "@/hook/useLogin";

export default function Detail({params}: { params: { slug: string, id: string } }) {
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [rain, setRain] = useState<string>("");
    const [walk, setWalk] = useState<string>("");
    const login = useMemo(() => useLogin, [useLogin]);
    useEffect(() => {
        const data = (async () => {
            if (await login) {

            } else {
                alert("당신의 신원을 먼저 밝히는게 좋겠어요.");
                router.replace('/login');
            }
            const headers = new Headers();
            if (typeof window !== 'undefined') {
                headers.append('Authorization', window.localStorage.getItem("Authorization") ?? "");
            }
            await fetch(`https://detail-dyvsvnnkwq-uc.a.run.app/?id=${params.id}`, {
                headers
            })
                .then(e => e.json()).then(e => {
                    e = e.data;
                    setTitle(e.title);
                    setText(e.text);
                    setComment(e.comment);
                    setRain(e.rain);
                    setWalk(e.walk);
                });
        })()
    }, []);
    const setBackup = (str: string, contents: string) => {
        switch (str) {
            case "title":
                setTitle(contents)
                break;
            case "text":
                setText(contents);
                break;
            case "comment":
                setComment(contents);
                break;
            case "rain":
                setRain(contents);
                break;
            case "walk":
                setWalk(contents);
                break;
        }
    }
    return (
        <div className={styles.detail}>
            <section className={styles.left}>
                <div className={styles.up}>
                    <h3><textarea onChange={(e) => setBackup("title", e.currentTarget.value)} value={title}></textarea>
                    </h3>
                    <textarea onChange={(e) => setBackup("text", e.currentTarget.value)} value={text}></textarea>
                </div>
                <div className={styles.down}>
                    <h3>소재</h3>
                    <textarea
                        onChange={(e) => setBackup("comment", e.currentTarget.value)} value={comment}
                    ></textarea>
                </div>
            </section>
            <section className={styles.right}>
                <div>
                    <h3>원단</h3>
                    <textarea
                        onChange={(e) => setBackup("rain", e.currentTarget.value)} value={rain}
                    ></textarea>
                </div>
                <div>
                    <h3>부자재</h3>
                    <textarea
                        onChange={(e) => setBackup("walk", e.currentTarget.value)} value={walk}
                    ></textarea>
                </div>
                <div>
                    <a href="/">취소</a>
                    <br/>
                    <br/>
                    <a onClick={async () => {
                        const data = {
                            key: params.id,
                            text,
                            comment,
                            rain,
                            walk,
                        };
                        const headers = new Headers();
                        if (typeof window !== 'undefined') {
                            headers.append('Authorization', window.localStorage.getItem("Authorization") ?? "");
                            headers.append('Content-Type', 'application/json');
                        }
                        const body = JSON.stringify({
                            key: params.id,
                            title: title ?? " ",
                            text: text ?? " ",
                            comment: comment ?? " ",
                            rain: rain ?? " ",
                            walk: walk ?? " "
                        });
                        await fetch(`https://modify-dyvsvnnkwq-uc.a.run.app`, {
                            method: 'POST',
                            headers,
                            body
                        })
                            .then(e => e.text()).then(e => {
                                if(e==='ok'){
                                    router.refresh();
                                }
                            })
                        router.back();
                    }}>수정완료</a>
                </div>
            </section>
        </div>
    )
}
