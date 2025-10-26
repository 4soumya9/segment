function SchemaDropdown({
  value,
  index,
  allOptions,
  selected,
  onChange,
  onRemove,
}) {
  const obj = allOptions.find((o) => o.value === value);
  const dotType = obj?.type === "user" ? "dot user" : "dot group";

  // only show options not yet selected
  const opts = allOptions.filter(
    (o) => o.value === value || !selected.includes(o.value)
  );

  console.log("render DropItem", value);

  return (
    <div className="schemaRow">
      <span className={dotType} style={{ marginRight: 8 }}></span>

      <select
        className="schemaSelect"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
      >
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <button className="removeBtn" onClick={() => onRemove(index)}>
        -
      </button>
    </div>
  );
}

export default SchemaDropdown;
