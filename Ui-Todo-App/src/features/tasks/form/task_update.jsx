import React from 'react';
import { useForm } from 'react-hook-form';
import { TASK_STATUS_OPTIONS } from '../../../constants/task_status';
import './task_form.css';

function TaskUpdateForm({ task, onSubmit, onClose }) {
    const { register, handleSubmit } = useForm({
        defaultValues: { status: task?.status || '' }
    });

    const handleFormSubmit = async (data) => {
        await onSubmit({ status: parseInt(data.status) });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Cập nhật công việc</h3>
                    <button className="modal-close-btn" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    <div className="readonly-field">
                        <span className="readonly-label">Tiêu đề</span>
                        <span className="readonly-value">{task?.title}</span>
                    </div>

                    <div className="readonly-field">
                        <span className="readonly-label">Mô tả</span>
                        <span className="readonly-value">{task?.description || '—'}</span>
                    </div>

                    <div className="readonly-field">
                        <span className="readonly-label">Thành viên</span>
                        <div className="readonly-user-list">
                            {Array.isArray(task?.assignedUsers) && task.assignedUsers.length > 0
                                ? task.assignedUsers.map(u => (
                                    <span key={u.id} className="readonly-user-badge">{u.username}</span>
                                ))
                                : <span className="readonly-value">—</span>
                            }
                        </div>
                    </div>

                    <div className="field-group">
                        <label className="field-label">Trạng thái</label>
                        <select {...register("status", { required: true })}>
                            {TASK_STATUS_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">Cập nhật</button>
                </form>
            </div>
        </div>
    );
}

export default TaskUpdateForm;