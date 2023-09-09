import React, { useState } from 'react';

function Navbar({ setActiveView, editTask }) {
  const [editedDetails, setEditedDetails] = useState("");

  const handleEdit = () => {
    const [taskId, newTitle, newDate, newDay] = editedDetails.split(",").map((item) => item.trim());
    editTask(taskId, newTitle, newDate, newDay);
    setEditedDetails("");
  }

  return (
    <div className="navbar">
      <button onClick={() => setActiveView("All")}>All</button>
      <button onClick={() => setActiveView("Active")}>Active</button>
      <button onClick={() => setActiveView("Completed")}>Completed</button>
      {editedDetails !== "" && (
        <>
          <input
            type="text"
            placeholder="Edit task details (Task ID, Title, Date, Day)"
            value={editedDetails}
            onChange={(e) => setEditedDetails(e.target.value)}
          />
          <button onClick={handleEdit}>Save Changes</button>
        </>
      )}
    </div>
  );
}

export default Navbar;