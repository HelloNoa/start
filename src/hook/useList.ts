
const useList = async ()=>{
    return await fetch("https://list-dyvsvnnkwq-uc.a.run.app/", {
        headers: new Headers({
            'AuthorizationCode': window.localStorage.getItem("AuthorizationCode") ?? ""
        })
    })
        .then(e=>e.json()).then(e=>e.data)
};