"use client";
import styles from './page.module.scss'
import {useEffect, useState} from "react";

export default function Detail() {
    const [text,setText] = useState<string>("");
    const [comment,setComment] = useState<string>("");
    const [rain,setRain] = useState<string>("");
    const [walk,setWalk] = useState<string>("");
    useEffect(() => {
        const text = window.localStorage.getItem("text") as string ?? "";
        const comment = window.localStorage.getItem("comment") as string ?? "";
        const rain = window.localStorage.getItem("rain") as string ?? "";
        const walk = window.localStorage.getItem("walk") as string ?? "";
        setText(text);
        setComment(comment);
        setRain(rain);
        setWalk(walk);
    }, []);
    const setBackup = (str:string,contents:string)=>{
        window.localStorage.setItem(str,contents);
        switch (str){
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
                    <h3>작업 지시서</h3>
                    <textarea onChange={(e)=>setBackup("text",e.currentTarget.value)} value={text}></textarea>
                </div>
                <div className={styles.down}>
                    <h3>소재</h3>
                    <textarea
                        onChange={(e)=>setBackup("comment",e.currentTarget.value)} value={comment}
                    ></textarea>
                </div>
            </section>
            <section className={styles.right}>
                <div>
                    <h3>원단</h3>
                    <textarea
                        onChange={(e)=>setBackup("rain",e.currentTarget.value)} value={rain}
                    ></textarea>
                </div>
                <div>
                    <h3>부자재</h3>
                    <textarea
                        onChange={(e)=>setBackup("walk",e.currentTarget.value)} value={walk}
                    ></textarea>
                </div>
                <div>
                    <a href="">뒤로가기</a>
                    <a href="">저장</a>
                </div>
            </section>
        </div>
    )
}
