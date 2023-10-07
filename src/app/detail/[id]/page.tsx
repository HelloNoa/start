"use client";
import styles from './page.module.scss'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {ConfirmModal} from "@/component/modal/confirmModal";
import {useLogin} from "@/hook/useLogin";

export default function Detail({params}: { params: { slug: string, id: string } }) {
    const [isopen, setIsopen] = useState<boolean>(false);
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [rain, setRain] = useState<string>("");
    const [walk, setWalk] = useState<string>("");
    useEffect(() => {
        const data = (async () => {
            await useLogin({no: () => {
                    alert("당신의 신원을 먼저 밝히는게 좋겠어요.");
                    router.replace('/login');
                }
            });
            await fetch(`https://detail-dyvsvnnkwq-uc.a.run.app/?id=${params.id}`, {
                headers: new Headers({
                    'AuthorizationCode': localStorage.getItem("AuthorizationCode") ?? ""
                })
            }).then(e => e.json()).then(e => {
                e = e.data;
                setTitle(e.title);
                setText(e.text);
                setComment(e.comment);
                setRain(e.rain);
                setWalk(e.walk);
            });
        })()
    }, []);

    return (
        <div className={styles.detail}>
            <section className={styles.left}>
                <div className={styles.up}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
                <div className={styles.down}>
                    <h3>소재</h3>
                    <p>{comment}</p>
                </div>
            </section>
            <section className={styles.right}>
                <div>
                    <h3>원단</h3>
                    <p>{rain}</p>
                </div>
                <div>
                    <h3>부자재</h3>
                    <p>{walk}</p>
                </div>
                <div>
                    <a href="/">뒤로가기</a>
                    <br/>
                    <br/>
                    <a href={`/editor/${params.id}`}>수정</a>
                    <br/>
                    <br/>
                    <a onClick={async () => {
                        setIsopen(true);

                    }}>삭제</a>
                </div>
            </section>
            {isopen && <ConfirmModal ok={async () => {
                const data = await fetch(`https://deleteItem-dyvsvnnkwq-uc.a.run.app?id=${params.id}`, {
                    headers: new Headers({
                        'AuthorizationCode': localStorage.getItem("AuthorizationCode") ?? ""
                    })
                });
                if (data) {
                    router.back();
                }
                setIsopen(false);
            }} no={() => {
                setIsopen(false);
            }}/>}

        </div>
    )
}

