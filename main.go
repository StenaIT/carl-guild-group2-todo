package main

import (
	"log"
	"net/http"
	"github.com/googollee/go-socket.io"
)

func main() {
	server, err := socketio.NewServer(nil)
	FailOnError(err, "Failed to setup socket io server")

	server.On("connection", func(so socketio.Socket) {
		log.Println("Connected!")
		items, err := GetItems()

		//so.Join("todo")
		if err != nil {
			log.Fatal(err)
		} else {
			so.Emit("init", items)
		}

		so.On("item:delete", func() {
			log.Println("Deleting!")
		})

		so.On("item:add", func(item TodoItem) {
			log.Println("Item added!")
			err := Insert(item)
			if err != nil {
				so.Emit("error", "Cannot insert item")
			}

			if items, err := GetItems(); err != nil {
				log.Fatal(err)
			} else {
				so.Emit("item:new", items)
			}
		})

		so.On("disconnection", func() {
			log.Println("on disconnect")
		})
	})

	server.On("error", func(so socketio.Socket, err error) {
		log.Println("error:", err)
	})

	http.Handle("/socket.io/", server)
	http.Handle("/", http.FileServer(http.Dir("./dist")))
	log.Println("Serving at localhost:5000...")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
