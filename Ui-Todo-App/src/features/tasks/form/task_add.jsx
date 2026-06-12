import React from 'react';
import { useForm } from 'react-hook-form';
import './task_form.css';

function TaskAddForm({ users, onSubmit, onClose }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleFormSubmit = async (data) => {
        await onSubmit({
            title: data.title,
            description: data.description,
            userIds: data.userIds.map(id => parseInt(id))
        });
        reset();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Thêm công việc mới</h3>
                    <button className="modal-close-btn" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <input type="text" {...register("title")} placeholder="Tiêu đề..."/>
                    <div className="checkbox-list">
                        <label className="checkbox-list-label">Chọn thành viên</label>
                        {Array.isArray(users) && users.map(u => (
                            <label key={u.id} className="checkbox-item">
                                <input type="checkbox" value={u.id} {...register("userIds")}/>
                                <span>{u.username}</span>
                            </label>
                        ))}
                        {errors.userIds && <p className="error-msg">{errors.userIds.message}</p>}
                    </div>
                    <textarea {...register("description")} placeholder="Mô tả..." />
                    <button type="submit">Giao việc</button>
                </form>
            </div>
        </div>
    );
}

export default TaskAddForm;