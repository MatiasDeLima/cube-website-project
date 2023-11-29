import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	getDoc,
	doc,
	collection,
	setDoc,
	updateDoc,
	getDocs,
	query,
	where,
	deleteDoc,
	limit
} from "firebase/firestore";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import nodemailer from "nodemailer";
import stripe from "stripe";

dotenv.config();
/*########## FIREBASE CONFIG ##########*/
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(express.static("public"));

// aws setup
const region = "sa-east-1"; // aws => propriedades
const bucketName = "cube-files-jsga-2324";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
	region: region,
	credentials: {
		accessKeyId,
		secretAccessKey
	}
})

// Generate image url
async function generateURL() {
	const date = new Date();
	const imageName = `${date.getTime()}.jpeg`;

	const params = {
		Bucket: bucketName,
		Key: imageName,
		ContentType: "image/jpeg"
	};

	const expiresIn = 300;
	const command = new PutObjectCommand(params);

	const signedUrl = await getSignedUrl(s3, command, { expiresIn });

	return signedUrl;
}

app.get("/s3url", (req, res) => {
	generateURL().then(url => res.json(url))
		.catch((error) => {
			console.error("Erro ao gerar a URL:", error);
			res.json("Error ao gerar a URL")
		});
});

/*########## ROUTES ##########*/
// home page router
app.get("/", (req, res) => {
	res.sendFile("index.html", { root: "public" });
});

// signup router
app.get("/signup", (req, res) => {
	res.sendFile("signup.html", { root: "public" });
});

app.post("/signup", (req, res) => {
	const { name, email, password, number, checkbox } = req.body;

	// backend validation form 
	if (name.length < 3) {
		res.json({ "alert": "🤷‍♂️ Name must be 3 letters long!" });
	} else if (!email.length) {
		res.json({ "alert": "🤷‍♂️ Enter Your E-mail!" });
	} else if (password.length < 8) {
		res.json({ "alert": "🤷‍♂️ Password most be 8 characters long!" });
	} else if (!Number(number) || number.length < 10) {
		res.json({ "alert": "🤷‍♂️ Invalid number, please enter valid one!" });
	} else if (!checkbox) {
		res.json({ "alert": "🤷‍♂️ You most agree to our terms and condition!" });
	} else {
		// store the data in BD
		const users = collection(db, "users");

		getDoc(doc(users, email)).then(user => {
			if (user.exists()) {
				return res.json({ "alert": "⚠️ Email already exists!" });
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
							});
						});
					});
				});
			}
		});
	}
});

// login page router
app.get("/login", (req, res) => {
	res.sendFile("login.html", { root: "public" });
});

app.post("/login", (req, res) => {
	const { email, password } = req.body;

	// backend form validation
	if (!email.length || !password.length) {
		res.json({ "alert": "🤷‍♂️ Fill all the inputs!" });
	}

	const users = collection(db, "users");
	getDoc(doc(users, email))
		.then(user => {
			if (!user.exists()) {
				return res.json({ "alert": "🤷‍♂️ Email does not exists!" });
			} else {
				bcrypt.compare(password, user.data().password, (err, result) => {
					if (result) {
						let data = user.data();
						return res.json({
							name: data.name,
							email: data.email,
							seller: data.seller
						});
					} else {
						return res.json({ "alert": "🤷‍♂️ Password is incorrect!" });
					}
				});
			}
		});
});

// admin page router
app.get("/admin", (req, res) => {
	res.sendFile("admin.html", { root: "public" });
});

app.post("/admin", (req, res) => {
	let { adminuser, adminpassword, admincode, email } = req.body;

	if (adminuser.lenght < 3 || !adminpassword.length || !Number(admincode) || admincode.length < 10) {
		//alert("enter all filds")
		return res.json({ "alert": "🤷‍♂️ Please enter all filds!" });
	} else {
		// update the admin status
		const sellers = collection(db, "sellers");
		setDoc(doc(sellers, email), req.body)
			.then(data => {
				const users = collection(db, "users");
				updateDoc(doc(users, email), {
					seller: true
				})
					.then(data => {
						res.json({ "seller": true });
					});
			});
	}
});

// dashboard page
app.get("/dashboard", (req, res) => {
	res.sendFile("dashboard.html", { root: "public" });
});

