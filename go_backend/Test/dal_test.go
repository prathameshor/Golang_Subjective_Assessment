package tests

import (
	"testing"
	"wells_app/DAL"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/mongo"
)

func TestAcquireData(t *testing.T) {
	testValue := DAL.AcquireData()
	assert.IsType(t, []DAL.Value{}, testValue)
}

func TestDumpData(t *testing.T) {
	val := DAL.Data{
		Wells:      96,
		Wavelength: 2,
		Lm:         []int{234, 345},
	}
	result, ok := DAL.DumpData(val)
	if !ok {
		t.Error("Expected Insertion!")
	}
	assert.IsType(t, &mongo.InsertOneResult{}, result)
}
