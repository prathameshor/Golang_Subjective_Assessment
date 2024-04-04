package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"wells_app/DAL"
)

func GetAcquireData(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	var data = DAL.AcquireData()
	json.NewEncoder(w).Encode(data)
}

func PostDumpData(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	var data DAL.Data
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&data)
	_, ok := DAL.DumpData(data)
	if ok {
		log.Print("Data Inserted!")
	}
}

func enableCors(w *http.ResponseWriter) {
	header := (*w).Header()
	header.Add("Access-Control-Allow-Origin", "*")
	header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	header.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
}
