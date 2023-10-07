export const useLogin = (async ({ok=()=>{},no=()=>{}}:{ok?:()=>void,no:()=>void}) => {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem("Authorization") ?? "");
    await fetch("https://login-dyvsvnnkwq-uc.a.run.app/", {
        headers
    })
        .then(e => e.text()).then(e => {
            if (e === "ok") {
                ok();
            } else {
                no();
            }
        });
})