const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const app = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "./db.json"));

app.db = router.db;

const dataHandler = (req, resp, next) => {
  console.log(req.url);
  // req.url = "/users";
  next();
};

const rules = auth.rewriter({
  data: 440,
  users: 660,
});

const PORT = 3000;
app.use(require("cors")());
app.use(dataHandler);
app.use(rules);
app.use(auth);
app.use(router);

app.listen(PORT, "", () => {
  console.log(`Server starting in port ${PORT}`);
});
