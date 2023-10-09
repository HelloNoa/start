'use client';
import styles from './page.module.scss'
import {useMemo, useState} from "react";
import {useLogin} from "@/hook/useLogin";
import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [pw, setPW] = useState<string>("");
    const login = useMemo(() => useLogin, [useLogin]);
    return (
        <main className={styles.main}>
            <input onChange={(e) => {
                setPW(e.currentTarget.value);
            }} value={pw}></input>
            <a onClick={async () => {
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem("Authorization", pw as string);
                }
                if (await login) {
                    alert("환영해요.");
                    router.push('/');
                } else {
                    alert("당신의 신원을 먼저 밝히는게 좋겠어요.");
                    router.refresh();
                }
            }}>인증</a>
        </main>
    )
}
