import React, { useState } from "react";
import "./educationForm.css";

const EducationForm = () => {
  const [educationData, setEducationData] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    institute: "",
    degree: "",
    field: "",
    result: "",
    startYear: "",
    endYear: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setEducationData((prev) =>
        prev.map((item) => (item.id === formData.id ? { ...formData } : item))
      );
      setIsEditing(false);
    } else {
      setEducationData((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    setFormData({
      id: null,
      institute: "",
      degree: "",
      field: "",
      result: "",
      startYear: "",
      endYear: "",
    });
  };

  const handleEdit = (id) => {
    const itemToEdit = educationData.find((item) => item.id === id);
    setFormData(itemToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setEducationData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="education-container">
      <form className="education-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? "Edit Education" : "Add Education"}</h2>
        <div className="form-group">
          <input
            type="text"
            name="institute"
            value={formData.institute}
            placeholder="Institute *"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="degree"
            value={formData.degree}
            placeholder="Degree *"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="field"
            value={formData.field}
            placeholder="Field Of Study *"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="result"
            value={formData.result}
            placeholder="Result"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            name="startYear"
            value={formData.startYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            name="endYear"
            value={formData.endYear}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>

      {educationData.length > 0 && (
        <table className="education-table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Degree</th>
              <th>Institute</th>
              <th>Field</th>
              <th>Result</th>
              <th>Start</th>
              <th>End</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {educationData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.degree}</td>
                <td>{item.institute}</td>
                <td>{item.field}</td>
                <td>{item.result}</td>
                <td>{item.startYear}</td>
                <td>{item.endYear}</td>
                <td>
                  <button
                    className="action-button edit-button"
                    onClick={() => handleEdit(item.id)}
                  >
                    ✏️
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EducationForm;
