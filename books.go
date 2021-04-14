package Bookstruc

import (
	"time"
)

type Getter interface {
	GetAll() []Book
}

type Adder interface {
	Add(book Book)
}

// type Book struct{
// 	gorm.Model
// 	Title string `json:"title"`
// 	Author string `json:"author"`
// 	Time string `json:"time"`
// }

type Book struct {
	ID        uint `gorm:"primary_key" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
	Title     string     `json:"title"`
	Author    string     `json:"author"`
	Time      string     `json:"time"`
}

type Repo struct {
	Books []Book
}

func New() *Repo {
	return &Repo{
		Books: []Book{},
	}
}

func (r *Repo) Add(book Book) {
	r.Books = append(r.Books, book)
}

func (r *Repo) GetAll() []Book {
	return r.Books
}
