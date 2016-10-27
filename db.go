package main

import (
	"log"

	"gopkg.in/mgo.v2"
)

func createDbSession() (*mgo.Session, error) {
	return mgo.Dial("localhost")
}

//Insert TodoItem to db
func Insert(item TodoItem) error {
	session, err := createDbSession()
	if err != nil {
		return err
	}
	defer session.Close()

	c := session.DB("todo").C("items")
	if err := c.Insert(&item); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}

//GetItems return all todo items in db
func GetItems() ([]TodoItem, error) {
	session, err := createDbSession()
	var items []TodoItem
	if err != nil {
		return nil, err
	}
	defer session.Close()

	if err = session.DB("todo").C("items").Find(nil).All(&items); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return items, nil
}

//Delete item by key
func Delete(item TodoItem) error {
	session, err := createDbSession()
	if err != nil {
		return err
	}
	defer session.Close()

	if err := session.DB("todo").C("items").Remove(item); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}
