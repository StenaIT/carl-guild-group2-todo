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
			log.Fatal(err)
			so.Emit("error", "Item not found or cannot be deleted")
		}

		if items, err := GetItems(); err != nil {
			log.Fatal(err)
		} else {
			so.BroadcastTo("todo", "item:deleted", items)
			so.Emit("item:deleted", items)
		}
	})

	so.On("item:update", func(before TodoItem, after TodoItem) {
		log.Println("Updating item!")
		err := Update(before, after)
		if err != nil {
			log.Fatal(err)
			so.Emit("error", "Item not found or cannot be updated")
		}

		if items, err := GetItems(); err != nil {
			log.Fatal(err)
		} else {
			so.BroadcastTo("todo", "item:updated", items)
			so.Emit("item:updated", items)
		}
	})

	so.On("item:add", func(item TodoItem) {
		log.Println("Adding item event!")
		err := Insert(item)
		if err != nil {
			so.Emit("error", "Cannot insert item")
		}

		if items, err := GetItems(); err != nil {
			log.Fatal(err)
		} else {
			log.Println("Broadcasting items!")
			so.BroadcastTo("todo", "item:added", items)
			so.Emit("item:added", items)
		}
	})

	so.On("disconnection", func() {
		log.Println("on disconnect")
	})
}
