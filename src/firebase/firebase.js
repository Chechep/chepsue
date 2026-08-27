import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0pBlw1ordJ0mzveQBihhknD9d1Jaxys0",
  authDomain: "thriftyard-1.firebaseapp.com",
  projectId: "thriftyard-1",
  storageBucket: "thriftyard-1.firebasestorage.app",
  messagingSenderId: "563611869667",
  appId: "1:563611869667:web:2bca49ec594cdd753980d6",
  measurementId: "G-RC2TGCRHVE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const analytics = getAnalytics(app);

export default app;