import { useState } from "react";
import SchemaDropdown from "./SchemaDropdown";

// const WEBHOOK_URL = "https://webhook.site/2be76ee8-ea2b-42e2-a3b2-f7cae73d82df";

function Popup({ closePopup }) {
  const [segName, setSegName] = useState("");
  const [items, setItems] = useState([]);
  const [sel, setSel] = useState("");

  // trait types
  const ALL_OPTIONS = [
    { label: "First Name", value: "first_name", type: "user" },
    { label: "Last Name", value: "last_name", type: "user" },
    { label: "Gender", value: "gender", type: "user" },
    { label: "Age", value: "age", type: "user" },
    { label: "Account Name", value: "account_name", type: "group" },
    { label: "City", value: "city", type: "group" },
    { label: "State", value: "state", type: "group" },
  ];

  function addNew() {
    if (sel === "") {
      alert("Please pick something first");
      return;
    }
    if (items.includes(sel)) {
      alert("already added");
      return;
    }
    setItems([...items, sel]);
    setSel("");
  }

  // remove by index
  function removeAt(i) {
    const c = [...items];
    c.splice(i, 1);
    setItems(c);
  }

  // edit a selected dropdown in blue box
  function changeAt(i, newVal) {
    const c = [...items];
    c[i] = newVal;
    setItems(c);
  }

  async function saveSeg() {
    if (!segName.trim()) {
      alert("Please enter segment name");
      return;
    }
    if (items.length === 0) {
      alert("Add at least one schema");
      return;
    }

    const payload = {
      segment_name: segName,
      schema: items.map((s) => {
        const f = ALL_OPTIONS.find((o) => o.value === s);
        return { [s]: f ? f.label : s };
      }),
    };

    console.log("payload to send ->", payload);

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Saved! ");

        setSegName("");
        setItems([]);
        closePopup();
      } else {
        alert("Server responded not OK");
      }
    } catch (err) {
      console.log("send error", err);
      alert("Error sending data (check console).");
    }
  }

  const available = ALL_OPTIONS.filter((o) => !items.includes(o.value));

  // const testVar = null;
  // console.log("testVar", testVar)

  return (
    <>
      <div className="sideOverlay" onClick={closePopup}></div>

      <div className="sidePopup">
        <div className="popupHeader">
          <h3>Saving Segment</h3>
          <button className="closeBtn" onClick={closePopup}>
            x
          </button>
        </div>

        <div className="popupBody">
          <label>Enter the Name of the Segment</label>
          <input
            type="text"
            value={segName}
            onChange={(e) => setSegName(e.target.value)}
            placeholder="Name of the segment"
          />

          <p className="infoTxt">
            To save your segment, you need to add the schemas to build the query
          </p>

          <div className="traitLegend" style={{ marginBottom: "8px" }}>
            <span style={{ marginRight: 12 }}>
              <span className="dot user"></span> User Traits
            </span>
            <span>
              <span className="dot group"></span> Group Traits
            </span>
          </div>

          <div className="blueBox">
            {items.map((val, idx) => (
              <SchemaDropdown
                key={idx}
                value={val}
                index={idx}
                allOptions={ALL_OPTIONS}
                selected={items}
                onChange={changeAt}
                onRemove={removeAt}
              />
            ))}

            {items.length === 0 && (
              <div style={{ color: "#666", fontSize: 13 }}>
                No schema added yet
              </div>
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <select
              value={sel}
              onChange={(e) => setSel(e.target.value)}
              style={{ padding: 6, borderRadius: 5, width: "100%" }}
            >
              <option value="">Add schema to segment</option>
              {available.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <p
              onClick={addNew}
              style={{
                color: "teal",
                cursor: "pointer",
                fontSize: 14,
                marginTop: 6,
              }}
            >
              + Add new schema
            </p>
          </div>
        </div>

        <div className="popupFooter">
          <button className="saveBtn" onClick={saveSeg}>
            Save the Segment
          </button>
          <button className="cancelBtn" onClick={closePopup}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Popup;
