import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component
export function QuestionItem({ question }) {
  const [workingText, setWorkingText] = useState(question.question);
  const [workingOptions, setWorkingOptions] = useState(question.options || []);

  const { state, dispatch } = useContext(SurveyContext);

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // Edit question
  const handleEdit = () => {
    if (state.ui.editingQuestionId === question.id) {
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: null },
      });
    } else {
      setWorkingText(question.question);
      setWorkingOptions(question.options || []);

      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: question.id },
      });
    }
  };

  // Save question text
  const handleSave = () => {
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: {
        id: question.id,
        newText: workingText,
      },
    });

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: null },
    });
  };

  // Cancel question editing
  const handleCancel = () => {
    setWorkingText(question.question);
    setWorkingOptions(question.options || []);

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: null },
    });
  };

  // Save option
  const handleOptionSave = (index) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: workingOptions[index],
      },
    });
  };

  // Delete option
  const handleOptionDelete = (index) => {
    if (question.options.length <= 2) {
      return;
    }

    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: {
        questionId: question.id,
        optionIndex: index,
      },
    });

    setWorkingOptions((options) =>
      options.filter((_, optionIndex) => optionIndex !== index)
    );
  };

  // Add option
  const handleAddOption = () => {
    const optionText = window.prompt('Enter a new option:');

    if (optionText && optionText.trim()) {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: {
          questionId: question.id,
          optionText: optionText.trim(),
        },
      });

      setWorkingOptions((options) => [...options, optionText.trim()]);
    }
  };

  // Delete question
  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this question?'
    );

    if (confirmed) {
      dispatch({
        type: 'DELETE_QUESTION',
        payload: {
          id: question.id,
        },
      });
    }
  };

  const isEditing = state.ui.editingQuestionId === question.id;

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>

        <div className={styles['question-actions']}>
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles['question-content']}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
            />

            <button onClick={handleSave}>Save</button>

            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>

          <ul>
            {question.options.map((option, index) => (
              <li key={index} className={styles['option-item']}>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={workingOptions[index] || ''}
                      onChange={(e) => {
                        const updatedOptions = [...workingOptions];
                        updatedOptions[index] = e.target.value;
                        setWorkingOptions(updatedOptions);
                      }}
                    />

                    <button onClick={() => handleOptionSave(index)}>
                      Save
                    </button>

                    <button
                      onClick={() => handleOptionDelete(index)}
                      disabled={question.options.length <= 2}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <span className={styles['option-text']}>{option}</span>
                )}
              </li>
            ))}
          </ul>

          {isEditing && <button onClick={handleAddOption}>+ Add Option</button>}
        </div>
      )}
    </div>
  );
}
