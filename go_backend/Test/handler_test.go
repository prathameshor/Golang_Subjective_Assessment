package tests

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"wells_app/handler"
)

func TestGetAcquireData(t *testing.T) {
	r, err := http.NewRequest("GET", "/app", nil)
	if err != nil {
		t.Fatal(err)
	}
	w := httptest.NewRecorder()
	handler := http.HandlerFunc(handler.GetAcquireData)

	handler.ServeHTTP(w, r)
	if w.Code != http.StatusOK {
		t.Errorf("Page didn't return %v but got %v", http.StatusOK, w.Code)
	}

	expected := `{"WellIndex":1,"WavelengthValues":[23.1,23.3,46.6]}`
	if !strings.Contains(w.Body.String(), expected) {
		t.Errorf("handler returned unexpected body: got %v want %v", w.Body.String(), expected)
	}
}

func TestPostDumpData(t *testing.T) {
	reader := strings.NewReader(`{"Wells": 432, "Wavelength": 3, "Lm": [234,345,456]}`)
	r, err := http.NewRequest("POST", "/app", reader)
	if err != nil {
		t.Fatal(err)
	}
	r.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	w := httptest.NewRecorder()
	handler := http.HandlerFunc(handler.PostDumpData)
	handler.ServeHTTP(w, r)

	if w.Code != http.StatusOK {
		t.Errorf("Page didn't return %v but got %v", http.StatusOK, w.Code)
	}
}
