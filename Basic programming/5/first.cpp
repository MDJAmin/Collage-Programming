#include<iostream>
using namespace std;

int main(){
    int number;
    cout << "please enter number...";
    cin >> number;
    if (number % 2 == 0)
    { cout << "this number is prim";}
    else{
        cout << " this number is not prim!!!!";
    }
}