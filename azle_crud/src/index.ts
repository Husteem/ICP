import { Canister, query, update, StableBTreeMap, Record, text, bool } from 'azle';
import { v4 as uuidv4 } from 'uuid';

const Task = Record({
    id: text,
    title: text,
    completed: bool
});

type Task = typeof Task._TYPE;

const tasks = StableBTreeMap<text, Task>(0);

export default Canister({
    // Create
    createTask: update([text], Task, (title) => {
        const task: Task = {
            id: uuidv4(),
            title,
            completed: false
        };
        tasks.insert(task.id, task);
        return task;
    }),

    // Read all
    getTasks: query([], Record({ tasks: Task.array() }), () => {
        return { tasks: tasks.values() };
    }),

    // Read by ID
    getTask: query([text], Task, (id) => {
        const task = tasks.get(id);
        if ('None' in task) {
            throw new Error(`Task with ID ${id} not found`);
        }
        return task.Some;
    }),

    // Update
    toggleTaskStatus: update([text], Task, (id) => {
        const taskOpt = tasks.get(id);
        if ('None' in taskOpt) {
            throw new Error(`Task with ID ${id} not found`);
        }
        const task = taskOpt.Some;
        const updated = { ...task, completed: !task.completed };
        tasks.insert(id, updated);
        return updated;
    }),

    // Delete
    deleteTask: update([text], bool, (id) => {
        return tasks.remove(id);
    })
});
