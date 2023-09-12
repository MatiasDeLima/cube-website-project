import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, collection, setDoc, updateDoc } from "firebase/firestore";

/*########## FIREBASE CONFIG ##########*/
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuC0HkdGq04n8crOd_NJCZ_jJJL6fiVpw",
  authDomain: "cube-db-e74b7.firebaseapp.com",
  projectId: "cube-db-e74b7",
  storageBucket: "cube-db-e74b7.appspot.com",
  messagingSenderId: "252172297789",
  appId: "1:252172297789:web:3edb69b76ea1e8458a6c54"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("public"));

/*########## ROUTES ##########*/
// home page router
app.get("/", (req, res) => {
    res.sendFile("index.html", { root : "public" });
})

// signup router
app.get("/signup", (req, res) => {
    res.sendFile("signup.html", { root : "public" });
})

app.post("/signup", (req, res) => {
    const { name, email, password, number, checkbox } = req.body;

    // backend validation form 
    if(name.length < 3) {
        res.json({ 'alert' : '🤷‍♂️ Name must be 3 letters long!' });
    } else if(!email.length) {
        res.json({ 'alert' : '🤷‍♂️ Enter Your E-mail!' });
    } else if(password.length < 8) {
        res.json({ 'alert' : '🤷‍♂️ Password most be 8 characters long!' });
    } else if(!Number(number) || number.length < 10) {
        res.json({ 'alert' : '🤷‍♂️ Invalid number, please enter valid one!' });
    } else if(!checkbox) {
        res.json({ 'alert' : '🤷‍♂️ You most agree to our terms and condition!' });
    } else {
        // store the data in BD
        const users = collection(db, "users");

        getDoc(doc(users, email)).then(user => {
            if(user.exists()) {
                return res.json({ 'alert' : '⚠️ Email already exists!' });
            } else {
                // encrypt the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        req.body.seller = false;

                        // set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
                            })
                        })
                    })
                })
            }
        })
    }
});

// login page router
app.get("/login", (req, res) => {
    res.sendFile("login.html", { root : "public" });
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // backend form validation
    if(!email.length || !password.length) {
        res.json({ 'alert' : '🤷‍♂️ Fill all the inputs!' });
    }

    const users = collection(db, "users");
    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()) {
            return res.json({ 'alert' : '🤷‍♂️ Email does not exists!'})
        } else {
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result) {
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                } else {
                    return res.json({ 'alert' : '🤷‍♂️ Password is incorrect!'})
                }
            })
        }
    })
})

// admin page router
app.get('/admin', (req, res) => {
    res.sendFile("admin.html", { root : "public" });
})

app.post('/admin', (req, res) => {
    let { adminuser, adminpassword, admincode, email} = req.body;

    if(adminuser.lenght < 3 || !adminpassword.length || !Number(admincode) || admincode.length < 10) {
        //alert("enter all filds")
        return res.json({ 'alert' : '🤷‍♂️ Please enter all filds!' });
    } else  {
        // update the admin status
        const sellers = collection(db, "sellers");
        setDoc(doc(sellers, email), req.body)
        .then(data => {
            const users = collection(db, "users");
            updateDoc(doc(users, email), {
                seller: true
            })
            .then(data => {
                res.json({ 'seller' : true });
            })
        })        
    }
})

// dashboard page
app.get('/dashboard', (req, res) => {
    res.sendFile('dashboard.html', { root : 'public' });
})

// add product page
app.get('/add-product', (req, res) => {
    res.sendFile("add-product.html", { root : "public" });
})

// 404 page router
app.get("/404", (req, res) => {
    res.sendFile("404.html", { root : "public" });
})

app.use((req, res) => {
    res.redirect('/404');
})

app.listen(port, () => {
    console.log(`Server litening on port: ${port}`);
});