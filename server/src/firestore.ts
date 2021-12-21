// firestore.ts
import  { initializeApp, applicationDefault, cert } from '../node_modules/firebase-admin/lib/app'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'
import { serviceAccount } from './firebase/firebase_api'

//SCORE DATABASE SETUP        
var admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});  

export let db = getFirestore();