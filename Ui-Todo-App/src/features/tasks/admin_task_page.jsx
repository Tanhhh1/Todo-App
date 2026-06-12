import React, { useEffect, useState } from 'react';
import { taskApi } from '../../services/task_api';
import { userApi } from '../../services/user_api';
import TaskCard from './card/task_card';
import TaskAddForm from './form/task_add';
import TaskUpdateForm from './form/task_update';
import './task.css';

function AdminTasksPage() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const loadData = async () => {
        try {
            const [tasksRes, usersRes] = await Promise.all([
                taskApi.adminGetAllTasks(),
                userApi.adminGetAllUsers()
            ]);
            setTasks(Array.isArray(tasksRes) ? tasksRes : (tasksRes?.data || []));
            setUsers(Array.isArray(usersRes) ? usersRes : (usersRes?.data || []));
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleCreateTask = async (data) => {
        await taskApi.adminCreateTask(data);
        setShowAddForm(false);
        loadData();
    };

    const handleUpdateTask = async (data) => {
        await taskApi.adminUpdateTaskStatus(selectedTask.id, data);
        setSelectedTask(null);
        loadData();
    };

    return (
        <div className="tasks-container">
            <h2>Quản lý công việc hệ thống</h2>
            <button onClick={() => setShowAddForm(true)} className="btn-toggle">
                Thêm công việc mới
            </button>

            {showAddForm && (
                <TaskAddForm
                    users={users}
                    onSubmit={handleCreateTask}
                    onClose={() => setShowAddForm(false)}
                />
            )}

            {selectedTask && (
                <TaskUpdateForm
                    task={selectedTask}
                    onSubmit={handleUpdateTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}

            <div className="tasks-grid">
                {tasks.map(t => (
                    <TaskCard key={t.id} task={t} onUpdate={setSelectedTask} />
                ))}
            </div>
        </div>
    );
}

export default AdminTasksPage;