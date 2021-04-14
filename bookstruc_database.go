package handler

import (
	"GoBook/Bookstruc"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

const DatabaseConnectionError = "Failed toconnect to database."

var dbClient *gorm.DB

// Initializing the Database
func InitialMigration() {
	var err error
	dbClient, err = gorm.Open("sqlite3", "test.db")
	if err != nil {
		log.Fatalf("Failed toconnect to database. More info: %s", err.Error())
	}
	dbClient.AutoMigrate(&Bookstruc.Book{})
}

// Getting all books in the database
func AllBooks(w http.ResponseWriter, r *http.Request) {
	var books []Bookstruc.Book
	dbClient.Find(&books)
	json.NewEncoder(w).Encode(books)
}

// Creating a book and storing it to the databse
func BooksCreate(w http.ResponseWriter, r *http.Request) {
	

	title := chi.URLParam(r, "title")
	author := chi.URLParam(r, "author")
	time := time.Now().Format("Jan-02-2006 3:4:5 PM")

	dbClient.Create(&Bookstruc.Book{Title: title, Author: author, Time: time})

	fmt.Fprintf(w, "New Book Successfull Created")

}

// Deleting a selected book from the database
func DeleteBook(w http.ResponseWriter, r *http.Request) {
	

	id := chi.URLParam(r, "id")

	var book Bookstruc.Book

	if err := dbClient.Where("id=?", id).First(&book).Error; err != nil {
		fmt.Fprintf(w, "Book is not on File")
	} else {
		dbClient.Delete(&book)

		fmt.Fprintf(w, "Book Sucessfully Deleted")

	}

}

//Updating a book
func UpdateBook(w http.ResponseWriter, r *http.Request) {

	title := chi.URLParam(r, "title")
	author := chi.URLParam(r, "author")
	id := chi.URLParam(r, "id")

	var book Bookstruc.Book

	if err := dbClient.Where("id=?", id).First(&book).Error; err != nil {
		fmt.Fprintf(w, "Book is not on File")
	} else {
		
		book.Time = time.Now().Format("Jan-02-2006 3:4:5 PM")
		book.Title = title
		book.Author = author
		dbClient.Save(&book)
		fmt.Fprintf(w, "Book Sucessfully Updated")

	}

	fmt.Fprintf(w, "Sucessfully Updated User")
}
