// import * as firebase from "firebase"
import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/messaging";
import "firebase/compat/database";
import { store } from "../store";
import { getOrders } from "../store/orderSlice";
import { IOrderListItem, IResponse, IUser, UserEnum, orderStatusEnum } from "./types";
import {
  BASE_URL,
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@env";
import https from "../utils/https";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  appId: FIREBASE_APP_ID,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
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
    // allOrders.sort((a, b) => (new Date(a.deliveryPeriod).getTime() < new Date(b.deliveryPeriod).getTime() ? -1 : 1));
    const sortedOrders = allOrders.slice().sort((a, b) => new Date(a.deliveryPeriod).getTime() - new Date(b.deliveryPeriod).getTime());
    if (role === UserEnum.AGENT) {
      const activeOrders = sortedOrders.filter((order) => order.agentId === userId && order.status === orderStatusEnum.IN_PROGRESS);
      const openOrders = sortedOrders.filter((order) => order.status === orderStatusEnum.CREATED);
      const closedOrders = sortedOrders.filter((order) => order.agentId === userId && order.status === orderStatusEnum.COMPLETED);
      store.dispatch(
        getOrders({
          activeOrders,
          openOrders,
          closedOrders,
        })
      );
    } else {
      const activeOrders = sortedOrders.filter((order) => order.shopId === userId && order.status === orderStatusEnum.IN_PROGRESS);
      const openOrders = sortedOrders.filter((order) => order.shopId === userId && order.status === orderStatusEnum.CREATED);
      const closedOrders = sortedOrders.filter((order) => order.shopId === userId && order.status === orderStatusEnum.COMPLETED);
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

const updateShopToken = async (payload: { shopId: string; firebaseToken: string }): Promise<IResponse<IUser>> =>
  https.post({
    url: `${BASE_URL}/shop/update-notification-token/${payload.shopId}`,
    body: JSON.stringify(payload),
  });

const updateAgentToken = async (payload: { agentId: string; firebaseToken: string }): Promise<IResponse<IUser>> =>
  https.post({
    url: `${BASE_URL}/user/update-notification-token/${payload.agentId}`,
    body: JSON.stringify(payload),
  });

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
  updateAgentToken,
  updateShopToken,
};