// add product page
app.get("/add-product", (req, res) => {
	res.sendFile("add-product.html", { root: "public" });
});

// quando o adim clicar em editar producto na dashboard abre essa url
// redenrizando o produto para editar
// depois vai no html do add-product e muda o css e js para ../css ../js
// cria uma nova pagina colocando os dados de acordo como id do produto
app.get("/add-product/:id", (req, res) => {
	res.sendFile("add-product.html", { root: "public" });
});

// pega os dado do formularo do front de add-product
// adiciona ao DB
// os producto de product.html vem daqui
app.post("/add-product", (req, res) => {
	let { name, categorie, shortDes, price, image, tags, email, draft, id } = req.body;

	if (!draft) {
		if (!name.length) {
			res.json({ "alert": "🤷‍♂️ Should enter product name!" });
		} else if (!categorie.length) {
			res.json({ "alert": "🤷‍♂️ Should enter categorie name!" });
		} else if (!shortDes.length) {
			res.json({ "alert": "🤷‍♂️ Short des must be 80 letters long!" });
		} else if (!price.length || !Number(price)) {
			res.json({ "alert": "🤷‍♂️ Enter valid price!" });
		} else if (!tags.length) {
			res.json({ "alert": "🤷‍♂️ Enter tags!" });
		}
	}

	// add-product
	let docName = id == undefined ? `${name.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;
	// let docName = `${name.toLowerCase()}-${Math.floor(Math.random() * 50000)}`;

	let products = collection(db, "products");
	setDoc(doc(products, docName), req.body)
		.then(data => {
			// manda para o frontend
			res.json({ "product": name });
		})
		.catch(err => {
			res.json({ "alert": "🤷‍♂️ Some error accured!" });
		});
});

// produtos vindo do add products depois de postar no db
// pega do db e joga para o front
// products.html
app.post("/get-products", (req, res) => {
	// o id so e colocado depois por esta relacionado a editar o produto
	let { email, id, tag } = req.body;

	let products = collection(db, "products");
	let docRef;

	// products pelo id para editar
	if (id) {
		docRef = getDoc(doc(products, id));
	} else if (tag) {
		docRef = getDocs(query(products, where("tags", "array-contains", tag), limit(5)));
	} else {
		docRef = getDocs(query(products, where("email", "==", email)));
	}

	// docRef = getDocs(query(products, where("email", "==", email)));

	docRef.then(products => {
		if (products.empty) {
			return res.json("no products");
		}

		let productArr = [];
		// codigo id so adicionado depois
		if (id) {
			return res.json(products.data());
		} else {
			products.forEach(item => {
				let data = item.data();
				data.id = item.id;
				productArr.push(data);

			});
		}

		// products.forEach(item => {
		//     let data = item.data();
		//     data.id = item.id;
		//     productArr.push(data);

		// })

		res.json(productArr);
	});
});

// deleta produto renderizado na dashboard
app.post("/delete-product", (req, res) => {
	let { id } = req.body;

	deleteDoc(doc(collection(db, "products"), id))
		.then(data => {
			res.json("success");
		}).catch(err => {
			res.json("err", err);
		});
});

// product details page
app.get("/products/:id", (req, res) => {
	res.sendFile("product.html", { root: "public" });
});

// search page
app.get("/search/:key", (req, res) => {
	res.sendFile("search.html", { root: "public" });
})

// add review
app.post("/add-review", (req, res) => {
	let { headline, review, rate, email, product } = req.body;
	// console.log(req.body);
	// res.json('got it');

	// form validation
	if (!headline.length || !review.length || rate == 0 || email == null || !product) {
		res.json({ 'alert': 'Fill all the inputs' });
	}

	// storing in firestore
	let reviews = collection(db, "reviews");
	let docName = `review-${email}-${product}`;

	setDoc(doc(reviews, docName), req.body)
		.then(data => {
			return res.json('review')
		})
		.catch(err => {
			console.log(err);
			res.json({ 'alert': 'some err occured' })
		})
})

// get Review
app.post("/get-review", (req, res) => {
	let { email, product } = req.body;

	let reviews = collection(db, "reviews");

	getDocs(query(reviews, where("product", "==", product)), limit(4))
		.then(review => {
			// console.log(review)
			// res.json('1');

			let reviewArr = [];

			if (review.empty) {
				return res.json(reviewArr);
			}

			let userEmail = false;

			review.forEach((item, i) => {
				let reviewEmail = item.data().email;
				if (reviewEmail == email) {
					userEmail = true;
				}
				reviewArr.push(item.data())
			})

			if (!userEmail) {
				getDoc(doc(reviews, `review=${email}-${product}`))
					.then(data => reviewArr.push(data.data()))
			}

			return res.json(reviewArr);
		})
})

// cart page
app.get("/cart", (req, res) => {
	res.sendFile("cart.html", { root: "public" });
})

// checkout page
app.get("/checkout", (req, res) => {
	res.sendFile("checkout.html", { root: "public" });
})

// stripe payment
let stripeGateway = stripe(process.env.STRIPE_KEY);

let DOMAIN = process.env.DOMAIN;

app.post('/stripe-checkout', async (req, res) => {

	const session = await stripeGateway.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "payment",
		success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&order=${encodeURI(JSON.stringify(req.body))}`,
		cancel_url: `${DOMAIN}/checkout?payment_fail=true`,
		line_items: req.body.items.map(item => {
			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: item.name,
						description: item.shortDes,
						images: [item.image]
					},
					unit_amount: item.price * 100
				},
				quantity: item.item
			}
		})
	})

	res.json(session.url)
})

