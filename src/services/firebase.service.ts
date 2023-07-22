// import * as firebase from "firebase"
import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/messaging";
import "firebase/compat/database";
import { store } from "../store";
import { getOrders } from "../store/orderSlice";
import { IOrderListItem, UserEnum, orderStatusEnum } from "./types";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const listenForOrders = (userId: string, role: UserEnum) => {
  const orderRef = db.ref("order");
  const listener = orderRef.on("value", (snapshot) => {
    const allOrders: IOrderListItem[] = [];
    snapshot.forEach((childSnapshot) => {
      allOrders.push(childSnapshot.val());
    });
    if (role === UserEnum.AGENT) {
      const activeOrders = allOrders.filter((order) => order.agentId === userId && order.status === orderStatusEnum.IN_PROGRESS);
      const openOrders = allOrders.filter((order) => order.status === orderStatusEnum.CREATED);
      const closedOrders = allOrders.filter((order) => order.agentId === userId && order.status === orderStatusEnum.COMPLETED);
      store.dispatch(
        getOrders({
          activeOrders,
          openOrders,
          closedOrders,
        })
      );
    } else {
      const activeOrders = allOrders.filter((order) => order.shopId === userId && order.status === orderStatusEnum.IN_PROGRESS);
      const openOrders = allOrders.filter((order) => order.shopId === userId && order.status === orderStatusEnum.CREATED);
      const closedOrders = allOrders.filter((order) => order.shopId === userId && order.status === orderStatusEnum.COMPLETED);
      store.dispatch(
        getOrders({
          activeOrders,
          openOrders,
          closedOrders,
        })
      );
    }
  });
  return () => {
    orderRef.off("value", listener);
  };
};

// const listenForMessages = (ticketRef: string) => {
//   const ticketMessageRef = db.ref(`ticket/${ticketRef}/messages`);
//   ticketMessageRef.on("value", (snapshot) => {
//     const allMessages: any[] = [];
//     snapshot.forEach((childSnapshot) => {
//       allMessages.push(childSnapshot.val());
//     });
//     store.dispatch(getMessages(allMessages));
//   });
// };

export const firebaseService = {
  listenForOrders,
};
