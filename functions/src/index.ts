/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import admin from "firebase-admin";

admin.initializeApp();
const lazyGlobal = (async () => await admin
  .firestore()
  .collection("pw")
  .doc("nAa4B6aL7aYArFK2tcG2")
  .get().then((snap) => {
    return snap.data()?.key as any ?? "0";
  }))();

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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if ((await lazyGlobal) !== req.headers.authorization) {
    res.status(201).json({ msg: "go away" });
  }
  logger.info("Hello delete!", { structuredData: true });
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  logger.info("Hello create!", { structuredData: true });
  if ((await lazyGlobal) !== req.headers.authorization) {
    res.status(201).json({ msg: "go away" });
  } else {
    const query: item = req.body as item;
    if (!query.key) {
      res.json({ msg: "no" });
    } else {
      await admin
        .firestore()
        .collection("list")
        .doc(query.key)
        .set(query);
      res.json({ msg: "ok" });
    }
  }
});
export const modify = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  logger.info("Hello modify!", { structuredData: true });
  if ((await lazyGlobal) !== req.headers.authorization) {
    res.status(201).json({ msg: "go away" });
  } else {
    const query: item = req.body as item;
    if (!query.key) {
      res.json({ msg: "no" });
    } else {
      await admin
        .firestore()
        .collection("list")
        .doc(query.key)
        .set(query);
      res.json({ msg: "ok" });
    }
  }
});
export const detail = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if ((await lazyGlobal) !== req.headers.authorization) {
    res.status(201).json({ msg: "go away" });
  }
  logger.info("Hello detail!", { structuredData: true });
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if ((await lazyGlobal) !== req.headers.authorization) {
    res.status(201).json({ msg: "go away" });
  }
  logger.info("Hello list!", { structuredData: true });
  let length = 0;
  // const data: { key: string, title: string }[] = [];
  const data: any[] = [];
  await admin
    .firestore()
    .collection("list")
    .get().then((snap) => {
      length = snap.size;

      // length = snap.size;
      // return snap.data() as item;
      snap.forEach((doc) => {
        // 특정 필드의 값 가져오기
        // data.unshift({
        //   key: doc.data().key,
        //   title: doc.data().title,
        // });
        data.unshift({
          key: doc.data().key,
          title: doc.data().title,
          text: doc.data().text,
          comment: doc.data().comment,
          rain: doc.data().rain,
          walk: doc.data().walk,
        });

        return data;
      });
    });
  res.json({
    length,
    data,
  });
});

export const login = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if ((await lazyGlobal) !== req.headers.authorization) {
    res.status(201).json({ msg: "go away" });
  }
  res.json({ msg: "ok" });
  logger.info("Hello logins!", { structuredData: true });
});
export const helloWorld = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  logger.info("Hello logs!", { structuredData: true });
  response.json({ msg: "Hello from Firebase!" });
});
