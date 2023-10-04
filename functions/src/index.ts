/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import admin from "firebase-admin";

admin.initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
// export const list = onRequest(async (req, res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     // document set
//     await admin
//         .firestore()
//         .collection("list")
//         .doc("document이름")
//         .set({
//             url: req.body.url,
//             name: req.body.name,
//             createdAt: Date.now(),
//         });
//
// });
type item = {
    key: string;
    text: string;
    comment: string;
    rain: string;
    walk: string;
}
export const deleteItem = onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    logger.info("Hello delete!", {structuredData: true});
    const id = req.query.id as string;
    const data = await admin
        .firestore()
        .collection("list")
        .doc(id ?? "")
        .delete();
    res.json(data);
});
export const create = onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    logger.info("Hello create!", {structuredData: true});
    const query: item = req.query as item;
    const data = await admin
        .firestore()
        .collection("list")
        .doc(query.key ?? "")
        .set(query);
    res.json(data);
});
export const modify = onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    logger.info("Hello modify!", {structuredData: true});
    const query: item = req.query as item;
    const data = await admin
        .firestore()
        .collection("list")
        .doc(query.key ?? "")
        .set(query);
    res.json(data);
});
export const detail = onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    logger.info("Hello detail!", {structuredData: true});
    const id = req.query.id as string ?? "0";
    const data = await admin
        .firestore()
        .collection("list")
        .doc(id)
        .get().then((snap) => {
            return snap.data() as item;
        });
    res.json({
        data,
    });
});
export const list = onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    logger.info("Hello list!", {structuredData: true});
    let length = 0;
    const data: { key: string, title: string }[] = [];
    await admin
        .firestore()
        .collection("list")
        .get().then((snap) => {
            length = snap.size;
            snap.forEach((doc) => {
                // 특정 필드의 값 가져오기
                data.push({
                    key: doc.data().key,
                    title: doc.data().title,
                });
            });
        });
    res.json({
        length,
        data,
    });
});

export const helloWorld = onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});
