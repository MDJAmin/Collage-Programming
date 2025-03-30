#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>

using namespace std;

struct Task {
    string title;
    string deadline;
    bool completed;
};

void saveTasks(const vector<Task>& tasks);
vector<Task> loadTasks();
void displayTasks(const vector<Task>& tasks);
void addTask(vector<Task>& tasks);
void markTaskComplete(vector<Task>& tasks);
void deleteTask(vector<Task>& tasks);

const string FILE_NAME = "tasks.txt";

int main() {
    vector<Task> tasks = loadTasks();
    int choice;

    do {
        cout << "\n===== Task Manager =====\n";
        cout << "1. View Tasks\n2. Add Task\n3. Mark Task as Completed\n4. Delete Task\n5. Exit\n";
        cout << "Choose an option: ";
        cin >> choice;
        cin.ignore();

        switch (choice) {
            case 1: displayTasks(tasks); break;
            case 2: addTask(tasks); break;
            case 3: markTaskComplete(tasks); break;
            case 4: deleteTask(tasks); break;
            case 5: cout << "Exiting...\n"; break;
            default: cout << "Invalid choice! Try again.\n";
        }
    } while (choice != 5);

    return 0;
}

vector<Task> loadTasks() {
    vector<Task> tasks;
    ifstream file(FILE_NAME);


    string line;
    while (getline(file, line)) {
        stringstream ss(line);
        string title, deadline, status;
        getline(ss, title, ',');
        getline(ss, deadline, ',');
        getline(ss, status, ',');

        bool completed = (status == "done");
        tasks.push_back({title, deadline, completed});
    }

    file.close();
    return tasks;
}

void saveTasks(const vector<Task>& tasks) {
    ofstream file(FILE_NAME);
    for (const auto& task : tasks) {
        file << task.title << "," << task.deadline << "," << (task.completed ? "done" : "pending") << "\n";
    }
    file.close();
}

void displayTasks(const vector<Task>& tasks) {
    if (tasks.empty()) {
        cout << "✨ No tasks available. Add one! ✨\n";
        return;
    }

    cout << "\n📌 Task List:\n";
    for (size_t i = 0; i < tasks.size(); i++) {
        cout << i + 1 << ". [" << (tasks[i].completed ? "✔" : "✖") << "] " << tasks[i].title 
             << " (Due: " << tasks[i].deadline << ")\n";
    }
}

void addTask(vector<Task>& tasks) {
    Task newTask;
    cout << "Enter task title: ";
    getline(cin, newTask.title);
    cout << "Enter deadline (YYYY-MM-DD): ";
    getline(cin, newTask.deadline);
    newTask.completed = false;

    tasks.push_back(newTask);
    saveTasks(tasks);
    cout << "✅ Task added successfully!\n";
}

void markTaskComplete(vector<Task>& tasks) {
    if (tasks.empty()) {
        cout << "No tasks available to mark as completed.\n";
        return;
    }

    displayTasks(tasks);
    int index;
    cout << "Enter task number to mark as completed: ";
    cin >> index;
    cin.ignore();

    if (index < 1 || index > tasks.size()) {
        cout << "❌ Invalid task number!\n";
        return;
    }

    tasks[index - 1].completed = true;
    saveTasks(tasks);
    cout << "✅ Task marked as completed!\n";
}

void deleteTask(vector<Task>& tasks) {
    if (tasks.empty()) {
        cout << "No tasks available to delete.\n";
        return;
    }

    displayTasks(tasks);
    int index;
    cout << "Enter task number to delete: ";
    cin >> index;
    cin.ignore();

    if (index < 1 || index > tasks.size()) {
        cout << "❌ Invalid task number!\n";
        return;
    }

    tasks.erase(tasks.begin() + index - 1);
    saveTasks(tasks);
    cout << "🗑 Task deleted successfully!\n";
}
