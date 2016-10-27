package main

import (
	"log"
	"net/http"

	"github.com/googollee/go-socket.io"
)

func main() {
	server, err := socketio.NewServer(nil)
	FailOnError(err, "Failed to setup socket io server")

	SetupSocket(server)

	http.Handle("/socket.io/", server)
	http.Handle("/", http.FileServer(http.Dir("./dist")))
	log.Println("Serving at localhost:5000...")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
