import React from 'react';
import { TASK_STATUS_LABEL } from '../../../constants/task_status';
import './task_card.css';

function TaskCard({ task, onUpdate }) {
    const statusKey = task.status;

    return (
        <div className="task-card">
            <div className="task-card-header">
                <h4>{task.title}</h4>
                {onUpdate && (
                    <button className="btn-update" onClick={() => onUpdate(task)} title="Cập nhật">
                        <i className="bx bx-edit"></i>
                    </button>
                )}
            </div>
            <p>{task.description}</p>
            <span className={`status-badge status-${statusKey}`}>
                {TASK_STATUS_LABEL[statusKey] || statusKey}
            </span>
        </div>
    );
}

export default TaskCard;