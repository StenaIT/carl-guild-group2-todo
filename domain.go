package main

//TodoItem A todo item consisting of a description
type TodoItem struct {
	Description string `json:"description"`
	Done        bool   `json:"done"`
}
