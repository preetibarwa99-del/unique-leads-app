import { useEffect, useState } from "react";

function App() {
  const [leads, setLeads] = useState([]);

  const API = "http://localhost:5000/api/leads";

  // GET LEADS
  const fetchLeads = async () => {
    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // DELETE
  const deleteLead = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message);
      }

      setLeads((prev) =>
        prev.filter((lead) => lead._id !== id)
      );

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: status
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message);
      }

      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === id
            ? { ...lead, status: data.status }
            : lead
        )
      );

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "30px auto",
        fontFamily: "Arial"
      }}
    >
      <h1>Unique Leads</h1>

      {leads.length === 0 ? (
        <p>No leads found</p>
      ) : (
        leads.map((lead) => (
          <div
            key={lead._id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "8px"
            }}
          >
            <h2>{lead.name}</h2>

            <p>
              <b>Email:</b> {lead.email}
            </p>

            <p>
              <b>Phone:</b> {lead.phone}
            </p>

            <p>
              <b>Company:</b> {lead.company}
            </p>

            <p>
              <b>Status:</b>{" "}

              <select
                value={lead.status || "New"}
                onChange={(e) =>
                  updateStatus(
                    lead._id,
                    e.target.value
                  )
                }
              >
                <option value="New">New</option>
                <option value="Contacted">
                  Contacted
                </option>
                <option value="Qualified">
                  Qualified
                </option>
                <option value="Converted">
                  Converted
                </option>
                <option value="Lost">Lost</option>
              </select>
            </p>

            <button
              onClick={() => deleteLead(lead._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;