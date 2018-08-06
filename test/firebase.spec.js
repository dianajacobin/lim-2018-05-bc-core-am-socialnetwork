import { MockAuthentication, MockFirebase, MockFirestore, MockStorage, MockMessaging, MockFirebaseSdk } from 'firebase-mock';

var mockauth = new MockAuthentication();
var mockdatabase = new MockFirebase();
var mockfirestore = new MockFirestore();
var mockstorage = new MockStorage();
var mockmessaging = new MockMessaging();
var mocksdk = new MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path) => {
    return path ? mockdatabase.child(path) : mockdatabase;
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    return mockauth;
  },
  // use null if your code does not use FIRESTORE
  () => {
    return mockfirestore;
  },
  // use null if your code does not use STORAGE
  () => {
    return mockstorage;
  },
  // use null if your code does not use MESSAGING
  () => {
    return
  };
 
  users.create({
    email: 'ben@example.com',
    password: 'examplePass'
  });
  mocksdk.auth().flush();
  
  mocksdk.auth().getUserByEmail('ben@example.com').then(function(user) {
    console.assert(user, 'ben was created');
  });
