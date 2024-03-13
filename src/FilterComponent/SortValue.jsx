import React from "react";

export default function SortValue({handleSortChange, selectSortValue}) {
  return (
    <>
      <div className="filter-container">
        <div className="sorting-container" style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="div-sorting">
            <div className="sorting">
              <select value={selectSortValue} onChange={handleSortChange}>
                <option value="">Select Sorting Option</option>
                <option value="hightolow">Price-High to Low</option>
                <option value="lowtohigh">Price-Low to High</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
