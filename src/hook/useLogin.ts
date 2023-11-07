export const useFirstLogin = async (): Promise<boolean> => {
  const headers = new Headers();
  if (typeof window !== 'undefined') {
    headers.append('Authorization', window.localStorage.getItem("Authorization") ?? "");
  }
  return await fetch("https://login-dyvsvnnkwq-uc.a.run.app/", {
    headers
  }).then(e => e.json()).then(e => {
    if (e.msg === "ok") {
      return true;
    } else {
      if (typeof window !== 'undefined') {
        window.location.reload();
        return false;
      }
    }
    return false;
  });
}

export const useLogin = async (): Promise<boolean> => {
  const Authorization = window.localStorage.getItem("Authorization") ?? "EMPTY";
  if (Authorization === "EMPTY") {
    const headers = new Headers();
    if (typeof window !== 'undefined') {
      headers.append('Authorization', window.localStorage.getItem("Authorization") ?? "");
    }
    return await fetch("https://login-dyvsvnnkwq-uc.a.run.app/", {
      headers
    }).then(e => e.json()).then(e => {
      if (e.msg === "ok") {
        return true;
      } else {
        if (typeof window !== 'undefined') {
          window.location.reload();
          return false;
        }
      }
      return false;
    });
  } else {
    return true;
  }
}
