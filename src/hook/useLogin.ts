export const useLogin = async (): Promise<boolean> => {
  const Authorization = window.localStorage.getItem("Authorization") ?? "EMPTY";
  if (Authorization === "EMPTY") {
    const headers = new Headers();
    if (typeof window !== 'undefined') {
      headers.append('Authorization', window.localStorage.getItem("Authorization") ?? "");
    }
    return await fetch("https://login-dyvsvnnkwq-uc.a.run.app/", {
      headers
    }).then(e => e.text()).then(e => {
      return e === "ok";
    });
  } else {
    return true;
  }
}
