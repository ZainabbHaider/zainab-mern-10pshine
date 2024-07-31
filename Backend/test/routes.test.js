const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");
chai.use(chaiHttp);
const expect = chai.expect;
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");
const Note = require("../models/noteModel.js");

before(async function () {
  await User.deleteMany({});
  await Note.deleteMany({});
  
  const hashedPassword = await bcrypt.hash("testpassword", 10);
  const user = new User({
    firstName: "Testing",
    lastName: "user",
    email: "mocha2@example.com",
    password: hashedPassword,
  });
  await user.save();
  userId = user._id;

  token = generateToken(user._id);
});

describe("User Routes", function () {
  it("should create a new user", function (done) {
    chai
      .request(app)
      .post("/api/users")
      .send({
        firstName: "New",
        lastName: "User",
        email: "newuser@example.com",
        password: "newpassword",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.firstName).to.equal("New");
        expect(res.body.lastName).to.equal("User");
        expect(res.body.email).to.equal("newuser@example.com");
        done();
      });
  });

  it("should return error if user already exists", function (done) {
    chai
      .request(app)
      .post("/api/users")
      .send({
        firstName: "New",
        lastName: "User",
        email: "newuser@example.com",
        password: "password",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message").eql("User already exists");
        done();
      });
  });
  it("should log in an existing user and have token saved in cookies", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({
        email: "newuser@example.com",
        password: "newpassword",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.all.keys(
          "_id",
          "firstName",
          "lastName",
          "email",
          "password"
        );
        expect(res.body.firstName).to.equal("New");
        expect(res.body.lastName).to.equal("User");
        expect(res.body.email).to.equal("newuser@example.com");

        const cookies = res.headers["set-cookie"];
        expect(cookies).to.be.an("array").that.is.not.empty;
        const tokenCookie = cookies.find((cookie) =>
          cookie.startsWith("token=")
        );
        expect(tokenCookie).to.include("HttpOnly");
        done();
      });
  });
  it("should return an error for invalid login email or password", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({
        email: "newuser@example.com",
        password: "wrongpassword",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Invalid email or password");

        const cookies = res.headers["set-cookie"];
        expect(cookies).to.be.undefined;

        done();
      });
  });
  it("should return the user's profile", function (done) {
    chai
      .request(app)
      .get("/api/users/profile")
      .set("Cookie", `token=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.all.keys(
          "_id",
          "firstName",
          "lastName",
          "email"
        );
        expect(res.body.firstName).to.equal("Testing");
        expect(res.body.lastName).to.equal("user");
        expect(res.body.email).to.equal("mocha2@example.com");
        done();
      });
  });

  it("should return an error for unauthorized access", function (done) {
    chai
      .request(app)
      .get("/api/users/profile")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Not authorized, no token");
        done();
      });
  });
  it("should update the user's profile", function (done) {
    chai
      .request(app)
      .put("/api/users/profile")
      .set("Cookie", `token=${token}`)
      .send({
        firstName: "UpdatedFirstName",
        lastName: "UpdatedLastName",
        email: "updated@example.com",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.all.keys(
          "_id",
          "firstName",
          "lastName",
          "email",
          "token"
        );
        expect(res.body.firstName).to.equal("UpdatedFirstName");
        expect(res.body.lastName).to.equal("UpdatedLastName");
        expect(res.body.email).to.equal("updated@example.com");
        done();
      });
  });
});

describe("Note Routes", function () {
  before(async function () {
    const note = new Note({
      userId: userId,
      title: "Note to update",
      content: "Content to update",
    });
    await note.save();
    noteId = note._id;
  });
  it("should update a note", () => {
    const updatedNote = { title: "Updated Note", content: "Updated content" };

    return chai
      .request(app)
      .put(`/api/notes/${noteId}`)
      .set("Cookie", `token=${token}`)
      .send(updatedNote)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("title", "Updated Note");
        expect(res.body).to.have.property("content", "Updated content");
      });
  });

  it('should delete a note', (done) => {
    chai.request(app)
      .delete(`/api/notes/${noteId}`)
      .set('Cookie', `token=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Note removed');
        done();
      });
  });
  it('should return a message if no notes are found', (done) => {
    chai.request(app)
      .get('/api/notes')
      .set('Cookie', `token=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Your note collection is empty. Begin by creating your first note!');
        done();
      });
  });

  it("should add a new note", (done) => {
    const newNote = { title: "New Note", content: "New note content" };
    chai
      .request(app)
      .post("/api/notes/add")
      .set("Cookie", `token=${token}`)
      .send(newNote)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message", "Note added");
        done();
      });
  });
  it("should fetch all notes for the logged-in user", (done) => {
    chai
      .request(app)
      .get("/api/notes")
      .set("Cookie", `token=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array").that.has.lengthOf(1);
        done();
      });
  });

  it("should return an error if title or content is missing", (done) => {
    chai
      .request(app)
      .post("/api/notes/add")
      .set("Cookie", `token=${token}`)
      .send({ title: "" }) // Missing content
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "Please fill all fields");
        done();
      });
  });

  
});
