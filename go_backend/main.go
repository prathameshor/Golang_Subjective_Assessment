package main

import (
	"net/http"
	"wells_app/handler"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/app", handler.GetAcquireData).Methods("GET")
	router.HandleFunc("/app", handler.PostDumpData).Methods("POST")

	http.ListenAndServe(":8080", router)
}
