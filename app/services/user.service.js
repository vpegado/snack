import firebase from 'firebase';


function UserService ($firebaseAuth) {
  'ngInject';
  const auth = firebase.auth();
  const db = firebase.firestore();
  const $auth = $firebaseAuth();
  var user = {};
  var pending = true;

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);      
    }
    pending = false;
  });

  const signIn = () => {
    return $auth.$signInWithPopup('google')
      .then(({user}) => {
        setUser(user);
      })
      .catch(() => {
        setUser({});
      });
  };

  const signOut = () => {
    $auth.$signOut();
    setUser({});
  };

  const setUser = ({
    uid = null,
    email = null,
    photoURL = null,
    displayName = null
  }) => {
    Object.assign(user, {
      uid,
      email,
      photoURL,
      displayName
    });
    if (uid) {
      db.collection('users').doc(uid).set({
        email,
        photoURL,
        displayName
      });
    }
  };

  return {
    pending,
    user,
    signIn,
    signOut
  };

}

export { UserService };