app.post("/send-email", (req, res) => {
	const { email, order } = req.body

	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			password: process.env.NODEMAILER_PASSWORD
		}
	})

	const mailOptions = {
		from: "matiasdelima874@gmail.com",
		to: email,
		subject: "Clothing : Order Placed",
		html: `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Document</title>

					<style>
						body {
							min-height: 90vh;
							background: #f5f5f5;
							font-family: sans-serif;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						.heading {
							text-align: center;
							font-size: 40px;
							width: 50%;
							display: block;
							line-height: 50px;
							margin: 30px auto 60px;
							text-transform: capitalize;
						}

						.heading span {
							font-weight: 300;
						}

						.button {
							width: 200px;
							height: 50px;
							border-radius: 5px;
							background-color: #121212;
							display: inline-block;
							margin: auto;
							font-size: 18px;
							text-transform: capitalize;
						}
					</style>
				</head>
				<body>
					<div>
						<h1 class="heading">Dear ${email.split("@")[0]}, <span>your order is successfully placed</span></h1>
						<button class="button">Check Status</button>
					</div>
				</body>
			</html>
		`
	}

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.error(err);
			res.status(500).json({ alert: "Oops! Something went wrong. Try again." });
		} else {
			console.log("Email sent:", info.response);
			res.json({ alert: "Email sent successfully!" });
		}
	});
})

app.get('/success', async (req, res) => {
	let { order, session_id } = req.query;
	order = decodeURI(order);

	try {
		const session = await stripeGateway.checkout.sessions.retrieve(session_id);
		// const customer = await stripeGateway.customers.retrieve(session.customer);

		const customer = session.customer_details.email;

		let date = new Date();

		let orders_collection = collection(db, "orders");
		let docName = `${customer.email}-order-${date.getTime()}`;

		setDoc(doc(orders_collection, docName), JSON.parse(order))
			.then(data => {
				// res.redirect('/checkout?payment=done')
				fetch("http://localhost:5000/send-email", {
					method: "POST",
					headers: new Headers({ "Content-Type": "application/json" }),
					body: JSON.stringify({
						email: customer,
						order: JSON.parse(order),
					}),
				})
					.then((emailRes) => emailRes.json())
					.then((emailData) => {
						console.log(emailData);
						res.redirect("/checkout?payment=done");
					})
					.catch((emailErr) => {
						console.error(emailErr);
						// res.redirect("/404");
					});
			})

	} catch (err) {
		console.log(err)
		res.json(err);
		// res.redirect("/404");
	}
})

// 404 page router
app.get("/404", (req, res) => {
	res.sendFile("404.html", { root: "public" });
});

app.use((req, res) => {
	res.redirect("/404");
});

app.listen(port, () => {
	console.log(`Server litening on port: ${port}`);
});