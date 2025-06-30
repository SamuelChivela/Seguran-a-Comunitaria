// Substitua com suas credenciais do Firebase
const firebaseConfig = {
apiKey: "AIzaSyCVrzhm8T1DpUt5d-Y03EA-CXDXgws8Ky8",
  authDomain: "segurancacomunitaria-4cb2d.firebaseapp.com",
  databaseURL: "https://segurancacomunitaria-4cb2d-default-rtdb.firebaseio.com",
  projectId: "segurancacomunitaria-4cb2d",
  storageBucket: "segurancacomunitaria-4cb2d.firebasestorage.app",
  messagingSenderId: "651720149230",
  appId: "1:651720149230:web:71395ba1ae59027c0a4bff",
  measurementId: "G-S090HNQ6Z1"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();
  