package DAL

import (
	"context"
	"fmt"
	"log"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Data struct {
	Wells      int
	Wavelength int
	Lm         []int
}

type Well struct {
	Id         int   `bson:"_id"`
	Wells      int   `bson:"wells"`
	Wavelength int   `bson:"wavelength"`
	Lm         []int `bson:"lm"`
}

type Value struct {
	WellIndex        int
	WavelengthValues []float64
}

type Document struct {
	Id int `bson:"_id"`
}

func AcquireData() []Value {
	var values []Value

	conn := Connect()
	collection := conn.Database("WellDB").Collection("wells")
	result, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		log.Fatalf("Cannot connect to DB: %s", err.Error())
	}
	defer result.Close(context.TODO())

	for result.Next(context.TODO()) {
		var well Well

		err := result.Decode(&well)
		if err != nil {
			log.Fatalf("Error: %s", err.Error())
		}

		var wavelengthValues []float64
		for i := 0; i < well.Wavelength; i++ {
			num, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", float32(well.Id)+float32(well.Lm[i])*0.1), 64)
			wavelengthValues = append(wavelengthValues, num)
		}

		values = append(values, Value{WellIndex: well.Id, WavelengthValues: wavelengthValues})
	}
	return values
}

func DumpData(data Data) (*mongo.InsertOneResult, bool) {
	conn := Connect()
	collection := conn.Database("WellDB").Collection("wells")

	findOptions := options.FindOne().SetSort(bson.D{{Key: "_id", Value: -1}})

	var res Document
	var maxId int
	err := collection.FindOne(context.Background(), bson.D{}, findOptions).Decode(&res)
	if err == mongo.ErrNoDocuments {
		maxId = 0
	} else if err != nil {
		log.Fatal(err)
	}
	maxId = res.Id

	well := Well{
		Id:         maxId + 1,
		Wells:      data.Wells,
		Wavelength: data.Wavelength,
		Lm:         data.Lm,
	}

	result, err := collection.InsertOne(context.TODO(), well)
	if err != nil {
		log.Fatalf("Error: %s", err.Error())
		return nil, false
	}

	return result, true
}

func Connect() *mongo.Client {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("DB connected...")
	return client
}
