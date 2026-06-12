import React, { useEffect, useState } from 'react';
import { taskApi } from '../../services/task_api';
import TaskCard from './card/task_card';
import TaskUpdateForm from './form/task_update';
import './task.css';

function UserTasksPage() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const loadMyTasks = async () => {
        try {
            const res = await taskApi.getMyTasks();
            setTasks(Array.isArray(res) ? res : (res?.data || []));
        } catch (error) {
            console.error("Lỗi tải công việc cá nhân:", error);
        }
    };

    useEffect(() => { loadMyTasks(); }, []);

    const handleUpdateTask = async (data) => {
        await taskApi.updateMyTaskStatus(selectedTask.id, data);
        setSelectedTask(null);
        loadMyTasks();
    };

    return (
        <div className="tasks-container">
            <h2>Công việc của tôi</h2>

            {selectedTask && (
                <TaskUpdateForm
                    task={selectedTask}
                    onSubmit={handleUpdateTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}

            <div className="tasks-grid">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskCard key={task.id} task={task} onUpdate={setSelectedTask} />
                    ))
                ) : (
                    <p>Bạn chưa có công việc nào.</p>
                )}
            </div>
        </div>
    );
}

export default UserTasksPage;