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
describe((email, password) => {
    

})

  };$('.tabs .tab').click(function() {
  if ($(this).hasClass('signin')) {
    $('.tabs .tab').removeClass('active');
    $(this).addClass('active');
    $('.info').hide();
    $('.signin-info').show();
  }
  if ($(this).hasClass('signup')) {
    $('.tabs .tab').removeClass('active');
    $(this).addClass('active');
    $('.info').hide();
    $('.signup-info').show();
  }
});
