"use client";
import styles from './page.module.scss'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Detail({params}: { params: { slug: string, id: string } }) {
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [rain, setRain] = useState<string>("");
    const [walk, setWalk] = useState<string>("");
    useEffect(() => {
        const data = (async () => {
            await fetch(`https://detail-dyvsvnnkwq-uc.a.run.app/?id=${params.id}`, {
                headers: new Headers({
                    'AuthorizationCode': localStorage.getItem("AuthorizationCode") ?? ""
                })
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
                    <h3><textarea onChange={(e) => setBackup("title", e.currentTarget.value)} value={title}></textarea></h3>
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
                        await fetch(`https://modify-dyvsvnnkwq-uc.a.run.app?key=${params.id}&title=${title}&text=${text}&comment=${comment}&rain=${rain}&walk=${walk}`, {
                            headers: new Headers({
                                'AuthorizationCode': localStorage.getItem("AuthorizationCode") ?? ""
                            })
                        })
                            .then(e => e.json()).then(e => {
                            console.log(e)
                        })
                        router.back();
                    }}>수정완료</a>
                </div>
            </section>
        </div>
    )
}
