package main

import (
  "fmt"
	"log"
	"net/http"
	"github.com/googollee/go-socket.io"
)

//TodoItem A todo item consisting of a description
type TodoItem struct {
  Description string `json:"description"`
}

func failOnError(err error, msg string) {
  if err != nil {
    log.Fatalf("%s: %s", msg, err)
    panic(fmt.Sprintf("%s: %s", msg, err))
  }
}

func main() {
  var items []TodoItem = []TodoItem{
    TodoItem{
      Description: "Todo",
    },
    TodoItem{
      Description: "Items",
    },
  }

	server, err := socketio.NewServer(nil)

	failOnError(err, "Failed to setup socket io server")

	server.On("connection", func(so socketio.Socket) {
		log.Println("Connected!")
    failOnError(err, "Failed to marshal struct")
    so.Emit("init", items)
		so.Join("todo")

    so.On("add:item", func(item TodoItem) {
      items = append(items, item)
      so.Emit("new:item", items)
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
