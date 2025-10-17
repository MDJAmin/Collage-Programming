#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Car{
    string name;
    double price;
    int year;
};

void displayCars(const vector<Car>& cars){
    cout << "Car Information:" << endl;
    cout << "Name\tPrice\tYear" << endl;
    for(const auto& car : cars){
        cout << car.name << "\t" << car.price << "\t" << car.year << endl;
    }
}

void searchYear(const vector<Car>& cars, int year){
    cout << "Cars from " << year << ":" << endl;
    for (const auto& car : cars) {
        if (car.year == year) {
            cout << car.name << endl;
        }
    }
}

void highestPriceCar(const vector<Car>& cars) {
    if (!cars.empty()) {
        auto highestPriceCar = *max_element(cars.begin(), cars.end(), [](const Car& a, const Car& b) {
            return a.price < b.price;
        });
        cout << "Highest Price Car: " << highestPriceCar.name << endl;
    } else {
        cout << "No cars available." << endl;
    }
}

int main(){
    vector<Car> cars;
    int numCars;
    cout << "Enter the number of cars: ";
    cin >> numCars;
    for (int i = 0; i < numCars; ++i) {
        Car car;
        cout << "Enter car name: ";
        cin >> car.name;
        cout << "Enter car price: ";
        cin >> car.price;
        cout << "Enter car year: ";
        cin >> car.year;
        cars.push_back(car);
        }
        displayCars(cars);
        int year;
        cout << "Enter year to search:";
        cin >> year;
        searchYear(cars, year);
        highestPriceCar(cars);
        return 0;
}
