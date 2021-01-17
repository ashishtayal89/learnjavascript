const express = require("express")
const ejs = require("ejs")
const parser = require("cookie-parser")
const logger = require("morgan")
const http = require("http")

const { ErrorHandler } = require("./error_handler")

const app = express()
const httpServer = http.Server(app)

app.use(logger("dev"))
app.set("view engine", "ejs")
app.use(
    parser(),
    express.json(),
    express.urlencoded({ extended: false }),
    express.static("public")
)

app.get("/", async (req, res, next) => {
    try {
        res.json({})
    } catch (error) {
        next(error)
    }
})
app.use(ErrorHandler)

//export app
module.exports = httpServer
