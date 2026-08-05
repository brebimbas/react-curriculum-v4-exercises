import styles from './SnackForm.module.css';
import { useState, useEffect } from 'react';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const isEditing = Boolean(editingSnack);

  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouch] = useState({ name: false, rating: false });

  useEffect(() => {
    if (isEditing) {
      setName(editingSnack.name);
      setRating(editingSnack.rating);
    } else {
      setName('');
      setRating('');
    }
    setTouch({ name: false, rating: false });
  }, [editingSnack, isEditing]);

  function validateName() {
    return name.trim() !== '';
  }

  function validateRating() {
    return rating !== '';
  }

  function getNameError() {
    if (touched.name && !validateName()) {
      return 'Snake name is required';
    }
    return '';
  }

  function getRattingError() {
    if (touched.rating && !validateRating()) {
      return 'Please select a rating';
    }
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const rating = formData.get('rating');

    if (isEditing) {
      updateSnack(editingSnack.id, name, rating);
    } else {
      addSnack(name, rating);
      e.target.reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={isEditing ? editingSnack.name : ''}
          required
          className={styles['field-input']}
          placeholder="Enter snack name"
        />
      </div>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Rating:</label>
        <input
          type="number"
          name="rating"
          defaultValue={isEditing ? editingSnack.rating : ''}
          required
          min="1"
          max="5"
          className={styles['field-input']}
          placeholder="Rate 1-5"
        />
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
