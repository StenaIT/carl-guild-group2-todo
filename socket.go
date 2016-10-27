package main

import (
	"log"

	"github.com/googollee/go-socket.io"
)

//SetupSocket connects a client and setup events
func SetupSocket(server *socketio.Server) {
	server.On("connection", handleConnection)

	server.On("error", func(so socketio.Socket, err error) {
		log.Println("error:", err)
	})
}

func handleConnection(so socketio.Socket) {
	log.Println("Connected!")
	items, err := GetItems()

	so.Join("todo")
	if err != nil {
		log.Fatal(err)
	} else {
		so.Emit("init", items)
	}

	so.On("item:delete", func(item TodoItem) {
		err := Delete(item)
		if err != nil {
			so.Emit("error", "Either not found or cannot be deleted")
		}

		if items, err := GetItems(); err != nil {
			log.Fatal(err)
		} else {
			so.BroadcastTo("todo", "item:deleted", items)
			so.Emit("item:deleted", items)
		}
	})

	so.On("item:add", func(item TodoItem) {
		err := Insert(item)
		if err != nil {
			so.Emit("error", "Cannot insert item")
		}

		if items, err := GetItems(); err != nil {
			log.Fatal(err)
		} else {
			so.BroadcastTo("todo", "item:new", items)
			so.Emit("item:new", items)
		}
	})

	so.On("disconnection", func() {
		log.Println("on disconnect")
	})
}
