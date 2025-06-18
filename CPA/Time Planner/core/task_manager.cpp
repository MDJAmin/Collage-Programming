#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;
class Task
{
    string title;
    string due;
    bool isDone;

    friend class TaskHandler;

public:
    Task(const string &t, const string &d, bool done = false)
        : title(t), due(d), isDone(done) {}

    string toLine() const
    {
        return title + "," + due + "," + (isDone ? "done" : "pending");
    }

    static Task fromLine(const string &row)
    {
        stringstream ss(row);
        string t, d, s;
        getline(ss, t, ',');
        getline(ss, d, ',');
        getline(ss, s, ',');
        return Task(t, d, s == "done");
    }

    void show(int i) const
    {
        cout << i << ". [" << (isDone ? "✔" : "✖") << "] " << title << " (Due: " << due << ")\n";
    }
};

class TaskHandler
{
    vector<Task> list;
    const string dbFile = "tasks.txt";

    void fetch()
    {
        list.clear();
        ifstream in(dbFile);
        string r;
        while (getline(in, r))
            list.push_back(Task::fromLine(r));
    }

    void save() const
    {
        ofstream out(dbFile);
        for (const auto &t : list)
            out << t.toLine() << "\n";
    }

public:
    TaskHandler() { fetch(); }

    void showAll() const
    {
        if (list.empty())
        {
            cout << "،There is no task! Add something!?\n";
            return;
        }
        cout << "\nTasks:\n";
        for (size_t i = 0; i < list.size(); ++i)
            list[i].show(static_cast<int>(i + 1));
    }

    void newTask()
    {
        string t, d;
        cout << "Title:";
        cin.ignore();
        getline(cin, t);
        cout << "Deadline (YYYY-MM-DD): ";
        getline(cin, d);
        list.emplace_back(t, d);
        save();
        cout << "Added!\n";
    }

    void complete()
    {
        if (list.empty())
        {
            cout << "Nothing to complete. :]\n";
            return;
        }
        showAll();
        int idx;
        cout << "Which one? ";
        cin >> idx;
        if (idx < 1 || idx > static_cast<int>(list.size()))
        {
            cout << "Invalid number!\n";
            return;
        }
        list[idx - 1].isDone = true;
        save();
        cout << "Marked complete.\n";
    }

    void removeTask()
    {
        if (list.empty())
        {
            cout << "Nothing to remove.\n";
            return;
        }
        showAll();
        int i;
        cout << "Delete which? ";
        cin >> i;
        if (i < 1 || i > static_cast<int>(list.size()))
        {
            cout << "That number doesn't exist. :(\n";
            return;
        }
        list.erase(list.begin() + i - 1);
        save();
        cout << "Removed.👌🏻\n";
    }
};

int main()
{
    TaskHandler th;
    int opt = 0;

    while (opt != 5)
    {
        cout << "\n===== Task App =====\n";
        cout << "1. Show\n2. Add\n3. Complete\n4. Remove\n5. Quit\n";
        cout << "Pick one: ";
        cin >> opt;

        switch (opt)
        {
        case 1:
            th.showAll();
            break;
        case 2:
            th.newTask();
            break;
        case 3:
            th.complete();
            break;
        case 4:
            th.removeTask();
            break;
        case 5:
            cout << "Bye!\n";
            break;
        default:
            cout << "Not valid. Again.\n";
        }
    }

    return 0;
}
