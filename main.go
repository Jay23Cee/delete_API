package main

import (
	
	
	"GoBook/httpd/handler"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/rs/cors"
)

func main() {
	fmt.Println("Go Orm Tutorial")

	handler.InitialMigration()

	port := ":3001"

	r := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins:         []string{"*"},
		AllowOriginRequestFunc: func(r *http.Request, origin string) bool { return true },
		AllowedMethods:         []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:         []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:         []string{"Link"},
		AllowCredentials:       true,
		OptionsPassthrough:     true,
		MaxAge:                 3599, // Maximum value not ignored by any of major browsers
	})

	r.Use(cors.Handler)

	r.Get("/Books", handler.AllBooks)
	r.Post("/Books/{title}/{author}", handler.BooksCreate)
	r.Post("/Books/{id}/{title}/{author}", handler.UpdateBook)
	r.Post("/Books/delete/{id}", handler.DeleteBook)

	log.Fatal(http.ListenAndServe(port, r))
	fmt.Println("Serving on " + port)

}
