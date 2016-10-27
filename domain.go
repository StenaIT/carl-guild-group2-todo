package main

//TodoItem A todo item consisting of a description
type TodoItem struct {
	TodoID 			string `json:"todoId"`
	Description string `json:"description"`
	Done        bool   `json:"done"`
}
