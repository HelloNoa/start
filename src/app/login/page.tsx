'use client';
import styles from '@/app/page.module.scss'
import {useState} from "react";
import {useLogin} from "@/hook/useLogin";
import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [pw, setPW] = useState<string>("");
    return (
        <main className={styles.main}>
            <input onChange={(e) => {
                setPW(e.currentTarget.value);
            }} value={pw}></input>
            <a onClick={async () => {
                localStorage.setItem("Authorization", pw as string);
                await useLogin({
                    ok: () => {
                        alert("환영해요.");
                        router.push('/');
                    }, no: () => {
                        alert("당신의 신원을 먼저 밝히는게 좋겠어요.");
                        router.refresh();
                    }
                });
            }}>인증</a>
        </main>
    )
}
