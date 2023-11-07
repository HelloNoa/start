import { useRouter } from "next/navigation";

const useList = async () => {
  const router = useRouter();
  return await fetch("https://list-dyvsvnnkwq-uc.a.run.app/", {
    headers: new Headers({
      'AuthorizationCode': window.localStorage.getItem("AuthorizationCode") ?? ""
    })
  })
    .then(e => e.json()).then(e => {
      console.log(e);
      if (e.msg === "go away") {
        alert("당신의 신원을 먼저 밝히는게 좋겠어요...");
        router.replace('/login');
      }
      e = e.data;
      return e
    })
};