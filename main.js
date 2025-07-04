let uid;

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      uid = result.user.uid;

      document.getElementById("dashboard").style.display = "block";
      document.getElementById("welcome").innerText = `Welcome, ${result.user.displayName}`;

      db.ref("users/" + uid).once("value", (snap) => {
        if (!snap.exists()) {
          db.ref("users/" + uid).set({
            rate: 0.008,
            balance: 0,
            lastMine: 0,
            ref: uid,
          });
        }
      });

      db.ref("users/" + uid).on("value", (snap) => {
        const data = snap.val();
        document.getElementById("rate").innerText = data.rate.toFixed(3);
        document.getElementById("balance").innerText = data.balance.toFixed(2);
        document.getElementById("refLink").innerText = `${window.location.origin}?ref=${uid}`;
      });
    })
    .catch((error) => {
      alert("Login Failed: " + error.message);
    });
}

function mine() {
  let now = Date.now();
  db.ref("users/" + uid).once("value", (snap) => {
    let data = snap.val();
    if (now - data.lastMine >= 3600000) { // 1 hour = 3600000 ms
      let newBal = data.balance + data.rate;
      db.ref("users/" + uid).update({
        balance: newBal,
        lastMine: now
      });
      document.getElementById("balance").innerText = newBal.toFixed(2);
      alert("Mined " + data.rate + " Luck Coins!");
    } else {
      let wait = Math.ceil((3600000 - (now - data.lastMine)) / 60000);
      alert("Wait " + wait + " minutes");
    }
  });
}