#include <iostream>
using namespace std;

int main() {
    int n;

    // Ask the user for input
    cout << "Enter a number: ";
    cin >> n;

    // Loop from 1 to n
    for (int i = 1; i <= n; i++) {
        // Check if the number is even or odd using if-else
        if (i % 2 == 0) {
            cout << i << " is even." << endl;
        } else {
            cout << i << " is odd." << endl;
        }
    }

    return 0;
}
